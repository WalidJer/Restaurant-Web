
    // 1)----------------- IMAGE SLIDER SCRIPT------------------



let sliderImages = document.querySelectorAll(".slide"),
    dots = document.querySelectorAll(".dot"),
    arrowLeft = document.querySelector(".left-arrow"),
    arrowRight = document.querySelector(".right-arrow"),
    current = 0, 
    interval; 


function reset() {
    sliderImages.forEach(image => (image.style.display = "none"));
    dots.forEach(dot => dot.classList.remove("active"));
}


function showSlide(index) {
    reset();
    sliderImages[index].style.display = "block";
    dots[index].classList.add("active");
}


function slideLeft() {
    current = (current === 0) ? sliderImages.length - 1 : current - 1;
    showSlide(current);
}

function slideRight() {
    current = (current === sliderImages.length - 1) ? 0 : current + 1;
    showSlide(current);
}


dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        current = index;
        showSlide(current);
    });
});


function startSlider() {
    interval = setInterval(slideRight, 3000); 
}


document.querySelector(".carousel").addEventListener("mouseenter", () => {
    clearInterval(interval); 
});


document.querySelector(".carousel").addEventListener("mouseleave", startSlider);


arrowLeft.addEventListener("click", () => {
    slideLeft();
});

arrowRight.addEventListener("click", () => {
    slideRight();
});

showSlide(current);
startSlider();