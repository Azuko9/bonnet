"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateMarquePage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        imageUrl: "",
    });
    const [message, setMessage] = useState<string | null>(null);

    const adminToken = typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        const res = await fetch("/api/marques", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify({
                name: {
                    fr: form.name,
                },
                imageUrl: form.imageUrl,
            }),
        });

        if (res.ok) {
            setMessage("Marque créée avec succès !");
            setForm({ name: "", imageUrl: "" });
            setTimeout(() => router.push("/admin/marques"), 1200);
        } else {
            const data = await res.json();
            setMessage(data.error || "Erreur lors de la création");
        }
    };

    return (
        <main>
            <h1>Ajouter une marque</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Nom" value={form.name} onChange={handleChange} required />
                <input name="imageUrl" placeholder="URL de l’image" value={form.imageUrl} onChange={handleChange} required />
                <button type="submit">Créer la marque</button>
                {message && <div>{message}</div>}
            </form>
        </main>
    );
}
