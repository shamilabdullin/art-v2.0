"use client";

// Ловит ошибки самого корневого layout ([locale]/layout.tsx). Обязан сам
// определять <html>/<body>, так как подменяет собой весь root layout.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", textAlign: "center", padding: "80px 20px" }}>
        <p>Something went wrong.</p>
        <button type="button" onClick={reset}>
          Try again
        </button>
      </body>
    </html>
  );
}
