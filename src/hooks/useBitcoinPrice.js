import { useEffect, useState } from 'react';

const useBitcoinPrice = (url) => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // دریافت داده از فایل JSON در GitHub با fetch و .then
    fetch(url)
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
  }, []);
  return { price, loading, error };
};

export default useBitcoinPrice;
