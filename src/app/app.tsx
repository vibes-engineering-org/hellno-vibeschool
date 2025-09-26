"use client";

import WaitlistForm from "~/components/WaitlistForm";

export default function App() {
  return (
    <div className="w-[400px] mx-auto py-8 px-4 min-h-screen flex flex-col items-center justify-center">
      {/* TEMPLATE_CONTENT_START - Replace content below */}
      <div className="mb-8 text-center">
        <img
          src="/logo_small.png"
          alt="Logo"
          className="mx-auto mb-4 h-12 w-auto"
        />
      </div>
      <WaitlistForm />
      {/* TEMPLATE_CONTENT_END */}
    </div>
  );
}
