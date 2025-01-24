import Image from "next/image";
import { getCookie } from "cookies-next";
import connect from "@/lib/database";

export default async function Home({ req, res }) {
  try {
    const cookieExists = getCookie("token", { req, res });
    if (cookieExists) return { redirect: { destination: "/dashboard" } };
  } catch (err) {
    return { props: {} };
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="text-center">
        <section>
          <h1 className="text-3xl font-bold mb-5 pt-10">Lease Mp3</h1>
        </section>

        <section>
          <a href="/api/google" className="text-blue-500">
            Login with google
          </a>
        </section>

        <section>
          <p>Description</p>
        </section>
      </main>
    </div>
  );
}

// export async function getServerSideProps({ req, res }) {
//   try {
//     const cookieExists = getCookie("token", { req, res });
//     if (cookeiExists) return { redirect: { destination: "/dashboard" } };
//   } catch (err) {
//     return { props: {} };
//   }
// }
