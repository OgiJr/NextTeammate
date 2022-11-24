import * as passwordValidator from "password-validator";
import { dbConnect } from "./db";
import User from "../../models/User";

export class ValidationError extends Error {
  constructor(message = "", ...args) {
    super(message, ...args);
    this.message = "ValidationError: " + message;
  }
}

function die(res, code, err) {
  res.status(code).json({ message: err });
  throw new ValidationError(err);
}

export function isPresent(x, res) {
  if (x == undefined || x == null) {
    die(res, 400, "Missing fields!");
  }
}

export function reqBodyParse(req, res, fields) {
  let ret = {};

  if (!req.body) {
    for (const f of fields) {
      isPresent(req.query[f], res);
      ret[f] = req.query[f];
    }
  } else {
    for (const f of fields) {
      isPresent(req.body[f], res);
      ret[f] = req.body[f];
    }
  }

  return ret;
}

export async function isLoggedIn(req, res) {
  if (!req.session.user) {
    die(res, 401, "No authenticated user present on this session!");
  }
  dbConnect();
  const user = await User.findOne({ email: req.session.user.email });
  if (user === null) {
    die(res, 401, "This endpoint can only be if you're logged in");
  }
}

export function isAdmin(req, res) {
  if (!req.session.user.is_admin) {
    die(res, 401, "This endpoint can only be called by an administrator!");
  }
}

export function validatePassword(password, res) {
  const schema = new passwordValidator();
  schema.is().min(8).is().max(100).has().uppercase().has().lowercase().has().digits();

  if (!schema.validate(password)) {
    die(
      res,
      400,
      "The password must be at least 8 characters, contain a lowercase letter, an uppercase letter, and at least one digit!"
    );
  }
}

export function validateEmail(email, res) {
  if (
    !String(email)
      .toLowerCase()
      .match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
  ) {
    die(res, 400, "Invalid email!");
  }
}

export function isDev(res) {
  if (process.env.NEXT_PUBLIC_IS_DEV !== "TRUE") {
    die(res, 401, "This endpoint is only avaialable in developer mode!");
  }
}

export function isSupportedMethod(req, res, methods) {
  if (!methods.includes(req.method)) {
    die(res, 405, "Unsupported request type!");
  }
}

export function isDate(date, res) {
  if (!(new Date(date) !== "Invalid Date") && !isNaN(new Date(date))) {
    die(res, 401, "Invalid date!");
  }
}
