import { Head } from '@inertiajs/react';
import { Shield, Lock, CheckCircle, Sparkles, Zap, Eye, Radio } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SecretMission() {
    const [passwordScreen, setPasswordScreen] = useState(true);
    const [password, setPassword] = useState('');
    const [isShaking, setIsShaking] = useState(false);
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [showMission, setShowMission] = useState(false);
    const [matrixColumns, setMatrixColumns] = useState<number[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [radarAngle, setRadarAngle] = useState(0);

    useEffect(() => {
        // Detect mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Generate random columns for Matrix effect
        const columnCount = window.innerWidth < 768 ? 25 : 40;
        const columns = Array.from({ length: columnCount }, (_, i) => i);
        setMatrixColumns(columns);

        // Radar animation
        const radarInterval = setInterval(() => {
            setRadarAngle((prev) => (prev + 2) % 360);
        }, 30);

        return () => {
            window.removeEventListener('resize', checkMobile);
            clearInterval(radarInterval);
        };
    }, []);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password.toUpperCase() === 'JESUS') {
            setIsUnlocking(true);
            
            // Haptic feedback
            if ('vibrate' in navigator) {
                navigator.vibrate([100, 50, 100, 50, 200]);
            }
            
            // Play success sound
            playSuccessSound();
            
            // Scan progress animation
            let progress = 0;
            const scanInterval = setInterval(() => {
                progress += 5;
                setScanProgress(progress);
                if (progress >= 100) {
                    clearInterval(scanInterval);
                }
            }, 30);
            
            setTimeout(() => {
                setPasswordScreen(false);
                setTimeout(() => {
                    setShowMission(true);
                }, 400);
            }, 2500);
        } else {
            setIsShaking(true);
            
            // Haptic feedback for error
            if ('vibrate' in navigator) {
                navigator.vibrate([200, 100, 200]);
            }
            
            setTimeout(() => {
                setIsShaking(false);
                setPassword('');
            }, 600);
        }
    };

    const playSuccessSound = () => {
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            
            // Create a more complex success sound
            const playTone = (freq: number, startTime: number, duration: number) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.frequency.value = freq;
                oscillator.type = 'sine';

                gainNode.gain.setValueAtTime(0.2, startTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

                oscillator.start(startTime);
                oscillator.stop(startTime + duration);
            };

            const now = audioContext.currentTime;
            playTone(600, now, 0.15);
            playTone(800, now + 0.15, 0.15);
            playTone(1000, now + 0.3, 0.3);
        } catch (e) {
            // Silently fail
        }
    };

    return (
        <>
            <Head title="Missão Classificada - Agente do Reino" />
            <div className="relative min-h-dvh w-full overflow-hidden bg-gradient-to-br from-slate-950 via-green-950/30 to-black">
                {/* Animated Grid Background */}
                <div className="pointer-events-none absolute inset-0 opacity-20">
                    <div className="h-full w-full" style={{
                        backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.15) 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                        animation: 'grid-move 20s linear infinite',
                    }} />
                </div>

                {/* Matrix Rain Effect - Subtle */}
                <div className="absolute inset-0 overflow-hidden opacity-10">
                    {matrixColumns.map((col) => (
                        <MatrixColumn key={col} index={col} isMobile={isMobile} />
                    ))}
                </div>

                {/* Radar Sweep Effect */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
                    <div className="relative h-96 w-96">
                        <div className="absolute inset-0 rounded-full border border-green-500/30" />
                        <div className="absolute inset-4 rounded-full border border-green-500/20" />
                        <div className="absolute inset-8 rounded-full border border-green-500/10" />
                        <div
                            className="absolute left-1/2 top-1/2 h-1/2 w-1 origin-bottom bg-gradient-to-t from-green-500/50 to-transparent"
                            style={{
                                transform: `translate(-50%, -100%) rotate(${radarAngle}deg)`,
                            }}
                        />
                    </div>
                </div>

                {/* Scanlines Effect */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scan" />

                {/* Vignette */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/70" />

                {/* Main Content */}
                <div className="relative z-10 flex min-h-dvh items-center justify-center px-4 py-8 sm:px-6">
                    {passwordScreen ? (
                        <div className={`w-full max-w-lg transition-all duration-700 ${isUnlocking ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                            {/* Password Screen */}
                            <div className="animate-fadeIn flex flex-col gap-6 text-center">
                                {/* FBI-Style Header */}
                                <div className="mb-4 space-y-2">
                                    <div className="flex items-center justify-center gap-2 font-mono text-xs text-green-400/60 sm:text-sm">
                                        <Radio className="h-4 w-4 animate-pulse" />
                                        <span>SISTEMA DE AUTENTICAÇÃO ATIVO</span>
                                        <Radio className="h-4 w-4 animate-pulse" />
                                    </div>
                                </div>

                                {/* Lock Icon with Radar */}
                                <div className="relative mx-auto mb-6">
                                    {/* Outer Radar Rings */}
                                    <div className="absolute -inset-12 animate-ping rounded-full border-2 border-green-500/20" style={{ animationDuration: '3s' }} />
                                    <div className="absolute -inset-8 animate-ping rounded-full border-2 border-green-500/30" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
                                    
                                    {/* Main Badge */}
                                    <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-4 border-green-400 bg-gradient-to-br from-green-950/80 to-slate-950/80 shadow-[0_0_60px_rgba(34,197,94,0.4)] backdrop-blur-sm sm:h-40 sm:w-40">
                                        {/* Inner Glow */}
                                        <div className="absolute inset-2 rounded-full bg-green-500/10 blur-xl" />
                                        
                                        {isUnlocking ? (
                                            <>
                                                <CheckCircle className="relative z-10 h-20 w-20 text-green-400 animate-badge-pulse sm:h-24 sm:w-24" strokeWidth={2} />
                                                <div className="absolute inset-0 animate-spin-slow rounded-full border-t-4 border-green-400" />
                                            </>
                                        ) : (
                                            <>
                                                <Lock className="relative z-10 h-20 w-20 text-green-400 sm:h-24 sm:w-24" strokeWidth={2} />
                                                <Eye className="absolute right-2 top-2 h-6 w-6 text-green-400/60 animate-pulse" />
                                            </>
                                        )}
                                    </div>

                                    {/* Orbiting Dots */}
                                    <div className="absolute inset-0 animate-spin-slow">
                                        <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                                    </div>
                                    <div className="absolute inset-0 animate-spin-reverse">
                                        <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="space-y-3">
                                    <h1 className="font-mono text-3xl font-bold tracking-wider text-green-400 drop-shadow-[0_0_30px_rgba(34,197,94,0.6)] sm:text-4xl md:text-5xl">
                                        ACESSO RESTRITO
                                    </h1>
                                    <div className="flex items-center justify-center gap-2 font-mono text-xs text-green-300/70 sm:text-sm">
                                        <div className="h-1 w-1 rounded-full bg-red-500 animate-pulse" />
                                        <span>NÍVEL DE SEGURANÇA: MÁXIMO</span>
                                        <div className="h-1 w-1 rounded-full bg-red-500 animate-pulse" />
                                    </div>
                                </div>

                                {/* Password Form */}
                                <form onSubmit={handlePasswordSubmit} className="space-y-5">
                                    <div className="relative overflow-hidden rounded-xl border-2 border-green-400/40 bg-gradient-to-br from-green-950/40 to-slate-950/60 p-6 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:p-8">
                                        {/* Corner Brackets */}
                                        <div className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-green-400/60" />
                                        <div className="pointer-events-none absolute right-2 top-2 h-4 w-4 border-r-2 border-t-2 border-green-400/60" />
                                        <div className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-green-400/60" />
                                        <div className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-green-400/60" />

                                        <label className="mb-5 block text-center font-mono text-lg font-semibold text-green-300 sm:text-xl">
                                            Qual é o nome do comandante?
                                        </label>
                                        
                                        <input
                                            type="text"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={`w-full rounded-lg border-2 bg-black/60 px-4 py-4 text-center font-mono text-2xl font-bold uppercase tracking-[0.3em] text-green-400 placeholder-green-800/50 shadow-inner outline-none transition-all focus:border-green-400 focus:shadow-[0_0_30px_rgba(34,197,94,0.3)] sm:text-3xl ${
                                                isShaking ? 'animate-shake border-red-500' : 'border-green-500/50'
                                            }`}
                                            placeholder="_ _ _ _ _"
                                            autoFocus
                                            disabled={isUnlocking}
                                            maxLength={10}
                                        />

                                        {isShaking && (
                                            <div className="mt-3 flex items-center justify-center gap-2 text-center font-mono text-sm text-red-400 animate-fadeIn">
                                                <Zap className="h-4 w-4" />
                                                <span>ACESSO NEGADO - CÓDIGO INVÁLIDO</span>
                                                <Zap className="h-4 w-4" />
                                            </div>
                                        )}

                                        {isUnlocking && (
                                            <div className="mt-4 space-y-2">
                                                <div className="flex items-center justify-center gap-2 font-mono text-sm text-green-400">
                                                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                                                    <span>A VERIFICAR IDENTIDADE...</span>
                                                </div>
                                                <div className="h-2 w-full overflow-hidden rounded-full bg-green-950/50">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-green-600 to-green-400 shadow-[0_0_10px_rgba(34,197,94,0.6)] transition-all duration-300"
                                                        style={{ width: `${scanProgress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isUnlocking || password.length === 0}
                                        className="group relative w-full overflow-hidden rounded-lg border-2 border-green-500/50 bg-gradient-to-r from-green-950/60 to-green-900/40 px-6 py-4 font-mono text-lg font-bold uppercase tracking-widest text-green-400 shadow-lg transition-all hover:border-green-400 hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed sm:text-xl"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/20 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="relative flex items-center justify-center gap-2">
                                            {isUnlocking ? (
                                                <>
                                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-400 border-t-transparent" />
                                                    A DESBLOQUEAR...
                                                </>
                                            ) : (
                                                <>
                                                    <Shield className="h-5 w-5" />
                                                    CONFIRMAR ACESSO
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </form>

                                {/* Status Lines */}
                                <div className="mt-6 space-y-1.5 rounded-lg border border-green-500/20 bg-black/30 p-4 font-mono text-xs text-green-400/60 backdrop-blur-sm sm:text-sm">
                                    <div className="flex items-center justify-between">
                                        <span>[SISTEMA]</span>
                                        <span className="text-green-400">OPERACIONAL</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>[PROTOCOLO]</span>
                                        <span className="text-yellow-400">AGUARDANDO</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>[ENCRIPTAÇÃO]</span>
                                        <span className="text-green-400">AES-256</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={`w-full max-w-4xl transition-all duration-1000 ${showMission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            {/* Mission Screen */}
                            <div className="animate-fadeIn flex flex-col items-center gap-6 text-center sm:gap-8">
                                {/* Badge with Image Stamp */}
                                <div className="relative mb-4">
                                    {/* Outer Glow */}
                                    <div className="absolute -inset-12 animate-pulse rounded-full bg-green-500/20 blur-3xl" style={{ animationDuration: '3s' }} />
                                    
                                    {/* Main Badge */}
                                    <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-4 border-green-400 bg-gradient-to-br from-green-950/80 to-slate-950/80 shadow-[0_0_80px_rgba(34,197,94,0.6)] backdrop-blur-sm sm:h-48 sm:w-48">
                                        <img 
                                            src="/IMG_3796.PNG" 
                                            alt="Agentes do Reino" 
                                            className="h-32 w-32 object-contain sm:h-40 sm:w-40 animate-badge-pulse"
                                        />
                                    </div>

                                    {/* Sparkles */}
                                    <Sparkles className="absolute -right-4 -top-4 h-10 w-10 text-yellow-400 animate-ping" style={{ animationDuration: '2s' }} />
                                    <Sparkles className="absolute -left-4 -bottom-4 h-8 w-8 text-yellow-400 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
                                    <Sparkles className="absolute -right-2 -bottom-2 h-6 w-6 text-green-400 animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }} />
                                </div>

                                {/* Main Message */}
                                <div className="relative w-full overflow-hidden rounded-2xl border-2 border-green-500/50 bg-gradient-to-br from-green-950/50 via-slate-950/60 to-green-900/30 p-8 shadow-[inset_0_0_40px_rgba(0,0,0,0.5),0_0_60px_rgba(34,197,94,0.3)] backdrop-blur-md sm:p-10 md:p-12">
                                    {/* Corner Brackets - Larger */}
                                    <div className="pointer-events-none absolute left-3 top-3 h-8 w-8 border-l-2 border-t-2 border-green-400" />
                                    <div className="pointer-events-none absolute right-3 top-3 h-8 w-8 border-r-2 border-t-2 border-green-400" />
                                    <div className="pointer-events-none absolute bottom-3 left-3 h-8 w-8 border-b-2 border-l-2 border-green-400" />
                                    <div className="pointer-events-none absolute bottom-3 right-3 h-8 w-8 border-b-2 border-r-2 border-green-400" />

                                    {/* Animated Border Glow */}
                                    <div className="absolute -inset-px animate-pulse rounded-2xl bg-gradient-to-r from-green-500/0 via-green-500/50 to-green-500/0 opacity-50" style={{ animationDuration: '3s' }} />

                                    <div className="relative space-y-5">
                                        <h1 className="animate-text-glow font-mono text-4xl font-bold tracking-wider text-green-400 drop-shadow-[0_0_30px_rgba(34,197,94,0.6)] sm:text-5xl md:text-6xl lg:text-7xl">
                                            PARABÉNS!
                                        </h1>
                                        <div className="space-y-3">
                                            <p className="font-sans text-xl font-medium text-green-200 sm:text-2xl md:text-3xl">
                                                Agora és um
                                            </p>
                                            <h2 className="animate-text-glow font-mono text-4xl font-bold tracking-widest text-green-400 drop-shadow-[0_0_35px_rgba(34,197,94,0.7)] sm:text-5xl md:text-6xl lg:text-7xl">
                                                AGENTE DO REINO
                                            </h2>
                                        </div>
                                    </div>
                                </div>

                                {/* Mission Statement */}
                                <div className="group relative w-full overflow-hidden rounded-2xl border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-950/30 via-slate-950/60 to-yellow-900/20 p-8 shadow-[0_0_50px_rgba(234,179,8,0.2)] backdrop-blur-md transition-all hover:shadow-[0_0_70px_rgba(234,179,8,0.3)] sm:p-10">
                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    
                                    <div className="relative space-y-4">
                                        <div className="flex items-center justify-center gap-3 font-mono text-xl font-bold uppercase tracking-wide text-yellow-400 sm:text-2xl md:text-3xl">
                                            <span className="text-2xl sm:text-3xl">⚠️</span>
                                            <span>A tua missão não é secreta:</span>
                                            <span className="text-2xl sm:text-3xl">⚠️</span>
                                        </div>
                                        <p className="text-2xl font-bold leading-relaxed text-white sm:text-3xl md:text-4xl lg:text-5xl">
                                            Viver e anunciar o amor de{' '}
                                            <span className="relative inline-block">
                                                <span className="relative z-10 text-yellow-300 drop-shadow-[0_0_25px_rgba(253,224,71,1)]">
                                                    Jesus
                                                </span>
                                                <span className="absolute inset-0 animate-pulse bg-yellow-300/40 blur-xl" />
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Bible Verse */}
                                <div className="w-full rounded-2xl border border-green-500/40 bg-gradient-to-br from-green-950/30 to-black/60 p-8 backdrop-blur-sm sm:p-10">
                                    <div className="space-y-5">
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="h-1 w-8 bg-gradient-to-r from-transparent to-green-400" />
                                            <p className="font-mono text-base font-bold uppercase tracking-wide text-green-400 sm:text-lg">
                                                Versículo da Missão
                                            </p>
                                            <div className="h-1 w-8 bg-gradient-to-l from-transparent to-green-400" />
                                        </div>
                                        
                                        <blockquote className="border-l-4 border-green-500/50 pl-6 text-lg italic leading-relaxed text-green-100 sm:text-xl md:text-2xl">
                                            "Portanto, ide e fazei discípulos de todas as nações, batizando-os em nome do Pai, do Filho e do Espírito Santo, ensinando-os a guardar todas as coisas que vos tenho ordenado. E eis que estou convosco todos os dias até à consumação do século."
                                        </blockquote>
                                        
                                        <p className="text-right text-sm font-semibold tracking-wider text-green-400 sm:text-base md:text-lg">
                                            — MATEUS 28:19-20
                                        </p>
                                    </div>
                                </div>

                                {/* Mission Status */}
                                <div className="w-full rounded-xl border border-green-500/30 bg-black/40 p-6 backdrop-blur-sm">
                                    <div className="grid gap-3 font-mono text-sm text-green-400 sm:text-base">
                                        <StatusLine text="[STATUS] ✓ AGENTE ACTIVADO" delay={300} />
                                        <StatusLine text="[AUTORIZAÇÃO] ✓ NÍVEL MÁXIMO CONCEDIDO" delay={600} />
                                        <StatusLine text="[MISSÃO] ✓ EM CURSO - DIVULGAR O EVANGELHO" delay={900} />
                                        <StatusLine text="[COMANDANTE] ✓ JESUS CRISTO" delay={1200} />
                                    </div>
                                </div>

                                {/* Final Blessing */}
                                <div className="mt-4">
                                    <p className="animate-pulse font-sans text-xl font-semibold text-green-300 sm:text-2xl">
                                        Que o Senhor te abençoe nesta jornada! 🙏
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Corner Decorations - Updated */}
                <div className="pointer-events-none absolute left-3 top-3 space-y-1 font-mono text-[10px] text-green-500/50 sm:left-4 sm:top-4 sm:text-xs">
                    <div>[SISTEMA ADR]</div>
                    <div className="flex items-center gap-1">
                        <div className="h-1 w-1 rounded-full bg-green-400 animate-pulse" />
                        <span>ONLINE</span>
                    </div>
                </div>
                <div className="pointer-events-none absolute right-3 top-3 text-right font-mono text-[10px] text-green-500/50 sm:right-4 sm:top-4 sm:text-xs">
                    <div>[MISSÃO PÚBLICA]</div>
                    <div>[NÃO SECRETO]</div>
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
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
                    20%, 40%, 60%, 80% { transform: translateX(8px); }
                }

                @keyframes text-glow {
                    0%, 100% {
                        text-shadow: 0 0 30px rgba(34, 197, 94, 0.6);
                    }
                    50% {
                        text-shadow: 0 0 50px rgba(34, 197, 94, 0.9), 0 0 80px rgba(34, 197, 94, 0.5);
                    }
                }

                @keyframes badge-pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.95; }
                }

                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }

                @keyframes scan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }

                @keyframes grid-move {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(50px, 50px); }
                }

                @keyframes typing {
                    from { opacity: 0; transform: translateX(-10px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                @keyframes flicker {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.85; }
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .animate-float {
                    animation: float linear infinite;
                }

                .animate-shake {
                    animation: shake 0.6s cubic-bezier(.36,.07,.19,.97);
                }

                .animate-text-glow {
                    animation: text-glow 3s ease-in-out infinite;
                }

                .animate-badge-pulse {
                    animation: badge-pulse 2s ease-in-out infinite;
                }

                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }

                .animate-spin-reverse {
                    animation: spin-reverse 15s linear infinite;
                }

                .animate-scan {
                    animation: scan 10s linear infinite;
                }

                .animate-typing {
                    animation: typing 0.4s ease-out;
                }

                .animate-flicker {
                    animation: flicker 2s ease-in-out infinite;
                }

                .animate-fadeIn {
                    animation: fadeIn 1s ease-out;
                }

                .bg-gradient-radial {
                    background: radial-gradient(circle, var(--tw-gradient-stops));
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
        const randomChars = Array.from({ length: 15 }, () => 
            chars[Math.floor(Math.random() * chars.length)]
        );
        setCharacters(randomChars);

        const speed = isMobile ? 12 + Math.random() * 15 : 18 + Math.random() * 25;
        const intervalTime = isMobile ? 70 : 60;
        
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
            className="absolute font-mono text-xs text-green-500 sm:text-sm"
            style={{
                left: `${index * 2.5}%`,
                top: `${position}px`,
                textShadow: '0 0 5px rgba(34, 197, 94, 0.8)',
                willChange: 'transform',
            }}
        >
            {characters.map((char, i) => (
                <div
                    key={i}
                    style={{
                        opacity: 1 - i * 0.06,
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

    return (
        <div className="flex items-center gap-2 animate-typing animate-flicker">
            <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <p>{text}</p>
        </div>
    );
}
