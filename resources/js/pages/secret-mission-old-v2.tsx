import { Head } from '@inertiajs/react';
import { Shield, Lock, CheckCircle, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SecretMission() {
    const [passwordScreen, setPasswordScreen] = useState(true);
    const [password, setPassword] = useState('');
    const [isShaking, setIsShaking] = useState(false);
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [showMission, setShowMission] = useState(false);
    const [matrixColumns, setMatrixColumns] = useState<number[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

    useEffect(() => {
        // Detect mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Generate random columns for Matrix effect
        const columnCount = window.innerWidth < 768 ? 30 : 50;
        const columns = Array.from({ length: columnCount }, (_, i) => i);
        setMatrixColumns(columns);

        // Generate particles
        const particleArray = Array.from({ length: 40 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
        }));
        setParticles(particleArray);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password.toUpperCase() === 'JESUS') {
            setIsUnlocking(true);
            
            // Haptic feedback
            if ('vibrate' in navigator) {
                navigator.vibrate([100, 50, 100]);
            }
            
            // Play success sound
            playSuccessSound();
            
            setTimeout(() => {
                setPasswordScreen(false);
                setTimeout(() => {
                    setShowMission(true);
                }, 300);
            }, 2000);
        } else {
            setIsShaking(true);
            
            // Haptic feedback for error
            if ('vibrate' in navigator) {
                navigator.vibrate(200);
            }
            
            setTimeout(() => {
                setIsShaking(false);
                setPassword('');
            }, 500);
        }
    };

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
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            // Silently fail
        }
    };

    return (
        <>
            <Head title="Missão Secreta - Agente do Reino" />
            <div className="relative min-h-dvh w-full overflow-hidden bg-black">
                {/* Gradient Background Layer */}
                <div className="pointer-events-none absolute inset-0 animate-gradient bg-gradient-to-br from-green-950/20 via-black to-green-900/10" />

                {/* Matrix Rain Effect */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    {matrixColumns.map((col) => (
                        <MatrixColumn key={col} index={col} isMobile={isMobile} />
                    ))}
                </div>

                {/* Floating Particles */}
                <div className="pointer-events-none absolute inset-0">
                    {particles.map((particle) => (
                        <div
                            key={particle.id}
                            className="absolute h-1 w-1 rounded-full bg-green-400/40 animate-float"
                            style={{
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                                animationDelay: `${particle.delay}s`,
                                animationDuration: `${8 + Math.random() * 4}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Scanlines Effect */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scan" />

                {/* Main Content */}
                <div className="relative z-10 flex min-h-dvh items-center justify-center px-6 py-8">
                    {passwordScreen ? (
                        <div className={`w-full max-w-md transition-all duration-500 ${isUnlocking ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                            {/* Password Screen */}
                            <div className="animate-fadeIn flex flex-col gap-6">
                                {/* Lock Icon */}
                                <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full border-4 border-green-400 bg-green-950/50 shadow-[0_0_50px_rgba(34,197,94,0.5)] animate-badge-rotate">
                                    {isUnlocking ? (
                                        <CheckCircle className="h-16 w-16 text-green-400 animate-badge-pulse" strokeWidth={2.5} />
                                    ) : (
                                        <Lock className="h-16 w-16 text-green-400 animate-badge-pulse" strokeWidth={2.5} />
                                    )}
                                </div>

                                {/* Title */}
                                <div className="text-center">
                                    <h1 className="mb-2 font-mono text-3xl font-bold tracking-wider text-green-400 drop-shadow-[0_0_25px_rgba(34,197,94,0.5)] sm:text-4xl">
                                        ACESSO RESTRITO
                                    </h1>
                                    <p className="font-mono text-sm text-green-300/80 sm:text-base">
                                        [NÍVEL DE SEGURANÇA: MÁXIMO]
                                    </p>
                                </div>

                                {/* Password Form */}
                                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                    <div className="rounded-lg border-2 border-green-400/50 bg-green-950/40 p-6 backdrop-blur-sm">
                                        <label className="mb-4 block text-center font-mono text-lg font-semibold text-green-300 sm:text-xl">
                                            Qual é o nome do comandante?
                                        </label>
                                        
                                        <input
                                            type="text"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={`w-full rounded-lg border-2 bg-black/50 px-4 py-3 text-center font-mono text-xl font-bold uppercase tracking-widest text-green-400 placeholder-green-700 outline-none transition-all focus:border-green-400 focus:shadow-[0_0_20px_rgba(34,197,94,0.3)] sm:text-2xl ${
                                                isShaking ? 'animate-shake border-red-500' : 'border-green-500/50'
                                            }`}
                                            placeholder="_ _ _ _ _"
                                            autoFocus
                                            disabled={isUnlocking}
                                        />

                                        {isShaking && (
                                            <p className="mt-2 text-center font-mono text-sm text-red-400 animate-fadeIn">
                                                ⚠️ ACESSO NEGADO
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isUnlocking || password.length === 0}
                                        className="group w-full rounded-lg border-2 border-green-500/50 bg-green-950/40 px-6 py-4 font-mono text-lg font-bold uppercase tracking-widest text-green-400 transition-all hover:border-green-400 hover:bg-green-900/40 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed sm:text-xl"
                                    >
                                        {isUnlocking ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-400 border-t-transparent" />
                                                DESBLOQUEANDO...
                                            </span>
                                        ) : (
                                            'CONFIRMAR ACESSO'
                                        )}
                                    </button>
                                </form>

                                {/* Status Lines */}
                                <div className="mt-4 space-y-1 font-mono text-xs text-green-500/60 sm:text-sm">
                                    <p>[SISTEMA] Aguardando autenticação...</p>
                                    <p>[PROTOCOLO] Verificação de identidade</p>
                                    <p>[SEGURANÇA] Encriptação AES-256 ativa</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={`w-full max-w-3xl transition-all duration-1000 ${showMission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            {/* Mission Screen */}
                            <div className="animate-fadeIn flex flex-col gap-6 sm:gap-8">
                                {/* Badge/Shield Icon with Sparkles */}
                                <div className="relative mx-auto mb-4">
                                    <div className="absolute -inset-8 animate-pulse rounded-full bg-green-500/20 blur-2xl" />
                                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-green-400 bg-green-950/50 shadow-[0_0_60px_rgba(34,197,94,0.6)] animate-badge-rotate sm:h-36 sm:w-36">
                                        <Shield className="h-16 w-16 text-green-400 animate-badge-pulse sm:h-20 sm:w-20" strokeWidth={2.5} />
                                    </div>
                                    <Sparkles className="absolute -right-2 -top-2 h-8 w-8 text-yellow-400 animate-ping" />
                                    <Sparkles className="absolute -left-2 -bottom-2 h-6 w-6 text-yellow-400 animate-ping" style={{ animationDelay: '0.5s' }} />
                                </div>

                                {/* Main Message with Enhanced Frame */}
                                <div className="relative overflow-hidden rounded-xl border-2 border-green-500/50 bg-gradient-to-br from-green-950/40 to-green-900/20 p-6 shadow-[inset_0_0_30px_rgba(34,197,94,0.1),0_0_50px_rgba(34,197,94,0.2)] backdrop-blur-sm sm:p-8">
                                    {/* Corner Brackets */}
                                    <div className="pointer-events-none absolute left-2 top-2 h-6 w-6 border-l-2 border-t-2 border-green-400" />
                                    <div className="pointer-events-none absolute right-2 top-2 h-6 w-6 border-r-2 border-t-2 border-green-400" />
                                    <div className="pointer-events-none absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 border-green-400" />
                                    <div className="pointer-events-none absolute bottom-2 right-2 h-6 w-6 border-b-2 border-r-2 border-green-400" />

                                    <div className="flex flex-col gap-4 sm:gap-5">
                                        <h1 className="animate-text-glow font-mono text-4xl font-bold tracking-wider text-green-400 drop-shadow-[0_0_25px_rgba(34,197,94,0.5)] sm:text-5xl md:text-6xl">
                                            PARABÉNS!
                                        </h1>
                                        <div className="space-y-2">
                                            <p className="font-mono text-xl font-semibold tracking-wide text-green-300 sm:text-2xl md:text-3xl">
                                                Agora és um
                                            </p>
                                            <h2 className="animate-text-glow font-mono text-4xl font-bold tracking-widest text-green-400 drop-shadow-[0_0_30px_rgba(34,197,94,0.6)] sm:text-5xl md:text-6xl lg:text-7xl">
                                                AGENTE DO REINO
                                            </h2>
                                        </div>
                                    </div>
                                </div>

                                {/* Mission Messages */}
                                <div className="flex flex-col gap-4 sm:gap-5">
                                    {/* Mission Statement */}
                                    <div className="group relative overflow-hidden rounded-xl border-2 border-green-400/60 bg-gradient-to-br from-green-950/50 to-green-900/30 p-6 shadow-[0_0_40px_rgba(34,197,94,0.2)] backdrop-blur-sm transition-all hover:shadow-[0_0_60px_rgba(34,197,94,0.3)] sm:p-7">
                                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        
                                        <div className="relative space-y-3">
                                            <p className="font-mono text-xl font-bold uppercase tracking-wide text-green-300 sm:text-2xl md:text-3xl">
                                                ⚠️ A tua missão não é secreta:
                                            </p>
                                            <p className="text-2xl font-bold leading-relaxed text-green-100 sm:text-3xl md:text-4xl">
                                                Viver e anunciar o amor de{' '}
                                                <span className="relative inline-block">
                                                    <span className="relative z-10 text-yellow-300 drop-shadow-[0_0_20px_rgba(253,224,71,0.8)]">
                                                        Jesus
                                                    </span>
                                                    <span className="absolute inset-0 animate-pulse bg-yellow-300/30 blur-lg" />
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bible Verse */}
                                    <div className="rounded-xl border border-green-500/40 bg-gradient-to-br from-green-950/40 to-black/40 p-6 backdrop-blur-sm sm:p-8">
                                        <div className="flex flex-col gap-4 sm:gap-5">
                                            <div className="flex items-center gap-2">
                                                <div className="h-1 w-1 rounded-full bg-green-400 animate-pulse" />
                                                <p className="font-mono text-base font-bold uppercase tracking-wide text-green-400 sm:text-lg">
                                                    Versículo da Missão
                                                </p>
                                                <div className="h-1 w-1 rounded-full bg-green-400 animate-pulse" />
                                            </div>
                                            
                                            <blockquote className="relative border-l-4 border-green-500/50 pl-4 text-base italic leading-relaxed text-green-200 sm:text-lg md:text-xl">
                                                "Portanto, ide e fazei discípulos de todas as nações, batizando-os em nome do Pai, do Filho e do Espírito Santo, ensinando-os a guardar todas as coisas que vos tenho ordenado. E eis que estou convosco todos os dias até à consumação do século."
                                            </blockquote>
                                            
                                            <p className="text-right text-sm font-semibold tracking-wider text-green-400 sm:text-base">
                                                — MATEUS 28:19-20
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Mission Status with Animation */}
                                <div className="rounded-lg border border-green-500/30 bg-green-950/30 p-4 backdrop-blur-sm sm:p-5">
                                    <div className="flex flex-col gap-2 font-mono text-xs text-green-400 sm:text-sm">
                                        <StatusLine text="[STATUS] ✓ AGENTE ACTIVADO" delay={300} />
                                        <StatusLine text="[AUTORIZAÇÃO] ✓ NÍVEL MÁXIMO CONCEDIDO" delay={600} />
                                        <StatusLine text="[MISSÃO] ✓ EM CURSO - DIVULGAR O EVANGELHO" delay={900} />
                                        <StatusLine text="[COMANDANTE] ✓ JESUS CRISTO" delay={1200} />
                                    </div>
                                </div>

                                {/* Final Message */}
                                <div className="text-center">
                                    <p className="animate-pulse font-mono text-lg font-semibold text-green-300 sm:text-xl">
                                        Que o Senhor te abençoe nesta jornada! 🙏
                                    </p>
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

            <style>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                        opacity: 0.4;
                    }
                    50% {
                        transform: translateY(-20px) translateX(10px);
                        opacity: 0.8;
                    }
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }

                @keyframes text-glow {
                    0%, 100% {
                        text-shadow: 0 0 25px rgba(34, 197, 94, 0.5);
                    }
                    50% {
                        text-shadow: 0 0 40px rgba(34, 197, 94, 0.8), 0 0 60px rgba(34, 197, 94, 0.4);
                    }
                }

                .animate-float {
                    animation: float linear infinite;
                }

                .animate-shake {
                    animation: shake 0.5s;
                }

                .animate-text-glow {
                    animation: text-glow 3s ease-in-out infinite;
                }

                .animate-badge-rotate {
                    animation: badge-rotate 20s linear infinite;
                }

                .animate-badge-pulse {
                    animation: badge-pulse 2s ease-in-out infinite;
                }

                @keyframes badge-rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes badge-pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.9; }
                }

                @keyframes scan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }

                @keyframes gradient {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.5; }
                }

                @keyframes typing {
                    from { opacity: 0; transform: translateX(-10px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                @keyframes flicker {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .animate-scan {
                    animation: scan 8s linear infinite;
                }

                .animate-gradient {
                    animation: gradient 5s ease-in-out infinite;
                }

                .animate-typing {
                    animation: typing 0.3s ease-out;
                }

                .animate-flicker {
                    animation: flicker 2s ease-in-out infinite;
                }

                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out;
                }
            `}</style>
        </>
    );
}

// Matrix Column Component
function MatrixColumn({ index, isMobile }: { index: number; isMobile: boolean }) {
    const [position, setPosition] = useState(-100);
    const [characters, setCharacters] = useState<string[]>([]);

    useEffect(() => {
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const randomChars = Array.from({ length: 20 }, () => 
            chars[Math.floor(Math.random() * chars.length)]
        );
        setCharacters(randomChars);

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

// Status Line Component
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
