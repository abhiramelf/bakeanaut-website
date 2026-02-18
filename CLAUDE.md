# CLAUDE.md — Bakeanaut One-Page Lander

## Project Overview

Bakeanaut is a **deep-space themed experiential dessert brand** based in Thiruvananthapuram, Kerala. This project is a single-page brutalist lander that replaces the current site at bakeanaut.in. It serves as both a brand introduction and a functional ordering tool that routes orders through WhatsApp.

**Live reference (old branding, being replaced):** https://bakeanaut.in

---

## Tech Stack

- **Framework:** Next.js 16 (App Router) with static export, OR Astro — choose whichever is faster for a single-page static site
- **Styling:** Tailwind CSS v4 + custom CSS for brutalist elements (grain textures, stamp effects, etc.)
- **Animations:** Framer Motion for scroll-triggered reveals and micro-interactions. Respect `prefers-reduced-motion`.
- **State:** React `useState`/`useReducer` for cart. `localStorage` for cart persistence.
- **No backend.** WhatsApp is the order endpoint. No database. No auth.
- **Deployment target:** Vercel or Netlify (static)

---

## Brand Rules (NON-NEGOTIABLE)

### Color Palette — Use ONLY these colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--deep-space-purple` | `#2B0F45` | Primary background, headers |
| `--cosmic-orange` | `#FF8A3D` | CTAs, accents, highlights, badges |
| `--cookie-tan` | `#F2C48D` | Warm secondary accent |
| `--mission-white` | `#FFFFFF` | Primary text on dark |
| `--warning-yellow` | `#FFD84D` | Utility badges, alerts |
| `--dark-bg` | `#1A0830` | Deep sections, nav bg on scroll |
| `--muted-purple` | `#8B6FA3` | Secondary text, descriptions |
| `--light-purple` | `#3D1560` | Card backgrounds, overlays |

**Never use** blues, greens, reds, or any color outside this palette.

### Typography

This is a **brutalist** site. Typography is the #1 differentiator.

- **Display / H1:** Bold, condensed, uppercase. Use a font like `Space Grotesk` (700/800), `Clash Display`, `Syne`, or similar geometric brutalist display face from Google Fonts. Must feel heavy, engineered, industrial. **Not** decorative, rounded, or friendly.
- **H2 / H3:** Same family at lighter weight.
- **Body:** Clean sans-serif. `Space Grotesk` Regular or similar.
- **Monospace (for codes, sector labels, metadata):** `JetBrains Mono`, `IBM Plex Mono`, or `Space Mono`.
- **Never use:** Inter, Roboto, Arial, Poppins, Nunito, system fonts, or anything generic.
- Self-host all fonts. Preload critical weights.

### Voice & Copy

- **Use:** Mission Log, Sector, Launch Gear, Payload, Clearance Level, Crew, Cadet, Commander, Classified, Debrief, Archive, Mission Confirmed, Safe Landing
- **NEVER use on-site:** sweet, desserts, bakery, yummy, homemade, treats, "freshly baked" — these words are banned
- **Tone:** Confident, playful, precise, premium. Write like mission control documenting launches. Humor is dry and subtle.

### Visual Design Principles

- **Brutalist aesthetic:** Raw bold typography with extreme size contrasts (hero text 80–120px desktop). Visible grid/borders as design elements. Sharp edges everywhere — no border-radius on containers. Monospace text for codes and metadata.
- **Space program feel:** Stamp/seal motifs ("CLASSIFIED", "TOP SECRET", "CLEARANCE GRANTED") as CSS-generated decorative elements. Subtle star-field or grain texture backgrounds. High contrast between dark sections.
- **NOT:** Rounded corners on cards. Bouncy animations. Pastel anything. Generic card layouts. AI-slop gradients.
- Animations should feel mechanical and precise — ease-out, not spring/bounce.

---

## Page Sections (in scroll order)

### 1. Fixed Navigation Bar
- Logo/wordmark left
- Nav links: Menu · About · Gallery (smooth scroll)
- Cart icon (right) with dynamic item count badge
- "Order Now" WhatsApp CTA button
- Transparent on hero → solid `--dark-bg` with backdrop-blur on scroll
- Mobile: hamburger → slide-in drawer

### 2. Hero (100vh)
- Background: `--deep-space-purple` / `--dark-bg` with subtle CSS star-field or grain overlay
- Headline: **"EDIBLE MISSIONS. CLEARED FOR LAUNCH."** (massive brutalist type, 80–120px desktop)
- Sub-headline: "An experiential brand built around indulgent, dessert-forward missions."
- Two CTAs side by side:
  - "Browse Missions" → scrolls to menu section (outlined/secondary)
  - "Order on WhatsApp" → opens `https://wa.me/919916699631?text=🚀 Hey Bakeanaut! I'd like to place an order.` (primary orange)
