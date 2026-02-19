import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
    const [role, setRole] = useState('customer'); // 'customer' or 'seller'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(`Logging in as ${role}:`, { email, password });

        const userId = email.split('@')[0] || 'User123';
        const userData = {
            id: userId,
            email: email,
            role: role,
            name: userId.charAt(0).toUpperCase() + userId.slice(1)
        };

        onLogin(userData);

        if (role === 'customer') {
            navigate('/');
        } else {
            // Redirect sellers to the application form
            navigate('/seller-application');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass w-full max-w-md p-8 rounded-[40px] shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 vibrant-gradient opacity-10 blur-3xl -mr-16 -mt-16 rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 vibrant-gradient opacity-10 blur-3xl -ml-16 -mb-16 rounded-full"></div>

                <div className="text-center mb-10 relative">
                    <div className="w-16 h-16 vibrant-gradient rounded-2xl mx-auto flex items-center justify-center text-white font-black text-2xl mb-4 shadow-lg">
                        A
                    </div>
                    <h2 className="text-3xl font-black text-slate-800">Welcome Back</h2>
                    <p className="text-slate-500 mt-2 font-medium">Join the elite marketplace.</p>
                </div>

                <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
                    <button
                        onClick={() => setRole('customer')}
                        className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 ${role === 'customer'
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <User className="w-4 h-4" />
                        <span>Customer</span>
                    </button>
                    <button
                        onClick={() => setRole('seller')}
                        className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 ${role === 'seller'
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Seller</span>
                    </button>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="email"
                                required
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all"
                                placeholder="hello@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="password"
                                required
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full vibrant-gradient text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 flex items-center justify-center space-x-2 hover:-translate-y-1 transition-all active:scale-95"
                    >
                        <span>Login as {role.charAt(0).toUpperCase() + role.slice(1)}</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
