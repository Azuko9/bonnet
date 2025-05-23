"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditMarquePage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [form, setForm] = useState({
        name: "",
        imageUrl: "",
    });
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        async function fetchMarque() {
            const adminToken = localStorage.getItem("adminToken");
            const res = await fetch(`/api/marques/${id}`, {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            if (res.ok) {
                const marque = await res.json();
                setForm({
                    name: marque.name?.fr || "",

                    imageUrl: marque.imageUrl || "",
                });
            }
            setLoading(false);
        }
        fetchMarque();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        const adminToken = localStorage.getItem("adminToken");
        const res = await fetch(`/api/marques/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify({
                name: {
                    fr: form.name,
                    en: form.name,
                    es: form.name,
                },
                imageUrl: form.imageUrl,
            }),
        });

        if (res.ok) {
            setMessage("Marque modifiée avec succès !");
            setTimeout(() => router.push("/admin/marques"), 1200);
        } else {
            const data = await res.json();
            setMessage(data.error || "Erreur lors de la modification");
        }
    };

    if (loading) return <div className="text-center mt-20">Chargement…</div>;

    return (
        <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
            <h1 className="text-xl font-bold mb-6">Modifier la marque</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input name="name" placeholder="Nom (fr)" className="w-full p-2 border rounded" value={form.name} onChange={handleChange} required />
                <input name="imageUrl" placeholder="URL de l’image" className="w-full p-2 border rounded" value={form.imageUrl} onChange={handleChange} required />
                <button type="submit" className="bg-black text-white rounded px-4 py-2 hover:bg-yellow-400 hover:text-black transition">Enregistrer les modifications</button>
                {message && <div className="text-center text-sm mt-2">{message}</div>}
            </form>
        </main>
    );
}
