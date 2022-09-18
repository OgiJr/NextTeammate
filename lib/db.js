const { default: mongoose } = require("mongoose");

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

export function dbUserToIronUser(user) {
  return {
    _id: user._doc._id.toString(),
    first_name: user._doc.first_name,
    last_name: user._doc.last_name,
    email: user._doc.email,
    is_admin: user._doc.is_admin,
    has_password: user._doc.has_password !== "",
    has_picture: user._doc.has_picture !== "",
    picture: user._doc.picture,
    bio: user._doc.bio,
    birthdate: user._doc.birthdate,
  };
}

export function getUserFromIron(req) {
  if (!req.session.user) {
    return null;
  }

  return req.session.user;
}
