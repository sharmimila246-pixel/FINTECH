import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, MapPin, Globe, ChevronRight, CheckCircle2 } from 'lucide-react';

const SellerApplication = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        otp: '',
        residentialAddress: '',
        district: '',
        state: '',
        language: 'English'
    });
    const [otpSent, setOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const districts = ['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem', 'Tirunelveli', 'Erode', 'Vellore', 'Thoothukudi', 'Thanjavur'];
    const states = ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Maharashtra', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'West Bengal'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const sendOtp = () => {
        if (formData.mobileNumber.length === 10) {
            setOtpSent(true);
            alert('OTP sent to ' + formData.mobileNumber + ' (Mock: 1234)');
        } else {
            alert('Please enter a valid 10-digit mobile number.');
        }
    };

    const verifyOtp = () => {
        if (formData.otp === '1234') {
            setIsVerified(true);
            alert('Phone number verified successfully!');
        } else {
            alert('Invalid OTP. Please use 1234.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isVerified) {
            alert('Please verify your mobile number first.');
            return;
        }
        setStep(2); // Success state
    };

    if (step === 2) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass max-w-lg w-full p-12 text-center rounded-[40px] shadow-2xl"
                >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 mb-4">Application Submitted!</h2>
                    <p className="text-slate-500 font-medium mb-8">
                        Thank you, {formData.fullName}. Your application to become a seller is being reviewed. We will contact you on {formData.mobileNumber} soon.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="vibrant-gradient text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl"
                    >
                        Back to Home
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black text-slate-900 mb-4">
                        Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">Seller</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-medium">Empowering rural women entrepreneurs across India.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-[40px] shadow-2xl p-8 sm:p-12"
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    placeholder="Enter your full name"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all text-lg font-medium"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* Mobile Number & OTP */}
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Mobile Number</label>
                            <div className="flex space-x-4">
                                <div className="relative flex-1">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="tel"
                                        name="mobileNumber"
                                        required
                                        pattern="[0-9]{10}"
                                        placeholder="10-digit mobile number"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all text-lg font-medium"
                                        value={formData.mobileNumber}
                                        onChange={handleInputChange}
                                        disabled={isVerified}
                                    />
                                </div>
                                {!isVerified && (
                                    <button
                                        type="button"
                                        onClick={sendOtp}
                                        className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold transition-all active:scale-95"
                                    >
                                        {otpSent ? 'Resend' : 'Send OTP'}
                                    </button>
                                )}
                                {isVerified && (
                                    <div className="flex items-center space-x-2 text-green-600 font-bold px-4">
                                        <CheckCircle2 className="w-5 h-5" />
                                        <span>Verified</span>
                                    </div>
                                )}
                            </div>

                            {otpSent && !isVerified && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-4 flex space-x-4"
                                >
                                    <input
                                        type="text"
                                        name="otp"
                                        placeholder="Enter 4-digit OTP"
                                        className="flex-1 bg-white border-2 border-indigo-100 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg font-bold text-center tracking-widest"
                                        value={formData.otp}
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={verifyOtp}
                                        className="vibrant-gradient text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-indigo-100 transition-all active:scale-95"
                                    >
                                        Verify
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* Residential Address */}
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Residential Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-6 w-5 h-5 text-slate-400" />
                                <textarea
                                    name="residentialAddress"
                                    required
                                    placeholder="Street name, Village/City, PIN code"
                                    rows="3"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all text-lg font-medium"
                                    value={formData.residentialAddress}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* District & State */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">District</label>
                                <select
                                    name="district"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all text-lg font-medium appearance-none"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select District</option>
                                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">State</label>
                                <select
                                    name="state"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all text-lg font-medium appearance-none"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select State</option>
                                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Language Preference */}
                        <div className="space-y-4">
                            <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1 flex items-center space-x-2">
                                <Globe className="w-4 h-4" />
                                <span>Language Preference</span>
                            </label>
                            <div className="flex space-x-6">
                                {['English', 'Tamil'].map(lang => (
                                    <label key={lang} className="flex items-center space-x-3 cursor-pointer group">
                                        <div className="relative">
                                            <input
                                                type="radio"
                                                name="language"
                                                value={lang}
                                                className="peer sr-only"
                                                checked={formData.language === lang}
                                                onChange={handleInputChange}
                                            />
                                            <div className="w-6 h-6 border-2 border-slate-300 rounded-full peer-checked:border-indigo-600 transition-all"></div>
                                            <div className="absolute inset-0 m-auto w-3 h-3 bg-indigo-600 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                                        </div>
                                        <span className={`text-lg font-bold transition-colors ${formData.language === lang ? 'text-indigo-600' : 'text-slate-500 group-hover:text-slate-700'}`}>
                                            {lang}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full vibrant-gradient text-white py-5 rounded-[24px] font-black text-xl shadow-2xl shadow-indigo-200 flex items-center justify-center space-x-3 hover:-translate-y-1 transition-all active:scale-95 mt-12"
                        >
                            <span>Submit Application</span>
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default SellerApplication;
