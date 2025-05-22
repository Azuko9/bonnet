// src/components/Footer.tsx

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-200 py-4 mt-12">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div>
                    &copy; {new Date().getFullYear()} BONNET BIARRITZ. Tous droits réservés.
                </div>
                <div className="text-xs mt-2 md:mt-0">
                    <a href="/mentions-legales" className="hover:text-yellow-400 underline">
                        Mentions légales
                    </a>
                </div>
            </div>
        </footer>
    );
}
