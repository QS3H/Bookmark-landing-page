"use strict";
// Bookmark Landing Page - Main TypeScript File
document.addEventListener("DOMContentLoaded", () => {
    console.log("Bookmark landing page initialized");
    // ===== Dark Mode Toggle =====
    const themeToggle = document.getElementById("theme-toggle");
    const themeToggleMobile = document.getElementById("theme-toggle-mobile");
    const htmlElement = document.documentElement;
    // Check for saved theme preference or default to system preference
    function getPreferredTheme() {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark" || savedTheme === "light") {
            return savedTheme;
        }
        // Check system preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }
    // Apply theme
    function applyTheme(theme) {
        if (theme === "dark") {
            htmlElement.classList.add("dark");
        }
        else {
            htmlElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }
    // Toggle theme
    function toggleTheme() {
        const currentTheme = htmlElement.classList.contains("dark")
            ? "dark"
            : "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(newTheme);
    }
    // Initialize theme
    applyTheme(getPreferredTheme());
    // Add click listeners for both theme toggles
    themeToggle?.addEventListener("click", toggleTheme);
    themeToggleMobile?.addEventListener("click", toggleTheme);
    // Listen for system theme changes
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
            applyTheme(e.matches ? "dark" : "light");
        }
    });
    // ===== Mobile Menu Toggle =====
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const closeMenuBtn = document.getElementById("close-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const logo = document.getElementById("logo");
    const hamburgerIcon = document.getElementById("hamburger-icon");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    const mobileControls = document.getElementById("mobile-controls");
    function openMobileMenu() {
        if (mobileMenu && logo && mobileControls) {
            mobileMenu.classList.remove("hidden");
            mobileMenu.classList.add("flex");
            document.body.classList.add("overflow-hidden");
            // Hide mobile controls (hamburger + theme toggle) and main logo when menu is open
            mobileControls.classList.add("hidden");
            logo.classList.add("hidden");
        }
    }
    function closeMobileMenu() {
        if (mobileMenu && logo && mobileControls) {
            mobileMenu.classList.add("hidden");
            mobileMenu.classList.remove("flex");
            document.body.classList.remove("overflow-hidden");
            // Show mobile controls and main logo when menu is closed
            mobileControls.classList.remove("hidden");
            logo.classList.remove("hidden");
        }
    }
    hamburgerBtn?.addEventListener("click", openMobileMenu);
    closeMenuBtn?.addEventListener("click", closeMobileMenu);
    // Close menu when clicking navigation links
    mobileNavLinks.forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });
    // ===== Tab Switching with Animation =====
    const tabs = document.querySelectorAll(".tab");
    const tabContents = document.querySelectorAll(".tab-content");
    tabs.forEach((tab) => {
        tab.addEventListener("click", (e) => {
            const target = e.currentTarget.dataset.target;
            // Update active tab styling
            tabs.forEach((t) => {
                t.classList.remove("active");
                const inner = t.querySelector(".tab-inner");
                if (inner) {
                    inner.classList.remove("border-lightRed");
                    inner.classList.add("border-transparent");
                }
            });
            // Set clicked tab as active
            e.currentTarget.classList.add("active");
            const activeInner = e.currentTarget.querySelector(".tab-inner");
            if (activeInner) {
                activeInner.classList.add("border-lightRed");
                activeInner.classList.remove("border-transparent");
            }
            // Show corresponding content with animation
            tabContents.forEach((content) => {
                if (content.id === target) {
                    content.classList.remove("hidden");
                    content.classList.add("flex");
                    // Add animation
                    content.classList.add("animate-fade-in-up");
                    // Remove animation class after it completes
                    setTimeout(() => {
                        content.classList.remove("animate-fade-in-up");
                    }, 600);
                }
                else {
                    content.classList.add("hidden");
                    content.classList.remove("flex");
                }
            });
        });
    });
    // ===== FAQ Accordion with Smooth Transitions =====
    const accordionItems = document.querySelectorAll(".accordion-item");
    accordionItems.forEach((item) => {
        const trigger = item.querySelector(".accordion-trigger");
        const content = item.querySelector(".accordion-content");
        const arrow = item.querySelector(".accordion-arrow");
        trigger?.addEventListener("click", () => {
            const isOpen = content?.classList.contains("open");
            // Close all accordion items first
            accordionItems.forEach((otherItem) => {
                const otherContent = otherItem.querySelector(".accordion-content");
                const otherArrow = otherItem.querySelector(".accordion-arrow");
                otherContent?.classList.remove("open");
                otherContent?.classList.add("hidden");
                otherArrow?.classList.remove("rotate-180");
            });
            // Toggle current item if it was closed
            if (!isOpen && content) {
                content.classList.remove("hidden");
                // Use requestAnimationFrame for smooth transition
                requestAnimationFrame(() => {
                    content.classList.add("open");
                });
                arrow?.classList.add("rotate-180");
            }
        });
    });
    // ===== Email Validation =====
    const contactForm = document.getElementById("contact-form");
    const emailInput = document.getElementById("email-input");
    const errorIcon = document.querySelector(".error-icon");
    const errorMessage = document.querySelector(".error-message");
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    function showError() {
        emailInput?.classList.add("border-2", "border-lightRed", "error");
        errorIcon?.classList.remove("hidden");
        errorMessage?.classList.remove("hidden");
        // Shake animation for error feedback
        emailInput?.classList.add("animate-shake");
        setTimeout(() => {
            emailInput?.classList.remove("animate-shake");
        }, 500);
    }
    function hideError() {
        emailInput?.classList.remove("border-2", "border-lightRed", "error");
        errorIcon?.classList.add("hidden");
        errorMessage?.classList.add("hidden");
    }
    contactForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = emailInput?.value.trim();
        if (!email || !isValidEmail(email)) {
            showError();
        }
        else {
            hideError();
            // Form submission success
            alert("Thank you for subscribing!");
            emailInput.value = "";
        }
    });
    // Clear error when user starts typing
    emailInput?.addEventListener("input", () => {
        if (emailInput.value.trim()) {
            hideError();
        }
    });
    // ===== Scroll-based Animations =====
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    };
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animation || "animate-fade-in-up";
                element.classList.add("animated", animationType);
                // Stop observing after animation is triggered
                animationObserver.unobserve(element);
            }
        });
    }, observerOptions);
    animatedElements.forEach((element) => {
        animationObserver.observe(element);
    });
    // ===== Navbar Scroll Effect =====
    const navbar = document.querySelector("nav");
    let lastScrollY = window.scrollY;
    function updateNavbarScroll() {
        const currentScrollY = window.scrollY;
        const isDark = htmlElement.classList.contains("dark");
        if (navbar) {
            // Add shadow when scrolled
            if (currentScrollY > 50) {
                navbar.classList.add("shadow-md", "bg-opacity-95");
                if (isDark) {
                    navbar.classList.add("bg-darkBg");
                    navbar.classList.remove("bg-white");
                }
                else {
                    navbar.classList.add("bg-white");
                    navbar.classList.remove("bg-darkBg");
                }
            }
            else {
                navbar.classList.remove("shadow-md", "bg-white", "bg-darkBg", "bg-opacity-95");
            }
        }
        lastScrollY = currentScrollY;
    }
    window.addEventListener("scroll", updateNavbarScroll);
});
//# sourceMappingURL=main.js.map