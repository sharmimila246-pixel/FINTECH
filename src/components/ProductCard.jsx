import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-[#EFE2D1] border border-[#D4A574] shadow-lg group rounded-3xl overflow-hidden hover-scale card-shine flex flex-col h-full"
        >
            {/* Product Image */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-[#F5E6D3]/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#2C1810] shadow-sm">
                    {product.category}
                </div>
                {product.isSpecial && (
                    <div className="absolute top-4 right-4 vibrant-gradient text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        DEAL
                    </div>
                )}
            </div>

            {/* Product Details */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < 4 ? 'text-[#F4B400] fill-[#F4B400]' : 'text-[#D4A574]'}`} />
                    ))}
                    <span className="text-xs text-[#E6D5C3] ml-1">(42)</span>
                </div>

                <h3 className="text-xl font-bold text-[#2C1810] mb-2 group-hover:text-[#F4B400] transition-colors">
                    {product.name}
                </h3>

                <p className="text-[#7A4A21] text-sm line-clamp-2 mb-4 flex-grow">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-xs text-[#E6D5C3] font-medium">Price</span>
                        <span className="text-2xl font-black text-[#F4B400]">${product.price}</span>
                    </div>
                    <button className="p-3 bg-[#F4B400] text-[#2C1810] rounded-2xl hover:bg-[#D89C00] transition-all active:scale-90 shadow-lg shadow-yellow-900/30 hover:shadow-yellow-900/50">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
