import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const products = [
    {
        id: 1,
        name: 'NeoGlow Headphones',
        price: 299.99,
        description: 'Immersive sound with vibrant RGB lighting.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        category: 'Electronics',
        isSpecial: true,
    },
    {
        id: 2,
        name: 'Quantum Watch',
        price: 199.99,
        description: 'Precision timekeeping with a futuristic design.',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
        category: 'Accessories',
        isSpecial: false,
    },
    {
        id: 3,
        name: 'Lumina Keyboard',
        price: 149.99,
        description: 'Mechanical precision for elite gamers.',
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80',
        category: 'Electronics',
        isSpecial: true,
    },
    {
        id: 4,
        name: 'Aether Backpack',
        price: 89.99,
        description: 'Sleek, durable, and ready for adventure.',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
        category: 'Travel',
        isSpecial: false,
    },
];

app.get('/api/products', (req, res) => {
    const { search } = req.query;
    if (search) {
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase())
        );
        return res.json(filtered);
    }
    res.json(products);
});

app.get('/api/products/special', (req, res) => {
    const special = products.filter(p => p.isSpecial);
    res.json(special);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
