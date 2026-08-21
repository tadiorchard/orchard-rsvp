# orchard-rsvp

One-page invitation and RSVP capture for **Dr. Ighoyivwi's sponsored dinner**,
hosted by Orchard.

**Live:** https://orchard-rsvp-two.vercel.app

| | |
|---|---|
| Event | Friday, October 16, 2026 · 7:00 PM |
| Venue | Ruggles Black — 2245 W Alabama St, Houston, TX 77098 |
| Site | https://rugglesblack.com |

## Files

| File | Purpose |
|---|---|
| `index.html` | The invitation and RSVP form |
| `thanks.html` | Confirmation page — the form's Salesforce `retURL` |
| `styles.css` | All styling for both pages |
| `script.js` | Specialty picklist, scroll reveals, submit guard |
| `src/assets/` | Venue photography |

## Salesforce

The RSVP posts straight to Salesforce Web-to-Lead — same org and field IDs
as the forms on orchardcorp.com.

| Form field | Salesforce field |
|---|---|
| First / last name | `first_name`, `last_name` |
| Specialty | `00NWj00000UHYgp` |
| Cellphone | `mobile` |
| Email | `email` |

Hidden: `oid` (`00DKc000000Ivmn`), `retURL`, `lead_source`
(`Dinner RSVP - Dr. Ighoyivwi - Oct 16`), `company` (`[Dinner RSVP]`).

Leads are found in Salesforce by filtering Lead Source on that value.

Spam control is a honeypot field only. To add reCAPTCHA, register the
deployed domain in the Google reCAPTCHA console first, then add the
`captcha_settings` hidden input and `g-recaptcha` div used on orchardcorp.com.

## Local preview

```bash
python3 -m http.server 8000
```

Deploys automatically from `main` via Vercel.
