# BAKEANAUT — One-Page Lander PRD

**Version 1.0 · February 2026 · For Claude Code Implementation**

---

## 1. Overview

Bakeanaut is a deep-space themed experiential dessert brand based in Thiruvananthapuram, Kerala. This PRD defines the requirements for a new one-page website lander that replaces the current site at bakeanaut.in. The lander must communicate the brand's premium, mysterious identity while serving as a functional ordering tool that routes orders through WhatsApp.

### Project Goal

Build a brutalist-style, single-page lander that introduces the Bakeanaut universe, showcases the full menu with real mission names and sector organization, and enables a frictionless cart-to-WhatsApp ordering flow.

### Success Metrics

- User can browse all sectors and missions within 2 scrolls of the menu section
- Cart-to-WhatsApp flow completes in under 3 taps after adding items
- Page loads under 3 seconds on 4G mobile (Lighthouse performance > 85)
- Mobile-first responsive design works flawlessly on screens 360px and above
- The page immediately communicates "this is not a typical bakery" through visual design

---

## 2. Brand Context

### 2.1 Brand Identity

Bakeanaut is an experiential brand built around indulgent, dessert-forward missions — where every offering exists for a reason and every customer becomes crew. It is built like a space program, not a typical bakery.

**Voice Attributes:**
- Confident (not loud)
- Playful (not childish)
- Precise (not robotic)
- Premium (not pretentious)

**Approved Vocabulary:**
Mission Log, Sector, Launch Gear, Payload, Clearance Level, Crew, Cadet, Commander, Classified, Debrief, Archive, Mission Confirmed, Safe Landing

**Words to NEVER Use On-Site:**
~~sweet, desserts, bakery, yummy, homemade, treats, "freshly baked"~~ — these are strictly prohibited across all copy on the site.

### 2.2 Design System

#### Color Palette (LOCKED — DO NOT DEVIATE)

| Token | Hex | Usage |
|-------|-----|-------|
| Deep Space Purple | `#2B0F45` | Primary background, headers |
| Cosmic Orange | `#FF8A3D` | CTAs, accents, highlights, badges |
| Cookie Crumb Tan | `#F2C48D` | Warm secondary accent |
| Mission White | `#FFFFFF` | Primary text on dark |
| Warning Yellow | `#FFD84D` | Utility badges, alerts |
| Dark Background | `#1A0830` | Deep sections, nav bg on scroll |
| Muted Purple | `#8B6FA3` | Secondary text, descriptions |
| Light Purple | `#3D1560` | Card backgrounds, overlays |
| Metallic Silver | `#C0C0C0` | Subtle print-style accents |

Never use blues, greens, reds, or any color outside this palette.

#### Typography Direction

The site must use a brutalist typographic approach. Headers should feel engineered, bold, and impactful. Body text should be clean and highly legible.

- **Display / H1:** A bold, condensed, uppercase typeface — consider fonts like Space Grotesk Black, Monument Extended, Clash Display, Syne, or similar brutalist display faces available on Google Fonts. Must feel engineered and intentional, not decorative.
- **H2/H3 headings:** Same family at lighter weight, or a complementary geometric sans
- **Body:** Clean sans-serif (Space Grotesk Regular, or similar) for readability
- **Monospace accents:** For mission codes, sector labels, and utility text (e.g., JetBrains Mono, IBM Plex Mono, Space Mono)
- **Taglines:** Same as display but with increased letter-spacing for breathing room

> **CRITICAL:** Typography is the single biggest differentiator in a brutalist design. It must feel heavy, intentional, and engineered. Never use default system fonts. Never use fonts that feel generic, rounded, or friendly (Poppins, Nunito, etc.).

#### Brutalist Design Principles

