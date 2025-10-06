import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function SecretMission() {
    const [countdown, setCountdown] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const [matrixColumns, setMatrixColumns] = useState<number[]>([]);

    useEffect(() => {
        // Generate random columns for Matrix effect
        const columns = Array.from({ length: 50 }, (_, i) => i);
        setMatrixColumns(columns);

        // Countdown timer
        if (countdown > 0 && isLoading) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }, [countdown, isLoading]);

    return (
        <>
            <Head title="Missão Secreta" />
            <div className="relative min-h-screen w-full overflow-hidden bg-black">
                {/* Matrix Rain Effect */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    {matrixColumns.map((col) => (
                        <MatrixColumn key={col} index={col} />
                    ))}
                </div>

                {/* Scanlines Effect */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scan" />

                {/* Main Content */}
                <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
                    {isLoading ? (
                        <div className="text-center">
                            {/* Loading Screen */}
                            <div className="mb-8 space-y-4">
                                <div className="relative">
                                    <div className="absolute -inset-4 animate-pulse rounded-full bg-green-500/20 blur-xl" />
                                    <h1 className="relative text-6xl font-bold tracking-wider text-green-400 drop-shadow-[0_0_25px_rgba(34,197,94,0.5)] md:text-8xl">
                                        {countdown}
                                    </h1>
                                </div>
                                <div className="space-y-2">
                                    <p className="animate-pulse font-mono text-2xl font-semibold tracking-widest text-green-300 md:text-4xl">
                                        A CARREGAR A TUA MISSÃO
                                    </p>
                                    <div className="mx-auto flex max-w-md justify-center gap-1">
                                        {[...Array(10)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="h-2 w-full rounded-full bg-green-900"
                                                style={{
                                                    backgroundColor:
                                                        i < (10 - countdown)
                                                            ? 'rgb(34, 197, 94)'
                                                            : 'rgb(20, 83, 45)',
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Random Code Snippets */}
                            <div className="mt-12 space-y-2 font-mono text-xs text-green-500/60 md:text-sm">
                                <CodeLine text="[SISTEMA] A inicializar protocolo de segurança..." delay={0} />
                                <CodeLine text="[ACESSO] A verificar credenciais... OK" delay={1000} />
                                <CodeLine text="[CRYPTO] A desencriptar ficheiros... 87%" delay={2000} />
                                <CodeLine text="[REDE] A estabelecer ligação segura... SUCESSO" delay={3500} />
                                <CodeLine text="[DATABASE] A carregar perfil do agente... COMPLETO" delay={5000} />
                                <CodeLine text="[MISSÃO] A preparar briefing... PRONTO" delay={7000} />
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            {/* Success Screen */}
                            <div className="animate-fadeIn space-y-8">
                                {/* Badge/Shield Icon */}
                                <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full border-4 border-green-400 bg-green-950/50 shadow-[0_0_50px_rgba(34,197,94,0.5)]">
                                    <svg
                                        className="h-16 w-16 text-green-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </div>

                                <div className="space-y-4">
                                    <h1 className="font-mono text-4xl font-bold tracking-wider text-green-400 drop-shadow-[0_0_25px_rgba(34,197,94,0.5)] md:text-6xl">
                                        PARABÉNS
                                    </h1>
                                    <p className="font-mono text-2xl font-semibold tracking-wide text-green-300 md:text-3xl">
                                        AGORA ÉS UM
                                    </p>
                                    <h2 className="font-mono text-5xl font-bold tracking-widest text-green-400 drop-shadow-[0_0_30px_rgba(34,197,94,0.6)] md:text-7xl">
                                        AGENTE DO REINO
                                    </h2>
                                </div>

                                {/* Mission Message */}
                                <div className="mx-auto mt-8 max-w-2xl space-y-6">
                                    <div className="rounded-lg border-2 border-green-400/50 bg-green-950/40 p-6 backdrop-blur-sm">
                                        <p className="font-mono text-xl font-bold uppercase tracking-wide text-green-300 md:text-2xl">
                                            ⚠️ A TUA MISSÃO NÃO É SECRETA
                                        </p>
                                        <p className="mt-3 font-mono text-lg font-semibold uppercase tracking-wider text-green-400 md:text-xl">
                                            DIVULGA A TODOS!
                                        </p>
                                    </div>

                                    {/* Bible Verse */}
                                    <div className="rounded-lg border border-green-500/30 bg-green-950/30 p-8 backdrop-blur-sm">
                                        <div className="space-y-4">
                                            <p className="font-mono text-lg font-bold uppercase tracking-wide text-green-400 md:text-xl">
                                                A Tua Missão É:
                                            </p>
                                            <p className="text-lg italic leading-relaxed text-green-200 md:text-xl">
                                                "Portanto, ide e fazei discípulos de todas as nações, batizando-os em nome do Pai, do Filho e do Espírito Santo, ensinando-os a guardar todas as coisas que vos tenho ordenado. E eis que estou convosco todos os dias até à consumação do século."
                                            </p>
                                            <p className="text-right text-sm font-semibold tracking-wider text-green-400 md:text-base">
                                                — MATEUS 28:19-20
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Mission Status */}
                                <div className="mt-8 space-y-2 font-mono text-sm text-green-500">
                                    <p>[STATUS] AGENTE ACTIVADO</p>
                                    <p>[AUTORIZAÇÃO] NÍVEL MÁXIMO</p>
                                    <p>[MISSÃO] EM CURSO</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Corner Decorations */}
                <div className="pointer-events-none absolute left-4 top-4 font-mono text-xs text-green-500/50">
                    [CLASSIFICADO]
                </div>
                <div className="pointer-events-none absolute right-4 top-4 font-mono text-xs text-green-500/50">
                    [ULTRA SECRETO]
                </div>
                <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-xs text-green-500/50">
                    [LIGAÇÃO SEGURA]
                </div>
                <div className="pointer-events-none absolute bottom-4 right-4 font-mono text-xs text-green-500/50">
                    [ENCRIPTADO]
                </div>
            </div>
        </>
    );
}

// Matrix Column Component
function MatrixColumn({ index }: { index: number }) {
    const [position, setPosition] = useState(-100);
    const [characters, setCharacters] = useState<string[]>([]);

    useEffect(() => {
        // Generate random characters
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const randomChars = Array.from({ length: 20 }, () => 
            chars[Math.floor(Math.random() * chars.length)]
        );
        setCharacters(randomChars);

        // Animate column
        const speed = 20 + Math.random() * 30;
        const interval = setInterval(() => {
            setPosition((prev) => {
                if (prev > window.innerHeight) {
                    return -100;
                }
                return prev + speed;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="absolute font-mono text-sm text-green-500"
            style={{
                left: `${index * 2}%`,
                top: `${position}px`,
                textShadow: '0 0 5px rgba(34, 197, 94, 0.8)',
            }}
        >
            {characters.map((char, i) => (
                <div
                    key={i}
                    style={{
                        opacity: 1 - i * 0.05,
                    }}
                >
                    {char}
                </div>
            ))}
        </div>
    );
}

// Code Line Component with Delay
function CodeLine({ text, delay }: { text: string; delay: number }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    if (!visible) return null;

    return <p className="animate-fadeIn">{text}</p>;
}
