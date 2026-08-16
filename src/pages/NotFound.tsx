// Página simples caso a URL seja uma rota inválida

import { Header } from "../components/Header";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <main className="bg-gray-800 min-h-screen">
      <Header />
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="rounded-2xl bg-gray-900 p-6 text-center hover:scale-[103%] hover:shadow-md shadow-red-400 duration-300 transition">
          <p className="text-red-400 text-2xl">404: Page not found</p>

          <Link
            to="/"
            className="mt-16 inline-block rounded-xl bg-red-400 px-4 py-2 text-white hover:scale-[103%] active:scale-100 transition duration-300"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
