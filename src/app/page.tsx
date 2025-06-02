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
    <main >
      <h1 >
        Bienvenue chez Bonnet Biarritz
      </h1>
      {infos.length === 0 ? (
        <div >Aucune actualité pour le moment.</div>
      ) : (
        <div >
          {infos.map((info) => (
            <div
              key={info._id}
            >
              <img
                src={info.imageUrl}
                alt={info.title.fr}

              />
              <div>{info.title.fr}</div>
              {info.link && (
                <a
                  href={info.link}
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
      <section>
        <h2>Nos Marques</h2>
        <div>
          {marques.length === 0 ? (
            <>
              <div>Aucune marque disponible.</div>

            </>
          ) : (
            marques.map((marque) => (
              <div key={marque._id}>
                <img
                  src={marque.imageUrl}
                  alt={marque.name.fr}
                />
                <div>{marque.name.fr}</div>


              </div>
            ))
          )}
        </div>
      </section>


    </main>
  );
}
