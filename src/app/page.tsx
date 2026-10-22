export default function Home() {
  return (
    <main className="flex min-h-svh items-center px-6 py-12 sm:px-12">
      <section
        aria-labelledby="brand"
        className="mx-auto w-full max-w-5xl border-t-4 border-primary pt-8 sm:pt-12"
      >
        <p className="text-sm font-semibold tracking-widest text-primary uppercase">
          Odisha, India
        </p>
        <h1
          id="brand"
          className="mt-8 text-5xl font-bold tracking-tight text-primary sm:text-8xl"
        >
          HaatLoop
        </h1>
        <p className="mt-6 max-w-2xl text-3xl leading-tight font-medium sm:text-5xl">
          Fresh finds. Fairer prices. Less waste.
        </p>
        <p className="mt-8 max-w-xl text-base leading-relaxed sm:text-lg">
          An idea to help small vegetable vendors offer unsold edible produce to
          nearby buyers for local pickup. We’re starting with Odisha, with
          payment intended to happen directly between buyer and vendor.
        </p>
        <div className="mt-10 max-w-xl border border-border bg-surface p-5 sm:p-6">
          <p className="inline-block bg-secondary px-2 py-1 text-sm font-semibold">
            Early development
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            We’re laying the groundwork. The idea is unvalidated, and listings
            and reservations are not available yet.
          </p>
        </div>
      </section>
    </main>
  );
}
