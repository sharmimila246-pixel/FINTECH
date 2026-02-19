import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import axios from 'axios';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [user, setUser] = useState(null); // Managed user session

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults(null);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/products?search=${query}`);
      setSearchResults({
        query,
        products: response.data
      });
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar onSearch={handleSearch} user={user} onLogout={logoutUser} />
        <main className="max-w-7xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home searchResults={searchResults ? searchResults.products : null} />} />
            <Route path="/login" element={<Login onLogin={loginUser} />} />
          </Routes>
        </main>

        {/* Premium Footer */}
        <footer className="glass mt-20 py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 vibrant-gradient rounded-lg flex items-center justify-center text-white font-bold shadow-lg">A</div>
                <span className="text-xl font-black bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                  AESTHETIQ
                </span>
              </div>
              <p className="text-slate-500 text-sm">
                The world's most premium digital marketplace for high-end lifestyle essentials.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-800">Shop</h4>
              <ul className="text-slate-500 text-sm space-y-2">
                <li className="hover:text-indigo-600 cursor-pointer transition-colors">Electronics</li>
                <li className="hover:text-indigo-600 cursor-pointer transition-colors">Accessories</li>
                <li className="hover:text-indigo-600 cursor-pointer transition-colors">New Arrivals</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-800">Company</h4>
              <ul className="text-slate-500 text-sm space-y-2">
                <li className="hover:text-indigo-600 cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-indigo-600 cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-indigo-600 cursor-pointer transition-colors">Journal</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-800">Support</h4>
              <ul className="text-slate-500 text-sm space-y-2">
                <li className="hover:text-indigo-600 cursor-pointer transition-colors">Shipping</li>
                <li className="hover:text-indigo-600 cursor-pointer transition-colors">Returns</li>
                <li className="hover:text-indigo-600 cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
            <p>© 2026 Aesthetiq Inc. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="hover:text-slate-600 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-slate-600 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
