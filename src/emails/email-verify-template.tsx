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
    Img,
} from "react-email";

export default function EmailVerifyTemplate({ url }: { url: string }) {
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
                        <Section className="">
                            {/* <Img
                                src="https://a5tvuzveyi.ufs.sh/f/T0Wi2JdjEWa715Vwg8oCAbV5jfvU0MwY7gEXGISrDd2seyh9"
                                alt="Gacha Hub"
                                width="64"
                                height="64"
                            /> */}
                            <Text className="font-semibold text-xl text-primary">
                                Gacha Hub
                            </Text>
                        </Section>
                        <Section>
                            <Heading>¡Ya casi está listo tu registro!</Heading>

                            <Text>
                                Tu cuenta ha sido creada correctamente. Solo
                                falta verificar tu dirección de correo
                                electrónico.
                            </Text>

                            <Button
                                href={url}
                                className="bg-primary text-white px-6 py-3 rounded-lg font-medium"
                            >
                                Verificar mi cuenta
                            </Button>

                            <Text className="text-slate-500 text-sm mt-6">
                                Por seguridad, este enlace puede expirar después
                                de un tiempo. Si necesitas uno nuevo, puedes
                                solicitarlo desde la página de inicio de sesión.
                                ¡Bienvenido!
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
