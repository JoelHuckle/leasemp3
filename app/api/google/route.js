// //initialise google authentication
// import connect from "@/lib/database";
// import passport from "passport";
// // import "../lib/passport";

// export default async function handler(req, res, next) {
//   await connect();
//   passport.authenticate("google", {
//     //specify the scopes you want to access
//     scope: ["profile", "email"],
//     session: false,
//   })(req, res, next);
// }

import connect from "@/lib/database";
import passport from "passport";
import "@/lib/passport"; // Ensure this file configures your Google Strategy

export async function GET(req, res) {
  return new Promise((resolve, reject) => {
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })(req, res, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}
