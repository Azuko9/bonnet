"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Marque = {
    _id: string;
    name: { fr: string };
    imageUrl: string;
};

export default function AdminMarquesPage() {
    const [marques, setMarques] = useState<Marque[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchMarques() {
            const adminToken = localStorage.getItem("adminToken");
            const res = await fetch("/api/marques", {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            if (res.ok) setMarques(await res.json());
            setLoading(false);
        }
        fetchMarques();
    }, []);

    async function handleDelete(id: string) {
        if (!confirm("Supprimer cette marque ?")) return;
        setMessage(null);
        const adminToken = localStorage.getItem("adminToken");
        const res = await fetch(`/api/marques/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${adminToken}` },
        });
        if (res.ok) {
            setMarques(marques.filter((m) => m._id !== id));
            setMessage("Marque supprimée.");
        } else {
            setMessage("Erreur lors de la suppression");
        }
    }

    return (
        <main >
            <h1>Gestion des marques</h1>
            <button
                onClick={() => router.push("/admin/marques/create")}
            >
                ➕ Ajouter une marque
            </button>
            {loading ? (
                <div>Chargement…</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Nom</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marques.map((marque) => (
                            <tr key={marque._id}>
                                <td>
                                    <img src={marque.imageUrl} />
                                </td>
                                <td>{marque.name.fr}</td>
                                <td className="p-2 flex gap-2">
                                    <button
                                        onClick={() => router.push(`/admin/marques/${marque._id}/edit`)}
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDelete(marque._id)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {message && <div>{message}</div>}
        </main>
    );
}
