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
        <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
            <h1 className="text-xl font-bold mb-6">Ajouter une marque</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input name="name" placeholder="Nom" className="w-full p-2 border rounded" value={form.name} onChange={handleChange} required />
                <input name="imageUrl" placeholder="URL de l’image" className="w-full p-2 border rounded" value={form.imageUrl} onChange={handleChange} required />
                <button type="submit" className="bg-black text-white rounded px-4 py-2 hover:bg-yellow-400 hover:text-black transition">Créer la marque</button>
                {message && <div className="text-center text-sm mt-2">{message}</div>}
            </form>
        </main>
    );
}
