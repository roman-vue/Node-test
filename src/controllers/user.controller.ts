import { request, Request, response, Response } from "express";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config/config";

function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: 86400
  });
}

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please. Send your email and password" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ msg: "The User already Exists" });
  }

  const newUser = new User(req.body);
  await newUser.save();
  return res.status(201).json(newUser);
};

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please. Send your email and password" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: "The User does not exists" });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    return res.status(400).json({ token: createToken(user) });
  }

  return res.status(400).json({
    msg: "The email or password are incorrect"
  });
};

export async function update(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const { email, password } = req.body;
  const updated = await User.findByIdAndUpdate(id, {
      email,
      password
  });
  return res.json({
      message: 'Successfully updated',
      updated
  });
};

export async function deleteUser(req: Request, res: Response): Promise<Response>{
  const {id}= req.params;
  const remove = await User.findByIdAndRemove(id) as IUser;
  return res.json({ message: 'User Deleted' , deleteUser });
}  

export async function userID(req: Request, res: Response): Promise<Response>{
  const{id}= req.params;
  const user_id = await User.findById(id)
  return res.json({message: `${user_id}`})
}
