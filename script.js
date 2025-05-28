// Accordion toggle for projects
document.querySelectorAll(".accordion button").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = button.nextElementSibling;
    panel.style.display = panel.style.display === "block" ? "none" : "block";
  });
});
