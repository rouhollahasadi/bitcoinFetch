// src/App.jsx
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // دریافت داده از فایل JSON در GitHub با fetch و .then
    fetch('https://raw.githubusercontent.com/rouhollahasadi/bitcoinFetch/refs/heads/main/src/bitcoinPrice.json')
      .then(response => {
        // بررسی وضعیت پاسخ
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // تبدیل به JSON
      })
      .then(data => {
        // استخراج قیمت از داده‌های دریافت شده
        const bitcoinPrice = data.bpi.USD.rate;
        setPrice(bitcoinPrice);
        setLoading(false);
        console.log('قیمت دریافت شد:', bitcoinPrice);
      })
      .catch(error => {
        // مدیریت خطا
        console.error('خطا در دریافت داده:', error);
        setError('خطا در دریافت داده: ' + error.message);
        setLoading(false);
      });
  }, []); // آرایه خالی = فقط یک بار اجرا شود

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
        🔄 داده‌ها از فایل JSON در GitHub دریافت شده‌اند
      </p>
    </div>
  );
}

export default App;