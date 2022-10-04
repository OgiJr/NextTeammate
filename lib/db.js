const { default: mongoose } = require("mongoose");
import WorkData from "../models/WorkData";
import WorkUnit from "../models/WorkUnit";

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
    has_password: user._doc.password_hash !== "",
    has_picture: user._doc.picture !== "",
    picture: user._doc.picture,
    bio: user._doc.bio,
    birthdate: user._doc.birthdate.toJSON(),
    work_data: user._doc.is_admin ? {} : await dbWorkToIronWork(user._doc.work_data),
  };
}

export async function dbWorkToIronWork(work) {
  dbConnect();
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
  const id = work_unit;

  work_unit = await WorkUnit.findOne({ _id: work_unit });

  if (!work_unit) {
    return {};
  }

  return {
    _id: id.toString(),
    start_time: work_unit._doc.start_time.toString(),
    end_time: work_unit._doc.end_time ? work_unit._doc.end_time.toString() : null,
    worker: work_unit._doc.worker._id.toString(),
    price_per_hours: work_unit._doc.price_per_hours,
    currency: work_unit._doc.currency,
  };
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

export async function isDbUserWorking(user) {
  return isIronUserWorking(await dbUserToIronUser(user));
}

export function getUserFromIron(req) {
  if (!req.session.user) {
    return null;
  }

  return req.session.user;
}
