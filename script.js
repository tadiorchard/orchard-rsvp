/* Orchard — RSVP invite
   The form fields and picklists come from the Salesforce-generated
   Web-to-Lead markup; the options live in index.html so the form still
   works if this script fails to load. */

/* reCAPTCHA timestamp — required by Salesforce's captcha_settings.
   Verbatim behaviour from the Salesforce-generated snippet. */
function timestamp() {
  const response = document.getElementById("g-recaptcha-response");
  if (response == null || response.value.trim() === "") {
    const field = document.getElementsByName("captcha_settings")[0];
    if (!field) return;
    const elems = JSON.parse(field.value);
    elems["ts"] = JSON.stringify(new Date().getTime());
    field.value = JSON.stringify(elems);
  }
}
setInterval(timestamp, 500);

/* Reveal on scroll */
const reveals = document.querySelectorAll(".reveal");
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("in"));
}

/* Submit state — Salesforce redirects to retURL, so this only guards
   against double-submits while the POST is in flight. */
const form = document.getElementById("rsvp-form");
const submitBtn = document.getElementById("rsvp-submit");
if (form && submitBtn) {
  form.addEventListener("submit", () => {
    submitBtn.disabled = true;
    submitBtn.querySelector("span").textContent = "Sending…";
  });
}
