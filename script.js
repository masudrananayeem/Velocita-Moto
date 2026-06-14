const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function openMenu() {

    sidebar.classList.add("active");
    overlay.classList.add("show");

    menuBtn.classList.add("hide");
}

function closeMenu() {

    sidebar.classList.remove("active");
    overlay.classList.remove("show");

    menuBtn.classList.remove("hide");
}

menuBtn.addEventListener("click", openMenu);

closeBtn.addEventListener("click", closeMenu);

overlay.addEventListener("click", closeMenu);

document.querySelectorAll(".menu-link").forEach(link => {

    link.addEventListener("click", closeMenu);

});

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;

        const increment = target / 100;

        if (count < target) {

            counter.innerText =
                Math.ceil(count + increment);

            setTimeout(updateCounter, 20);

        } else {

            counter.innerText = target;
        }
    };

    updateCounter();
});