// src/App.jsx
import React, { useEffect, useState } from 'react';
import './App.css';
// اگر می‌خواهید از فایل JSON محلی استفاده کنید:
import bitcoinData from './bitcoinPrice.json';

function App() {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // روش اول: استفاده از فایل JSON محلی
    // (فایل bitcoinPrice.json را در src قرار دهید)
    
    try {
      setTimeout(() => {
        const bitcoinPrice = bitcoinData.bpi.USD.rate;
        setPrice(bitcoinPrice);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('خطا در خواندن فایل داده');
      setLoading(false);
    }
    

    // روش دوم: استفاده از API واقعی (پیشنهادی)
    // const fetchPrice = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json');
        
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
        
    //     const data = await response.json();
    //     setPrice(data.bpi.USD.rate);
    //     setError(null);
    //   } catch (err) {
    //     setError(err.message);
    //     setPrice(null);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    //fetchPrice();
  }, []);

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
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
          >
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
      
      <p className="update-info rtl-text">
        🔄 داده‌ها از API CoinDesk دریافت شده‌اند
      </p>
    </div>
  );
}

export default App;