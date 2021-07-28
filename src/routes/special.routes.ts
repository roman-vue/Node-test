import { Router } from "express";
import passport from "passport";

const router = Router();

import { special, remove } from "../controllers/special.controller";

router.get(
  "/special",
  passport.authenticate("jwt", { session: false }),
  special
);

router.delete(
  "/special/authorization",
  passport.authenticate("jwt", { session: false }),
  remove
  
);



router.delete

export default router;