- Raw, bold typography with extreme size contrasts (hero text can be 80–120px on desktop)
- High contrast between sections (deep purple to pure black, orange on dark)
- Visible grid / structure — borders, rules, and grids as design elements, not hidden
- Monospace text for codes, labels, and metadata
- Stamps, seals, classified markers as graphic motifs (CSS-based, not images)
- Heavy use of uppercase for section headers and sector names
- Asymmetric layouts where appropriate (but content-readable)
- Noise/grain texture overlays for depth (subtle, via CSS)
- Sharp edges — no rounded corners on containers (round only on small badges/pills)
- Hover states should feel mechanical/precise (not bouncy)

---

## 3. Information Architecture & Page Sections

The page is a single scrollable document with these sections in order. Each section should feel like a distinct "zone" with visual separation through background changes, border rules, or layout shifts.

### 3.1 Navigation Bar (Fixed)

A fixed top navigation that stays visible on scroll.

**Elements:**
- Bakeanaut logo/wordmark (left)
- Nav links: Menu · About · Gallery (smooth scroll anchors)
- Cart icon (right) with item count badge — opens cart drawer/modal on click
- WhatsApp CTA button: "Order Now" (styled as primary CTA)

**Behavior:**
Nav should be transparent on hero, then gain a solid dark background (`#1A0830` with slight blur) on scroll. Cart badge updates dynamically. Mobile: hamburger menu with slide-in drawer.

### 3.2 Hero Section

The first thing a user sees. Must immediately communicate: this is not a normal brand.

**Layout:**
Full-viewport height (100vh). Deep space purple/dark background with subtle star-field or grain texture. Content centered or left-aligned with dramatic typography.

**Content:**
- Primary headline: **"EDIBLE MISSIONS. CLEARED FOR LAUNCH."** (massive, brutalist type, 80–120px desktop)
- Sub-headline: "An experiential brand built around indulgent, dessert-forward missions."
- Two CTAs side by side:
  - → "Browse Missions" (scrolls to menu section, outlined/secondary style)
  - → "Order on WhatsApp" (opens WhatsApp link, primary orange CTA)
- Scroll indicator at bottom (animated down-arrow or "SCROLL TO EXPLORE" in monospace)

**Design Notes:**
Consider a subtle animated star-field in the background (CSS keyframe particles or canvas). A "CLASSIFIED" stamp watermark in the corner adds brand texture. The hero should feel like the opening screen of a space program interface.

### 3.3 Brand Introduction Section

A short, punchy section that explains what Bakeanaut is.

**Content:**
- Section header: "THE PROGRAM" (in monospace/uppercase with letter-spacing)
- 3-column card layout (stacks on mobile):
  - Card 1: "Not a bakery." — A space program for your taste buds.
  - Card 2: "Not products." — Missions with codes, logs, and lore.
  - Card 3: "Not customers." — Crew members who earn badges and rank up.
- Below cards: A single-line brand quote in large italic: *"Every offering exists for a reason. Every customer becomes crew."*

**Design:**
Cards should have visible borders (1–2px solid, muted purple or orange), not rounded. Background shift from hero to slightly lighter dark. Cards could have a top-border accent in orange. Monospace sector-style labels above each card title.

### 3.4 Photo Gallery Section

A visually rich section that shows Bakeanaut's products in their best light.

**Layout:**
Masonry grid or asymmetric gallery layout. 6–8 image slots. Images should be high-quality product shots (user will replace placeholders). On mobile, 2-column grid.

**Content:**
- Section header: "MISSION ARCHIVE"
- Each image can have a subtle overlay on hover showing the mission name and sector
- Include a mix: close-up product shots, packaging shots, flat-lays, and one lifestyle/context shot

**Design:**
Images should have sharp edges (no border-radius). Consider a "film strip" or "mission film" aesthetic. A subtle horizontal scroll variant on mobile could work well. Hover effect: slight zoom + dark overlay with mission name in monospace.

### 3.5 Menu Section (Core Functional Section)

This is the most important section. It must display all sectors and missions, allow users to add items to cart, and feel like a mission control interface.

