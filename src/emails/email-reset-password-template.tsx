import {
    Html,
    Head,
    Button,
    Section,
    Body,
    Tailwind,
    Container,
    Text,
    Heading,
} from "react-email";

export default function EmailResetPasswordTemplate({ url }: { url: string }) {
    return (
        <Html>
            <Head />
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                primary: "#a50036",
                            },
                        },
                    },
                }}
            >
                <Body>
                    <Container>
                        <Section>
                            <Text className="font-semibold text-xl text-primary">
                                Gacha Hub
                            </Text>
                        </Section>

                        <Section>
                            <Heading>Restablece tu contraseña</Heading>

                            <Text>
                                Hemos recibido una solicitud para restablecer la
                                contraseña de tu cuenta.
                            </Text>

                            <Text>
                                Haz clic en el siguiente botón para crear una
                                nueva contraseña y recuperar el acceso a tu
                                cuenta.
                            </Text>

                            <Button
                                href={url}
                                className="bg-primary text-white px-6 py-3 rounded-lg font-medium"
                            >
                                Restablecer contraseña
                            </Button>

                            <Text className="text-slate-500 text-sm mt-6">
                                Si no solicitaste este cambio, puedes ignorar
                                este correo de forma segura. Tu contraseña
                                actual seguirá siendo válida hasta que completes
                                el proceso de restablecimiento.
                            </Text>

                            <Text className="text-slate-500 text-sm">
                                Por seguridad, este enlace expirará después de
                                un tiempo. Si expira, podrás solicitar uno nuevo
                                desde la página de inicio de sesión.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
