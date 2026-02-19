import React, { useState, useRef, useEffect } from 'react';
import {
    Search, ShoppingCart, User, Menu, X, Home, Percent,
    ChevronDown, UserCircle, Package, Truck, HelpCircle, LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onSearch, user, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchValue);
        navigate('/');
    };

    const handleLogout = () => {
        onLogout();
        setIsProfileOpen(false);
        navigate('/');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="glass sticky top-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 outline-none">
                    <div className="w-10 h-10 vibrant-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
                        A
                    </div>
                    <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent hidden sm:block">
                        AESTHETIQ
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-8">
                    <NavLink to="/" icon={<Home className="w-4 h-4" />} label="Home" />
                    <NavLink to="#" icon={<Percent className="w-4 h-4" />} label="Special Deals" />
                </div>

                {/* Search Bar */}
                <form
                    onSubmit={handleSearchSubmit}
                    className="hidden md:flex flex-1 max-w-md mx-8 relative"
                >
                    <input
                        type="text"
                        placeholder="Search for premium products..."
                        className="w-full bg-slate-100/50 border border-slate-200 rounded-full py-2 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 vibrant-gradient text-white rounded-full hover:shadow-md transition-shadow"
                    >
                        <Search className="w-4 h-4" />
                    </button>
                </form>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <button className="p-2 text-slate-600 hover:text-indigo-600 transition-colors relative">
                        <ShoppingCart className="w-6 h-6" />
                        <span className="absolute top-0 right-0 w-4 h-4 bg-pink-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">2</span>
                    </button>

                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full transition-all active:scale-95 group"
                            >
                                <div className="w-8 h-8 vibrant-gradient rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm">
                                    {user.name.charAt(0)}
                                </div>
                                <span className="font-bold text-slate-700 hidden sm:block">{user.id}</span>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 overflow-hidden z-50"
                                    >
                                        <div className="px-4 py-3 border-b border-slate-50 mb-2">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Logged in as</p>
                                            <p className="text-sm font-black text-slate-800 truncate">{user.email}</p>
                                        </div>

                                        <DropdownItem icon={<UserCircle />} label="Profile" onClick={() => setIsProfileOpen(false)} />
                                        <DropdownItem icon={<Package />} label="My Orders" onClick={() => setIsProfileOpen(false)} />
                                        <DropdownItem icon={<Truck />} label="Track Order" onClick={() => setIsProfileOpen(false)} />
                                        <DropdownItem icon={<HelpCircle />} label="Help & Support" onClick={() => setIsProfileOpen(false)} />

                                        <div className="mt-2 pt-2 border-t border-slate-50">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-colors font-bold"
                                            >
                                                <LogOut className="w-5 h-5" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link to="/login" className="hidden sm:flex items-center space-x-2 bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-all hover:shadow-lg hover:shadow-indigo-200 active:scale-95">
                            <User className="w-4 h-4" />
                            <span>Login</span>
                        </Link>
                    )}

                    <button
                        className="lg:hidden p-2 text-slate-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 p-6 flex flex-col space-y-4 shadow-xl animate-in fade-in slide-in-from-top-4">
                    <NavLink to="/" icon={<Home className="w-4 h-4" />} label="Home" onClick={() => setIsMenuOpen(false)} />
                    <NavLink to="#" icon={<Percent className="w-4 h-4" />} label="Special Deals" onClick={() => setIsMenuOpen(false)} />
                    <div className="relative mt-2">
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-slate-100 border border-slate-200 rounded-lg py-2 pl-4 pr-10"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                                <Search className="w-5 h-5 text-slate-400" />
                            </button>
                        </form>
                    </div>
                    {user ? (
                        <div className="space-y-2 pt-4 border-t border-slate-100">
                            <p className="px-4 text-xs font-bold text-slate-400 uppercase">Account</p>
                            <div className="grid grid-cols-2 gap-2">
                                <MobileNavItem label="Profile" onClick={() => setIsMenuOpen(false)} />
                                <MobileNavItem label="Orders" onClick={() => setIsMenuOpen(false)} />
                                <MobileNavItem label="Track" onClick={() => setIsMenuOpen(false)} />
                                <MobileNavItem label="Support" onClick={() => setIsMenuOpen(false)} />
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full bg-red-50 text-red-500 py-3 rounded-xl font-bold mt-2"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            onClick={() => setIsMenuOpen(false)}
                            className="w-full vibrant-gradient text-white py-3 rounded-xl font-bold text-center"
                        >
                            Login / Sign Up
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

const NavLink = ({ to, icon, label, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className="flex items-center space-x-2 font-medium transition-colors text-slate-600 hover:text-indigo-600"
    >
        {icon}
        <span>{label}</span>
    </Link>
);

const DropdownItem = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all font-bold group"
    >
        <span className="text-slate-400 group-hover:text-indigo-500 transition-colors">
            {React.cloneElement(icon, { className: 'w-5 h-5' })}
        </span>
        <span>{label}</span>
    </button>
);

const MobileNavItem = ({ label, onClick }) => (
    <button
        onClick={onClick}
        className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm font-bold active:bg-slate-100"
    >
        {label}
    </button>
);

export default Navbar;
