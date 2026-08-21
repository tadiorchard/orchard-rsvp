# orchard-rsvp

One-page invitation and RSVP capture for a **sponsored dinner** hosted by
Orchard. (The host physician's name is intentionally omitted from the page
for now.)

**Live:** https://orchard-rsvp-two.vercel.app

| | |
|---|---|
| Event | Friday, October 16, 2026 · 6:00 PM |
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
| Specialty | `00NWj00000UkWBz` |
| Cellphone | `mobile` |
| Email | `email` |

Also captured: Reference (`00NWj00000ZPEZz`, defaulted to
`Ruggles Black Restaraunt`), Table for (`00NWj00000ZPQ4n`), City, State and
Additional Notes (`00NWj00000UHuAz`).

Hidden: `oid` (`00DKc000000Ivmn`), `retURL`, `lead_source` (`Web`).

Dinner RSVPs are identified in Salesforce by filtering **Reference =
`Ruggles Black Restaraunt`**.

### reCAPTCHA

reCAPTCHA v2 is active on the form, using the same site key as the
orchardcorp.com forms.

The key is domain-restricted: if the deployed host is not listed at
https://www.google.com/recaptcha/admin the widget renders
`ERROR for site owner: Invalid domain for site key`. Add any new domain
there before pointing it at this page.

The `captcha_settings` hidden field carries `"fallback":"true"`, so
Salesforce still accepts leads if the captcha cannot be completed.

## Local preview

```bash
python3 -m http.server 8000
```

Deploys automatically from `main` via Vercel.
