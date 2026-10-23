
/* =========================================================
   KAGONA LAWYER DEMO
   JavaScript: script.js
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------------------------------
  // 1. MOBILE NAVIGATION
  // -------------------------------------------------------

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");
  const navigationLinks = navigation
    ? navigation.querySelectorAll('a[href^="#"]')
    : [];

  function closeMenu() {
    if (!menuToggle || !navigation) return;

    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    if (!menuToggle || !navigation) return;

    navigation.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");
    document.body.classList.add("menu-open");
  }

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isExpanded =
        menuToggle.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navigationLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // Close the menu when the Escape key is pressed.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();

        if (menuToggle.getAttribute("aria-expanded") === "false") {
          menuToggle.focus();
        }
      }
    });

    // Restore desktop navigation behavior when the viewport grows.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // -------------------------------------------------------
  // 2. COPYRIGHT YEAR
  // -------------------------------------------------------

  const currentYear = document.querySelector("#current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // -------------------------------------------------------
  // 3. WHATSAPP CONTACT CONFIGURATION
  // -------------------------------------------------------

  /*
   * DEMO SETUP:
   * Replace the empty string below with the real contact's
   * WhatsApp number before publishing for a real client.
   *
   * Use the international country code and digits only.
   * Example format for a Kenyan number: 2547XXXXXXXX
   *
   * Do not include +, spaces, brackets, or hyphens.
   */

  const WHATSAPP_NUMBER = "";

  const whatsappLink = document.querySelector("#whatsapp-link");

  if (whatsappLink) {
    if (/^254\d{9}$/.test(WHATSAPP_NUMBER)) {
      whatsappLink.href =
        `https://wa.me/${WHATSAPP_NUMBER}`;

      whatsappLink.target = "_blank";
      whatsappLink.rel = "noopener noreferrer";
      whatsappLink.setAttribute(
        "aria-label",
        "Start a WhatsApp conversation in a new tab"
      );
    } else {
      // Keep the demo safe: do not direct users to a fake number.
      whatsappLink.href = "#contact";

      whatsappLink.addEventListener("click", (event) => {
        event.preventDefault();

        showFormStatus(
          "WhatsApp is not configured in this portfolio demo yet.",
          "info"
        );

        const form = document.querySelector("#inquiry-form");

        if (form) {
          form.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }
      });
    }
  }

  // -------------------------------------------------------
  // 4. INQUIRY FORM
  // -------------------------------------------------------

  const inquiryForm = document.querySelector("#inquiry-form");
  const formStatus = document.querySelector("#form-status");

  function showFormStatus(message, type = "info") {
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.classList.remove("is-success", "is-error");

    if (type === "success") {
      formStatus.classList.add("is-success");
    } else if (type === "error") {
      formStatus.classList.add("is-error");
    }
  }

  if (inquiryForm) {
    inquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Let the browser display native validation messages.
      if (!inquiryForm.checkValidity()) {
        inquiryForm.reportValidity();

        showFormStatus(
          "Please complete the required fields with valid information.",
          "error"
        );

        return;
      }

      /*
       * No backend, email service, or database is connected yet.
       * Therefore, do not claim that the inquiry was sent.
       */

      showFormStatus(
        "Demo only: your inquiry has not been sent. A receiving service must be configured before this form can be used.",
        "info"
      );
    });
  }

  // -------------------------------------------------------
  // 5. FORM FIELD FEEDBACK
  // -------------------------------------------------------

  if (inquiryForm) {
    const fields = inquiryForm.querySelectorAll(
      "input, select, textarea"
    );

    fields.forEach((field) => {
      field.addEventListener("input", () => {
        if (field.validity.valid) {
          field.removeAttribute("aria-invalid");
        } else {
          field.setAttribute("aria-invalid", "true");
        }
      });

      field.addEventListener("change", () => {
        if (field.validity.valid) {
          field.removeAttribute("aria-invalid");
        }
      });
    });
  }

  // -------------------------------------------------------
  // 6. INTERNAL SECTION LINKS
  // -------------------------------------------------------

  /*
   * The CSS already provides smooth scrolling.
   * This handler gracefully closes the mobile menu when
   * navigating to an internal page section.
   */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (navigation && navigation.classList.contains("is-open")) {
        closeMenu();
      }
    });
  });

  // -------------------------------------------------------
  // 7. DEVELOPMENT CHECK
  // -------------------------------------------------------

  console.info(
    "Kagona Lawyer Demo initialized. Contact integrations remain in demo mode."
  );
});
  
