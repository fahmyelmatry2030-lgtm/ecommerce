import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShoppingCart, Handshake, LayoutDashboard, Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
    const { mode, setMode, cart, getTotal } = useApp();
    const [cartOpen, setCartOpen] = useState(false);
    const location = useLocation();

    return (
        <div className="layout-root">
            <div className="mesh-bg"></div>
            
            <header className="container">
                <nav className="nav glass-panel">
                    <div className="container nav-content">
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none' }}>
                            <div style={{ width: '45px', height: '45px', background: 'linear-gradient(135deg, var(--p1), var(--p2))', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: '0 4px 15px var(--p-glow)' }}>🛒</div>
                            <div className="logo-text">
                                <div style={{ fontWeight: 900, color: '#fff', fontSize: '20px', lineHeight: 1 }}>سوق العراق</div>
                                <div style={{ fontSize: '11px', color: 'var(--t2)', letterSpacing: '1px' }}>SOUQ AL-IRAQ</div>
                            </div>
                        </Link>

                        <div className="mode-toggle">
                            <button 
                                className={`mode-btn ${mode === 'wholesale' ? 'active wholesale' : ''}`}
                                onClick={() => setMode('wholesale')}
                            >🏭 جملة</button>
                            <button 
                                className={`mode-btn ${mode === 'retail' ? 'active retail' : ''}`}
                                onClick={() => setMode('retail')}
                            >🛍️ مفرد</button>
                        </div>

                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <Link to="/representative" className="glass-panel" style={{ width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--t1)' }} title="بوابة المندوبين">
                                <Handshake size={20} />
                            </Link>
                            <button className="glass-panel" onClick={() => setCartOpen(true)} style={{ position: 'relative', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--t1)', border: 'none', cursor: 'pointer' }}>
                                <ShoppingCart size={20} />
                                {cart.length > 0 && (
                                    <span style={{ position: 'absolute', top: '-5px', left: '-5px', background: 'var(--pink)', color: 'white', fontSize: '10px', fontWeight: 900, padding: '2px 6px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(236,72,153,0.5)' }}>
                                        {cart.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            <div className={`mode-announcement ${mode}`} style={{ 
                background: mode === 'wholesale' ? 'rgba(124,58,237,0.1)' : 'rgba(245,158,11,0.1)',
                color: mode === 'wholesale' ? 'var(--p1)' : 'var(--gold)',
                textAlign: 'center', padding: '10px', fontSize: '13px', fontWeight: 700
            }}>
                {mode === 'wholesale' ? '✨ أنت تتسوق الآن بأسعار الجملة المخصصة للتجار' : '✨ أنت تتسوق الآن بأسعار المفرد (القطعة الواحدة)'}
            </div>

            <main className="container" style={{ paddingBottom: '100px' }}>
                {children}
            </main>

            <footer className="glass-panel" style={{ margin: '40px auto 20px', borderRadius: '24px', padding: '40px 0', borderLeft: 'none', borderRight: 'none', borderBottom: 'none' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', marginBottom: '20px' }}>🛒</div>
                    <div style={{ fontWeight: 800, fontSize: '20px', marginBottom: '5px' }}>سوق العراق</div>
                    <div style={{ color: 'var(--t3)', fontSize: '14px' }}>© 2026 جميع الحقوق محفوظة — النسخة الفاخرة</div>
                </div>
            </footer>

            {/* Cart Drawer */}
            {cartOpen && (
                <>
                    <div className="cart-overlay" onClick={() => setCartOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', zIndex: 2000 }}></div>
                    <aside className="cart-drawer glass-panel" style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: 'min(400px, 90vw)', zIndex: 2001, borderRight: 'none', borderRadius: '0 30px 30px 0', padding: '30px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '22px', fontWeight: 900 }}>السلة الذكية</h3>
                            <button onClick={() => setCartOpen(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', color: 'white', cursor: 'pointer' }}><X size={20} /></button>
                        </div>
                        
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {cart.length === 0 ? (
                                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--t3)' }}>
                                    <div style={{ fontSize: '60px', marginBottom: '20px' }}>🛒</div>
                                    <p>سلة المشتريات فارغة حالياً</p>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={`${item.id}-${item.storeId}`} style={{ display: 'flex', gap: '15px', padding: '15px 0', borderBottom: '1px solid var(--border)' }}>
                                        <div style={{ width: '60px', height: '60px', background: 'var(--bg2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' }}>{item.emoji}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 800 }}>{item.name}</div>
                                            <div style={{ color: 'var(--p3)', fontWeight: 900 }}>{item.price.toLocaleString()} IQD</div>
                                            <div style={{ fontSize: '12px', color: 'var(--t3)' }}>الكمية: {item.qty}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div style={{ paddingTop: '30px', borderTop: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                    <span style={{ color: 'var(--t2)' }}>إجمالي الطلب</span>
                                    <span style={{ fontSize: '24px', fontWeight: 900, color: 'var(--gold)' }}>{getTotal().toLocaleString()} IQD</span>
                                </div>
                                <button className="btn btn-gold" style={{ width: '100%', padding: '18px', fontSize: '18px' }}>🚀 إرسال الطلب عبر الواتساب</button>
                            </div>
                        )}
                    </aside>
                </>
            )}
        </div>
    );
};

export default Layout;
