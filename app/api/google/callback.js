import connect from "@/lib/database";
import { setCookies } from "cookies-next";

export default async function (req, res, next) {
  await connect();
  passport.authenticate("google", (err, user, info) => {
    //callback if user is not found
    if (err || !user) res.redirect("http://localhost:3000");

    setCookies("token", info.token, { req, res });
    res.redirect("http://localhost:3000/dashboard");
  });
}
