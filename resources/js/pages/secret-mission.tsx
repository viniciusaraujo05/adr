import { Head } from '@inertiajs/react';
import { Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SecretMission() {
    const [countdown, setCountdown] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const [matrixColumns, setMatrixColumns] = useState<number[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Generate random columns for Matrix effect (fewer on mobile)
        const columnCount = window.innerWidth < 768 ? 30 : 50;
        const columns = Array.from({ length: columnCount }, (_, i) => i);
        setMatrixColumns(columns);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        // Countdown timer
        if (countdown > 0 && isLoading) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            setTimeout(() => {
                setIsLoading(false);
                // Haptic feedback on mobile
                if ('vibrate' in navigator) {
                    navigator.vibrate(100);
                }
                // Optional: Play success sound
                playSuccessSound();
            }, 500);
        }
    }, [countdown, isLoading]);

    const playSuccessSound = () => {
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            // Silently fail if audio not supported
        }
    };

    const shareOnWhatsApp = () => {
        const message = encodeURIComponent(
            '🕵️ Acabei de me tornar um AGENTE DO REINO! 🎯\n\n' +
            'A minha missão não é secreta - é divulgar o Evangelho a todos!\n\n' +
            '"Portanto, ide e fazei discípulos de todas as nações..." - Mateus 28:19-20\n\n' +
            'Junta-te a mim nesta missão! 🙏'
        );
        window.open(`https://wa.me/?text=${message}`, '_blank');
    };

    return (
        <>
            <Head title="Missão Secreta" />
            <div className="relative min-h-dvh w-full overflow-hidden bg-black">
                {/* Gradient Background Layer */}
                <div className="pointer-events-none absolute inset-0 animate-gradient bg-gradient-to-br from-green-950/20 via-black to-green-900/10" />

                {/* Matrix Rain Effect */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    {matrixColumns.map((col) => (
                        <MatrixColumn key={col} index={col} isMobile={isMobile} />
                    ))}
                </div>

                {/* Scanlines Effect */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scan" />

                {/* Main Content */}
                <div className="relative z-10 flex min-h-dvh items-center justify-center px-6 py-8">
                    {isLoading ? (
                        <div className="w-full max-w-md text-center">
                            {/* Loading Screen */}
                            <div className="mb-8 flex flex-col gap-4">
                                <div className="relative">
                                    <div className="absolute -inset-4 animate-pulse rounded-full bg-green-500/20 blur-xl" />
                                    <h1 className="relative text-6xl font-bold tracking-wider text-green-400 drop-shadow-[0_0_25px_rgba(34,197,94,0.5)] sm:text-7xl md:text-8xl">
                                        {countdown}
                                    </h1>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <p className="animate-pulse font-mono text-xl font-semibold tracking-widest text-green-300 sm:text-2xl md:text-4xl">
                                        A CARREGAR A TUA MISSÃO
                                    </p>
                                    <div className="mx-auto flex w-full max-w-xs justify-center gap-1">
                                        {[...Array(10)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="h-2 w-full rounded-full bg-green-900 transition-all duration-300"
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
                            <div className="mt-12 flex flex-col gap-2 font-mono text-xs text-green-500/60 sm:text-sm">
                                <TerminalLine text="[SISTEMA] A inicializar protocolo de segurança..." delay={0} />
                                <TerminalLine text="[ACESSO] A verificar credenciais... OK" delay={1000} />
                                <TerminalLine text="[CRYPTO] A desencriptar ficheiros... 87%" delay={2000} />
                                <TerminalLine text="[REDE] A estabelecer ligação segura... SUCESSO" delay={3500} />
                                <TerminalLine text="[DATABASE] A carregar perfil do agente... COMPLETO" delay={5000} />
                                <TerminalLine text="[MISSÃO] A preparar briefing... PRONTO" delay={7000} />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full max-w-2xl text-center">
                            {/* Success Screen */}
                            <div className="animate-fadeIn flex flex-col gap-6 sm:gap-8">
                                {/* Badge/Shield Icon */}
                                <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full border-4 border-green-400 bg-green-950/50 shadow-[0_0_50px_rgba(34,197,94,0.5)] animate-badge-rotate sm:h-32 sm:w-32">
                                    <Shield className="h-14 w-14 text-green-400 animate-badge-pulse sm:h-16 sm:w-16" strokeWidth={2.5} />
                                </div>

                                {/* Main Message with Frame */}
                                <div className="rounded-xl border border-green-500/40 bg-green-950/20 p-6 shadow-[inset_0_0_20px_rgba(34,197,94,0.1)] backdrop-blur-sm sm:p-8">
                                    <div className="flex flex-col gap-3 sm:gap-4">
                                        <h1 className="font-mono text-3xl font-bold tracking-wider text-green-400 drop-shadow-[0_0_25px_rgba(34,197,94,0.5)] sm:text-4xl md:text-6xl">
                                            PARABÉNS
                                        </h1>
                                        <p className="font-mono text-xl font-semibold tracking-wide text-green-300 sm:text-2xl md:text-3xl">
                                            AGORA ÉS UM
                                        </p>
                                        <h2 className="font-mono text-4xl font-bold tracking-widest text-green-400 drop-shadow-[0_0_30px_rgba(34,197,94,0.6)] sm:text-5xl md:text-6xl">
                                            AGENTE DO REINO
                                        </h2>
                                    </div>
                                </div>

                                {/* Mission Message */}
                                <div className="flex flex-col gap-4 sm:gap-6">
                                    <div className="rounded-lg border-2 border-green-400/50 bg-green-950/40 p-5 backdrop-blur-sm sm:p-6">
                                        <p className="font-mono text-lg font-bold uppercase tracking-wide text-green-300 sm:text-xl md:text-2xl">
                                            ⚠️ A TUA MISSÃO NÃO É SECRETA
                                        </p>
                                        <p className="mt-2 font-mono text-base font-semibold uppercase tracking-wider text-green-400 sm:mt-3 sm:text-lg md:text-xl">
                                            DIVULGA A TODOS!
                                        </p>
                                    </div>

                                    {/* CTA Button */}
                                    {/* <button
                                        onClick={shareOnWhatsApp}
                                        className="group mx-auto inline-flex items-center gap-2 rounded-lg border border-green-500/40 bg-green-950/40 px-6 py-3 font-mono text-sm uppercase tracking-widest text-green-400 transition-all hover:border-green-400 hover:bg-green-900/40 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] active:scale-95 sm:text-base"
                                    >
                                        <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                        </svg>
                                        Partilhar Missão
                                    </button> */}

                                    {/* Bible Verse */}
                                    <div className="rounded-lg border border-green-500/30 bg-green-950/30 p-6 backdrop-blur-sm sm:p-8">
                                        <div className="flex flex-col gap-3 sm:gap-4">
                                            <p className="font-mono text-base font-bold uppercase tracking-wide text-green-400 sm:text-lg md:text-xl">
                                                A Tua Missão É:
                                            </p>
                                            <blockquote className="relative text-base italic leading-relaxed text-green-200 sm:text-lg md:text-xl">
                                                <span className="absolute -left-2 top-0 text-3xl text-green-500/50">"</span>
                                                Portanto, ide e fazei discípulos de todas as nações, batizando-os em nome do Pai, do Filho e do Espírito Santo, ensinando-os a guardar todas as coisas que vos tenho ordenado. E eis que estou convosco todos os dias até à consumação do século.
                                                <span className="text-3xl text-green-500/50">"</span>
                                            </blockquote>
                                            <p className="text-right text-xs font-semibold tracking-wider text-green-400 sm:text-sm md:text-base">
                                                — MATEUS 28:19-20
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Mission Status */}
                                <div className="mt-4 flex flex-col gap-2 font-mono text-xs text-green-500 sm:text-sm">
                                    <StatusLine text="[STATUS] AGENTE ACTIVADO" delay={200} />
                                    <StatusLine text="[AUTORIZAÇÃO] NÍVEL MÁXIMO" delay={400} />
                                    <StatusLine text="[MISSÃO] EM CURSO" delay={600} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Corner Decorations */}
                <div className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] text-green-500/50 sm:left-4 sm:top-4 sm:text-xs">
                    [CLASSIFICADO]
                </div>
                <div className="pointer-events-none absolute right-3 top-3 font-mono text-[10px] text-green-500/50 sm:right-4 sm:top-4 sm:text-xs">
                    [ULTRA SECRETO]
                </div>
                <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] text-green-500/50 sm:bottom-4 sm:left-4 sm:text-xs">
                    [LIGAÇÃO SEGURA]
                </div>
                <div className="pointer-events-none absolute bottom-3 right-3 font-mono text-[10px] text-green-500/50 sm:bottom-4 sm:right-4 sm:text-xs">
                    [ENCRIPTADO]
                </div>
            </div>
        </>
    );
}

// Matrix Column Component with Performance Optimization
function MatrixColumn({ index, isMobile }: { index: number; isMobile: boolean }) {
    const [position, setPosition] = useState(-100);
    const [characters, setCharacters] = useState<string[]>([]);

    useEffect(() => {
        // Generate random characters
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const randomChars = Array.from({ length: 20 }, () => 
            chars[Math.floor(Math.random() * chars.length)]
        );
        setCharacters(randomChars);

        // Animate column - slower on mobile for performance
        const speed = isMobile ? 15 + Math.random() * 20 : 20 + Math.random() * 30;
        const intervalTime = isMobile ? 60 : 50;
        
        const interval = setInterval(() => {
            setPosition((prev) => {
                if (prev > window.innerHeight) {
                    return -100;
                }
                return prev + speed;
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, [isMobile]);

    return (
        <div
            className="absolute font-mono text-sm text-green-500"
            style={{
                left: `${index * 2}%`,
                top: `${position}px`,
                textShadow: '0 0 5px rgba(34, 197, 94, 0.8)',
                willChange: 'transform',
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

// Terminal Line Component with Typing Effect
function TerminalLine({ text, delay }: { text: string; delay: number }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    if (!visible) return null;

    return <p className="animate-typing text-left">{text}</p>;
}

// Status Line Component with Flicker Effect
function StatusLine({ text, delay }: { text: string; delay: number }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    if (!visible) return null;

    return <p className="animate-typing animate-flicker">{text}</p>;
}
