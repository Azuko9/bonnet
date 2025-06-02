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
        <main>
            <h1>Tableau de bord administrateur</h1>
            <div>
                <button
                    onClick={() => router.push("/admin/profiles")}

                >
                    👤 Gestion des contacts (profils)
                </button>
                <button
                    onClick={() => router.push("/admin/infos")}

                >
                    📰 Gestion des infos
                </button>
                <button
                    onClick={() => router.push("/admin/marques")}

                >
                    🏷️ Gestion des marques
                </button>
            </div>
        </main>
    );
}

