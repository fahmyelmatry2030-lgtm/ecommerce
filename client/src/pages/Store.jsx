import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducts, getStores } from '../api';
import { useApp } from '../context/AppContext';
import { Star, Search, Filter, ShoppingCart, Share2, ArrowRight } from 'lucide-react';

const Store = () => {
    const { id } = useParams();
    const { mode, addToCart } = useApp();
    const [store, setStore] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeCat, setActiveCat] = useState('all');

    useEffect(() => {
        const load = async () => {
            try {
                const storesRes = await getStores();
                const found = storesRes.data.find(s => s.id === parseInt(id));
                setStore(found);
                
                const prodsRes = await getProducts(id);
                setProducts(prodsRes.data);
                setLoading(false);
            } catch (err) {
                console.error('Store Load Error:', err);
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const cats = ['all', ...new Set(products.map(p => p.category))];
    const filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesCat = activeCat === 'all' || p.category === activeCat;
        return matchesSearch && matchesCat;
    });

    if (loading) return (
        <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '50px', height: '50px', border: '5px solid var(--border)', borderTopColor: 'var(--p1)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        </div>
    );
    if (!store) return <div style={{ textAlign: 'center', padding: '100px', fontSize: '24px' }}>عذراً، المحل غير موجود</div>;

    return (
        <div className="animate-fade">
            <header style={{ paddingTop: '40px', marginBottom: '40px' }}>
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--t2)', textDecoration: 'none', fontSize: '14px', marginBottom: '20px' }}>
                    <ArrowRight size={16} /> العودة للمحلات
                </Link>

                <div className="glass-panel" style={{ padding: '40px', borderRadius: '30px', display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div className="store-emoji" style={{ background: store.bg, width: '120px', height: '120px', fontSize: '60px', marginBottom: 0 }}>{store.emoji}</div>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                            <h1 style={{ fontSize: '36px', fontWeight: 900 }}>{store.name}</h1>
                            {store.verified && <span style={{ background: 'var(--green)', color: 'white', padding: '4px 12px', borderRadius: '50px', fontSize: '10px', fontWeight: 900 }}>✓ موثق</span>}
                        </div>
                        <p style={{ color: 'var(--t2)', fontSize: '18px', marginBottom: '20px' }}>{store.description}</p>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Star size={18} fill="var(--gold)" color="var(--gold)" />
                                <span style={{ fontWeight: 800 }}>{store.rating}</span>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '15px', fontWeight: 800, color: 'var(--p3)' }}>
                                {store.category}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="glass-panel" style={{ padding: '15px', borderRadius: '20px', marginBottom: '40px', display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
                    <Search style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--t3)' }} size={20} />
                    <input 
                        type="text" 
                        placeholder="ابحث عن منتج معين..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '14px', padding: '15px 50px 15px 15px', color: 'white', fontFamily: 'inherit' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {cats.map(c => (
                        <button 
                            key={c}
                            onClick={() => setActiveCat(c)}
                            style={{ 
                                padding: '12px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                                background: activeCat === c ? 'var(--p1)' : 'rgba(255,255,255,0.05)',
                                color: activeCat === c ? 'white' : 'var(--t2)',
                                fontWeight: 800
                            }}
                        >{c === 'all' ? 'الكل' : c}</button>
                    ))}
                </div>
            </div>

            <div className="products-grid">
                {filtered.map(product => (
                    <div key={product.id} className="glass-panel product-card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ height: '200px', background: 'rgba(255,255,255,0.02)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px', marginBottom: '20px' }}>{product.emoji}</div>
                            <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '10px' }}>{product.name}</h3>
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '15px' }}>
                            <span style={{ fontSize: '24px', fontWeight: 900, color: 'var(--gold)' }}>
                                {(mode === 'wholesale' ? product.wholesalePrice : product.retailPrice).toLocaleString()}
                            </span>
                            <span style={{ fontSize: '12px', color: 'var(--t3)', fontWeight: 800 }}>IQD</span>
                            {mode === 'wholesale' && (
                                <span style={{ fontSize: '13px', color: 'var(--t3)', textDecoration: 'line-through', marginRight: '5px' }}>
                                    {product.retailPrice.toLocaleString()}
                                </span>
                            )}
                        </div>
                        {mode === 'wholesale' && (
                            <div style={{ background: 'rgba(124, 58, 237, 0.1)', color: 'var(--p3)', fontSize: '11px', fontWeight: 800, padding: '6px 12px', borderRadius: '8px', width: 'fit-content', marginBottom: '20px' }}>
                                الحد الأدنى للطلب: {product.minQty} قطعة
                            </div>
                        )}
                        <button 
                            className="btn btn-primary" 
                            style={{ marginTop: 'auto', width: '100%' }}
                            onClick={() => addToCart(product, parseInt(id))}
                        >
                            <ShoppingCart size={18} /> أضف للسلة
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Store;
