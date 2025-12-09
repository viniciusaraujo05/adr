import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Task1() {
    const [glitchActive, setGlitchActive] = useState(false);
    const [scanlinePosition, setScanlinePosition] = useState(0);
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
    const [messageVisible, setMessageVisible] = useState(false);
    const [hexGrid, setHexGrid] = useState<string[]>([]);

    useEffect(() => {
        // Generate particles for background
        const particleArray = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
        }));
        setParticles(particleArray);

        // Generate hex grid
        const hexChars = '0123456789ABCDEF';
        const hexArray = Array.from({ length: 200 }, () => {
            return Array.from({ length: 8 }, () => 
                hexChars[Math.floor(Math.random() * hexChars.length)]
            ).join('');
        });
        setHexGrid(hexArray);

        // Glitch effect
        const glitchInterval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 100);
        }, 3000 + Math.random() * 2000);

        // Scanline animation
        const scanInterval = setInterval(() => {
            setScanlinePosition((prev) => (prev >= 100 ? 0 : prev + 0.5));
        }, 20);

        // Show message after delay
        setTimeout(() => setMessageVisible(true), 800);

        return () => {
            clearInterval(glitchInterval);
            clearInterval(scanInterval);
        };
    }, []);

    return (
        <>
            <Head title="Task 1 - Missão Classificada" />
            <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
                {/* Animated Hex Grid Background */}
                <div className="absolute inset-0 overflow-hidden opacity-5">
                    <div className="grid grid-cols-4 gap-2 p-4 font-mono text-xs text-cyan-400 md:grid-cols-8">
                        {hexGrid.map((hex, i) => (
                            <div
                                key={i}
                                className="animate-pulse"
                                style={{
                                    animationDelay: `${(i % 10) * 0.2}s`,
                                    animationDuration: '3s',
                                }}
                            >
                                {hex}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Floating Particles */}
                <div className="pointer-events-none absolute inset-0">
                    {particles.map((particle) => (
                        <div
                            key={particle.id}
                            className="absolute h-1 w-1 rounded-full bg-cyan-400/40 animate-float"
                            style={{
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                                animationDelay: `${particle.delay}s`,
                                animationDuration: `${8 + Math.random() * 4}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Scanning Line Effect */}
                <div
                    className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                    style={{
                        top: `${scanlinePosition}%`,
                        transition: 'top 0.02s linear',
                    }}
                />

                {/* Vignette Effect */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />

                {/* Grid Overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-10">
                    <div className="h-full w-full" style={{
                        backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                    }} />
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-8">
                    <div className={`w-full max-w-4xl transition-all duration-1000 ${messageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {/* Top Classification Bar */}
                        <div className="mb-6 flex items-center justify-between border-b border-cyan-500/30 pb-2 font-mono text-xs text-cyan-400/70 md:text-sm">
                            <span className="flex items-center gap-2">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                                CLASSIFICAÇÃO: NÃO É SECRETO
                            </span>
                            <span>TASK-001</span>
                        </div>

                        {/* Main Card */}
                        <div className="relative overflow-hidden rounded-lg border-2 border-cyan-500/40 bg-slate-950/80 shadow-[0_0_50px_rgba(34,211,238,0.2)] backdrop-blur-xl">
                            {/* Glitch Effect Overlay */}
                            {glitchActive && (
                                <div className="absolute inset-0 z-20 bg-cyan-400/10 mix-blend-overlay" />
                            )}

                            {/* Corner Brackets */}
                            <div className="pointer-events-none absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-cyan-400" />
                            <div className="pointer-events-none absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-cyan-400" />
                            <div className="pointer-events-none absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-cyan-400" />
                            <div className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-cyan-400" />

                            {/* Animated Border Glow */}
                            <div className="absolute -inset-px animate-pulse rounded-lg bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 opacity-50" style={{ animationDuration: '3s' }} />

                            <div className="relative p-6 md:p-12">
                                {/* Agency Badge */}
                                <div className="mb-8 flex justify-center">
                                    <div className="relative">
                                        {/* Outer Glow Ring */}
                                        <div className="absolute -inset-4 animate-spin-slow rounded-full bg-gradient-conic from-cyan-500 via-blue-500 to-cyan-500 opacity-30 blur-xl" />
                                        
                                        {/* Badge Container */}
                                        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-cyan-400 bg-gradient-to-br from-slate-900 to-blue-950 shadow-[0_0_40px_rgba(34,211,238,0.6)] md:h-32 md:w-32">
                                            {/* Inner Badge Design */}
                                            <div className="relative">
                                                <svg
                                                    className="h-12 w-12 text-cyan-400 md:h-16 md:w-16"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                    />
                                                </svg>
                                                {/* Pulse Effect */}
                                                <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400/20" style={{ animationDuration: '2s' }} />
                                            </div>
                                        </div>

                                        {/* Orbiting Dots */}
                                        <div className="absolute inset-0 animate-spin-slow">
                                            <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                                        </div>
                                        <div className="absolute inset-0 animate-spin-reverse">
                                            <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                        </div>
                                    </div>
                                </div>

                                {/* Status Indicator */}
                                <div className="mb-6 flex items-center justify-center gap-2 font-mono text-xs text-cyan-400/80 md:text-sm">
                                    <div className="flex gap-1">
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" style={{ animationDelay: '0s' }} />
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" style={{ animationDelay: '0.2s' }} />
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" style={{ animationDelay: '0.4s' }} />
                                    </div>
                                    <span>CONEXÃO SEGURA ESTABELECIDA</span>
                                </div>

                                {/* Main Message */}
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <h1 className={`mb-4 font-mono text-2xl font-bold tracking-wider text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] md:text-4xl ${glitchActive ? 'animate-glitch' : ''}`}>
                                            MENSAGEM DECODIFICADA
                                        </h1>
                                    </div>

                                    {/* Message Box */}
                                    <div className="relative overflow-hidden rounded-lg border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 to-blue-950/90 p-6 shadow-inner md:p-8">
                                        {/* Animated Corner Lines */}
                                        <div className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t border-cyan-400/50" />
                                        <div className="pointer-events-none absolute right-2 top-2 h-4 w-4 border-r border-t border-cyan-400/50" />
                                        <div className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b border-l border-cyan-400/50" />
                                        <div className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b border-r border-cyan-400/50" />

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400/60 md:text-sm">
                                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                                                TRANSMISSÃO ATIVA
                                            </div>

                                            <p className="text-center font-sans text-xl leading-relaxed text-cyan-50 md:text-3xl md:leading-relaxed">
                                                <span className="font-bold text-cyan-300">Boa, Agente!</span>
                                                <br />
                                                <span className="mt-2 inline-block">A fé abre portas.</span>
                                                <br />
                                                <span className="mt-2 inline-block">
                                                    Agora, use a sua{' '}
                                                    <span className="relative inline-block">
                                                        <span className="relative z-10 font-bold text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.8)]">
                                                            LUZ
                                                        </span>
                                                        <span className="absolute inset-0 animate-pulse bg-yellow-300/20 blur-lg" />
                                                    </span>
                                                    {' '}para descobrir a próxima etapa.
                                                </span>
                                            </p>

                                            <div className="flex items-center justify-center gap-2 pt-4 font-mono text-xs text-cyan-400/60">
                                                <span>AUTENTICIDADE VERIFICADA</span>
                                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mission Status */}
                                    <div className="space-y-2 border-t border-cyan-500/20 pt-6 font-mono text-xs text-cyan-400/70 md:text-sm">
                                        <div className="flex items-center justify-between">
                                            <span>[PROTOCOLO]</span>
                                            <span className="text-green-400">ATIVO</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>[AUTORIZAÇÃO]</span>
                                            <span className="text-green-400">CONCEDIDA</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>[PRÓXIMA ETAPA]</span>
                                            <span className="animate-pulse text-yellow-400">AGUARDANDO AÇÃO</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Info Bar */}
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-cyan-400/50">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                                <span>SISTEMA OPERACIONAL</span>
                            </div>
                            <div>NÍVEL DE ACESSO: ALPHA</div>
                            <div className="flex items-center gap-2">
                                <span>ENCRIPTAÇÃO: AES-256</span>
                                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ambient Light Effects */}
                <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-cyan-500/10 blur-3xl" style={{ animationDuration: '4s' }} />
                <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500/10 blur-3xl" style={{ animationDuration: '5s', animationDelay: '1s' }} />
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

                @keyframes glitch {
                    0%, 100% {
                        transform: translate(0);
                    }
                    20% {
                        transform: translate(-2px, 2px);
                    }
                    40% {
                        transform: translate(-2px, -2px);
                    }
                    60% {
                        transform: translate(2px, 2px);
                    }
                    80% {
                        transform: translate(2px, -2px);
                    }
                }

                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes spin-reverse {
                    from {
                        transform: rotate(360deg);
                    }
                    to {
                        transform: rotate(0deg);
                    }
                }

                .animate-float {
                    animation: float linear infinite;
                }

                .animate-glitch {
                    animation: glitch 0.3s infinite;
                }

                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }

                .animate-spin-reverse {
                    animation: spin-reverse 15s linear infinite;
                }

                .bg-gradient-radial {
                    background: radial-gradient(circle, var(--tw-gradient-stops));
                }

                .bg-gradient-conic {
                    background: conic-gradient(var(--tw-gradient-stops));
                }
            `}</style>
        </>
    );
}
