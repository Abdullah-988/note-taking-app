import { Request } from "express";

interface RequestWithUser extends Request {
  user: {
    _id: String;
    id: String;
    name: String;
    email: String;
    password: String;
  };
}

export { RequestWithUser };
