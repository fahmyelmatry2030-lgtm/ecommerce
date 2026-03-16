import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Store from './pages/Store';
import Representative from './pages/Representative';
import Dashboard from './pages/Dashboard';
import ProductDetails from './pages/ProductDetails';

function App() {
  console.log('App Rendering...');
  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store/:id" element={<Store />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/representative" element={<Representative />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </AppProvider>
  );
}

export default App;