**Section Header:**
"ACTIVE MISSIONS" in large brutalist type. Subtext: "Limited payload per day · Ask crew about classified drops"

**Sector Organization:**
Each sector is a visually distinct block. Sectors are displayed vertically, one after another. Each sector block contains:

1. Sector label in monospace: e.g., "SECTOR I"
2. Sector name in bold display: e.g., "PLANETARY COOKIES"
3. Sector description/flavor text in smaller italic
4. Mission items listed below with: mission name, description, price, add-to-cart button

#### Complete Menu Data

**SECTOR I: PLANETARY COOKIES**
*"Samples collected from unstable planetary surfaces."*

| Mission | Description | Tags |
|---------|-------------|------|
| BLACK HOLE | Dark cocoa shell, molten white-chocolate singularity | |
| RED PLANET | Crimson velvet crust, cream-cheese lava core | `[BEST SELLING]` |
| METEOR SHOWER | Brown-butter base, walnut craters + chocolate debris | |

**SECTOR II: NEBULA BLOCKS (BROWNIES / BLONDIES)**
*"Dense dark-matter rations for long-haul cravings."*

| Mission | Description | Tags |
|---------|-------------|------|
| MILKY WAY SWIRL | Deep fudge block, salted caramel spiral | |
| APOLLO ROCK | Triple-chocolate terrain, chocolate sauce | `[BEST SELLING]` |

**SECTOR III: NEW YORK LUNAR CHEESECAKES (NYC BAKED)**
*"Lunar terrain, baked and stabilized for safe re-entry."*

| Mission | Description | Tags |
|---------|-------------|------|
| MANHATTAN MOON (CLASSIC) | NYC baked cheesecake, clean vanilla orbit | `[★ TOP MISSION]` |
| BROOKLYN BLACKOUT (DARK) | Dark-choco / oreo signal loss | `[★ TOP MISSION]` |

**SECTOR IV: MINI RE-ENTRY BASQUES (LIMITED)**
*"Heat-shielded minis. Handle with care."*

| Mission | Description | Tags |
|---------|-------------|------|
| SOLAR FLARE MINI | Caramelized armor, molten core (Ask crew for toppings) | `[BEST SELLING]` `[LIMITED]` |

**SECTOR V: DOCKING BOMBA (BOMBOLONIS)**
*"Soft landing pods. High-value cores."*

| Mission | Description | Tags |
|---------|-------------|------|
| CHERRY COMET | Buttercream core, cherry compote trail | |
| DARK MATTER CORE | Chocolate / nutella core breach | |

**SECTOR VI: THRUSTER BUNS (SAVORY OPS)**
*"Small heat signatures. Big impact. Limited clearance."*

| Mission | Description | Tags |
|---------|-------------|------|
| CHILI COMMS BUN | Molten cheese, chilli heat, launch-ready (Spice level: medium) | |

**SECTOR VII: ORBITAL SLICES (CAKE SLICES)**
*"Mission-ready slices for immediate deployment."*

| Mission | Description | Tags |
|---------|-------------|------|
| STRAWBERRY SIGNAL SLICE | Vanilla sponge + vanilla buttercream + strawberry compote transmission | `[BEST SELLING]` |
| TRIPLE-ARC GANACHE SLICE | Dark choco sponge, milk-choco ganache + white-choco ganache overlay | |

**SPECIAL PAYLOADS (LIMITED)**
*"Not always visible on the board. Ask crew for clearance."*

| Mission | Description | Tags |
|---------|-------------|------|
| CRIMSON CLASSIFIED TIN | Red velvet cookie tin with white-chocolate core system (built for gifting) | `[LIMITED]` |

**BUNDLES (RECOMMENDED FLIGHT PLANS)**

| Bundle | Description |
|--------|-------------|
| ORBIT PACK | Any 3 Cookies |
| DOCKING DUO | Cookie + Brownie |
| SECTOR HOP | Pick any 2 items from different sectors (unlock extra sticker) |

