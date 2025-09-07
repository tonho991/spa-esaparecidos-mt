import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>We could not find the page you were looking for.</p>
      <Link href="/">Go back to Home</Link>
    </div>
  );
}
