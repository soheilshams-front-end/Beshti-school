// (() => {
//     // ===============================
//     // انتخاب المان‌ها
//     // ===============================
//     const menuSearch = document.getElementById("menuSearch");
//     const searchInput = menuSearch?.querySelector(".search-input");
//     const searchResults = document.getElementById("searchResults");

//     if (!menuSearch || !searchInput || !searchResults) return;

//     // همه لینک‌های منو و زیرمنو
//     const menuLinks = document.querySelectorAll(".mega-box a");

//     // ذخیره متن اصلی برای ریست
//     menuLinks.forEach(link => {
//         link.dataset.originalText = link.innerHTML;
//     });

//     // ===============================
//     // توابع کمکی
//     // ===============================
//     const clearHighlights = () => {
//         menuLinks.forEach(link => {
//             link.innerHTML = link.dataset.originalText;
//         });
//     };

//     const closeSearch = () => {
//         menuSearch.classList.remove("has-results");
//         searchResults.innerHTML = "";
//     };

//     // ===============================
//     // رویداد تایپ
//     // ===============================
//     searchInput.addEventListener("input", () => {
//         const value = searchInput.value.trim();

//         // ریست وضعیت قبلی
//         clearHighlights();
//         searchResults.innerHTML = "";

//         if (!value) {
//             closeSearch();
//             return;
//         }

//         const regex = new RegExp(`(${value})`, "gi");
//         let hasMatch = false;

//         menuLinks.forEach(link => {
//             const text = link.textContent;

//             if (text.includes(value)) {
//                 hasMatch = true;

//                 // هایلایت حروف تایپ‌شده داخل منو
//                 link.innerHTML = text.replace(
//                     regex,
//                     `<span class="search-highlight">$1</span>`
//                 );

//                 // ساخت آیتم نتیجه
//                 const resultItem = document.createElement("div");
//                 resultItem.className = "search-result-item";
//                 resultItem.innerHTML = link.innerHTML;

//                 resultItem.addEventListener("click", () => {
//                     link.scrollIntoView({
//                         behavior: "smooth",
//                         block: "center"
//                     });

//                     closeSearch();
//                 });

//                 searchResults.appendChild(resultItem);
//             }
//         });

//         if (hasMatch) {
//             menuSearch.classList.add("has-results");
//         } else {
//             closeSearch();
//         }
//     });

//     // ===============================
//     // کلیک بیرون برای بستن
//     // ===============================
//     document.addEventListener("click", (e) => {
//         if (!menuSearch.contains(e.target)) {
//             closeSearch();
//         }
//     });

//     // ===============================
//     // جلوگیری از بسته شدن با کلیک داخل
//     // ===============================
//     menuSearch.addEventListener("click", (e) => {
//         e.stopPropagation();
//     });

// })();
const menuSearch = document.getElementById("menuSearch");
const searchInput = menuSearch.querySelector(".search-input");

menuSearch.addEventListener("click", (e) => {
    e.stopPropagation();
    menuSearch.classList.add("open");
    setTimeout(() => searchInput.focus(), 200);
});

document.addEventListener("click", () => {
    menuSearch.classList.remove("open");
    searchInput.value = "";
});
