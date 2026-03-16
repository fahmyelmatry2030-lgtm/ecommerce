import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStores } from '../api';
import { Star, ShieldCheck, TrendingUp, Handshake } from 'lucide-react';

const Home = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getStores().then(res => {
            setStores(res.data);
            setLoading(false);
        }).catch(err => {
            console.error('Home Fetch Error:', err);
            setLoading(false);
        });
    }, []);

    if (loading) return (
        <div style={{ height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <div style={{ width: '50px', height: '50px', border: '5px solid var(--border)', borderTopColor: 'var(--p1)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <p style={{ color: 'var(--t2)', fontWeight: 700 }}>يتم تحميل المتاجر الفاخرة...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    return (
        <div className="animate-fade">
            <section className="hero">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 20px', background: 'rgba(124, 58, 237, 0.1)', color: 'var(--p3)', borderRadius: '100px', fontSize: '12px', fontWeight: 800, marginBottom: '24px' }}>
                    <ShieldCheck size={14} /> الأول في العراق — جميع المحلات موثقة
                </div>
                <h1>تسوّق من أفخم<br/><span style={{ background: 'linear-gradient(135deg, var(--p1), var(--pink))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>متاجر العراق</span> في مكان واحد</h1>
                <p>اكتشف عالم الجملة والمفرد بتصميم عصري. بضغطة واحدة يمكنك التحقق من الفرق في الأسعار واختيار الأنسب لميزانيتك.</p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <a href="#stores" className="btn btn-primary">🛒 تصفح المحلات</a>
                    <Link to="/representative" className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'white' }}>🤝 انضم كمندوب</Link>
                </div>
            </section>

            <div className="section-head" id="stores">
                <div className="section-title">المحلات والوكلاء</div>
                <div style={{ color: 'var(--t3)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={16} /> نشاط المتاجر في تزايد
                </div>
            </div>

            <div className="stores-grid">
                {/* Special Representative Card */}
                <Link to="/representative" className="store-card glass-panel" style={{ textDecoration: 'none', border: '1px solid var(--gold)', background: 'linear-gradient(135deg, rgba(245,158,11,0.05), transparent)' }}>
                    <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--gold)', color: 'black', padding: '4px 12px', borderRadius: '50px', fontSize: '10px', fontWeight: 900 }}>VIP MEMBER</div>
                    <div className="store-emoji" style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold2))', color: 'black' }}>🤝</div>
                    <h3 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '10px', color: 'var(--gold)' }}>بوابة المندوبين</h3>
                    <p style={{ color: 'var(--t2)', fontSize: '14px', marginBottom: '20px' }}>هل لديك جمهور؟ انضم إلينا الآن وروج للمنتجات واحصل على عمولات مجزية فورية.</p>
                    <div style={{ marginTop: 'auto', padding: '10px 20px', border: '1px solid var(--gold)', borderRadius: '12px', color: 'var(--gold)', fontSize: '13px', fontWeight: 800 }}>سجل الآن مجاناً</div>
                </Link>

                {stores.map(store => (
                    <Link to={`/store/${store.id}`} key={store.id} className="store-card glass-panel" style={{ textDecoration: 'none' }}>
                        {store.verified && <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--green)', color: 'white', padding: '4px 12px', borderRadius: '50px', fontSize: '10px', fontWeight: 900 }}>MOUTHAQ ✓</div>}
                        <div className="store-emoji" style={{ background: store.bg }}>{store.emoji}</div>
                        <h3 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '5px' }}>{store.name}</h3>
                        <div style={{ color: 'var(--p3)', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>{store.category}</div>
                        <p style={{ color: 'var(--t2)', fontSize: '14px', marginBottom: '20px', height: '45px', overflow: 'hidden' }}>{store.description}</p>
                        
                        <div style={{ marginTop: 'auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Star size={16} fill="var(--gold)" color="var(--gold)" />
                                <span style={{ fontWeight: 800 }}>{store.rating}</span>
                                <span style={{ color: 'var(--t3)', fontSize: '12px' }}>({store.products})</span>
                            </div>
                            <div className="btn-primary" style={{ padding: '8px 12px', borderRadius: '10px', fontSize: '12px' }}>تصفح الآن →</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
