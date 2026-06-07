var banners = ["images/Banner.png", "images/Banner2.png"];
var positions = ["center center", "center top"];
var current = 0;

function changeSlide(direction) {
  current = current + direction;
  if (current < 0) current = banners.length - 1;
  if (current >= banners.length) current = 0;
  var top = document.getElementById("slider");
  var bottom = document.getElementById("slider-bottom");
  bottom.src = banners[current];
  bottom.style.objectPosition = positions[current];
  top.style.opacity = 0;
  setTimeout(function() {
    top.src = banners[current];
    top.style.objectPosition = positions[current];
    top.style.opacity = 1;
  }, 800);
}

function checkVisible() {
  var elements = document.querySelectorAll(".welcome-animate, .timeline-content");
  var screenHeight = window.innerHeight;
  for (var i = 0; i < elements.length; i++) {
    var position = elements[i].getBoundingClientRect().top;
    if (position < screenHeight - 50) {
      elements[i].classList.add("visible");
    }
  }
}

window.onscroll = function() {
  checkVisible();
};

window.onload = function() {
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
  setTimeout(function() {
    checkVisible();
  }, 100);
};

document.addEventListener("keydown", function(e) {
  if (e.code === "Space") {
    var video = document.querySelector("video");
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
      e.preventDefault();
    }
  }
});