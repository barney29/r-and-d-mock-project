import express, { Request, Response } from "express";
import globalErrorHandler from "./features/global.error.handler";
import { authRouter } from "./router/auth.router.";
import { usersRouter } from "./router/users.router";
import { postRouter } from "./router/post.router";

import cors from "cors";
import swaggerDocs from "./utils/swagger";

const app = express();
app.use(express.json());
app.use(cors<Request>());
const v1 = "/api/v1";
app.use(express.json());

app.use(`${v1}/auth`, authRouter);
app.use(`${v1}/users`, usersRouter);
app.use(`${v1}/posts`, postRouter);
swaggerDocs(app, 8080);
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    msg: "Page not found",
  });
});
app.use(globalErrorHandler);
export default app;
