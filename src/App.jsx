// src/App.jsx
import React, { useEffect, useState } from 'react';
import './App.css';
import useBitcoinPrice from './hooks/useBitcoinPrice';

function App() {
  const url = 'https://raw.githubusercontent.com/rouhollahasadi/bitcoinFetch/refs/heads/main/src/bitcoinPrice.json';
  const { price, loading, error } = useBitcoinPrice(url);

  // نمایش وضعیت بارگذاری
  if (loading) {
    return (
      <div className="app-container">
        <div className="status-message">
          <h2>⏳ در حال دریافت قیمت بیت‌کوین...</h2>
          <p>لطفاً منتظر بمانید</p>
        </div>
      </div>
    );
  }

  // نمایش خطا
  if (error) {
    return (
      <div className="app-container">
        <div className="status-message error">
          <h2>❌ خطا در دریافت قیمت</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  // نمایش قیمت
  return (
    <div className="app-container">
      <h1 className="main-title">💰 قیمت لحظه‌ای بیت‌کوین</h1>

      <div className="price-card">
        <p className="price-value">${price}</p>
        <p className="price-label">دلار آمریکا (USD)</p>
      </div>

      <p className="update-info rtl-text">🔄 داده‌ها از فایل JSON در GitHub دریافت شده‌اند</p>
    </div>
  );
}

export default App;
