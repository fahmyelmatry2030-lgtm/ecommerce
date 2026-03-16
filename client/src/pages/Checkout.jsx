import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Ticket, ShieldCheck, MapPin } from 'lucide-react';
import CreditCardForm from '../components/CreditCardForm';

const Checkout = () => {
    const { cart, getTotal } = useApp();
    const [step, setStep] = useState('payment'); // 'payment' or 'success'
    const navigate = useNavigate();

    const handlePayment = (cardData) => {
        console.log('Processing payment...', cardData);
        // Simulate API call
        setTimeout(() => {
            setStep('success');
        }, 2000);
    };

    if (cart.length === 0 && step !== 'success') {
        return (
            <div style={{ height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '60px', marginBottom: '20px' }}>🛒</div>
                <h2>السلة فارغة</h2>
                <p style={{ color: 'var(--t3)', marginBottom: '30px' }}>يجب إضافة منتجات للسلة لإتمام عملية الدفع</p>
                <Link to="/" className="btn btn-gold" style={{ padding: '15px 40px' }}>العودة للتسوق</Link>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '40px' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--t2)', textDecoration: 'none', marginBottom: '30px' }}>
                <ArrowRight size={16} /> العودة للتسوق
            </Link>

            <AnimatePresence mode="wait">
                {step === 'payment' ? (
                    <motion.div 
                        key="payment-step"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="glass-panel" 
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '50px', padding: '50px', borderRadius: '40px' }}
                    >
                        {/* Summary Area */}
                        <div>
                            <h1 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '30px' }}>ملخص الطلب</h1>
                            
                            <div style={{ display: 'grid', gap: '20px', marginBottom: '40px' }}>
                                {cart.map(item => (
                                    <div key={`${item.id}-${item.storeId}`} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                        <div style={{ width: '50px', height: '50px', background: 'var(--bg2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{item.emoji}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 800 }}>{item.name}</div>
                                            <div style={{ color: 'var(--t3)', fontSize: '13px' }}>الكمية: {item.qty}</div>
                                        </div>
                                        <div style={{ fontWeight: 900 }}>{(item.price * item.qty).toLocaleString()} IQD</div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ padding: '30px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: 'var(--t2)' }}>
                                    <span>المجموع الفرعي</span>
                                    <span>{getTotal().toLocaleString()} IQD</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: 'var(--t2)' }}>
                                    <span>رسوم التوصيل</span>
                                    <span>مجاني ✨</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '15px', borderTop: '1px solid var(--border)', fontWeight: 900, fontSize: '22px', color: 'var(--gold)' }}>
                                    <span>الإجمالي</span>
                                    <span>{getTotal().toLocaleString()} IQD</span>
                                </div>
                            </div>
                            
                            <div style={{ marginTop: '30px', display: 'flex', gap: '15px', color: 'var(--t3)', fontSize: '13px' }}>
                                <ShieldCheck size={18} /> ضمان حماية المشتري لـ 30 يوم
                            </div>
                        </div>

                        {/* Payment Area */}
                        <div style={{ borderRight: '1px solid var(--border)', paddingRight: '50px' }}>
                            <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '30px' }}>الدفع بالبطاقة</h2>
                            <CreditCardForm total={getTotal()} onSubmit={handlePayment} />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="success-step"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel" 
                        style={{ padding: '80px', borderRadius: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}
                    >
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.2 }}
                            style={{ width: '100px', height: '100px', background: 'var(--green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', margin: '0 auto 30px' }}
                        >
                            <CheckCircle2 size={50} />
                        </motion.div>
                        <h2 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '20px' }}>تم الدفع بنجاح!</h2>
                        <p style={{ color: 'var(--t2)', fontSize: '18px', marginBottom: '40px' }}>
                            شكراً لثقتك بنا. تم استلام طلبك وبدأنا في تجهيزه الآن. ستصلك رسالة تأكيد قريباً.
                        </p>
                        <div style={{ background: 'var(--bg2)', padding: '20px', borderRadius: '20px', marginBottom: '30px', fontSize: '14px', color: 'var(--t3)' }}>
                            رقم العملية: #TRX-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </div>
                        <button className="btn btn-primary" style={{ width: '100%', padding: '18px' }} onClick={() => navigate('/')}>العودة للرئيسية</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Checkout;
