const AdminPage = () => {
    // Basic States
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isDark, setIsDark] = useState(true);

    // Initial Dashboard States (Clean Slate)
    const [stats, setStats] = useState({ revenue: 0, orders: 0, customers: 0, products: 0 });
    const [recentOrders, setRecentOrders] = useState([]);
    
    // Product Management
    const [productsList, setProductsList] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });

    // Admin Credentials State
    const [adminCreds, setAdminCreds] = useState({ email: 'admin@drbile.com', password: 'admin123' });
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === adminCreds.email && password === adminCreds.password) {
            setIsLoggedIn(true);
        } else {
            alert('Invalid Admin Credentials');
        }
    };

    const handleUpdateSettings = (e) => {
        e.preventDefault();
        setAdminCreds({ email: newEmail || adminCreds.email, password: newPassword || adminCreds.password });
        alert('Admin Credentials Updated Successfully');
        setNewEmail(''); setNewPassword('');
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const addedProduct = { id: Date.now(), ...newProduct };
        setProductsList([...productsList, addedProduct]);
        setStats(prev => ({ ...prev, products: prev.products + 1 }));
        setNewProduct({ name: '', price: '', stock: '' });
    };

    const handleDeleteProduct = (id) => {
        setProductsList(productsList.filter(p => p.id !== id));
        setStats(prev => ({ ...prev, products: prev.products - 1 }));
    };

    const LucideIcon = ({ d, size=20 }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
    );

    const iconPaths = {
        Dashboard: "M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z",
        Products: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12",
        Orders: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z M3 6h18 M16 10a4 4 0 0 1-8 0",
        Users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M12 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
        Settings: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
    };

    if (!isLoggedIn) {
        return (
            <div className={`min-h-screen flex items-center justify-center p-6 ${isDark ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
                <div className={`w-full max-w-md p-8 rounded-2xl shadow-2xl border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-serif font-bold uppercase tracking-tighter text-[#D4AF37]">Admin Access</h1>
                        <p className="text-xs uppercase tracking-[0.2em] font-bold mt-2 opacity-50">DR BILE Control Panel</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin Email" className={`w-full p-4 rounded-xl border outline-none font-medium transition-all ${isDark ? 'bg-zinc-800 border-zinc-700 focus:border-[#D4AF37]' : 'bg-zinc-50 border-zinc-200 focus:border-[#D4AF37]'}`} required />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={`w-full p-4 rounded-xl border outline-none font-medium transition-all ${isDark ? 'bg-zinc-800 border-zinc-700 focus:border-[#D4AF37]' : 'bg-zinc-50 border-zinc-200 focus:border-[#D4AF37]'}`} required />
                        <button type="submit" className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl">Secure Login</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen flex ${isDark ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <aside className={`w-64 flex flex-col border-r p-6 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                <div className="text-[#D4AF37] text-2xl font-serif font-bold mb-8 uppercase tracking-tighter">DR BILE</div>
                <nav className="flex-1 space-y-2">
                    {['dashboard', 'products', 'orders', 'users', 'settings'].map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full flex items-center gap-3 p-3 rounded-lg font-bold capitalize transition-all ${activeTab === tab ? 'bg-[#D4AF37] text-black shadow-lg' : isDark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}>
                            <LucideIcon d={iconPaths[tab.charAt(0).toUpperCase() + tab.slice(1)]} />
                            {tab}
                        </button>
                    ))}
                </nav>
                <button onClick={() => setIsDark(!isDark)} className={`w-full mt-4 p-3 rounded-lg border font-bold ${isDark ? 'border-zinc-800 hover:bg-zinc-800' : 'border-zinc-200 hover:bg-zinc-100'}`}>Toggle Theme</button>
                <div className="mt-4 flex items-center gap-3 border-t pt-4 border-zinc-200 dark:border-zinc-800">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A059] p-1"><div className="w-full h-full bg-zinc-900 rounded-full"></div></div>
                    <div className="text-sm font-bold truncate">{adminCreds.email}</div>
                </div>
            </aside>

            <main className="flex-1 p-10 overflow-auto">
                {activeTab === 'dashboard' && (
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <div className="grid grid-cols-4 gap-6">
                            {[
                                { label: 'Total Revenue', value: `$${stats.revenue}`, icon: 'Dashboard' },
                                { label: 'Total Orders', value: stats.orders, icon: 'Orders' },
                                { label: 'Active Users', value: stats.customers, icon: 'Users' },
                                { label: 'Product Stock', value: stats.products, icon: 'Products' }
                            ].map((stat, i) => (
                                <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <p className="text-sm font-bold uppercase tracking-wider opacity-60">{stat.label}</p>
                                        <div className="p-2 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37]"><LucideIcon d={iconPaths[stat.icon]} /></div>
                                    </div>
                                    <h3 className="text-4xl font-bold">{stat.value}</h3>
                                </div>
                            ))}
                        </div>
                        <h2 className="text-xl font-bold mt-8 mb-4">Recent Activity</h2>
                        <div className={`p-8 text-center rounded-2xl border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                            {recentOrders.length === 0 ? (
                                <div className="opacity-50 font-medium">No recent orders found. All systems operational.</div>
                            ) : (
                                <table className="w-full text-left">
                                    <thead><tr><th>Order ID</th><th>Customer</th><th>Status</th><th>Total</th></tr></thead>
                                    <tbody>{/* Render orders */}</tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-bold">Product Management</h1>
                        </div>
                        <div className={`p-6 rounded-2xl border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                            <form onSubmit={handleAddProduct} className="flex gap-4 mb-6">
                                <input type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="Sunglasses Model" className={`flex-1 p-3 rounded-lg border outline-none ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`} required />
                                <input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} placeholder="Price $" className={`w-32 p-3 rounded-lg border outline-none ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`} required />
                                <input type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} placeholder="Stock qty" className={`w-32 p-3 rounded-lg border outline-none ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`} required />
                                <button type="submit" className="bg-[#D4AF37] text-black font-bold px-6 py-3 rounded-lg hover:brightness-110">Add</button>
                            </form>
                            <div className="space-y-2">
                                {productsList.length === 0 ? <p className="opacity-50">No products added yet.</p> : productsList.map(p => (
                                    <div key={p.id} className={`flex justify-between items-center p-4 rounded-xl border ${isDark ? 'bg-zinc-800/50 border-zinc-700' : 'bg-slate-50 border-zinc-200'}`}>
                                        <div className="font-bold">{p.name} <span className="opacity-60 ml-2 font-normal">${p.price} | Stock: {p.stock}</span></div>
                                        <button onClick={() => handleDeleteProduct(p.id)} className="text-red-500 font-bold px-3 py-1 bg-red-500/10 rounded">Delete</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold">Customer Profiles</h1>
                        <div className={`p-8 text-center rounded-2xl border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                            <div className="opacity-50">Customer base empty on clean slate launch.</div>
                        </div>
                    </div>
                )}
                {activeTab === 'orders' && (
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold">Order Tracking</h1>
                        <div className={`p-8 text-center rounded-2xl border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                            <div className="opacity-50">No active orders right now.</div>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="space-y-6 max-w-xl">
                        <h1 className="text-3xl font-bold">Admin Security</h1>
                        <div className={`p-8 rounded-2xl border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                            <h2 className="font-bold mb-4">Update Login Credentials</h2>
                            <form onSubmit={handleUpdateSettings} className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase font-bold tracking-widest opacity-60 mb-2">New Admin Email</label>
                                    <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder={adminCreds.email} className={`w-full p-4 rounded-xl border outline-none ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`} />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-bold tracking-widest opacity-60 mb-2">New Password</label>
                                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" className={`w-full p-4 rounded-xl border outline-none ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`} />
                                </div>
                                <button type="submit" className="bg-[#D4AF37] text-black font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:brightness-110 w-full mt-2">Save Changes</button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
