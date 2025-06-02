"use client";
import ImageUploader from "@/components/ImageUploader";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProfilePage() {
    const router = useRouter();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        profession_fr: "",
        photoUrl: "",
        phone: "",
        email: "",
    });
    const [message, setMessage] = useState<string | null>(null);

    const adminToken = typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        const res = await fetch("/api/profiles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify({
                firstName: form.firstName,
                lastName: form.lastName,
                profession: {
                    fr: form.profession_fr,

                },
                photoUrl: form.photoUrl,
                phone: form.phone,
                email: form.email,
            }),
        });

        if (res.ok) {
            setMessage("Profil créé avec succès !");
            setForm({
                firstName: "",
                lastName: "",
                profession_fr: "",
                photoUrl: "",
                phone: "",
                email: "",
            });
            setTimeout(() => router.push("/contact"), 1500); // Redirige vers la page Contact ou admin
        } else {
            const data = await res.json();
            setMessage(data.error || "Erreur lors de la création");
        }
    };

    return (
        <main>
            <h1>Créer un profil</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="firstName"
                    placeholder="Prénom"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    name="lastName"
                    placeholder="Nom"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    name="profession_fr"
                    placeholder="Profession (fr)"
                    value={form.profession_fr}
                    onChange={handleChange}
                    required
                />

                {/* ImageUploader Cloudinary Composant Cloudinary pour uploader une image */}
                <label>Photo du profil</label>
                <ImageUploader onUploaded={url => setForm(f => ({ ...f, photoUrl: url }))} />
                {form.photoUrl}


                <input
                    name="phone"
                    placeholder="Téléphone (optionnel)"
                    value={form.phone}
                    onChange={handleChange}
                />
                <input
                    name="email"
                    placeholder="Email (optionnel)"
                    value={form.email}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                >
                    Créer le profil
                </button>
                {message && <div>{message}</div>}
            </form>
        </main>
    );
}
