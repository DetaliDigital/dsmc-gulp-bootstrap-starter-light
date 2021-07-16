'use strict';

// Count Minus and Plus

let getDomCountMinus = document.querySelectorAll('#mse2_results. .grid-item .count-minus');
let getDomCountPlus = document.querySelectorAll('#mse2_results. .grid-item .count-plus');

getDomCountMinus.forEach(el => {
    el.addEventListener("click",(e)=>{
        if(e.target && e.target.className == 'count-minus') {
            let count = getCount(el);
            updateDisplayMinus(el, count);
        }
    });
})


getDomCountPlus.forEach(el => {
    el.addEventListener("click",(e)=>{
        if(e.target && e.target.className == 'count-plus') {
            let count = getCount(el);
            updateDisplayPlus(el, count);
        }
    });
})

function getCount(el){
    let elements = el.parentNode.querySelector('.product-cart-count-input');
    return elements.value;
}

function updateDisplayMinus(el,count) {
    if (count > 1) {
        count--;
        el.parentNode.querySelector('.product-cart-count-input').value = count;
    }
}

function updateDisplayPlus(el,count){
    count++;
    el.parentNode.querySelector('.product-cart-count-input').value = count;
}

window.addEventListener('load', (e) => {
    let getScreenWidth = screen.width;
    if (getScreenWidth < 556) {
        $('.d-grid-slick').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            slide: ".grid-item",
        });
    }
});