#### Menu Item UI Pattern

Each mission item should display as a row or card with:

1. Mission name (bold, uppercase, display font)
2. Tags: `[BEST SELLING]` or `[★ TOP MISSION]` or `[LIMITED]` as small pill badges
3. One-line description (smaller, muted text)
4. Price (if available — placeholder if not yet set; mark as "Ask crew")
5. Quantity selector: − / count / + buttons
6. Add to Cart button (orange accent, compact)

#### Menu Interaction Notes

- Best-selling / Top Mission items should have a subtle visual distinction (orange left-border, or a small star badge)
- `[LIMITED]` items should show a "LIMITED CLEARANCE" tag
- Bundles section should visually differentiate from single items (different card style or background)
- Consider a sticky "View Cart" bar at the bottom of the menu section on mobile when items are in cart

### 3.6 Cart System

The cart is a slide-in drawer (from right on desktop, from bottom on mobile) or a modal.

**Cart UI:**

1. Header: "MISSION PAYLOAD" (cart title)
2. List of added items showing: mission name, quantity, price (if set), remove button
3. Quantity adjustment (+/−) within cart
4. Subtotal line (if prices are set)
5. Clear Cart button (destructive, with confirmation)
6. Primary CTA: **"LAUNCH ORDER ON WHATSAPP"** (large, orange, impossible to miss)

#### WhatsApp Integration

When the user taps "Launch Order on WhatsApp," the app opens WhatsApp (or WhatsApp Web) with a prefilled message to the Bakeanaut business number.

**WhatsApp Number:** +91 9916699631

**Prefilled message format:**

```
🚀 BAKEANAUT — NEW MISSION ORDER

Mission Payload:
1x RED PLANET (Sector I: Planetary Cookies)
2x MANHATTAN MOON (Sector III: NY Lunar Cheesecakes)
1x APOLLO ROCK (Sector II: Nebula Blocks)

Total Items: 4

Awaiting launch clearance. 🛰️
```

**Technical implementation:** Use the WhatsApp API URL format: `https://wa.me/919916699631?text={encoded_message}`. The message must be URL-encoded. Include sector names next to mission names for context.

#### Cart Persistence

Cart state should persist across page refreshes using `localStorage`. Cart should save: item name, sector, quantity. On page load, restore cart state from localStorage.

### 3.7 Footer Section

Minimal footer with brand info and links.

- Bakeanaut wordmark/logo
- Location: Near Manacaud P.O., Thiruvananthapuram, 695009
- Hours: Mon–Thu 11AM–9PM, Fri–Sat 11AM–10PM, Sun 12PM–8PM
- Phone: +91 9916699631
- Social links: Instagram (@bakeanaut_)
- Legal links: Terms, Privacy, Return & Refund, Shipping
- Bottom line: "Edible Missions. Cleared for Launch." in monospace

---

## 4. Technical Requirements

### 4.1 Stack

- **Framework:** Next.js (App Router) or Astro for static generation with minimal client JS
- **Styling:** Tailwind CSS for utility-first styling + custom CSS for brutalist elements
- **Animations:** Framer Motion (or CSS animations) for scroll-triggered reveals and micro-interactions
- **State:** React state (useState/useReducer) for cart management
- **Persistence:** localStorage for cart persistence
- **Backend:** None required — fully static with WhatsApp as the order endpoint
- **Deployment:** Vercel or Netlify

### 4.2 Performance

- Lighthouse score: Performance > 85, Accessibility > 90
- All images lazy-loaded and served in WebP/AVIF with proper srcset
- Fonts: Self-host Google Fonts, preload critical font weights
- Zero layout shift (CLS < 0.1)
- First Contentful Paint < 1.5s on 4G

### 4.3 Responsive Breakpoints

- **Mobile:** 360px–767px (primary target)
- **Tablet:** 768px–1023px
- **Desktop:** 1024px+
- **Large desktop:** 1440px+ (max content width)

