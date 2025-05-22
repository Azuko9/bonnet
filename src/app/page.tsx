// src/app/page.tsx

import React from "react";

// On définit le type attendu pour une info
type Info = {
  _id: string;
  title: {
    fr: string;
    en: string;
    es: string;
  };
  imageUrl: string;
  link?: string;
};

// Fonction utilitaire pour récupérer les infos via l’API (fetch côté serveur)
async function getInfos(): Promise<Info[]> {
  // On utilise NEXT_PUBLIC_API_URL pour la compatibilité dev/prod
  const url =
    process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/infos`
      : "http://localhost:3000/api/infos";
  const res = await fetch(url, { cache: "no-store" }); // no-store = pas de cache = données toujours à jour
  return res.ok ? res.json() : [];
}

// Composant principal de la page d’accueil
export default async function HomePage() {
  const infos = await getInfos();

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Bienvenue chez Bonnet</h1>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {infos.length === 0 ? (
          <div>Aucune offre en cours.</div>
        ) : (
          infos.map((info) => (
            <div
              key={info._id}
              className="bg-white rounded-xl shadow p-4 flex flex-col items-center transition hover:scale-105"
            >
              <img
                src={info.imageUrl}
                alt={info.title.fr}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <div className="font-semibold mb-1">{info.title.fr}</div>
              {info.link && (
                <a
                  href={info.link}
                  className="text-blue-600 text-xs mt-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir l’offre
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
}

