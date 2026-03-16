import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [mode, setMode] = useState(localStorage.getItem('mode') || 'retail'); // 'wholesale' or 'retail'
    const [cart, setCart] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('cart') || '[]');
        } catch (e) {
            console.error('Cart parse error:', e);
            return [];
        }
    });
    const [referralAgent, setReferralAgent] = useState(localStorage.getItem('referralAgent') || null);

    useEffect(() => {
        localStorage.setItem('mode', mode);
    }, [mode]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, storeId) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id && item.storeId === storeId);
            const minQty = mode === 'wholesale' ? product.minQty : 1;
            if (existing) {
                return prev.map(item => 
                    (item.id === product.id && item.storeId === storeId) 
                    ? { ...item, qty: item.qty + 1 } 
                    : item
                );
            }
            return [...prev, { ...product, storeId, qty: minQty, price: mode === 'wholesale' ? product.wholesalePrice : product.retailPrice }];
        });
    };

    const removeFromCart = (id, storeId) => {
        setCart(prev => prev.filter(item => !(item.id === id && item.storeId === storeId)));
    };

    const updateQty = (id, storeId, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id && item.storeId === storeId) {
                const min = mode === 'wholesale' ? item.minQty : 1;
                return { ...item, qty: Math.max(min, item.qty + delta) };
            }
            return item;
        }));
    };

    const getTotal = () => cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    return (
        <AppContext.Provider value={{
            mode, setMode,
            cart, addToCart, removeFromCart, updateQty, getTotal,
            referralAgent, setReferralAgent
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
