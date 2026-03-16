import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerAgent } from '../api';
import { Share2, Check, Copy, UserPlus, Trophy, CreditCard } from 'lucide-react';

const Representative = () => {
    const [agent, setAgent] = useState(() => {
        try { return JSON.parse(localStorage.getItem('myAgent') || 'null'); } catch(e) { return null; }
    });
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', phone: '', city: 'بغداد', style: 'واتساب وسوشيال ميديا' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await registerAgent(form);
            localStorage.setItem('myAgent', JSON.stringify(res.data));
            setAgent(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Register Error:', err);
            setLoading(false);
            alert('حدث خطأ أثناء التسجيل، يرجى المحاولة لاحقاً');
        }
    };

    const copyLink = () => {
        const link = `${window.location.origin}?ref=${agent.id}`;
        navigator.clipboard.writeText(link);
        alert('تم نسخ الرابط بنجاح!');
    };

    if (agent) {
        return (
            <div className="animate-fade" style={{ maxWidth: '800px', margin: '60px auto' }}>
                <div className="glass-panel" style={{ padding: '60px', borderRadius: '40px', textAlign: 'center' }}>
                    <div style={{ fontSize: '80px', marginBottom: '30px' }}>✨</div>
                    <h1 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '15px' }}>مرحباً {agent.name}!</h1>
                    <p style={{ color: 'var(--t2)', fontSize: '18px', marginBottom: '40px' }}>أنت الآن وكيل معتمد في سوق العراق. لقد تم تجهيز رابطك الفريد، ابدأ في بناء ثروتك الآن.</p>
                    
                    <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px', background: 'rgba(255,255,255,0.02)', borderStyle: 'dashed', marginBottom: '40px' }}>
                        <div style={{ color: 'var(--t3)', fontSize: '13px', fontWeight: 800, marginBottom: '15px', textTransform: 'uppercase' }}>رابط التسويق الخاص بك</div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div style={{ flex: 1, background: 'var(--bg3)', padding: '18px', borderRadius: '15px', color: 'var(--p3)', fontWeight: 700, fontSize: '18px', direction: 'ltr', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {window.location.origin}?ref={agent.id}
                            </div>
                            <button onClick={copyLink} className="btn btn-primary" style={{ padding: '0 30px' }}><Copy size={20} /> نسخ</button>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                        <div className="glass-panel" style={{ padding: '20px', borderRadius: '20px' }}>
                            <Trophy size={24} color="var(--gold)" style={{ marginBottom: '10px' }} />
                            <div style={{ fontSize: '13px', color: 'var(--t2)' }}>العمولة</div>
                            <div style={{ fontSize: '20px', fontWeight: 900 }}>5% ثابتة</div>
                        </div>
                        <div className="glass-panel" style={{ padding: '20px', borderRadius: '20px' }}>
                            <CreditCard size={24} color="var(--green)" style={{ marginBottom: '10px' }} />
                            <div style={{ fontSize: '13px', color: 'var(--t2)' }}>أقل حد للسحب</div>
                            <div style={{ fontSize: '20px', fontWeight: 900 }}>25,000 IQD</div>
                        </div>
                    </div>
                    
                    <Link to="/dashboard" className="btn btn-gold" style={{ width: '100%', padding: '20px', fontSize: '18px' }}>📊 الانتقال إلى لوحة الأرباح</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade" style={{ maxWidth: '1000px', margin: '60px auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', alignItems: 'center' }}>
                <div>
                    <div style={{ color: 'var(--p3)', fontWeight: 900, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <UserPlus size={20} /> بوابة المناديب والقادة
                    </div>
                    <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '20px', lineHeight: 1.2 }}>حوّل هاتفك إلى<br/><span style={{ background: 'linear-gradient(135deg, var(-- gold), var(--gold2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>مصدر دخل حقيقي</span></h1>
                    <p style={{ color: 'var(--t2)', fontSize: '18px', marginBottom: '30px' }}>سجل الآن مجاناً واربح عمولة 5% على كل طلب يتم من خلال رابطك. نحن نتكفل بالشحن والتوصيل، وأنت تجني الأرباح.</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {['عمولة فورية 5%', 'دفع أسبوعي للأرباح', 'دعم فني مخصص للمناديب'].map((t, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 700 }}>
                                <div style={{ width: '24px', height: '24px', background: 'var(--green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Check size={14} /></div>
                                {t}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '40px', borderRadius: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '30px', textAlign: 'center' }}>سجل بياناتك للبدء</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--t3)', fontSize: '13px', fontWeight: 800, marginBottom: '8px' }}>الاسم الكامل</label>
                            <input required className="btn" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', textAlign: 'right', color: 'white' }} value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="مثال: محمد جاسم العراقي" />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--t3)', fontSize: '13px', fontWeight: 800, marginBottom: '8px' }}>رقم الهاتف (الواتساب)</label>
                            <input required type="tel" className="btn" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', textAlign: 'left', direction: 'ltr', color: 'white' }} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="07XXXXXXXX" />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--t3)', fontSize: '13px', fontWeight: 800, marginBottom: '8px' }}>المحافظة</label>
                            <select className="btn" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'white', appearance: 'none' }} value={form.city} onChange={e => setForm({...form, city: e.target.value})}>
                                {['بغداد', 'البصرة', 'الموصل', 'أربيل', 'النجف', 'كربلاء'].map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: '20px', padding: '18px' }}>
                            {loading ? 'جاري إنشاء حسابك...' : '✅ ابدأ الآن واحصل على رابطك'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Representative;
