import React, { useState, useEffect } from 'react';
import { getAgent } from '../api';
import { Users, DollarSign, TrendingUp, Award } from 'lucide-react';

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
        { label: 'عدد الزبائن', value: stats.referrals || 0, icon: <Users />, color: 'pur' },
        { label: 'إجمالي المبيعات', value: (stats.sales || 0).toLocaleString() + ' IQD', icon: <TrendingUp />, color: 'gld' },
        { label: 'العمولة المستحقة', value: (stats.commission || 0).toLocaleString() + ' IQD', icon: <DollarSign />, color: 'grn' },
        { label: 'الرتبة الحالية', value: 'مبتدئ', icon: <Award />, color: 'pnk' },
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

            <div className="stores-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: '40px' }}>
                {kpis.map((k, i) => (
                    <div key={i} className={`kpi-card ${k.color}`}>
                        <div className="kpi-icon">{k.icon}</div>
                        <div className="kpi-lbl">{k.label}</div>
                        <div className="kpi-num">{k.value}</div>
                    </div>
                ))}
            </div>

            <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px' }}>
                <h3 style={{ marginBottom: '20px', fontWeight: 800 }}>الزبائن المنتسبين إليك</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table className="dash-table">
                        <thead>
                            <tr>
                                <th>اسم الزبون</th>
                                <th>تاريخ الانتساب</th>
                                <th>إجمالي المشتريات</th>
                                <th>العمولة (5%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#475A7A' }}>لا يوجد زبائن حالياً</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
