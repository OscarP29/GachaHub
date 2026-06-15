import patternBackground from "@/assets/pattern-background.svg";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex h-screen w-full">
            <div className="flex-1 flex items-center justify-center">
                <div className="fixed top-4 left-4 flex items-center gap-2">
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <polygon
                            points="100,10 114,86 190,100 114,114 100,190 86,114 10,100 86,86"
                            fill="#a50036"
                        />
                    </svg>
                    <p className="font-medium">Gacha Hub</p>
                </div>
                <div className="w-full max-w-md">{children}</div>
            </div>

            <div className="flex-1 p-8">
                <img
                    src={patternBackground.src}
                    alt="Imagen login"
                    className="h-full w-full object-cover rounded-2xl"
                />
            </div>
        </section>
    );
}
