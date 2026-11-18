import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[60vh] max-w-xl place-items-center px-6 text-center">
      <div>
        <p className="font-hand text-3xl text-accent-hi">this page was torn out</p>
        <h1 className="mt-2 font-serif text-5xl text-chalk">Page not found</h1>
        <Link href="/" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-accent-strong px-6 font-semibold text-paper-hi">
          Back to the notebook
        </Link>
      </div>
    </div>
  );
}
