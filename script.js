const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

menuToggle?.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const toolTabs = document.querySelectorAll(".tool-tabs button");
const tools = document.querySelectorAll(".tool-grid article");

toolTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    toolTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    const filter = tab.dataset.filter;
    tools.forEach((tool) => {
      tool.classList.toggle("hidden", filter !== "all" && tool.dataset.category !== filter);
    });
  });
});

const supportModal = document.querySelector(".support-modal");
const supportOpenButtons = document.querySelectorAll("[data-support-open]");
const supportCloseButtons = document.querySelectorAll("[data-support-close]");

const openSupportModal = () => {
  supportModal.hidden = false;
  document.body.classList.add("modal-open");
  supportModal.querySelector(".support-close").focus();
};

const closeSupportModal = () => {
  supportModal.hidden = true;
  document.body.classList.remove("modal-open");
};

supportOpenButtons.forEach((button) => button.addEventListener("click", openSupportModal));
supportCloseButtons.forEach((button) => button.addEventListener("click", closeSupportModal));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !supportModal.hidden) closeSupportModal();
});
