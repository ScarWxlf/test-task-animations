const slides = document.querySelectorAll('.carousel-slide');
const descriptions = document.getElementsByClassName('desc');
const slideCounter = document.getElementById('slide-counter');
let currentSlide = 0;
let isManual = false;
let carouselInterval = 9000;

document.getElementsByClassName("right-arrow")[0].addEventListener("click", function() {
    isManual = true;
    goToNextSlide()
});
document.getElementsByClassName("left-arrow")[0].addEventListener("click", function() {
    isManual = true;
    goToPrevSlide()
});


const slideLeftTextes = document.querySelectorAll('.slide-left-text');

gsap.to(slides[currentSlide], { opacity: 1, display:"block", duration: 1 });
gsap.to(slides[currentSlide], { duration: 1.5,  width: "40%", objectPosition: "75% 100%", delay: 5 });
gsap.to(slideLeftTextes[0], { y:-50, duration: 1, delay: 2});
gsap.from(slideLeftTextes, { x: -165, duration: 1, delay: 1 });
gsap.from('.line', {
    x: -300,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    delay: 3
});
gsap.to(slideLeftTextes[1], {display: "none", duration: 1, delay: 4.4});
gsap.to(slideLeftTextes[2], {display: "none", duration: 1, delay: 4.4});

gsap.to(".button", {display: "block", duration: 0.1, delay: 5.5});
gsap.to(".button", {opacity: 1, duration: 1, delay: 6});
gsap.to(".button", {
    scale: 1.05,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    duration: 1
});

gsap.to(".left-arrow", {scale: 1.2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    duration: 1});
gsap.to(".right-arrow", {scale: 1.2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    duration: 1});

gsap.to(".desctiption-container", {display: "block", duration: 1, delay: 5.4});
gsap.to('.desctiprion', {opacity: 1, duration: 1, delay: 5.6});
gsap.to(descriptions[0], {display: "block", opacity: 1, duration: 1, delay: 5.6});





function goToNextSlide() {

    const timeline = gsap.timeline();

    timeline
        .to(slides[currentSlide], { opacity: 0, duration: 0.3 })
        .to(descriptions[currentSlide], { x: -100, opacity: 0, duration: 0.2 }, "-=0.3") 
        .set(descriptions[currentSlide], { display: "none" });

    currentSlide = (currentSlide + 1) % slides.length;
    slideCounter.innerHTML = `${currentSlide + 1}/5`;
    if(currentSlide === 3){
        gsap.to(".line", {y: -50, duration: 1});
    } else if (currentSlide === 4 || currentSlide === 2){
        gsap.to(".line", {y: 0, duration: 1});
    }

    timeline
        .to(slides[currentSlide], { opacity: 1, duration: 0.3 })
        .set(descriptions[currentSlide], { display: "block", x: 100 }) 
        .to(descriptions[currentSlide], { x: 0, opacity: 1, duration: 0.2 });
}

function goToPrevSlide() {
    const timeline = gsap.timeline();

    timeline
        .to(slides[currentSlide], { opacity: 0, duration: 0.3 })
        .to(descriptions[currentSlide], { x: 100, opacity: 0, duration: 0.2 }, "-=0.3") 
        .set(descriptions[currentSlide], { display: "none" });

    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slideCounter.innerHTML = `${currentSlide + 1}/5`;

    if(currentSlide === 3){
        gsap.to(".line", {y: -50, duration: 1});
    } else if (currentSlide === 4 || currentSlide === 2){
        gsap.to(".line", {y: 0, duration: 1});
    }

    timeline
        .to(slides[currentSlide], { opacity: 1, duration: 0.3 })
        .set(descriptions[currentSlide], { display: "block", x: -100 })
        .to(descriptions[currentSlide], { x: 0, opacity: 1, duration: 0.2 });
}



let intervalId = setInterval(() => {
    if (!isManual) {
        goToNextSlide();
        clearInterval(intervalId); 
        carouselInterval = 2000;
        intervalId = setInterval(() => {
            if (!isManual) {
                goToNextSlide();
            }
        }, carouselInterval);
    }
}, carouselInterval);
