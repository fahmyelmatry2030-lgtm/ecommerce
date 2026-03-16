const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Data Path
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Data
const initialData = {
    stores: [
        { id: 1, name: 'محل الأناقة الفاخر', category: 'ملابس وأزياء', emoji: '👔', color: '#6C3CE1', bg: 'linear-gradient(135deg,#6C3CE1,#8B5CF6)', description: 'أفخم الأزياء العربية والعالمية بأسعار تنافسية', rating: 4.9, products: 48, verified: true },
        { id: 2, name: 'متجر الإلكترونيات', category: 'إلكترونيات', emoji: '📱', color: '#0EA5E9', bg: 'linear-gradient(135deg,#0EA5E9,#38BDF8)', description: 'أحدث الأجهزة الإلكترونية والإكسسوارات', rating: 4.7, products: 120, verified: true },
        { id: 3, name: 'بيت الذهب والمجوهرات', category: 'مجوهرات', emoji: '💍', color: '#F59E0B', bg: 'linear-gradient(135deg,#F59E0B,#FCD34D)', description: 'مجوهرات وذهب عيار 21 و 18 بأفضل الأسعار', rating: 5.0, products: 65, verified: true },
        { id: 4, name: 'سوق العطور الفاخرة', category: 'عطور وكاندل', emoji: '🌹', color: '#EC4899', bg: 'linear-gradient(135deg,#EC4899,#F472B6)', description: 'عطور أصلية فرنسية وعربية فاخرة', rating: 4.8, products: 89, verified: true }
    ],
    products: {
        1: [
            { id: 101, name: 'ثوب صوري فاخر', emoji: '👕', wholesalePrice: 35000, retailPrice: 48000, unit: 'IQD', minQty: 10, stock: 450, discount: 10, category: 'أثواب' },
            { id: 102, name: 'عباية مطرزة نسائية', emoji: '👗', wholesalePrice: 55000, retailPrice: 75000, unit: 'IQD', minQty: 5, stock: 120, discount: 0, category: 'عبايات' }
        ],
        2: [
            { id: 201, name: 'آيفون 15 برو ماكس', emoji: '📱', wholesalePrice: 1200000, retailPrice: 1450000, unit: 'IQD', minQty: 2, stock: 30, discount: 0, category: 'هواتف' }
        ]
    },
    agents: [],
    referrals: []
};

// Load or Initialize Data
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

const getData = () => JSON.parse(fs.readFileSync(DATA_FILE));
const saveData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// API Routes
app.get('/api/stores', (req, res) => {
    res.json(getData().stores);
});

app.get('/api/products/:storeId', (req, res) => {
    const products = getData().products[req.params.storeId] || [];
    res.json(products);
});

app.post('/api/agents/register', (req, res) => {
    const { name, phone, city, style } = req.body;
    const db = getData();
    const newAgent = {
        id: 'AGT' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        name, phone, city, style,
        referrals: 0, sales: 0, commission: 0,
        joined: new Date().toISOString().split('T')[0]
    };
    db.agents.push(newAgent);
    saveData(db);
    res.json(newAgent);
});

app.get('/api/agents/:id', (req, res) => {
    const agent = getData().agents.find(a => a.id === req.params.id);
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    res.json(agent);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
