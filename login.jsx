const LoginPage = ({ onLogin, onRegister, user, registerError, onForgotPassword }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isResetVerifying, setIsResetVerifying] = useState(false);
    const [isResetSetting, setIsResetSetting] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetOtp, setResetOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.verified) navigate('/shop');
        else if (user) navigate('/verify');
    }, [user]);

    useEffect(() => {
        setError('');
        setConfirmPassword('');
    }, [isLogin]);

    const strength = getPasswordStrength(password);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError('');
        if (!resetEmail.trim() || !resetEmail.includes('@')) {
            setError('Fadlan geli email sax ah. (Please enter a valid email)');
            return;
        }
        setIsSubmitting(true);
        const result = await onForgotPassword(resetEmail, 'request');
        setIsSubmitting(false);
        if (result.error) {
            setError(result.error);
        } else {
            setSuccessMsg('Koodh (OTP) ayaa loo diray email-kaaga.');
            setIsResetVerifying(true);
        }
    };

    const handleVerifyResetOtp = async (e) => {
        e.preventDefault();
        setError('');
        if (resetOtp.length < 6) { setError('Fadlan geli koodh sax ah (6 xaraf).'); return; }

        setIsSubmitting(true);
        const result = await onForgotPassword(resetEmail, 'verify', resetOtp);
        setIsSubmitting(false);
        if (result.error) {
            setError(result.error);
        } else {
            setSuccessMsg('Koodhkii wuu saxmay. Fadlan geli password cusub.');
            setIsResetVerifying(false);
            setIsResetSetting(true);
        }
    };

    const handleSetNewPassword = async (e) => {
        e.preventDefault();
        setError('');
        if (newPassword.length < 8) { setError('Password waa in uu ugu yaraan 8 xaraf yahay. (Min 8 characters)'); return; }
        if (newPassword !== confirmPassword) { setError('Passwords-ku isma mid ahayn. (Passwords do not match)'); return; }

        setIsSubmitting(true);
        const result = await onForgotPassword(resetEmail, 'reset', resetOtp, newPassword);
        setIsSubmitting(false);
        if (result.error) {
            setError(result.error);
        } else {
            setSuccessMsg('Password-kaaga si guul leh ayaa loo beddelay! Fadlan Login.');
            setIsResetSetting(false);
            setIsForgotPassword(false);
            setIsLogin(true);
            setEmail(resetEmail);
            setPassword('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        if (isLogin) {
            if (!onLogin(email, password)) setError('Email ama Password qaldan. (Invalid email or password)');
        } else {
            if (!name.trim()) { setError('Fadlan geli magacaaga. (Please enter your name)'); return; }
            if (!email.trim() || !email.includes('@') || !email.includes('.')) { setError('Fadlan geli email sax ah. (Please enter a valid email)'); return; }
            if (password.length < 8) { setError('Password waa in uu ugu yaraan 8 xaraf yahay. (Min 8 characters)'); return; }
            if (password !== confirmPassword) { setError('Passwords-ku isma mid ahayn. (Passwords do not match)'); return; }

            setIsSubmitting(true);
            const result = onRegister(name, email, password);
            if (result && result.error) {
                setError(result.error);
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-6 bg-slate-50 dark:bg-zinc-950">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
                    <div className="text-center pt-10 pb-6 px-8">
                        <h1 className="text-3xl font-serif font-bold mb-2 uppercase tracking-tighter">DR BILE</h1>
                        <p className="text-zinc-500 uppercase text-xs tracking-[0.2em] font-bold">
                            {isForgotPassword ? 'Soo Celi Password-ka' : isLogin ? 'Ku soo dhawoow' : 'Sameyso Account Cusub'}
                        </p>
                    </div>

                    {!isForgotPassword && (
                        <div className="flex mx-8 mb-6 bg-zinc-100 dark:bg-zinc-800 rounded-xl p-1">
                            <button onClick={() => setIsLogin(true)} className={`flex-1 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${isLogin ? 'bg-white dark:bg-zinc-700 shadow-md text-zinc-900 dark:text-white' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`}>
                                Login
                            </button>
                            <button onClick={() => setIsLogin(false)} className={`flex-1 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${!isLogin ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A059] shadow-md text-black' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`}>
                                Sign Up
                            </button>
                        </div>
                    )}

                    {isForgotPassword ? (
                        <form onSubmit={isResetSetting ? handleSetNewPassword : isResetVerifying ? handleVerifyResetOtp : handleForgotPassword} className="px-8 pb-8 space-y-4">
                            {!isResetVerifying && !isResetSetting && (
                                <div>
                                    <p className="text-zinc-500 text-sm mb-4 text-center">Enter your email address to receive a password reset OTP.</p>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">mail</span> Email</span>
                                    </label>
                                    <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-lg p-3" placeholder="you@gmail.com" required />
                                </div>
                            )}
                            {isResetVerifying && (
                                <div>
                                    <p className="text-zinc-500 text-sm mb-4 text-center">We've sent a 6-digit code to your email.</p>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">dialpad</span> 6-Digit OTP</span>
                                    </label>
                                    <input type="text" maxLength="6" value={resetOtp} onChange={(e) => setResetOtp(e.target.value.replace(/\D/g, ''))} className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-lg p-3 text-center tracking-[0.5em] text-lg font-bold font-mono" placeholder="------" required />
                                </div>
                            )}
                            {isResetSetting && (
                                <React.Fragment>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">lock</span> New Password</span>
                                        </label>
                                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-lg p-3" placeholder="Ugu yaraan 8 xaraf" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">lock_reset</span> Confirm Password</span>
                                        </label>
                                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-lg p-3" placeholder="Ku celi password-ka" required />
                                    </div>
                                </React.Fragment>
                            )}
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-start gap-2">
                                    <span className="material-symbols-outlined text-red-500 text-sm mt-0.5">warning</span>
                                    <p className="text-red-600 dark:text-red-400 text-xs font-semibold">{error}</p>
                                </div>
                            )}
                            {successMsg && (
                                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 flex items-start gap-2">
                                    <span className="material-symbols-outlined text-green-500 text-sm mt-0.5">check_circle</span>
                                    <p className="text-green-600 dark:text-green-400 text-xs font-semibold">{successMsg}</p>
                                </div>
                            )}
                            <button type="submit" disabled={isSubmitting} className="w-full py-4 font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl mt-2 rounded-xl flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-primary dark:hover:bg-primary dark:hover:text-white disabled:opacity-50">
                                {isSubmitting ? 'Processing...' : isResetSetting ? 'Set New Password' : isResetVerifying ? 'Verify OTP' : 'Send Reset Link'}
                            </button>
                            <div className="text-center mt-6">
                                <button type="button" onClick={() => { setIsForgotPassword(false); setIsResetVerifying(false); setIsResetSetting(false); setError(''); setSuccessMsg(''); setResetEmail(''); setResetOtp(''); }} className="text-sm text-zinc-500 hover:text-primary transition-colors font-semibold">
                                    ← Back to Login
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
                            {!isLogin && (
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">person</span> Magacaaga (Full Name)</span>
                                    </label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-lg p-3" placeholder="e.g. Mohamed Abdi" required />
                                </div>
                            )}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">mail</span> Email</span>
                                </label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-lg p-3" placeholder="you@gmail.com" required />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">lock</span> Password</span>
                                    </label>
                                    {isLogin && (
                                        <button type="button" onClick={() => { setIsForgotPassword(true); setError(''); setSuccessMsg(''); }} className="text-xs font-bold text-primary hover:underline hover:text-[#c54c10] transition-colors">
                                            Forgot Password?
                                        </button>
                                    )}
                                </div>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-lg p-3" placeholder="Ugu yaraan 8 xaraf" required />
                                {!isLogin && password.length > 0 && (
                                    <div className="mt-2">
                                        <div className="flex gap-1 mb-1">
                                            {[1, 2, 3, 4, 5].map(level => (
                                                <div key={level} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${strength.score >= level ? strength.color : 'bg-zinc-200 dark:bg-zinc-700'}`}></div>
                                            ))}
                                        </div>
                                        <p className={`text-[10px] font-bold uppercase tracking-wider ${strength.score <= 1 ? 'text-red-500' : strength.score <= 2 ? 'text-orange-500' : strength.score <= 3 ? 'text-yellow-600' : 'text-green-500'}`}>
                                            {strength.label}
                                        </p>
                                    </div>
                                )}
                            </div>
                            {!isLogin && (
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">lock_reset</span> Xaqiiji Password (Confirm)</span>
                                    </label>
                                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`w-full bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 transition-colors ${confirmPassword && password !== confirmPassword ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-700'}`} placeholder="Ku celi password-ka" required />
                                    {confirmPassword && password !== confirmPassword && (
                                        <p className="text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-xs">error</span>
                                            Passwords-ku isma mid ahayn
                                        </p>
                                    )}
                                </div>
                            )}
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-start gap-2">
                                    <span className="material-symbols-outlined text-red-500 text-sm mt-0.5">warning</span>
                                    <p className="text-red-600 dark:text-red-400 text-xs font-semibold">{error}</p>
                                </div>
                            )}
                            <button type="submit" disabled={isSubmitting} className={`w-full py-4 font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl mt-2 rounded-xl flex items-center justify-center gap-2 ${isLogin ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-primary dark:hover:bg-primary dark:hover:text-white' : 'bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black hover:brightness-110'} disabled:opacity-50`}>
                                {isSubmitting ? (
                                    <React.Fragment>
                                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                        Sending OTP...
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>{isLogin ? 'login' : 'person_add'}</span>
                                        {isLogin ? 'Login' : 'Create Account'}
                                    </React.Fragment>
                                )}
                            </button>

                            <div className="mt-6 flex items-center">
                                <hr className="flex-1 border-zinc-200 dark:border-zinc-700" />
                                <span className="px-4 text-[10px] uppercase font-bold tracking-widest text-zinc-400">Ama (Or)</span>
                                <hr className="flex-1 border-zinc-200 dark:border-zinc-700" />
                            </div>

                            <div className="space-y-3 mt-4">
                                <button type="button" className="w-full py-3 px-4 bg-white border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 rounded-xl flex items-center justify-center gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors shadow-sm">
                                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                    <span className="text-sm font-bold text-zinc-700 dark:text-zinc-200">Continue with Google</span>
                                </button>
                                <button type="button" className="w-full py-3 px-4 bg-[#1877F2] text-white rounded-xl flex items-center justify-center gap-3 hover:bg-[#1864D9] transition-colors shadow-sm">
                                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.954 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.898 10.124-5.864 10.124-11.852z" fill="currentColor" /></svg>
                                    <span className="text-sm font-bold">Continue with Facebook</span>
                                </button>
                                <button type="button" className="w-full py-3 px-4 bg-zinc-900 dark:bg-zinc-800 text-white border border-transparent dark:border-zinc-700 rounded-xl flex items-center justify-center gap-3 hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors shadow-sm">
                                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>phone_iphone</span>
                                    <span className="text-sm font-bold">Sign up with Phone Number</span>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
