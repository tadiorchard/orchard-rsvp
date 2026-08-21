/* Orchard — RSVP invite
   Specialty list mirrors the picklist used by the Salesforce Lead field
   00NWj00000UHYgp on orchardcorp.com, so values match what Sales sees. */

const SPECIALTIES = [
  "Abdominal Radiology","Acute Care","Addiction Medicine","Adolescent Medicine","Allergy & Immunology",
  "Anesthesiology","Bariatric Surgery","Breast Surgery","Cardiac Surgery","Cardiology",
  "Cardiothoracic Surgery","Certified Anesthesiologist Assistant (CAA)","Certified Nurse Midwife",
  "Certified Registered Nurse Anesthetist (CRNA)","Colon & Rectal Surgery","Critical Care Medicine",
  "Dentistry","Dermatology","Diagnostic Radiology","Emergency Medicine","Endocrinology",
  "ENT / Otolaryngology","Family Medicine","Gastroenterology","General Surgery","Geriatric Medicine",
  "Gynecologic Oncology","Hand Surgery","Hematology / Oncology","Hospice & Palliative Medicine",
  "Hospitalist","Infectious Disease","Internal Medicine","Interventional Cardiology",
  "Interventional Radiology","Maternal-Fetal Medicine","Nephrology","Neurology","Neurosurgery",
  "Neonatology","Nuclear Medicine","Nurse Practitioner","Obstetrics & Gynecology","Occupational Medicine",
  "Oncology","Ophthalmology","Oral & Maxillofacial Surgery","Orthopedic Surgery","Pain Management",
  "Pathology","Pediatrics","Pediatric Cardiology","Pediatric Surgery","Physiatry / PM&R",
  "Physician Assistant","Plastic Surgery","Podiatry","Primary Care","Psychiatry","Psychology",
  "Pulmonology","Radiation Oncology","Radiology","Rheumatology","Sleep Medicine","Sports Medicine",
  "Surgical Oncology","Telemedicine","Thoracic Surgery","Trauma Surgery","Urgent Care","Urology",
  "Vascular Surgery","Wound Care","Other",
];

/* Populate the specialty picklist */
const select = document.getElementById("00NWj00000UHYgp");
if (select) {
  const frag = document.createDocumentFragment();
  for (const s of SPECIALTIES) {
    const o = document.createElement("option");
    o.value = s;
    o.textContent = s;
    frag.appendChild(o);
  }
  select.appendChild(frag);
}

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

/* Submit state — Salesforce redirects to retURL, so this just prevents
   double-submits while the POST is in flight. */
const form = document.getElementById("rsvp-form");
const submitBtn = document.getElementById("rsvp-submit");
if (form && submitBtn) {
  form.addEventListener("submit", (e) => {
    /* Honeypot: silently drop bot submissions */
    const hp = form.querySelector('input[name="website"]');
    if (hp && hp.value.trim() !== "") {
      e.preventDefault();
      return;
    }
    submitBtn.disabled = true;
    submitBtn.querySelector("span").textContent = "Sending…";
  });
}
