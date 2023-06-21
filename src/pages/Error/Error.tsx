import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">404</h1>
      <p className="text-lg text-center mb-8">
        La page que vous cherchez n'existe pas.
      </p>
      <Link
        to="/"
        className="mt-8 px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default Error;