### 4.4 Accessibility

- All interactive elements keyboard-navigable
- ARIA labels on cart, quantity buttons, navigation
- Color contrast ratios meet WCAG AA (4.5:1 for text, 3:1 for large text)
- Focus-visible styles that match brand aesthetic
- Reduced-motion media query support
- Skip-to-content link

### 4.5 SEO

- Proper meta tags: title, description, Open Graph, Twitter Card
- Structured data: LocalBusiness schema for Bakeanaut
- Canonical URL set to bakeanaut.in
- Sitemap.xml and robots.txt

---

## 5. Core User Flows

### 5.1 First-Time Visitor Flow

1. Lands on page → Hero grabs attention with bold copy and dark-space aesthetic
2. Scrolls or clicks "Browse Missions" → Brand intro section explains the universe
3. Continues to Gallery → Product photos build desire
4. Reaches Menu → Browses sectors, reads mission names and descriptions
5. Adds items to cart → Cart count badge updates in nav + brief confirmation animation
6. Opens cart → Reviews payload, adjusts quantities
7. Taps "Launch Order on WhatsApp" → WhatsApp opens with prefilled message
8. Completes order via WhatsApp conversation with Bakeanaut crew

### 5.2 Returning Visitor Flow

Cart items persist via localStorage. Returning user sees their previous cart if not completed. They can modify and re-launch.

### 5.3 Direct Order Flow

User clicks "Order on WhatsApp" in the hero → Opens WhatsApp directly to Bakeanaut's number with a general greeting: "🚀 Hey Bakeanaut! I'd like to place an order."

---

## 6. Animation & Interaction Design

Animations should feel **mechanical and precise** — not bouncy or playful. Think mission control interfaces, not playgrounds.

### Page Load
- Hero text: staggered reveal, each word fading up with slight delay (ease-out, 0.4s per word)
- CTAs: fade in after hero text completes
- Nav: fades in from transparent

### Scroll-Triggered
- Each section fades up when entering viewport (IntersectionObserver)
- Sector headers: typewriter-style reveal or slide-in from left
- Gallery images: staggered scale-up on scroll

### Interaction
- Add to Cart: brief pulse animation on the cart icon + item count bump
- Hover on menu items: subtle left-border grow (orange) + slight translateX
- Cart drawer: slides in from right (200ms ease-out)
- Quantity buttons: press feedback (scale down 0.95 on click)

---

## 7. Content & Image Placeholders

The following elements will need real content from the Bakeanaut team. Use high-quality placeholder images during development:

- **Hero background:** Dark abstract/space texture (can be CSS-generated during dev)
- **Gallery images:** 6–8 product photography placeholders (use dark-themed food photography from Unsplash during dev, tagged for replacement)
- **Logo:** Current Bakeanaut logo from bakeanaut.in (extract and use)
- **Menu item prices:** Placeholder "Ask crew" until prices are confirmed
- **Testimonials (optional section):** Can be added later as a future enhancement

---

## 8. Future Enhancements (Out of Scope for V1)

- Online payment integration (Razorpay/Stripe)
- Loyalty badge tracking system (digital passport)
- User accounts and order history
- Seasonal mission drops with countdown timers
- Delivery tracking integration
- Pan India delivery logistics integration
- Multi-language support (Malayalam)

---

## 9. Acceptance Criteria

The site is considered complete when:

1. All 7 sections render correctly on mobile (360px), tablet, and desktop
2. All menu items from all sectors are displayed with correct names and descriptions
3. Users can add items to cart, adjust quantities, and remove items
4. Cart persists across page refreshes via localStorage
5. WhatsApp CTA generates a correctly formatted, URL-encoded prefilled message
6. Lighthouse Performance > 85, Accessibility > 90
7. All animations work and respect prefers-reduced-motion
8. The design feels unmistakably Bakeanaut — brutalist, premium, mysterious, not generic
