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
        <main className="max-w-3xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Gestion des marques</h1>
            <button
                onClick={() => router.push("/admin/marques/create")}
                className="mb-6 bg-black text-white px-4 py-2 rounded hover:bg-yellow-400 hover:text-black transition"
            >
                ➕ Ajouter une marque
            </button>
            {loading ? (
                <div>Chargement…</div>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Image</th>
                            <th className="p-2">Nom</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marques.map((marque) => (
                            <tr key={marque._id} className="border-b">
                                <td className="p-2">
                                    <img src={marque.imageUrl} className="w-16 h-10 object-contain rounded" />
                                </td>
                                <td className="p-2">{marque.name.fr}</td>
                                <td className="p-2 flex gap-2">
                                    <button
                                        onClick={() => router.push(`/admin/marques/${marque._id}/edit`)}
                                        className="bg-yellow-400 text-black px-2 py-1 rounded"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDelete(marque._id)}
                                        className="bg-red-600 text-white px-2 py-1 rounded"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {message && <div className="mt-4 text-center text-sm">{message}</div>}
        </main>
    );
}
