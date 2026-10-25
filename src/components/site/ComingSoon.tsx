import { Link } from "@tanstack/react-router";

export function ComingSoon() {
  return (
    <div className="container-app py-20 text-center">
      <h1 className="text-3xl font-extrabold">This page isn't finished yet</h1>
      <p className="mt-2 text-muted-foreground">It's part of the FindBack prototype still being built.</p>
      <Link to="/" className="mt-6 inline-block text-primary underline">Back to home</Link>
    </div>
  );
}
