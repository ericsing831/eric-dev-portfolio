const COMPONENT_PATHS = {
    header: "components/header.html",
    footer: "components/footer.html"
};

async function loadComponent(targetId, filePath) {
    const target = document.getElementById(targetId);
    if (!target) {
        return;
    }

    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load component: ${filePath}`);
        }

        target.innerHTML = await response.text();
    } catch (error) {
        console.error(error);
    }
}

function setActiveNavigation() {
    const currentPage = document.body.dataset.page;
    if (!currentPage) {
        return;
    }

    document.querySelectorAll(`[data-nav="${currentPage}"]`).forEach((link) => {
        link.classList.add("is-active");
    });
}

function initializeMobileNavigation() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");

    if (!toggle || !nav) {
        return;
    }

    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });
}

function initializeThemeToggle() {
    const themeToggle = document.querySelector(".theme-toggle");
    const storedTheme = localStorage.getItem("portfolio-theme");

    if (storedTheme) {
        document.body.dataset.theme = storedTheme;
    }

    if (!themeToggle) {
        return;
    }

    themeToggle.addEventListener("click", () => {
        const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
        document.body.dataset.theme = nextTheme;
        localStorage.setItem("portfolio-theme", nextTheme);
    });
}

function initializeContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) {
        return;
    }

    // Keep the site fully static while still giving visitors feedback.
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        window.alert("This is a static portfolio form. Please use the email or social links to get in touch.");
    });
}

async function initializeLayout() {
    await Promise.all([
        loadComponent("site-header", COMPONENT_PATHS.header),
        loadComponent("site-footer", COMPONENT_PATHS.footer)
    ]);

    setActiveNavigation();
    initializeMobileNavigation();
    initializeThemeToggle();
    initializeContactForm();
}

document.addEventListener("DOMContentLoaded", initializeLayout);

//function initializeMobileNavigation() {
//    const toggle = document.querySelector(".nav-toggle");
//    const nav = document.querySelector(".site-nav");

//    if (!toggle || !nav) return;

//    toggle.addEventListener("click", () => {
//        const isOpen = nav.classList.toggle("is-open");
//        toggle.setAttribute("aria-expanded", String(isOpen));
//    });
//}