var banners = ["images/Banner.png", "images/Banner2.png"];
var positions = ["center center", "center top"];
var current = 0;

function changeSlide(direction) {
  current = current + direction;
  if (current < 0) current = banners.length - 1;
  if (current >= banners.length) current = 0;
  var top = document.getElementById("slider");
  var bottom = document.getElementById("slider-bottom");
  if (top && bottom) {
    bottom.src = banners[current];
    bottom.style.objectPosition = positions[current];
    top.style.opacity = 0;
    setTimeout(function() {
      top.src = banners[current];
      top.style.objectPosition = positions[current];
      top.style.opacity = 1;
    }, 800);
  }
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

function toggleAudio() {
  var audio = document.getElementById("bgAudio");
  var btn = document.getElementById("audioBtn");
  if (audio.muted) {
    audio.muted = false;
    btn.src = "images/unmute.png";
    localStorage.setItem("audioMuted", "false");
  } else {
    audio.muted = true;
    btn.src = "images/mute.png";
    localStorage.setItem("audioMuted", "true");
  }
}

document.addEventListener("keydown", function(e) {
  if (e.code === "Space") {
    var video = document.querySelector("video");
    if (video && document.activeElement === video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
      e.preventDefault();
    }
  }
});

window.onload = function() {
  if (window.location.hash) {
    var id = window.location.hash.substring(1);
    var target = document.getElementById(id);
    if (target) {
      setTimeout(function() {
        target.scrollIntoView();
        checkVisible();
      }, 300);
    }
  } else {
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    setTimeout(function() {
      checkVisible();
    }, 100);
  }

  window.onscroll = function() {
    checkVisible();
  };

  var audio = document.getElementById("bgAudio");
  if (audio) {
    var savedTime = localStorage.getItem("audioTime");
    if (savedTime) {
      audio.currentTime = parseFloat(savedTime);
    }
 var isMuted = localStorage.getItem("audioMuted");
    audio.muted = (isMuted === "true");
    audio.volume = 0.4;
    var btn = document.getElementById("audioBtn");
    if (audio.muted) {
      btn.src = "images/mute.png";
    } else {
      btn.src = "images/unmute.png";
    }
    
   audio.play().catch(function() {
  document.addEventListener("click", function startAudio() {
    audio.play();
    document.removeEventListener("click", startAudio);
  });
});
    
    setInterval(function() {
      if (!audio.paused) {
        localStorage.setItem("audioTime", audio.currentTime);
      }
    }, 1000);
  }

  var gameVideo = document.getElementById("gameVideo");
  if (gameVideo) {
    gameVideo.volume = 0.4;
  }
};
