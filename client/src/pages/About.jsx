import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    const stats = [
        { label: 'محل موثق', value: '500+', icon: <ShieldCheck size={24} /> },
        { label: 'مستخدم نشط', value: '50k+', icon: <Users size={24} /> },
        { label: 'جائزة تميز', value: '12', icon: <Award size={24} /> },
    ];

    const values = [
        { title: 'الشفافية المطلقة', desc: 'نؤمن بوضوح الأسعار والفرق الصريح بين الجملة والمفرد لضمان أفضل تجربة للمستهلك والتاجر.' },
        { title: 'دعم الاقتصاد المحلي', desc: 'نهدف لتمكين المحلات العراقية والوكلاء من الوصول لجمهور أكبر من خلال تكنولوجيا متطورة.' },
        { title: 'الجودة والتوثيق', desc: 'كل متجر على منصتنا يخضع لعملية توثيق صارمة لضمان موثوقية المنتجات والتعاملات.' }
    ];

    return (
        <div className="animate-fade" style={{ overflow: 'hidden' }}>
            {/* Cinematic Hero */}
            <section style={{ 
                height: '80vh', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                textAlign: 'center',
                position: 'relative',
                marginBottom: '100px'
            }}>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ zIndex: 1 }}
                >
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 25px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', border: '1px solid var(--border)', marginBottom: '30px', fontSize: '14px', fontWeight: 800, color: 'var(--gold)' }}>
                        <Target size={18} /> قصتنا ورؤيتنا المستقبلية
                    </div>
                    <h1 style={{ fontSize: 'min(72px, 12vw)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px' }}>
                        نعيد تعريف<br/>
                        <span style={{ background: 'linear-gradient(135deg, var(--gold), #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>التجارة في العراق</span>
                    </h1>
                    <p style={{ maxWidth: '700px', margin: '0 auto 40px', fontSize: '20px', color: 'var(--t2)', lineHeight: 1.6 }}>
                        نحن لسنا مجرد منصة للتسوق، نحن جسر يربط بين كبار الموردين والمستهلك النهائي، مع الالتزام التام بمعايير الجهارة والنزاهة.
                    </p>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <div style={{ width: '2px', height: '60px', background: 'linear-gradient(to bottom, var(--gold), transparent)', margin: '0 auto' }}></div>
                    </motion.div>
                </motion.div>
                
                {/* Background Decor */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'var(--p-glow)', filter: 'blur(150px)', opacity: 0.1, borderRadius: '50%' }}></div>
                </div>
            </section>

            {/* Stats Grid */}
            <div className="container" style={{ marginBottom: '150px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
                    {stats.map((s, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -10 }}
                            className="glass-panel" 
                            style={{ padding: '40px', textAlign: 'center', borderRadius: '30px' }}
                        >
                            <div style={{ color: 'var(--gold)', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
                            <div style={{ fontSize: '42px', fontWeight: 900, marginBottom: '5px' }}>{s.value}</div>
                            <div style={{ color: 'var(--t3)', fontWeight: 700 }}>{s.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Our Values */}
            <section style={{ marginBottom: '150px' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
                    <div style={{ order: window.innerWidth < 768 ? 2 : 1 }}>
                        <h2 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '40px' }}>القيم التي تحركنا</h2>
                        <div style={{ display: 'grid', gap: '30px' }}>
                            {values.map((v, i) => (
                                <div key={i} style={{ display: 'flex', gap: '20px' }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--gold)', marginTop: '8px', flexShrink: 0 }}></div>
                                    <div>
                                        <h4 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>{v.title}</h4>
                                        <p style={{ color: 'var(--t2)', lineHeight: 1.6 }}>{v.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ order: 1, position: 'relative' }}>
                        <div style={{ width: '100%', aspectRatio: '1', background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '150px', transform: 'rotate(-5deg)', border: '1px solid var(--border)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
                            🇮🇶
                        </div>
                        <div style={{ position: 'absolute', inset: '20px', border: '2px solid var(--gold)', borderRadius: '40px', transform: 'rotate(2deg)', zIndex: -1 }}></div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="container" style={{ marginBottom: '100px' }}>
                <div className="glass-panel" style={{ padding: '80px 40px', borderRadius: '50px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(124,58,237,0.05), rgba(236,72,153,0.05))' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '20px' }}>انضم لمستقبل التجارة في العراق</h2>
                    <p style={{ color: 'var(--t2)', fontSize: '18px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                        سواء كنت صاحب محل، تاجر جملة، أو زبون يبحث عن الأناقة، مكانك هنا.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <Link to="/" className="btn btn-primary" style={{ padding: '15px 40px' }}>ابدأ التسوق الآن</Link>
                        <Link to="/representative" className="btn btn-gold" style={{ padding: '15px 40px' }}>كن شريكاً لنا</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
