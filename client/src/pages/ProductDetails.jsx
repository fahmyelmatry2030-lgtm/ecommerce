import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, getReviews, addReview } from '../api';
import { useApp } from '../context/AppContext';
import { ShoppingCart, Star, ArrowRight, ShieldCheck, Clock, Share2 } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const { mode, addToCart } = useApp();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const [reviewForm, setReviewForm] = useState({ user: '', rating: 5, comment: '' });

    useEffect(() => {
        const load = async () => {
            try {
                const [pRes, rRes] = await Promise.all([getProduct(id), getReviews(id)]);
                setProduct(pRes.data);
                setReviews(rRes.data);
                if (mode === 'wholesale') setQty(pRes.data.minQty);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        load();
    }, [id, mode]);

    const handleAddReview = async (e) => {
        e.preventDefault();
        try {
            const res = await addReview(id, reviewForm);
            setReviews([res.data, ...reviews]);
            setReviewForm({ user: '', rating: 5, comment: '' });
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="loader"></div></div>;
    if (!product) return <div style={{ textAlign: 'center', padding: '100px' }}>المنتج غير موجود</div>;

    const currentPrice = mode === 'wholesale' ? product.wholesalePrice : product.retailPrice;

    return (
        <div className="animate-fade" style={{ paddingTop: '40px' }}>
            <Link to={`/store/${product.storeId}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--t2)', textDecoration: 'none', marginBottom: '30px' }}>
                <ArrowRight size={16} /> العودة للمتجر
            </Link>

            <div className="glass-panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '50px', padding: '50px', borderRadius: '40px' }}>
                {/* Visual Area */}
                <div style={{ background: 'var(--bg2)', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '150px', height: '450px', position: 'relative', overflow: 'hidden' }}>
                    {product.emoji}
                </div>

                {/* Info Area */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                        <span style={{ background: 'rgba(124,58,237,0.1)', color: 'var(--p3)', padding: '5px 15px', borderRadius: '50px', fontSize: '12px', fontWeight: 800 }}>{product.category}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', fontWeight: 700 }}>
                            <Star size={16} fill="var(--gold)" color="var(--gold)" /> 4.9 (120 تقييم)
                        </div>
                    </div>

                    <h1 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '10px' }}>{product.name}</h1>
                    <p style={{ color: 'var(--t2)', fontSize: '18px', marginBottom: '30px' }}>هذا المنتج عالي الجودة متوفر حصرياً في متجرنا. يتميز بتصميمه الفريد وكفاءته العالية في الاستخدام اليومي.</p>

                    <div style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid var(--border)', marginBottom: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '5px' }}>
                            <span style={{ fontSize: '40px', fontWeight: 900, color: 'var(--gold)' }}>{currentPrice.toLocaleString()}</span>
                            <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--t3)' }}>IQD</span>
                        </div>
                        {mode === 'wholesale' ? (
                            <div style={{ color: 'var(--p3)', fontWeight: 800, fontSize: '13px' }}>✨ سعر الجملة — الحد الأدنى: {product.minQty} قطع</div>
                        ) : (
                            <div style={{ color: 'var(--t3)', textDecoration: 'line-through', fontSize: '14px' }}>السعر السابق: {(currentPrice + 5000).toLocaleString()} IQD</div>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg3)', borderRadius: '15px', padding: '5px' }}>
                            <button onClick={() => setQty(Math.max(mode === 'wholesale' ? product.minQty : 1, qty - 1))} style={{ width: '40px', height: '40px', border: 'none', background: 'none', color: 'white', cursor: 'pointer', fontSize: '20px' }}>-</button>
                            <span style={{ width: '50px', textAlign: 'center', fontWeight: 900, fontSize: '18px' }}>{qty}</span>
                            <button onClick={() => setQty(qty + 1)} style={{ width: '40px', height: '40px', border: 'none', background: 'none', color: 'white', cursor: 'pointer', fontSize: '20px' }}>+</button>
                        </div>
                        <button className="btn btn-primary" style={{ flex: 1, padding: '20px', fontSize: '18px' }} onClick={() => addToCart({ ...product, price: currentPrice }, product.storeId)}>
                            <ShoppingCart size={22} /> أضف للسلة
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div style={{ display: 'flex', itemsCenter: 'center', gap: '10px', color: 'var(--t3)', fontSize: '13px' }}>
                            <ShieldCheck size={18} /> ضمان حقيقي لمدة سنة
                        </div>
                        <div style={{ display: 'flex', itemsCenter: 'center', gap: '10px', color: 'var(--t3)', fontSize: '13px' }}>
                            <Clock size={18} /> توصيل خلال 24 ساعة
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div style={{ marginTop: '80px', maxWidth: '900px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '40px' }}>ماذا يقول الزبائن ({reviews.length})</h2>
                
                <div style={{ display: 'grid', gap: '20px', marginBottom: '60px' }}>
                    {reviews.map(r => (
                        <div key={r.id} className="glass-panel" style={{ padding: '25px', borderRadius: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                <div style={{ fontWeight: 800 }}>{r.user}</div>
                                <div style={{ color: 'var(--t3)', fontSize: '12px' }}>{r.date}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '3px', marginBottom: '10px' }}>
                                {[...Array(r.rating)].map((_, i) => <Star key={i} size={14} fill="var(--gold)" color="var(--gold)" />)}
                            </div>
                            <p style={{ color: 'var(--t2)' }}>{r.comment}</p>
                        </div>
                    ))}
                </div>

                {/* Add Review Form */}
                <div className="glass-panel" style={{ padding: '40px', borderRadius: '30px' }}>
                    <h3 style={{ marginBottom: '25px', fontWeight: 800 }}>اترك تقييمك</h3>
                    <form onSubmit={handleAddReview} style={{ display: 'grid', gap: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <input className="btn" style={{ background: 'var(--bg2)', border: '1px solid var(--border)', textAlign: 'right', color: 'white' }} placeholder="اسمك الكامل" value={reviewForm.user} onChange={e => setReviewForm({...reviewForm, user: e.target.value})} />
                            <select className="btn" style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: 'white' }} value={reviewForm.rating} onChange={e => setReviewForm({...reviewForm, rating: parseInt(e.target.value)})}>
                                <option value="5">⭐⭐⭐⭐⭐ ممتاز</option>
                                <option value="4">⭐⭐⭐⭐ جيد جداً</option>
                                <option value="3">⭐⭐⭐ جيد</option>
                                <option value="2">⭐⭐ مقبول</option>
                                <option value="1">⭐ سيء</option>
                            </select>
                        </div>
                        <textarea className="btn" style={{ background: 'var(--bg2)', border: '1px solid var(--border)', textAlign: 'right', color: 'white', minHeight: '120px', borderRadius: '20px' }} placeholder="اكتب تعليقك هنا..." value={reviewForm.comment} onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}></textarea>
                        <button type="submit" className="btn btn-gold" style={{ padding: '15px' }}>نشر التقييم</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
