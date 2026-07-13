import Link from "next/link";

// Корневой fallback вне [locale] — сюда middleware почти никогда не пускает
// запросы (он сам делает редирект на локаль), но Next.js требует этот файл
// на случай путей, не подошедших под ни один сегмент маршрутизации.
export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", textAlign: "center", padding: "80px 20px" }}>
        <p style={{ fontSize: 48, fontWeight: 700 }}>404</p>
        <p>Page not found.</p>
        <Link href="/">Go home</Link>
      </body>
    </html>
  );
}
