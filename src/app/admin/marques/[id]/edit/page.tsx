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

    if (loading) return <div>Chargement…</div>;

    return (
        <main>
            <h1>Modifier la marque</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Nom (fr)" value={form.name} onChange={handleChange} required />
                <input name="imageUrl" placeholder="URL de l’image" value={form.imageUrl} onChange={handleChange} required />
                <button type="submit">Enregistrer les modifications</button>
                {message && <div>{message}</div>}
            </form>
        </main>
    );
}
