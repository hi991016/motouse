"use strict";

// ===== init =====
const init = () => {
  history.scrollRestoration = "manual";
  // # app-height
  appHeight();
  // # init video
  initVideo();
  // # init loading
  initLoading();
};

// ===== add event on multiple element =====

const addEventOnElements = function (elements, eventType, callback) {
  if (elements) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener(eventType, callback);
    }
  }
};

// ===== app height =====
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty(
    "--app-height",
    `${document.documentElement.clientHeight}px`
  );
};
window.addEventListener("resize", appHeight);

// ===== lenis =====
const lenis = new Lenis({
  lerp: 0.05,
  smoothWheel: true,
});
lenis.on("scroll", (e) => {});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ===== init loading =====
const [loading, loadingLogo] = [
  document.querySelector("[data-loading]"),
  document.querySelector("[data-loading-logo]"),
];
const initLoading = function () {
  // ##
  lenis.stop();
  setTimeout(() => {
    loadingLogo.classList.add("is-fade");
    setTimeout(() => {
      $("#js-play").get(0).play();
    }, 1000);
  }, 1000);
  // ##
  setTimeout(function () {
    loading.classList.add("is-done");
    setTimeout(() => {
      lenis.start();
    }, 700);
  }, 3000);
};

// ===== init Video =====
const initVideo = function () {
  let vCont = document.getElementById("fvVideo");
  // autoplay attribute
  if (window.innerWidth > 1023) {
    vCont.innerHTML =
      '<video id="js-play" playsinline muted loop><source src="/assets/img/bg-video-pc.mp4"></video>';
  } else {
    vCont.innerHTML =
      '<video id="js-play" playsinline muted loop><source src="/assets/img/bg-video-sp.mp4"></video>';
  }
};

// ===== menu =====
// ### Toggle
let isOpened = false;
const [menu, menuLogo, menuTogglers, linkTogglers] = [
  document.querySelector("[data-menu]"),
  document.querySelector("[data-menu-logo]"),
  document.querySelectorAll("[data-menu-toggler]"),
  document.querySelectorAll("[data-menu-link]"),
];

const toggleMenu = function () {
  isOpened = !isOpened;
  updateMenu();
};
addEventOnElements(menuTogglers, "click", toggleMenu);

const updateMenu = function () {
  menu.classList.toggle("is-open");
  menuLogo.classList.toggle("is-show");
  menuTogglers[0].classList.toggle("is-close");
  menuTogglers[0].innerText = isOpened ? "close" : "menu";

  if (isOpened) {
    lenis.stop();
  } else {
    lenis.start();
  }
};

// ### Nav link toggle
const toggleLink = () => {
  menu.classList.remove("is-open");
  menuLogo.classList.remove("is-show");
  menuTogglers[0].classList.remove("is-close");
  menuTogglers[0].innerText = "menu";
  lenis.start();
};
addEventOnElements(linkTogglers, "click", toggleLink);

// ### Scroll Menu
$(window).on("pageshow scroll", function () {
  let hSize = $("[data-offsettop]").offset().top - 10,
    scroll = $(window).scrollTop();

  scroll >= hSize
    ? $("[data-header-change]").addClass("is-top")
    : $("[data-header-change]").removeClass("is-top");
});

// ===== lazy loading =====
const ll = new LazyLoad({
  threshold: 0,
});

// ### ===== DOMCONTENTLOADED ===== ###
window.addEventListener("DOMContentLoaded", init);
