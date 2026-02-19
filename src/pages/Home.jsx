import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

const Home = ({ searchResults }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (searchResults) {
            setProducts(searchResults);
            setLoading(false);
        } else {
            fetchProducts();
        }
    }, [searchResults]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const specialDeals = products.filter(p => p.isSpecial);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-[#F4B400] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-16 pb-20">
            {/* Hero / Special Deals Section */}
            {!searchResults && (
                <section className="relative h-[500px] rounded-[40px] overflow-hidden group">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
                            className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                            alt="Hero"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
                    </div>

                    <div className="relative h-full flex flex-col justify-center px-12 max-w-2xl text-white space-y-6">
                        <div className="flex items-center space-x-2 bg-white/20 backdrop-blur w-fit px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest border border-white/30">
                            <Sparkles className="w-4 h-4 text-[#F4B400]" />
                            <span>Limited Time Offers</span>
                        </div>
                        <h1 className="text-6xl font-black leading-tight">
                            Empowering Rural Women Entrepreneurs<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4B400] to-[#F5E6D3]"></span>
                        </h1>
                        <p className="text-xl text-slate-300 font-medium">
                           Discover authentic handmade, organic, and locally crafted products directly from talented women artisans across rural India.
                        </p>
                        <button className="vibrant-gradient px-8 py-4 rounded-2xl font-black text-lg flex items-center space-x-3 w-fit text-[#2C1810] hover:shadow-2xl hover:shadow-yellow-900/50 transition-all hover:-translate-y-1 active:scale-95">
                            <span>Shop Deals</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </section>
            )}

            {/* Product Grid */}
            <section className="max-w-7xl mx-auto px-4">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-4xl font-black text-[#F5E6D3] tracking-tight">
                            {searchResults ? `Search Results for "${searchResults.query}"` : 'Our Collection'}
                        </h2>
                        <p className="text-[#E6D5C3] font-medium mt-2">Only the finest selection for you.</p>
                    </div>
                    <div className="hidden sm:flex items-center space-x-2 text-[#E6D5C3] font-bold">
                        <span className="text-[#F4B400]">All Products</span>
                        <span>/</span>
                        <span className="hover:text-[#F5E6D3] transition-colors cursor-pointer">Electronics</span>
                        <span>/</span>
                        <span className="hover:text-[#F5E6D3] transition-colors cursor-pointer">Design</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-20 bg-[#F5E6D3]/20 rounded-[40px] border-2 border-dashed border-[#D4A574]">
                        <p className="text-2xl font-bold text-[#E6D5C3]">No products found matching your search.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
