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

export default function EmailExistingAccountTemplate({ url }: { url: string }) {
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
                            <Heading>
                                Ya existe una cuenta con este correo
                            </Heading>

                            <Text>
                                Hemos detectado un intento de registro
                                utilizando esta dirección de correo electrónico,
                                pero ya existe una cuenta asociada a ella.
                            </Text>

                            <Text>
                                Si ya tienes una cuenta en Gacha Hub, puedes
                                iniciar sesión normalmente. Si originalmente te
                                registraste con Google, utiliza la opción{" "}
                                <strong>Continuar con Google</strong>.
                            </Text>

                            <Button
                                href={url}
                                className="bg-primary text-white px-6 py-3 rounded-lg font-medium"
                            >
                                Iniciar sesión
                            </Button>

                            <Text className="text-slate-500 text-sm mt-6">
                                ¿Olvidaste tu contraseña? Puedes restablecerla
                                desde la página de inicio de sesión.
                            </Text>

                            <Text className="text-slate-500 text-sm">
                                Si no intentaste crear una cuenta, puedes
                                ignorar este mensaje de forma segura.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
