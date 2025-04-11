window.addEventListener("scroll", function () {
    const logo = document.querySelector(".logo-scroll");
    const scrollY = window.scrollY;

    const maxScroll = 300;
    const opacity = Math.max(0, 1 - scrollY / maxScroll);
    const scale = Math.max(0.8, 1 - scrollY / (maxScroll * 2));

    logo.style.opacity = opacity;
    logo.style.transform = `translateY(0%) scale(${scale})`;
  });