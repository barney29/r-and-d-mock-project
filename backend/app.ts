import express, { Request, Response } from "express";
import globalErrorHandler from "./features/global.error.handler";
import { router as authRouter } from "./router/user.router";
const app = express();

app.use(express.json());
app.use("/signup", authRouter);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    msg: "Page not found",
  });
});
app.use(globalErrorHandler);
export default app;
