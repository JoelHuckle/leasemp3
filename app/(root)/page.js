import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="text-center">
        <section>
          <h1 className="text-3xl font-bold mb-5 pt-10">Lease Mp3</h1>
        </section>

        <section>
          <p>google sign in</p>
        </section>

        <section>
          <p>Description</p>
        </section>
      </main>
    </div>
  );
}
