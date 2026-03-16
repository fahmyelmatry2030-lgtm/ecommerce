import React, { useState, useEffect } from 'react';
import { getAgent } from '../api';
import { Users, DollarSign, TrendingUp, Award, MessageSquare, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [agent, setAgent] = useState(JSON.parse(localStorage.getItem('myAgent') || 'null'));
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (agent) {
            getAgent(agent.id).then(res => {
                setStats(res.data);
                setLoading(false);
            }).catch(err => {
                setStats(agent);
                setLoading(false);
            });
        }
    }, [agent]);

    if (!agent) return <div style={{ textAlign: 'center', padding: '100px' }}>يرجى التسجيل أولاً كمندوب</div>;
    if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>جاري تحميل البيانات...</div>;

    const kpis = [
        { label: 'عدد الزبائن', value: stats.referrals || 0, icon: <Users size={24} />, color: 'var(--p1)', glow: 'var(--p-glow)' },
        { label: 'إجمالي المبيعات', value: (stats.sales || 0).toLocaleString() + ' IQD', icon: <TrendingUp size={24} />, color: 'var(--gold)', glow: 'var(--gold2)' },
        { label: 'العمولة المستحقة', value: (stats.commission || 0).toLocaleString() + ' IQD', icon: <DollarSign size={24} />, color: 'var(--green)', glow: 'rgba(34,197,94,0.3)' },
        { label: 'الرتبة الحالية', value: 'عضو ذهبي', icon: <Award size={24} />, color: 'var(--pink)', glow: 'rgba(236,72,153,0.3)' },
    ];

    const messages = [
        { id: 1, to: 'المكتب الرئيسي', subject: 'استفسار عن عمولة', status: 'delivered', date: '2026-03-15' },
        { id: 2, to: 'تاجر الملابس', subject: 'توفير موديل جديد', status: 'pending', date: '2026-03-16' },
    ];

    return (
        <div className="animate-fade" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 28px' }}>
            <div className="agent-prof glass-panel">
                <div className="agent-av">👨‍💼</div>
                <div className="agent-d">
                    <h2 style={{ fontSize: '24px', fontWeight: 900 }}>لوحة تحكم: {agent.name}</h2>
                    <div className="agent-id">ID: {agent.id}</div>
                    <div className="agent-tags">
                        <span className="agent-tag at-city">{agent.city}</span>
                        <span className="agent-tag at-join">انضم في: {agent.joined}</span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '50px' }}>
                {kpis.map((k, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-panel" 
                        style={{ padding: '30px', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}
                    >
                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: k.color, opacity: 0.1, borderRadius: '50%', filter: 'blur(30px)' }}></div>
                        <div style={{ color: k.color, marginBottom: '20px', background: 'rgba(255,255,255,0.05)', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{k.icon}</div>
                        <div style={{ color: 'var(--t2)', fontSize: '14px', fontWeight: 700, marginBottom: '5px' }}>{k.label}</div>
                        <div style={{ fontSize: '24px', fontWeight: 900 }}>{k.value}</div>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
                {/* Referrals table */}
                <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px' }}>
                    <h3 style={{ marginBottom: '25px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '10px' }}><Users size={20} color="var(--p1)" /> الزبائن المنتسبين</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="dash-table">
                            <thead>
                                <tr>
                                    <th>الاسم</th>
                                    <th>التاريخ</th>
                                    <th>المشتريات</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center', padding: '40px', color: 'var(--t3)' }}>لا يوجد زبائن حالياً</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Messaging Log */}
                <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                        <h3 style={{ fontWeight: 900, display: 'flex', alignItems: 'center', gap: '10px' }}><MessageSquare size={20} color="var(--gold)" /> سجل المراسلات</h3>
                        <button className="btn btn-primary" style={{ padding: '8px 15px', fontSize: '12px' }}>رسالة جديدة <Send size={12} /></button>
                    </div>
                    <div style={{ display: 'grid', gap: '15px' }}>
                        {messages.map(m => (
                            <div key={m.id} style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '15px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '14px' }}>{m.to}</div>
                                    <div style={{ color: 'var(--t3)', fontSize: '12px' }}>{m.subject}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '10px', color: 'var(--t3)', marginBottom: '5px' }}>{m.date}</div>
                                    <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '50px', background: m.status === 'delivered' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)', color: m.status === 'delivered' ? 'var(--green)' : 'var(--gold)', fontWeight: 800 }}>
                                        {m.status === 'delivered' ? 'تم الوصول' : 'قيد الانتظار'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
