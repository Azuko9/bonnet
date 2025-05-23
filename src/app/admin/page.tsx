"use client";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const router = useRouter();

    // Redirection de sécurité simple (si adminToken manquant)
    if (typeof window !== "undefined" && !localStorage.getItem("adminToken")) {
        router.push("/admin/login");
        return null;
    }

    return (
        <main className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow text-center">
            <h1 className="text-2xl font-bold mb-10">Tableau de bord administrateur</h1>
            <div className="flex flex-col gap-6">
                <button
                    onClick={() => router.push("/admin/profiles")}
                    className="bg-black text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-400 hover:text-black transition"
                >
                    👤 Gestion des contacts (profils)
                </button>
                <button
                    onClick={() => router.push("/admin/infos")}
                    className="bg-black text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-400 hover:text-black transition"
                >
                    📰 Gestion des infos
                </button>
                <button
                    onClick={() => router.push("/admin/marques")}
                    className="bg-black text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-400 hover:text-black transition"
                >
                    🏷️ Gestion des marques
                </button>
            </div>
        </main>
    );
}

