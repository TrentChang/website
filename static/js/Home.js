document.addEventListener("scroll", function () {
  const aboutSection = document.getElementById("about");
  const position = aboutSection.getBoundingClientRect();

  if (position.top < window.innerHeight && position.bottom >= 0) {
    aboutSection.classList.add("visible");
  }
});
