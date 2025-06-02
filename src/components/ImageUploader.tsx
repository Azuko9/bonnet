"use client";
import { useRef, useState } from "react";

export default function ImageUploader({ onUploaded }: { onUploaded: (url: string) => void }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    // Mets ici tes infos Cloudinary
    const cloudName = "danl1ifwj"; // ← à remplacer par le tien
    const uploadPreset = "upload_img";    // ← ou le nom de ton preset

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));
        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        // Envoi vers Cloudinary
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setLoading(false);
        onUploaded(data.secure_url);
    };

    return (
        <div className="mb-4">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="block w-full"
            />
            {loading && <div className="text-yellow-600">Envoi en cours...</div>}
            {preview && <img src={preview} alt="Aperçu" className="mt-2 h-24 rounded shadow" style={{ width: 100, height: 100 }} />}
        </div>
    );
}
