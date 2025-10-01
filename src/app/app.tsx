"use client";

import WaitlistForm from "~/components/WaitlistForm";

export default function App() {
  return (
    <div className="min-h-screen px-2 py-4 sm:px-4 sm:py-8">
      <div className="mx-auto max-w-md space-y-8">
        {/* TEMPLATE_CONTENT_START - Replace content below */}

        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img
              src="/logo_small.png"
              alt="Vibe School Logo"
              className="h-16 w-auto sm:h-20"
            />
            <h1 className="text-3xl sm:text-4xl font-bold">Join Vibe School</h1>
          </div>
        </div>

        {/* What is Vibe School Section */}
        <div className="bg-muted/30 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">What is Vibe School?</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Each week in October 2025{" "}
            <a href="https://farcaster.xyz/hellno.eth">hellno.eth</a> will vibe
            code mini apps. Apply now to build your mini app with him and Vibes
            AI. You will own the mini app, get all rewards, and can keep
            building it afterwards. No strings attached.
          </p>
        </div>

        <WaitlistForm />
        {/* TEMPLATE_CONTENT_END */}
      </div>
    </div>
  );
}
