// src/app/page.tsx

import React from "react";

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



async function getInfos(): Promise<Info[]> {
  const url =
    process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/infos`
      : "http://localhost:3000/api/infos";
  const res = await fetch(url, { cache: "no-store" });
  return res.ok ? res.json() : [];
}

type Marque = {
  _id: string;
  name: { fr: string };
  imageUrl: string;
};
async function getMarques(): Promise<Marque[]> {
  const url =
    process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/marques`
      : "http://localhost:3000/api/marques";
  const res = await fetch(url, { cache: "no-store" });
  return res.ok ? res.json() : [];
}
export default async function HomePage() {
  const infos = await getInfos();
  const marques = await getMarques();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Bienvenue chez Bonnet Biarritz
      </h1>
      {infos.length === 0 ? (
        <div className="text-center text-gray-500">Aucune actualité pour le moment.</div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {infos.map((info) => (
            <div
              key={info._id}
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition group"
            >
              <img
                src={info.imageUrl}
                alt={info.title.fr}
                className="w-full h-36 object-cover rounded-xl mb-2 group-hover:scale-105 transition"
              />
              <div className="font-semibold mb-1 text-center">{info.title.fr}</div>
              {info.link && (
                <a
                  href={info.link}
                  className="text-yellow-700 underline mt-2 text-xs hover:text-yellow-900"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir l’info
                </a>
              )}
            </div>
          ))}
        </div>
      )}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Nos Marques</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {marques.length === 0 ? (
            <div>Aucune marque disponible.</div>
          ) : (
            marques.map((marque) => (
              <div key={marque._id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                <img
                  src={marque.imageUrl}
                  alt={marque.name.fr}
                  className="w-28 h-16 object-contain mb-2"
                />
                <div className="font-semibold text-center">{marque.name.fr}</div>
              </div>
            ))
          )}
        </div>
      </section>


    </main>
  );
}
