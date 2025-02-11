import express from "express";
import adminRouter from "./routes/admin";
import profileRouter from "./routes/profile";
import prophecyRouter from "./routes/prophecy";
import publicRouter from "./routes/public";

const HTTP_PORT: number = 8181;
const app: express.Express = express();

app.use("/admin", adminRouter);
app.use("/public", publicRouter);
app.use("/prophecy", prophecyRouter);
app.use("/profile", profileRouter);

app.listen(HTTP_PORT, () => {
  console.log(`server listening on ${HTTP_PORT}`);
});
