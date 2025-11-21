// =================================================================
// ۷. منطق کامل منوی همبرگری (پایدار و بدون انیمیشن)
// =================================================================

// ۱. انتخاب المان‌ها
const menuButtonWrapper = document.querySelector('.menu-button-wrapper');
const mainNav = document.querySelector('.main-nav');
const menuOverlay = document.querySelector('.menu-overlay');
const hasMegaLinks = document.querySelectorAll('.has-mega > a');

// --- المان‌های جدید برای پشتیبانی از برچسب "منو" ---
// این عنصر جدید حاوی آیکون SVG است که با کلیک روی Wrapper تعویض می‌شود.
const hamburgerIconContainer = menuButtonWrapper ? menuButtonWrapper.querySelector('.hamburger-menu') : null;
const menuLabel = menuButtonWrapper ? menuButtonWrapper.querySelector('.menu-label-mobile') : null; 

// --- کدهای SVG ---
const menuIconSVG = `
    <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>`;

const closeIconSVG = `
    <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>`;

// --- توابع کنترل اصلی منو ---

function closeMenu() {
    mainNav.classList.remove('active');
    if (menuOverlay) menuOverlay.classList.remove('active');

    // ریست کردن آیکون: محتوای آیکون کانتینر را به آیکون سه خط برمی‌گرداند.
    if (hamburgerIconContainer) {
        hamburgerIconContainer.innerHTML = menuIconSVG;
        hamburgerIconContainer.style.color = "white";
    }
    
    // نمایش مجدد برچسب "منو" (اگر در CSS مخفی شده باشد)
    if (menuLabel) menuLabel.style.display = 'block'; 

    // بستن تمام زیرمنوهای باز (با حذف کلاس open)
    mainNav.querySelectorAll('.has-mega.open').forEach(li => {
        li.classList.remove('open');
    });
}

function toggleMenu() {
    // باز/بسته کردن کلاس active
    const isActive = mainNav.classList.toggle('active');
    if (menuOverlay) menuOverlay.classList.toggle('active'); // بلور

    // تعویض آیکون
    if (hamburgerIconContainer) {
        if (isActive) {
            // آیکون را به 'بستن' تغییر می‌دهد
            hamburgerIconContainer.innerHTML = closeIconSVG;
            hamburgerIconContainer.style.color = "#FFA500";
            
            // در حالت باز، برچسب 'منو' پنهان می‌شود (اختیاری)
            if (menuLabel) menuLabel.style.display = 'none'; 
        } else {
            // در حالت بسته شدن، تابع closeMenu همه چیز را مدیریت می‌کند.
            closeMenu();
        }
    }
}

// --- مدیریت رویدادها ---
if (menuButtonWrapper && mainNav) {

    // الف) کلیک روی دکمه همبرگری (Wrapper)
    menuButtonWrapper.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMenu();
    });

    // ب) کلیک روی لایه بلور
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }

    // ج) کلیک روی لینک‌های والد: باز و بسته کردن زیرمنو (بدون انیمیشن)
    hasMegaLinks.forEach(parentLink => {
        parentLink.addEventListener('click', function (e) {
            // این منطق فقط در حالت موبایل اجرا می‌شود
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();

                const parentLi = this.closest('.has-mega');
                parentLi.classList.toggle('open');

                // بستن زیرمنوهای باز دیگر
                mainNav.querySelectorAll('.has-mega').forEach(li => {
                    if (li !== parentLi && li.classList.contains('open')) {
                        li.classList.remove('open');
                    }
                });
            }
        });
    });

    // د) کلیک روی لینک‌های نهایی: بستن منوی اصلی
    mainNav.querySelectorAll('a').forEach(link => {
        // بستن منو تنها در صورتی که لینک یک لینک نهایی باشد
        if (link.closest('.mega-menu') || !link.closest('.has-mega')) {
            link.addEventListener('click', closeMenu);
        }
    });
}