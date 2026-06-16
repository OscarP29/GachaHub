"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function GoogleButton() {
    const [loading, setLoading] = useState(false);

    const submitGoogleHandler = async () => {
        try {
            setLoading(true);

            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="outline"
            type="button"
            disabled={loading}
            onClick={submitGoogleHandler}
        >
            {loading ? (
                <Spinner />
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    {/* Google icon */}
                    <path
                        fill="currentColor"
                        d="M21.805 10.023H12v3.955h5.617c-.242 1.27-.967 2.346-2.06 3.068v2.55h3.328c1.947-1.793 3.07-4.432 3.07-7.596 0-.66-.06-1.293-.15-1.977z"
                    />
                    <path
                        fill="currentColor"
                        d="M12 22c2.79 0 5.13-.924 6.84-2.504l-3.328-2.55c-.924.62-2.105.986-3.512.986-2.698 0-4.985-1.822-5.802-4.27H2.76v2.684A9.998 9.998 0 0 0 12 22z"
                    />
                    <path
                        fill="currentColor"
                        d="M6.198 13.662A5.996 5.996 0 0 1 5.88 12c0-.577.104-1.136.318-1.662V7.654H2.76A9.998 9.998 0 0 0 2 12c0 1.61.385 3.133 1.06 4.346z"
                    />
                    <path
                        fill="currentColor"
                        d="M12 6.068c1.518 0 2.88.522 3.953 1.546l2.963-2.963C17.126 2.987 14.786 2 12 2A9.998 9.998 0 0 0 2.76 7.654l3.438 2.684C7.015 7.89 9.302 6.068 12 6.068z"
                    />
                </svg>
            )}

            <span className="ml-2">
                {loading && "Iniciar sesión con Google"}
            </span>
        </Button>
    );
}
