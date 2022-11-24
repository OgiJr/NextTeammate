const { default: mongoose } = require("mongoose");
import WorkData from "../models/WorkData";
import WorkUnit from "../models/WorkUnit";
import User from "../models/User";
import Company from "../models/Company";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "nextteammate",
    };

    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export async function dbUserToIronUser(user) {
  return {
    _id: user._doc._id.toString(),
    first_name: user._doc.first_name,
    last_name: user._doc.last_name,
    email: user._doc.email,
    is_admin: user._doc.is_admin,
    is_employer: user._doc.is_employer,
    has_password: user._doc.password_hash !== "",
    has_picture: user._doc.picture !== "/assets/images/no-user.png",
    has_video: !!user._doc.video,
    video: user._doc.video ? user._doc.video : null,
    picture: user._doc.picture,
    bio: user._doc.bio,
    birthdate: user._doc.birthdate.toJSON(),
    work_data: user._doc.is_admin ? {} : await dbWorkToIronWork(user._doc.work_data),
    company: user._doc.company ? await findCompanyById(user._doc.company) : null,
  };
}

export async function isUserEmailInDb(email) {
  dbConnect();

  const user = await User.findOne({ email });

  return user != null;
}

export async function findCompanyById(id) {
  dbConnect();

  const company = await Company.find({ _id: id });
  if (!company || company.length === 0) {
    return null;
  }

  return dbCompanyToCompany(company[0]);
}

export async function dbWorkToIronWork(work) {
  dbConnect();
  if (!work) {
    return {};
  }
  const id = work;

  work = await WorkData.findOne({ _id: work });

  if (!work) {
    return {};
  }

  return {
    _id: id.toString(),
    expected_hours_weekly: work._doc.expected_hours_weekly,
    current_price_per_hour: work._doc.current_price_per_hour,
    worker: work._doc.worker._id.toString(),
    currency: work._doc.currency,
    work: await Promise.all(work._doc.work.map(async (value) => await dbWorkUnitToIronWorkUnit(value))),
  };
}

export async function dbWorkUnitToIronWorkUnit(work_unit) {
  dbConnect();

  if (!work_unit) {
    return {};
  }

  const id = work_unit;

  work_unit = await WorkUnit.findOne({ _id: work_unit });

  if (!work_unit) {
    return {};
  }

  return {
    _id: id.toString(),
    start_time: work_unit._doc.start_time.toISOString(),
    end_time: work_unit._doc.end_time ? work_unit._doc.end_time.toISOString() : null,
    worker: work_unit._doc.worker._id.toString(),
    price_per_hours: work_unit._doc.price_per_hours,
    currency: work_unit._doc.currency,
  };
}

export async function dbChatToChat(chat) {
  return {
    _id: chat._id.toString(),
    sender: chat._doc.sender.toString(),
    receiver: chat._doc.receiver.toString(),
    type: chat._doc.type,
    text: chat._doc.text,
    og_filename: chat._doc.og_filename,
    timestamp: chat._doc.timestamp.toJSON(),
  };
}

export function dbCompanyToCompany(company) {
  return {
    _id: company._id.toString(),
    name: company._doc.name,
  };
}

export async function getIronUserWorkStats(user) {
  function getHoursDiff(startDate, endDate) {
    const msInHour = 1000 * 60 * 60;

    return Math.round(Math.abs(endDate - startDate) / msInHour);
  }

  dbConnect();

  const dbUser = await User.findOne({ email: user.email });
  const today = new Date(Date.now());

  let work_hours_this_week = 0;
  let work_hours_this_month = 0;

  const weeks = 8;
  let start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let total_hours = 0;
  let working_weeks = 0;
  for (let i = 1; i <= weeks; i++) {
    start = new Date(start.getFullYear(), start.getMonth(), start.getDate() - 7 * i);
    const units = await WorkUnit.find({ worker: dbUser._id, start_time: { $gte: start } });
    if (units.length === 0) {
      continue;
    }
    for (const unit of units) {
      const end = unit.end_time ? new Date(unit.end_time) : today;
      total_hours += getHoursDiff(end, new Date(unit.start_time));
    }

    if (i == 1) {
      work_hours_this_week = total_hours;
    } else if (i === 4) {
      work_hours_this_month = total_hours;
    }

    working_weeks++;
  }
  const average_hours_per_week = total_hours / working_weeks;

  const projected_salary = average_hours_per_week * 4 * user.work_data.current_price_per_hour;

  return { work_hours_this_week, work_hours_this_month, average_hours_per_week, projected_salary };
}

export function isIronUserWorking(user) {
  if (
    !user.work_data ||
    !user.work_data.current_price_per_hour ||
    !user.work_data.work ||
    user.work_data.work.length == 0
  ) {
    return false;
  }

  const last_wu = user.work_data.work[user.work_data.work.length - 1];

  if (!last_wu.start_time) {
    return false;
  }

  if (!last_wu.end_time) {
    return true;
  }

  return false;
}

export function isIronUserAssigned(user) {
  return (
    !!user.work_data.currency && !!user.work_data.current_price_per_hour && !!user.work_data.current_price_per_hour
  );
}

export async function isDbUserWorking(user) {
  return isIronUserWorking(await dbUserToIronUser(user));
}

export function getUserFromIron(req) {
  if (!req.session.user) {
    return null;
  }

  return req.session.user;
}
