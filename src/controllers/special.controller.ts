import {Request, Response} from 'express'

export const special = (req: Request, res: Response) => {
  return res.json({ msg: `Hey ${req.body.email}!` });
};

export const remove = (req: Request, res: Response) => {
  return res.json({ msg: `remove ${req.body.email}!` });
}; 