- Scroll indicator at bottom
- Consider: "CLASSIFIED" stamp watermark in corner

### 3. Brand Introduction ("THE PROGRAM")
- Section label in monospace: `THE PROGRAM`
- 3-column cards (stack on mobile):
  - "Not a bakery." — A space program for your taste buds.
  - "Not products." — Missions with codes, logs, and lore.
  - "Not customers." — Crew members who earn badges and rank up.
- Below: large italic quote: "Every offering exists for a reason. Every customer becomes crew."
- Cards: visible borders (1–2px solid), top-border accent in orange, no border-radius

### 4. Photo Gallery ("MISSION ARCHIVE")
- Masonry or asymmetric grid, 6–8 image slots
- Images: sharp edges, no border-radius
- Hover: slight zoom + dark overlay with mission name in monospace
- Mobile: 2-column grid or horizontal scroll
- Use placeholder images during dev (dark-themed food photography)

### 5. Menu ("ACTIVE MISSIONS") — THE CORE SECTION
- Header: "ACTIVE MISSIONS" in large brutalist type
- Subtext: "Limited payload per day · Ask crew about classified drops"
- Each sector is a visually distinct block with:
  - Sector code in monospace (e.g., `SECTOR I`)
  - Sector name in display font (e.g., `PLANETARY COOKIES`)
  - Sector flavor text in italic
  - Mission items as rows/cards below

**COMPLETE MENU DATA:**

```
SECTOR I: PLANETARY COOKIES
"Samples collected from unstable planetary surfaces."
- BLACK HOLE — Dark cocoa shell, molten white-chocolate singularity
- RED PLANET [BEST SELLING] — Crimson velvet crust, cream-cheese lava core
- METEOR SHOWER — Brown-butter base, walnut craters + chocolate debris

SECTOR II: NEBULA BLOCKS (BROWNIES / BLONDIES)
"Dense dark-matter rations for long-haul cravings."
- MILKY WAY SWIRL — Deep fudge block, salted caramel spiral
- APOLLO ROCK [BEST SELLING] — Triple-chocolate terrain, chocolate sauce

SECTOR III: NEW YORK LUNAR CHEESECAKES (NYC BAKED)
"Lunar terrain, baked and stabilized for safe re-entry."
- MANHATTAN MOON (CLASSIC) [★ TOP MISSION] — NYC baked cheesecake, clean vanilla orbit
- BROOKLYN BLACKOUT (DARK) [★ TOP MISSION] — Dark-choco / oreo signal loss

SECTOR IV: MINI RE-ENTRY BASQUES (LIMITED)
"Heat-shielded minis. Handle with care."
- SOLAR FLARE MINI [BEST SELLING] — Caramelized armor, molten core (Ask crew for toppings)

SECTOR V: DOCKING BOMBA (BOMBOLONIS)
"Soft landing pods. High-value cores."
- CHERRY COMET — Buttercream core, cherry compote trail
- DARK MATTER CORE — Chocolate / nutella core breach

SECTOR VI: THRUSTER BUNS (SAVORY OPS)
"Small heat signatures. Big impact. Limited clearance."
- CHILI COMMS BUN — Molten cheese, chilli heat, launch-ready (Spice: medium)

SECTOR VII: ORBITAL SLICES (CAKE SLICES)
"Mission-ready slices for immediate deployment."
- STRAWBERRY SIGNAL SLICE [BEST SELLING] — Vanilla sponge + vanilla buttercream + strawberry compote
- TRIPLE-ARC GANACHE SLICE — Dark choco sponge, milk-choco + white-choco ganache overlay

SPECIAL PAYLOADS (LIMITED)
"Not always visible on the board. Ask crew for clearance."
- CRIMSON CLASSIFIED TIN — Red velvet cookie tin, white-chocolate core (built for gifting)

BUNDLES (RECOMMENDED FLIGHT PLANS)
- ORBIT PACK — Any 3 Cookies
- DOCKING DUO — Cookie + Brownie
- SECTOR HOP — Pick any 2 from different sectors (unlock extra sticker)
```

**Each menu item shows:** mission name (bold uppercase), badge tags ([BEST SELLING] / [★ TOP MISSION] / [LIMITED]), one-line description (muted), price (placeholder "Ask crew" for now), quantity selector (−/count/+), Add to Cart button.

Best-selling items: orange left-border or star badge for visual distinction. Bundles: different card style.

### 6. Cart System
- Slide-in drawer from right (desktop) / bottom sheet (mobile)
- Title: "MISSION PAYLOAD"
- Shows: item name, sector, quantity, remove button, quantity adjust
- Subtotal line (when prices are added)
- Clear Cart button (with confirmation)
- Primary CTA: **"LAUNCH ORDER ON WHATSAPP"** (large, orange, unmissable)
- Cart state persists via `localStorage`

