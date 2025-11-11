        // Toggle submenu when arrow is clicked
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".submenu-toggle").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // don’t trigger parent link
      const container = btn.closest(".submenu-container");
      container.classList.toggle("active");
    });
  });
});
   