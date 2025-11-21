document.addEventListener('DOMContentLoaded', function() {
    
    // =================================================================
    // ۱. انتخاب المان‌ها (بدون تغییر)
    // =================================================================
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const dateElement = document.getElementById('current-jalali-date'); 
    const greetingElement = document.getElementById('dynamic-greeting');
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.querySelector('.lightbox-content');
    const closeBtn = document.querySelector('.lightbox-close');
    const sliderImages = document.querySelectorAll('.slide > img'); 
    const heroContent = document.querySelector('.hero-content');
    const preloader = document.getElementById('preloader');
    let index = 0;
    
    
    // =================================================================
    // ۲. تابع اصلی: دریافت زمان از API جدید timeapi.io
    // =================================================================
    async function fetchAndUpdateTime() {
        // === آدرس API جدید: timeapi.io ===
        const apiUrl = 'https://timeapi.io/api/Time/current/zone?timeZone=Asia/Tehran';
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); 

        try {
            const response = await fetch(apiUrl, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (!response.ok) throw new Error('API failed to return OK');
            const data = await response.json();
            
            // timeapi.io تاریخ و ساعت را به صورت متنی (yyyy-MM-ddTHH:mm:ss) برمی‌گرداند
            const apiDateTime = new Date(data.dateTime); 
            
            // --- به‌روزرسانی پیام خوش‌آمدگویی ---
            const hour = apiDateTime.getHours();
            let greeting = "سلام و خوش آمدید";
            if (hour >= 5 && hour < 12) {
                greeting = "☀️ صبح بخیر؛ به سایت مدرسه بهشتی کاشان خوش آمدید.";
            } else if (hour >= 12 && hour < 17) {
                greeting = "✨ ظهر بخیر؛ به سایت مدرسه بهشتی کاشان خوش آمدید.";
            } else if (hour >= 17 && hour < 21) {
                greeting = "🌙 عصر بخیر؛ به سایت مدرسه بهشتی کاشان خوش آمدید.";
            } else {
                greeting = "⭐️ شب شما بخیر؛ به سایت مدرسه بهشتی کاشان خوش آمدید.";
            }
            if (greetingElement) {
                greetingElement.textContent = greeting;
            }

            // --- به‌روزرسانی تاریخ شمسی ---
            if (dateElement) {
                const options = { year: 'numeric', month: 'numeric', day: 'numeric', calendar: 'persian' };
                const formatter = new Intl.DateTimeFormat('fa-IR', options);
                const persianDate = formatter.format(apiDateTime); 
                dateElement.textContent = `امروز: ${persianDate}`;
            }

        } catch (error) {
            clearTimeout(timeoutId);
            console.error('API Error (Check Firewall/Proxy):', error);
            
            // === منطق بازگشت (Fallback) به ساعت محلی ===
            const localDate = new Date();
            const options = { year: 'numeric', month: 'numeric', day: 'numeric', calendar: 'persian' };
            const formatter = new Intl.DateTimeFormat('fa-IR', options);
            const fallbackPersianDate = formatter.format(localDate); 
            
            if (dateElement) dateElement.textContent = `امروز: [خطای سرور زمان] ${fallbackPersianDate}`;
            if (greetingElement) greetingElement.textContent = '❌ خطا: اتصال به سرور زمان ناموفق';
        }
    }


    // =================================================================
    // ۳. منطق اسلایدر و دات‌ها (بدون تغییر)
    // =================================================================
    function showSlide(i) {
        slides.forEach(s => s.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));
        slides[i].classList.add("active");
        dots[i].classList.add("active");
    }

    function nextSlide() {
        index = (index + 1) % slides.length;
        showSlide(index);
    }

    let slideInterval = setInterval(nextSlide, 5000);

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            index = i;
            showSlide(i);
            
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });


    // =================================================================
    // ۴. منطق لایت‌باکس (بدون تغییر)
    // =================================================================
    sliderImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            lightbox.style.display = 'block';
            lightboxImg.src = this.src; 
        });
    });

    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
    


    // =================================================================
    // ۵. منطق پارالاکس ماوس (بدون تغییر)
    // =================================================================
    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            if (heroContent) {
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const offsetX = (e.clientX - centerX) / centerX;
                const offsetY = (e.clientY - centerY) / centerY;
                const maxRotate = 4;
                
                heroContent.style.transform = `
                    translateY(-50%) 
                    perspective(1000px) 
                    rotateX(${offsetY * -maxRotate}deg) 
                    rotateY(${offsetX * maxRotate}deg)
                `;
            }
        });
    }

    if (heroContent) {
        heroContent.style.transition = 'transform 0.1s ease-out';
    }


    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('fade-out');
        }
    }, 500); // 500 میلی‌ثانیه تأخیر
    // =================================================================
    // ۶. فراخوانی‌های نهایی و تنظیم به‌روزرسانی‌های دوره‌ای
    // =================================================================
    fetchAndUpdateTime(); 
    setInterval(fetchAndUpdateTime, 300000); // به‌روزرسانی هر 5 دقیقه
});

