const React = require('react');

const LoginPage = () => {
    const isForgotPassword = false;
    const isLogin = true;
    const isResetVerifying = false;
    const isResetSetting = false;
    const isSubmitting = false;

    return (
        <div className="min-h-screen">
            {isForgotPassword ? (
                <form>
                    {isResetSetting ? (
                        <div>Setting</div>
                    ) : (
                        <div>Not setting</div>
                    )}
                </form>
            ) : (
                <form>
                    {!isLogin && (
                        <div>Not login</div>
                    )}
                    <button className={`btn ${isLogin ? 'a' : 'b'} disabled`}>
                        {isSubmitting ? (
                            <div>Wait</div>
                        ) : (
                            <div>Go</div>
                        )}
                    </button>
                    <div>
                        <button>
                            <svg><path d="M1 1" fill="red" /></svg>
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};