**WhatsApp message format on order launch:**
```
🚀 BAKEANAUT — NEW MISSION ORDER

Mission Payload:
1x RED PLANET (Sector I: Planetary Cookies)
2x MANHATTAN MOON (Sector III: NY Lunar Cheesecakes)
1x APOLLO ROCK (Sector II: Nebula Blocks)

Total Items: 4

Awaiting launch clearance. 🛰️
```
URL: `https://wa.me/919916699631?text={URL_ENCODED_MESSAGE}`

### 7. Footer
- Bakeanaut wordmark
- Location: Near Manacaud P.O., Thiruvananthapuram, 695009
- Hours: Mon–Thu 11AM–9PM, Fri–Sat 11AM–10PM, Sun 12PM–8PM
- Phone: +91 9916699631
- Instagram: @bakeanaut_
- Legal links: Terms, Privacy, Return & Refund, Shipping
- Closing line in monospace: "Edible Missions. Cleared for Launch."

---

## Animations

All animations: **mechanical, precise, ease-out**. Never bouncy/spring.

- **Page load:** Hero text staggered word reveal (0.4s each, ease-out). CTAs fade in after text. Nav fades from transparent.
- **Scroll:** Each section fades up via IntersectionObserver. Sector headers slide-in or typewriter reveal. Gallery images staggered scale-up.
- **Interactions:** Add-to-Cart → pulse on cart icon + count bump. Menu item hover → orange left-border grow + slight translateX. Cart drawer → slide in 200ms ease-out. Quantity buttons → scale 0.95 press feedback.
- **Always** respect `prefers-reduced-motion`.

---

## Performance Targets

- Lighthouse Performance: > 85
- Lighthouse Accessibility: > 90
- First Contentful Paint: < 1.5s on 4G
- Cumulative Layout Shift: < 0.1
- All images: lazy-loaded, WebP/AVIF, proper srcset
- Fonts: self-hosted, preloaded critical weights

---

## Mobile-First Responsive

- **Mobile (360–767px):** Primary target. Stack all layouts. Bottom sticky "View Cart" bar when items in cart. Full-width sections.
- **Tablet (768–1023px):** 2-column where appropriate.
- **Desktop (1024px+):** Full layouts. Max content width ~1280px.
- **Large (1440px+):** Generous margins, content centered.

---

## Accessibility

- All interactive elements keyboard-navigable
- ARIA labels on cart, quantity controls, navigation, modals
- Color contrast: WCAG AA (4.5:1 text, 3:1 large text)
- Focus-visible styles matching brand aesthetic (orange outline)
- Reduced-motion support
- Skip-to-content link

---

## SEO

- Meta tags: title ("Bakeanaut — Edible Missions. Cleared for Launch."), description, OG image, Twitter Card
- Structured data: LocalBusiness schema
- Canonical: https://bakeanaut.in
- sitemap.xml and robots.txt

---

## File Structure Convention

```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    Navbar.tsx
    Hero.tsx
    BrandIntro.tsx
    Gallery.tsx
    Menu.tsx
    MenuItem.tsx
    Cart.tsx
    CartDrawer.tsx
    Footer.tsx
  data/
    menu.ts          # All sector/mission data as typed constants
  hooks/
    useCart.ts        # Cart state + localStorage persistence
    useScrollSpy.ts   # Active section tracking for nav
  lib/
    whatsapp.ts       # WhatsApp URL builder + message formatter
  types/
    index.ts          # MenuItem, Sector, CartItem types
public/
  images/
    gallery/          # Product photography (placeholders during dev)
  fonts/              # Self-hosted font files
```

---

## Key Implementation Notes

1. **Menu data belongs in `data/menu.ts`** — typed array of Sector objects, each containing Mission items. Never hardcode menu data in components.
2. **Cart hook (`useCart.ts`)** should handle: add, remove, update quantity, clear, persist to localStorage, restore on mount, generate WhatsApp message.
3. **WhatsApp URL builder (`lib/whatsapp.ts`)** should URL-encode the full message and return the `wa.me` link. Test that the message renders correctly in WhatsApp on both mobile and desktop.
4. **Images are placeholders** — use dark-themed food photography from Unsplash with a comment marker `{/* TODO: Replace with real product photo */}` for easy find-and-replace later.
5. **No prices yet** — display "Ask crew" as placeholder. The price field should exist in the data model (nullable) so it can be added later without code changes.
6. **Respect the brand.** If you're unsure whether a design choice feels "Bakeanaut," ask: does this feel like mission control? Does this feel engineered? Would this feel at home in a space program interface? If yes, proceed.

---

## Commands

```bash
npm run dev        # Local development
npm run build      # Production build
npm run lint       # Lint check
npm run preview    # Preview production build locally
```

---

## Out of Scope (V1)

- Online payments (Razorpay/Stripe)
- User accounts / order history
- Loyalty badge tracking
- Delivery tracking
- Multi-language
- CMS integration