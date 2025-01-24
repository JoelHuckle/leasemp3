import React from "react";
import { deleteCookie, getCookie } from "cookies-next";
import connect from "@/lib/database";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import User from "@/lib/models/user";

export default async function Dashboard({ req, res }) {
  try {
    await connect();
    const token = getCookie("token", { req, res });
    if (!token) redirect("/");

    const verified = await jwt.verify(token, process.env.JWT_SECRET);
    const obj = await User.findOne({ _id: verified.id });
    if (!obj) redirect("/");
    return {
      props: {
        email: obj.email,
        name: obj.name,
      },
    };

    console.log(verified);
  } catch (error) {
    //remove cookies if there is an error
    deleteCookie("token", { req, res });
    redirect("/");
  }

  const logout = () => {
    removeCookies("token");
    redirect("/");
  };

  return (
    <div>
      <main>
        <h1>Welcome {}</h1>
        <div>{}</div>
        <button onClick={logout}>Logout</button>
      </main>
    </div>
  );
}

// export async function getServerSideProps({ req, res }) {
//   try {
//     await connect();
//     //user sent back to login screen if there is no token
//     if (!token) return { redirect: { destination: "/" } };
//   } catch (error) {
//     removeCookies("token", { req, res });
//   }
// }
