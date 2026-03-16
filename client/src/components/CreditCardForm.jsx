import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, User, Calendar, Lock, ShieldCheck } from 'lucide-react';

const CreditCardForm = ({ onSubmit, total }) => {
    const [cardData, setCardData] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });
    const [focused, setFocused] = useState('');

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        
        if (name === 'number') {
            value = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
            if (value.length > 19) return;
        }
        if (name === 'expiry') {
            value = value.replace(/\//g, '').replace(/(\d{2})/, '$1/').trim();
            if (value.length > 5) return;
        }
        if (name === 'cvv') {
            if (value.length > 3) return;
        }

        setCardData({ ...cardData, [name]: value });
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            {/* Visual Card */}
            <motion.div 
                initial={{ rotateY: 0 }}
                animate={{ rotateY: focused === 'cvv' ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                style={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: '240px', 
                    marginBottom: '40px', 
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                }}
            >
                {/* Front */}
                <div style={{ 
                    position: 'absolute', 
                    width: '100%', 
                    height: '100%', 
                    backfaceVisibility: 'hidden', 
                    background: 'linear-gradient(135deg, #1e293b, #0f172a)', 
                    borderRadius: '24px', 
                    padding: '30px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    overflow: 'hidden'
                }}>
                    <div className="mesh-bg" style={{ opacity: 0.3 }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1 }}>
                        <div style={{ width: '50px', height: '35px', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', borderRadius: '6px' }}></div>
                        <CreditCard size={32} color="rgba(255,255,255,0.5)" />
                    </div>
                    
                    <div style={{ zIndex: 1 }}>
                        <p style={{ fontSize: '24px', letterSpacing: '3px', fontWeight: 600, color: '#fff', marginBottom: '20px', fontFamily: 'monospace' }}>
                            {cardData.number || '•••• •••• •••• ••••'}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <div>
                                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '5px' }}>Card Holder</p>
                                <p style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>{cardData.name.toUpperCase() || 'YOUR NAME'}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '5px' }}>Expires</p>
                                <p style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>{cardData.expiry || 'MM/YY'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back */}
                <div style={{ 
                    position: 'absolute', 
                    width: '100%', 
                    height: '100%', 
                    backfaceVisibility: 'hidden', 
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(135deg, #0f172a, #1e293b)', 
                    borderRadius: '24px', 
                    padding: '0', 
                    display: 'flex', 
                    flexDirection: 'column',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                }}>
                    <div style={{ height: '50px', background: '#000', marginTop: '30px', width: '100%' }}></div>
                    <div style={{ padding: '20px 30px' }}>
                        <div style={{ background: '#fff', height: '40px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 15px' }}>
                            <span style={{ color: '#000', fontStyle: 'italic', fontWeight: 700 }}>{cardData.cvv}</span>
                        </div>
                        <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginTop: '10px' }}>
                            هذه البطاقة ملك للبنك المصدر. يرجى التوقيع في المكان المخصص.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Inputs */}
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(cardData); }} style={{ display: 'grid', gap: '20px' }}>
                <div className="input-group">
                    <label style={{ display: 'block', color: 'var(--t2)', fontSize: '14px', marginBottom: '8px', fontWeight: 600 }}>رقم البطاقة</label>
                    <div style={{ position: 'relative' }}>
                        <CreditCard size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--t3)' }} />
                        <input 
                            name="number"
                            className="btn" 
                            style={{ width: '100%', background: 'var(--bg2)', border: '1px solid var(--border)', paddingLeft: '45px', color: '#fff', textAlign: 'left', letterSpacing: '2px' }}
                            placeholder="0000 0000 0000 0000"
                            value={cardData.number}
                            onChange={handleInputChange}
                            onFocus={() => setFocused('number')}
                            required
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label style={{ display: 'block', color: 'var(--t2)', fontSize: '14px', marginBottom: '8px', fontWeight: 600 }}>اسم حامل البطاقة</label>
                    <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--t3)' }} />
                        <input 
                            name="name"
                            className="btn" 
                            style={{ width: '100%', background: 'var(--bg2)', border: '1px solid var(--border)', paddingLeft: '45px', color: '#fff', textAlign: 'left' }}
                            placeholder="FULL NAME"
                            value={cardData.name}
                            onChange={handleInputChange}
                            onFocus={() => setFocused('name')}
                            required
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="input-group">
                        <label style={{ display: 'block', color: 'var(--t2)', fontSize: '14px', marginBottom: '8px', fontWeight: 600 }}>تاريخ الانتهاء</label>
                        <div style={{ position: 'relative' }}>
                            <Calendar size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--t3)' }} />
                            <input 
                                name="expiry"
                                className="btn" 
                                style={{ width: '100%', background: 'var(--bg2)', border: '1px solid var(--border)', paddingLeft: '45px', color: '#fff', textAlign: 'left' }}
                                placeholder="MM/YY"
                                value={cardData.expiry}
                                onChange={handleInputChange}
                                onFocus={() => setFocused('expiry')}
                                required
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label style={{ display: 'block', color: 'var(--t2)', fontSize: '14px', marginBottom: '8px', fontWeight: 600 }}>الرمز (CVV)</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--t3)' }} />
                            <input 
                                name="cvv"
                                type="password"
                                className="btn" 
                                style={{ width: '100%', background: 'var(--bg2)', border: '1px solid var(--border)', paddingLeft: '45px', color: '#fff', textAlign: 'left' }}
                                placeholder="•••"
                                value={cardData.cvv}
                                onChange={handleInputChange}
                                onFocus={() => setFocused('cvv')}
                                required
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%', padding: '20px', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
                    <ShieldCheck size={22} /> دفع {total.toLocaleString()} IQD بأمان
                </button>
                
                <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--t3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                    <Lock size={12} /> جميع معاملاتك مشفرة وآمنة وفق معايير PCI-DSS
                </p>
            </form>
        </div>
    );
};

export default CreditCardForm;
