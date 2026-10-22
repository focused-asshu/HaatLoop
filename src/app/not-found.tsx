import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center px-6 py-12">
      <div className="mx-auto w-full max-w-xl border-t-4 border-primary pt-8">
        <p className="font-semibold text-primary">HaatLoop · 404</p>
        <h1 className="mt-6 text-4xl font-bold">Page not found</h1>
        <p className="mt-4 leading-relaxed">
          This address doesn’t have a page. HaatLoop is in early development.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block min-h-11 py-3 font-semibold text-primary underline underline-offset-4"
        >
          Return to HaatLoop
        </Link>
      </div>
    </main>
  );
}
