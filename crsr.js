    
// document.addEventListener('contextmenu', function(e) {
//     e.preventDefault();
// });

// // 2. جلوگیری از میانبرهای Inspector
// document.addEventListener('keydown', function(e) {
//     const key = e.key;
//     const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

//     if (key === 'F12') {
//         e.preventDefault();
//     }

//     // ویندوز: Ctrl+Shift+I / مک: Cmd+Option+I
//     if ((e.ctrlKey && e.shiftKey && key === 'I') || (e.metaKey && e.altKey && key === 'I' && isMac)) {
//         e.preventDefault();
//     }
    
//     // Ctrl+U یا Cmd+U برای مشاهده سورس کد
//     if ((e.ctrlKey && key === 'U') || (e.metaKey && key === 'U' && isMac)) {
//         e.preventDefault();
//     }
// });