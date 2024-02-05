import ResumeWork from "./components/ResumeWork";

export default function Resume() {
  return (
    <main className="px-10">
      <ResumeWork
        employer="Freelance"
        jobTitle="Front End Developer"
        location="Toronto, ON"
        description="Built custom WebApps for clients, as well as self-driven projects."
        client="Seminar on the Seas: Straight forward responsive webapp for a client."
        dates="10/2022 - Present"
        bullets={[
          "• Project management, UI/UX design, client management.",
          "• Mobile-first design.",
          "• Future implementations will include auth, and database for user sections.",
          "• Technologies used: React, TypeScript, Tailwind, Vercel, HTML, CSS, VS Code",
        ]}
      />
    </main>
  );
}
