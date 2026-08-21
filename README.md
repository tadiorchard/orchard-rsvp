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
| Specialty | `00NWj00000UkWBz` |
| Cellphone | `mobile` |
| Email | `email` |

Also captured: Reference (`00NWj00000ZPEZz`, defaulted to
`Ruggles Black Restaraunt`), Table for (`00NWj00000ZPQ4n`), City, State and
Additional Notes (`00NWj00000UHuAz`).

Hidden: `oid` (`00DKc000000Ivmn`), `retURL`, `lead_source` (`Web`).

Dinner RSVPs are identified in Salesforce by filtering **Reference =
`Ruggles Black Restaraunt`**.

### reCAPTCHA — currently parked

The widget is commented out in `index.html` (both the `api.js` script in
`<head>` and the `.captcha` block in the form). The site key is restricted to
orchardcorp.com domains, so on this host it rendered
`ERROR for site owner: Invalid domain for site key`.

**To re-enable:** add `orchard-rsvp-two.vercel.app` to the site key's domains
at https://www.google.com/recaptcha/admin, then uncomment both blocks.

The `captcha_settings` hidden field is deliberately left in place — it carries
`"fallback":"true"`, so Salesforce keeps accepting leads while the widget is off.

## Local preview

```bash
python3 -m http.server 8000
```

Deploys automatically from `main` via Vercel.
