import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MERN Blog App — Local Setup Guide" },
      {
        name: "description",
        content:
          "Setup guide for the MERN blog app: Express + Mongoose + JWT backend and a React + Vite frontend with a follow-prioritized blog feed.",
      },
      { property: "og:title", content: "MERN Blog App — Local Setup Guide" },
      {
        property: "og:description",
        content:
          "Run the Express + MongoDB backend and React + Vite frontend for the follow-based blog feed.",
      },
    ],
  }),
  component: Index,
});

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-border bg-card p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Step {n} — {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm text-foreground">{children}</div>
    </section>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs leading-relaxed text-foreground">
      <code>{children}</code>
    </pre>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4">
        <h1 className="text-lg font-semibold text-foreground">MERN Blog App</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Express + Mongoose + JWT backend and a React + Vite client, in{" "}
          <code className="rounded bg-muted px-1 py-0.5">mern-blog/</code>.
        </p>
      </header>

      <main className="mx-auto max-w-3xl space-y-4 px-6 py-8">
        <p className="text-sm text-muted-foreground">
          This app runs on Node.js and MongoDB, so it starts on your machine rather than in this
          preview. Full details live in <code className="rounded bg-muted px-1 py-0.5">mern-blog/README.md</code>.
        </p>

        <Step n={1} title="Start MongoDB">
          <p>Install and run MongoDB Community locally:</p>
          <Code>{`# macOS
brew tap mongodb/brew && brew install mongodb-community
brew services start mongodb-community

# Ubuntu
sudo systemctl start mongod`}</Code>
          <p>
            The database <code className="rounded bg-muted px-1 py-0.5">blog_app</code> and its
            collections are created automatically on the first insert. To use Atlas instead, swap in
            your Atlas connection string as <code className="rounded bg-muted px-1 py-0.5">MONGO_URI</code>.
          </p>
        </Step>

        <Step n={2} title="Configure and run the backend">
          <p>
            Create <code className="rounded bg-muted px-1 py-0.5">mern-blog/server/.env</code>:
          </p>
          <Code>{`MONGO_URI=mongodb://127.0.0.1:27017/blog_app
JWT_SECRET=your_secret_key
PORT=5000`}</Code>
          <Code>{`cd mern-blog/server
npm install
npm run dev   # http://localhost:5000`}</Code>
        </Step>

        <Step n={3} title="Run the frontend">
          <Code>{`cd mern-blog/client
npm install
npm run dev   # http://localhost:5173`}</Code>
          <p>
            Vite proxies <code className="rounded bg-muted px-1 py-0.5">/api</code> to port 5000, so
            signup, login, publishing and follow/unfollow work immediately.
          </p>
        </Step>

        <section className="rounded-lg border border-border bg-card p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Feed algorithm
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground">
            <li>
              Following someone: aggregation tags followed authors with priority 0 and sorts by
              priority then newest first.
            </li>
            <li>Following nobody: up to 10 random blogs via a MongoDB $sample stage.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
