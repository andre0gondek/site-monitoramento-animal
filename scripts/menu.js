document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menuToggle");
  const links = document.getElementById("menuLinks");

  toggle.addEventListener("click", () => {
    links.classList.toggle("show");
  });
});
