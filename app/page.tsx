"use client";

export default function Home() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Coming Soon</h1>
          <p className="mb-5">
            Budget Me is a new age budgeting tool for the whole family.
            <br />
            Visit us again in 2025 to see our progress and manage your finances.
          </p>
        </div>
      </div>
    </div>
  );
}
