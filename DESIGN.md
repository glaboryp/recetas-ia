---
name: Recetas IA
description: A market chalkboard where your leftover ingredients become today's special.
colors:
  market-bg: "#1f2b22"
  market-bg-soft: "#263427"
  market-paper: "#f4efe1"
  market-wood: "#a86a3a"
  market-wood-dark: "#7a4b28"
  market-accent: "#e2572b"
  market-accent-strong: "#b23e1a"
  market-chalk: "#f6f1e4"
  market-chalk-dim: "#cfc7ae"
  market-ink: "#241a10"
  market-line: "rgba(246, 241, 228, 0.32)"
typography:
  display:
    fontFamily: "Caveat, cursive"
    fontSize: "clamp(3rem, 7vw, 5.6rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "0.01em"
  page-heading:
    fontFamily: "Caveat, cursive"
    fontSize: "clamp(1.8rem, 4vw, 2.3rem)"
    fontWeight: 700
    lineHeight: 1.1
  chalk-note:
    fontFamily: "Caveat, cursive"
    fontSize: "clamp(1.4rem, 2.8vw, 1.9rem)"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Oswald, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 600
    letterSpacing: "0.05em"
rounded:
  tag: "2px"
  ticket: "4px"
  plain-button: "4px"
  order-pad: "4px"
  overlay: "3px"
spacing:
  viewport-padding: "40px 24px"
  viewport-padding-mobile: "28px 18px"
  content-shell-padding: "2rem"
components:
  ticket-cta:
    backgroundColor: "{colors.market-accent-strong}"
    textColor: "{colors.market-paper}"
    typography: "{typography.label}"
    rounded: "{rounded.ticket}"
    padding: "18px 34px"
  tag-chip:
    backgroundColor: "{colors.market-paper}"
    textColor: "{colors.market-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "10px 20px 9px"
  nav-bar:
    backgroundColor: "{colors.market-wood-dark}"
    textColor: "{colors.market-paper}"
    typography: "{typography.label}"
    rounded: "0"
  plain-button-primary:
    backgroundColor: "{colors.market-accent-strong}"
    textColor: "{colors.market-paper}"
    typography: "{typography.label}"
    rounded: "{rounded.plain-button}"
    padding: "0.6em 1.2em"
  plain-button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.market-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.plain-button}"
    padding: "0.6em 1.2em"
  recipe-card:
    backgroundColor: "{colors.market-paper}"
    textColor: "{colors.market-ink}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "1.5rem 1.5rem 1.25rem"
  member-card:
    backgroundColor: "{colors.market-paper}"
    textColor: "{colors.market-ink}"
    typography: "{typography.page-heading}"
    padding: "32px 28px 28px"
---

# Design System: Recetas IA

## Overview

**Creative North Star: "The Market Chalkboard"**

Recetas IA is a full-bleed market counter: a chalkboard sign (`#1f2b22`) framed by warm paper and wood tones, where the day's headline is hand-chalked in Caveat and the day's ingredients are stapled cardboard tags. It rejects the generic AI-recipe landing formula — plated-food photo, friendly headline, rounded pill button — in favor of scenes that read as physical counter displays, not software screens.

The full application now ships in this world: the Home hero + shared `MenuBar` chrome, `AuthView` (login), the `/recipe` + `/user-recipes` flow (`FormRecipe`, `RecipeCard`, `RecipeView`, `UserRecipesView`), and `ProfileView` (`/profile`). Each surface picks its own register within the same materials and rules — Home is the fullest choreographed scene and owns the Ticket CTA as its exclusive signature device; Auth is a deliberately quiet, restrained extension (plain card, plain buttons, no full-bleed scene); the recipe flow is a "full market moment" — an order-pad form object, a sharp-cornered recipe-card object, and full-bleed scene backgrounds; Profile is a "member card" moment — a paper ficha-de-socio object with an angled cut corner and a hanging punch-hole, its own signature device distinct from every other card in the system. All five register choices are built from the same paper/wood/Oswald/Caveat materials, never a copy of one another's signature object.

**Key Characteristics:**
- Full-bleed chalkboard scenes on Home, RecipeView, UserRecipesView, and ProfileView; a restrained padded card shell on Auth — full-bleed is a per-surface choice, not a blanket rule
- Hand-chalked display type (Caveat) paired with stencil-label caps (Oswald) for anything functional (tags, nav, CTA, numbered order-pad questions, buttons, corner-stamp labels)
- Warm-paper and tomato-orange accents on a dark chalkboard ground — the accent is reserved for rare, high-priority elements, plus one narrow status-communication use in Toast icon color
- Physical-counter metaphors carried literally into markup: staple-dot tags, a ticket-stub CTA with perforated edges, an order-pad with a perforated notepad strip, a recipe-card with a wood-dark top edge as its sole elevation cue, a member card with an angled cut corner and a hanging punch-hole
- Every reveal-capable surface gets exactly one authored entrance animation using exponential ease-out only, with a full `prefers-reduced-motion` opt-out — Home's is a full choreographed sequence, every other surface uses one simpler single-element reveal

## Colors

A dark chalkboard ground carries two warm accents (wood and tomato-orange) plus a paper-toned neutral family; there is no light-mode variant.

### Primary
- **Market Accent (Tomato)** (`#e2572b`): the rarity color — the headline's second line and the Toast severity icon color for error/warn states. `--market-accent`.
- **Market Accent Strong** (`#b23e1a`): the CTA ticket's fill and the shared plain-button-primary family's background (Auth's "Iniciar sesión", FormRecipe's "¡Oído cocina!", RecipeCard's "Guardar receta", ProfileView's "Guardar datos"), plus ProgressBar's fill and the nav item chip's hover/active ring (`box-shadow: 0 0 0 1.5px`). `--market-accent-strong`.

### Secondary
- **Market Wood** (`#a86a3a`): crate/counter wood tone. Now exercised beyond the token declaration — it's the Select overlay's selected-option background (`src/assets/market-world.css`).
- **Market Wood Dark** (`#7a4b28`): nav bar's flush background (plus its faint canvas-stripe texture and its scalloped valance — a row of wood-dark semicircle bumps hanging below the accent trim), nav item chips' staple dot, Auth's card/input borders, FormRecipe's order-number chips and input borders, RecipeCard's top-edge accent and heading/marker color, the Toast/Select-overlay border color, and ProfileView's member-card input borders, field labels, corner-stamp label, and punch-hole ring. `--market-wood-dark`.

### Neutral
- **Market Bg** (`#1f2b22`) / **Market Bg Soft** (`#263427`): the chalkboard ground on every full-bleed and scene background (Home, Auth, RecipeView, UserRecipesView, ProfileView, FormRecipe/UserRecipesView loading states), layered with a radial gradient between the two for depth without a shadow. Market Bg Soft also fills ProfileView's punch-hole, reading as a cut-through to the board behind the card.
- **Market Paper** (`#f4efe1`): body/card background on paper-toned surfaces — the tag chip, Auth's Google button, the order-pad, the recipe-card, the Toast, the Select overlay, and ProfileView's member-card.
- **Market Chalk** (`#f6f1e4`) / **Market Chalk Dim** (`#cfc7ae`): headline chalk-white and secondary chalk-dim text (chalk-note, labels, connector copy, Auth's divider text, back-button label).
- **Market Ink** (`#241a10`): text color on paper-toned surfaces (tag chip labels, Auth's Google button, order-pad question text, recipe-card body/footer text, Toast text, ProfileView's field values and Caveat heading). A translucent ink tint (`rgba(36, 26, 16, 0.06)`) marks ProfileView's disabled email input as muted/read-only over the paper background — the system's one instance of ink used as a tint rather than a solid text color.
- **Market Line** (`rgba(246, 241, 228, 0.32)`): a translucent chalk-white hairline, used for Auth's "o con tu correo" divider rule. `--market-line`.

### Named Rules
**The One Accent Rule.** Tomato accent color is reserved for a small, deliberate set of high-priority elements — never body copy, tags, or chrome. On Home: the headline's second line and the CTA ticket. Across the newer surfaces the footprint widened slightly but stayed narrow and deliberate: the shared plain-button-primary family (one CTA-weight action per surface) and the Toast's error/warn icon color, added as a single-glyph status-communication device rather than decoration. A first pass on RecipeCard used the accent for list-item markers; a review round caught this as a literal violation (body-copy chrome) and it was corrected to `--market-wood-dark` before shipping — the accent still never appears in body copy, tags, or list/step markers. ProfileView's member card carries no accent at all beyond its plain-button-primary submit, consistent with the rule.

## Typography

**Display Font:** Caveat (variable, weight range 600–700), self-hosted via `@font-face` (`src/assets/fonts/caveat-variable.woff2`), fallback `cursive`.
**Label Font:** Oswald (variable, weight range 500–700), self-hosted via `@font-face` (`src/assets/fonts/oswald-variable.woff2`), fallback `sans-serif`.
**Body Font:** Inter, with `system-ui, sans-serif` fallback (not self-hosted; relies on system availability).

**Character:** A hand-chalked script (Caveat) carries the display and page-heading voice and reads as written-in-the-moment, contrasted against Oswald's stenciled uppercase caps for anything functional (labels, tags, nav, ticket text, order-pad numbering, buttons, corner-stamp labels) — the pairing separates "the message on the board" from "the machinery around it."

### Hierarchy
- **Display** (700, `clamp(3rem, 7vw, 5.6rem)`, line-height 1.05): the Home two-line hero headline, Caveat, revealed with a chalk-write clip-path animation. Home is this token's origin surface — the value ships from and is measured against Home's literal build, not the reverse.
- **Page heading** (700, `clamp(1.8rem, 4vw, 2.3rem)`, line-height ~1.1): a smaller, shared Caveat heading step distinct from Display — RecipeView's "Tu receta" and UserRecipesView's "Tus recetas guardadas" / empty-state heading. Consistent between the two files. ProfileView's member-card heading uses the same Caveat voice at a smaller card-scoped size (`clamp(1.6rem, 4vw, 2rem)`) and echoes the entered name (`{{ name || 'Tu ficha' }}`) rather than a static label.
- **Chalk note** (600, `clamp(1.4rem, 2.8vw, 1.9rem)`, line-height 1.4): the secondary hand-written line under the Home headline, Caveat, chalk-dim color. Auth's greeting ("Vuelve al mostrador.") uses the same Caveat chalk voice at a comparable size (`clamp(1.6rem, 4vw, 2.1rem)`).
- **Body** (400, `1.2rem`, line-height 1.65, max-width `68ch` on Home): the explanatory paragraph on Home, Inter, market-paper color. Inter is also the body voice for FormRecipe's question text and RecipeCard's markdown-rendered recipe content, which remain at their own pre-existing sizes — only Home's body size moved.
- **Label** (600–700, `0.7rem`–`1.35rem`, uppercase, letter-spacing `0.04em`–`0.12em`): Oswald, used for ingredient tags, tags-label caption, connector line, ticket number/label, nav item labels, Auth's FloatLabel labels and divider text, FormRecipe's order-number chips and time-value caption, RecipeCard's markdown h1–h3 headings, every plain-button label, and ProfileView's field labels and corner-stamp card label. The top of the range grew with Home's type-ramp revision (tags-label `0.88rem`, tag `0.98rem`, connector `0.85rem`, ticket-number `0.8rem`, ticket-label `1.35rem`); other surfaces' label instances are unchanged.

### Named Rules
**The Two-Voice Rule.** Only two font families carry meaning: Caveat for anything spoken (headline, chalk note, page headings, Auth's greeting, ProfileView's name heading), Oswald for anything labeled or functional (tags, nav, ticket, captions, form labels, order-pad numerals, buttons, recipe-card headings, ProfileView's field labels and corner stamp). Inter is a third, intentionally invisible utility face reserved for body copy — the Home paragraph, FormRecipe's question text, and RecipeCard's markdown content — never used for headings or labels. FloatLabel labels on Auth were an initial mistake shipped in Inter; a review round caught the Two-Voice violation and corrected them to Oswald caps before ship.

## Layout

`fullBleed: true` route-meta (`src/router/index.js`) tells `App.vue` to drop `.app-content`'s default `2rem` padding (`padding: 0` via `.app-content.full-bleed`, `src/assets/main.css`), so the surface's scene owns the entire viewport edge-to-edge. Four routes now carry this flag: `home`, `recipe` (`RecipeView`), `user-recipes` (`UserRecipesView`), and `profile` (`ProfileView`) — all four run their chalkboard-ground radial-gradient scene edge-to-edge, with the surface itself managing its own internal padding for a centered card or column. `login` (`AuthView`) deliberately does *not* set `fullBleed` and stays on the padded `2rem` app shell with its own centered, padded card — a per-surface choice ("discreto y rápido") to read as a quieter utility screen, not an oversight.

Within Home, content sits in a single left-aligned column capped at `max-width: 1060px`. FormRecipe's order-pad caps at `60%` width (`100%` under `width < 750px`). RecipeView's result column caps at `max-width: 600px`. ProfileView's member-card caps at `max-width: 360px`, centered. Viewport padding varies per surface and steps down at shared breakpoints (`900px`, `750px`, `500px`/`480px`).

The shared `MenuBar` sits outside the padded content wrapper entirely — it is always edge-to-edge, on every route, regardless of that route's `fullBleed` flag.

### Named Rules
**The Safe-Center Rule.** Every surface that vertically centers content in a flex container (Home, Auth, FormRecipe's loading state, RecipeView, UserRecipesView's loading state, ProfileView) declares `justify-content: center;` followed by an overriding `justify-content: safe center;` (and `align-items: safe center` on Home). Plain `center` alone can push the top of tall content above `y = 0` on a short viewport, making it unreachable without scrolling up first; `safe center` is progressive enhancement over the `center` fallback for browsers that don't support the CSS Box Alignment Level 3 keyword. This is a house rule any future surface using flex-centering should also follow.

## Elevation & Depth

The system is flat-with-radial-gradient at the scene level (no drop shadows on the chalkboard itself; depth comes from a soft radial gradient between `--market-bg` and `--market-bg-soft`, plus corner glows on Home). Individual physical-object elements carry small, soft, literal shadows to sell material presence, not to imply UI elevation hierarchy — this is a materials choice, not a design-system elevation ramp. The recipe-card is the one deliberate exception to "shadow implies physical object": its elevation cue is a flat `4px` solid wood-dark top edge, not a shadow, consistent with the No-UI-Shadow Rule's intent even though it also carries a small ambient drop shadow matching the nav-bar's.

### Shadow Vocabulary
- **Tag drop** (`box-shadow: 0 6px 10px rgba(0, 0, 0, 0.28)`): under each cardboard ingredient tag, selling it as a physically stapled object above the board.
- **Nav bar / paper-object drop** (`box-shadow: 0 4px 10px rgba(0, 0, 0, 0.28)`): under the flush wood-tone nav bar, reused under the recipe-card, the Toast, and ProfileView's member-card — separating each flush paper/wood object from the scene behind it.
- **Order-pad drop** (`box-shadow: 0 6px 14px rgba(0, 0, 0, 0.28)`): under FormRecipe's order-pad panel, selling it as a physical notepad resting on the counter.

### Named Rules
**The No-UI-Shadow Rule.** Shadows exist only where the metaphor is a physical object (a tag, a notepad, a card, a bar sitting above content) — never as a generic card/button elevation cue. The CTA ticket itself carries no shadow; it reads as inset into the board via its perforated-edge pseudo-elements instead.

## Shapes

Corners are mostly sharp: the chalkboard scenes, nav bar, recipe-card, and body text have no rounding. The few rounded elements are small and functional — tag chips and nav item chips share the same `border-radius: 2px` (`rounded.tag`; nav item chips are a direct reuse of the tag-chip radius, not a separate token — a prior distinct `nav-item: 3px` token is retired), the CTA ticket and order-pad (`border-radius: 4px`), Auth's card/buttons and the shared plain-button family (`border-radius: 4px`), ProfileView's inputs (`border-radius: 3px`), the SplitButton dropdown (`border-radius: 3px`, aligned from an earlier orphaned `5px`), and teleported PrimeVue overlays — Select overlay, Toast (`border-radius: 3px`). Radius is kept low enough to read as "trimmed paper/stub," not a soft app-UI radius language.

RecipeCard is a deliberate sharp-corner exception: it has *no* `border-radius` declared at all (not `border-radius: 0`) alongside its `4px` solid top border. An earlier version combined a border with a nonzero radius, which the mechanical detector flags as a border-accent-on-rounded violation; the fix was to omit the radius property entirely rather than set it to `0`, since a zero value still tripped the same heuristic. Treat "no radius property, not `0`" as the pattern for any future bordered-but-sharp object in this system.

The CTA ticket's signature silhouette is its perforated left/right edges, built from a repeating radial-gradient pseudo-element rather than a border. The order-pad reuses the same perforation device along its top edge as a repeating dot strip, reading as a spiral-notepad tear line. The nav bar's scalloped valance — a `::after` row of wood-dark semicircle bumps hanging below its accent trim — is a third reuse of the same dot/circle-perforation technique, built from a `repeating-radial-gradient`; this is now a shared "perforated edge" motif carried across the ticket, the order-pad, and the nav bar, not exclusive to any one of them. ProfileView's member-card introduces a distinct silhouette device: an angled cut corner via `clip-path: polygon(22px 0, 100% 0, 100% 100%, 0 100%, 0 22px)`, plus a small circular "punch hole" near that cut corner — reading as a tag/card-corner meant to hang on a string, not a card meant to sit flat. This clip-path corner-cut is exclusive to the member card; it is not a shared motif like the perforated edge.

## Components

### Buttons / CTA
- **Ticket CTA** (`.ticket`, `src/views/HomeView.vue`): Home's one-of-a-kind signature action. Background `--market-accent-strong`, text `--market-paper`, `border-radius: 4px`, padding `18px 34px`, perforated left/right edges via repeating radial-gradient pseudo-elements, a small Oswald ticket-number line (`0.8rem`) above the bold uppercase label (`1.35rem`). Hover/focus: a direct `background-color` swap to `--market-accent` (`transition: background-color 0.15s ease-out`), no filter, no border, no size change; focus-visible adds a `3px` solid `--market-chalk` outline, `3px` offset. Drops in via `ticket-drop` (translateY + opacity, exponential ease-out, `0.5s`). **Corrected hover bug:** an earlier version relied on `filter: brightness(1.08)` while `border: none` lacked `!important`, so PrimeVue's default `.p-button:hover` styles leaked through (a `1px solid` yellow border) and grew the button a couple of pixels in each dimension; the fix adds `!important` to `border`/`background`/`color` and replaces the filter with the color-swap above — any future button extending this pattern should carry `!important` on its base overrides and prefer a color-swap over a filter for hover state.
- **Plain button family** (`.btn-primary` / `.btn-secondary`, `src/views/AuthView.vue`, `src/components/FormRecipe.vue`, `src/components/RecipeCard.vue`, `src/views/ProfileView.vue`): the reused, deliberately un-signature action style for every surface after Home. `.btn-primary`: background `--market-accent-strong`, text `--market-paper`, `border-radius: 4px`, Oswald uppercase, weight 700, `0.9–0.95rem`. `.btn-secondary`: either paper/ink flat fill (Auth's Google button) or transparent background with a `1.5px` wood-dark outline (RecipeCard's "Eliminar de favoritos" — deliberately quieter than the primary, no destructive/error red exists in this system and none was invented for it). Focus-visible on all variants: `3px` solid outline in chalk or ink (ProfileView's "Guardar datos" uses a `3px` solid wood-dark outline), `2px` offset. **This family is explicitly not a Ticket CTA replica** — no perforated edges, no ticket-number line, no numbered badge. Confirmed across every subsequent surface's review round, including ProfileView's: the Ticket CTA stays Home's exclusive signature device precisely so it keeps its rarity.

### Order Pad (signature component)
- **Order pad** (`.order-pad`, `src/components/FormRecipe.vue`): the recipe-request form's object metaphor — a paper-toned (`--market-paper`) panel with a perforated notepad strip (`repeating radial-gradient` dots) along its top edge, `border-radius: 4px`, a `0 6px 14px rgba(0,0,0,0.28)` drop shadow. Each of its 4 questions is preceded by a small circular Oswald-numeral chip (`.order-number`, `26px` diameter, `--market-wood-dark` fill, `--market-paper` numeral) replacing PrimeVue's default Badge. Inputs (Textarea, Select, InputNumber, Slider) are restyled to the paper/wood-dark palette via `:deep()` overrides. Drops in via `order-pad-drop` (translateY + opacity, exponential ease-out, `0.5s`), with a `prefers-reduced-motion: reduce` opt-out.

### Recipe Card (signature component)
- **Recipe card** (`.recipe-card`, `src/components/RecipeCard.vue`): the paper "recipe card" object shared between the freshly-generated result view and the saved-recipes grid. Background `--market-paper`, text `--market-ink`, sharp corners (no `border-radius` property), a `4px` solid `--market-wood-dark` top edge as its primary elevation cue plus a matching ambient drop shadow. Oswald-caps wood-dark section headings for its marked.js-rendered markdown content; Inter body text; list/step markers colored `--market-wood-dark` (corrected from an early accent-color mistake — see the One Accent Rule). Footer holds one plain-button-primary ("Guardar receta como favorita") or one plain-button-secondary ("Eliminar de favoritos"), never both.

### Member Card (signature component)
- **Member card** (`.member-card`, `src/views/ProfileView.vue`): ProfileView's "ficha de socio" object metaphor — the system's fifth distinct signature object, not a reuse of any prior card treatment (it shares materials with the order-pad, recipe-card, and Auth's card, but its silhouette, corner device, and framing are unique to it). Background `--market-paper`, text `--market-ink`, capped at `max-width: 360px`, `32px 28px 28px` padding. Its top-left corner is cut at an angle via `clip-path: polygon(22px 0, 100% 0, 100% 100%, 0 100%, 0 22px)`, with a small circular "punch hole" (`--market-bg-soft` fill, `1.5px` `--market-wood-dark` ring) set near that cut corner, evoking a card meant to hang on a string behind the counter. Carries the established paper-object drop shadow (`0 4px 10px rgba(0,0,0,0.28)`, shared with the nav bar, recipe-card, and Toast). A Caveat "spoken" heading echoes the entered name (`{{ name || 'Tu ficha' }}`). An Oswald-caps "FICHA DE SOCIO" corner-stamp label sits absolutely positioned top-right, independent of the heading's flow — not stacked directly above the `<h1>`; an earlier draft placed it as a kicker directly above the heading, which a review round caught as a violation of this project's craft-floor kicker/eyebrow ban and corrected to the corner-stamp position before ship. Two labeled fields (Oswald-caps label + paper-toned, `1.5px` wood-dark-bordered input, `--market-ink` text): name (editable) and email (disabled, with a `rgba(36,26,16,0.06)` ink tint over the paper reading as muted/read-only). An earlier draft copied Auth's dark-toned input treatment by mistake — the wrong precedent, since Auth's card is dark-toned but the member card is paper-toned like the order-pad — and was self-corrected to the paper-toned input style before review. Submits via the shared plain-button-primary family, not a Ticket-CTA or order-pad-style device. Drops in via `card-reveal` (translateY + opacity, exponential ease-out, `0.5s`), with a `prefers-reduced-motion: reduce` opt-out.

### Tags (signature component)
- **Ingredient tag** (`.tag`, `src/views/HomeView.vue`): cardboard-chip metaphor. Background `--market-paper`, text `--market-ink`, Oswald uppercase label, `border-radius: 2px`, small drop shadow, a `::before` staple dot in `--market-wood-dark`. Each tag carries a slight per-index rotation and staggers in with a `tag-stamp` keyframe (scale + fade, exponential ease-out). MenuBar's nav item chips are a direct, deliberate reuse of this staple-dot tag device (paper chip + wood-dark staple dot above it, `rounded.tag`), left unrotated since a horizontal nav row needs to stay legible and aligned — see Navigation.

### Navigation
- **MenuBar** (`src/components/MenuBar.vue`): a "market awning" — flush wood-tone bar (`--market-wood-dark` background) with a faint vertical canvas-stripe texture (`repeating-linear-gradient` of ink-tinted stripes), a `2px solid --market-accent` trim line at the bottom (down from an earlier `3px`), and a `::after` scalloped valance hanging below the trim: a repeating-radial-gradient row of small `--market-wood-dark` semicircle bumps — a third reuse of the same dot/circle-perforation technique established by the Ticket CTA's perforated edge and the order-pad's spiral strip (see Shapes), not a new unrelated motif.
- Nav item links are paper-toned tag chips (`--market-paper` background, `--market-ink` text/icon, Oswald caps, `border-radius: 2px` via `rounded.tag` — the same token as the ingredient tag, not a distinct nav-item radius), each with a small `--market-wood-dark` circular "staple dot" above it — a direct, deliberate reuse of Home's ingredient-tag device (see Tags), left unrotated for a horizontal nav row's legibility.
- Hover/active state is an accent-strong ring around the chip (`box-shadow: 0 0 0 1.5px var(--market-accent-strong)`, plus the chip's own drop shadow) rather than a text-color swap — the label and icon stay `--market-ink` in every state.
- This is PrimeVue's `Menubar` component reskinned via global (non-scoped) CSS overrides targeting its `.p-menubar*` classes, not a from-scratch component. The SplitButton dropdown alongside it shares the system's `3px` radius (aligned from an earlier orphaned `5px`).

### Global PrimeVue Overrides (teleported elements)
- **Select overlay** (`.p-select-overlay`, `.p-select-option*`, `src/assets/market-world.css`): paper background, `1.5px` wood-dark border, `border-radius: 3px`; selected option uses `--market-wood` fill; hover uses a translucent ink tint.
- **Toast** (`.p-toast-message*`, `src/assets/market-world.css`): paper background, `1px` wood-dark border, `border-radius: 3px`, the nav-bar/recipe-card/member-card ambient shadow. Oswald-caps summary, Inter detail text, both in `--market-ink`. Severity-mapped icon color: `--market-wood-dark` for info/success, `--market-accent-strong` for error/warn — the one deliberate, narrow, single-glyph semantic use of the accent outside a headline/CTA context, justified as status communication rather than body copy, tags, or chrome.
- **ProgressBar** (`.p-progressbar*`, `src/assets/market-world.css`): `--market-bg-soft` track, `--market-accent-strong` fill.
- **Why these live in `market-world.css`, not a component file:** PrimeVue teleports overlay/toast elements outside their owning component's DOM, so component-scoped (or even component-local global) `<style>` blocks only apply while that specific component is mounted on the current route. `src/assets/market-world.css` is always loaded, so it's the canonical, single home for any override targeting a teleported PrimeVue element — any future teleported-overlay override (new Select instances, Dialog, ConfirmPopup, etc.) belongs here too.

## Do's and Don'ts

### Do:
- **Do** reserve `--market-accent` (`#e2572b`) and `--market-accent-strong` (`#b23e1a`) for a small, deliberate set of high-priority elements per surface (headline payoff line + CTA ticket on Home; one CTA-weight plain-button per other surface; the Toast error/warn icon). This is the One Accent Rule.
- **Do** pair Caveat (spoken/display, including page headings and chalk greetings) with Oswald (labeled/functional) per the Two-Voice Rule; use Inter only for long-form body/markdown content.
- **Do** set `fullBleed: true` in route meta for any new surface that should escape the app shell's default `2rem` padding — but treat it as a per-surface decision, not a default; a quieter/utility surface (like Auth) may deliberately keep the padded shell.
- **Do** use exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`) for reveal/entrance motion, and always provide a `prefers-reduced-motion: reduce` fallback that disables animation and transforms outright.
- **Do** give every reveal-capable surface at least one authored entrance moment — a full choreographed sequence for a hero scene (Home), or a single fade-up/drop-in element for a simpler surface (order-pad, result card, saved-recipes title, member card) — rather than shipping a static mount.
- **Do** declare `justify-content: center;` followed by `justify-content: safe center;` (and `align-items: safe center` where relevant) on any flex container that vertically centers content, per the Safe-Center Rule — plain `center` can push tall content above the viewport top on short screens.
- **Do** put any override targeting a teleported PrimeVue element (Select overlay, Toast, ProgressBar, and future overlay-style components) in `src/assets/market-world.css`, never in a component-scoped style block that only loads when that component is rendered.
- **Do** omit `border-radius` entirely (not `border-radius: 0`) when an object needs a border/top-edge accent but must read as sharp-cornered — see RecipeCard.
- **Do** match a new paper-toned object's inputs to the paper-toned input precedent (order-pad, member card), not Auth's dark-card input precedent — the two card tones are not interchangeable; ProfileView's member card briefly shipped with the wrong (dark) precedent before self-correcting.

### Don't:
- **Don't** use bounce/elastic easing for entrance or state motion — the finish review found and replaced this exact violation on Home; exponential ease-out is this world's motion floor.
- **Don't** re-import fonts from a live Google Fonts CDN `@import`; the finish review replaced that with the two self-hosted woff2 files in `src/assets/fonts/`; new type additions to this world should follow the same self-hosting pattern.
- **Don't** widen the accent's footprint into body copy, tags, or list/step markers — a first RecipeCard pass used the accent for list markers and a review round corrected it to `--market-wood-dark`; body copy and chrome stay accent-free.
- **Don't** replicate the Ticket CTA's perforated-edge / ticket-number silhouette on any surface other than Home — that motif is Home's exclusive signature; every other action uses the plain-button family instead.
- **Don't** invent a destructive/error red — RecipeCard's delete action uses the quieter plain-button-secondary (transparent + wood-dark outline), not a new semantic color.
- **Don't** stack a corner/caption-style label directly above a page heading as a kicker or eyebrow — this project's craft floor bans that device outright, and no surface in this world uses one; ProfileView's "FICHA DE SOCIO" label was corrected off that exact position into a standalone corner stamp before ship. This is a defect the build corrected, not a device to reach for elsewhere.
- **Don't** assume a component's own root element wins its cascade tie against PrimeVue's dynamically-injected runtime theme CSS — MenuBar's `.p-menubar` background/border longhands needed `!important` to hold against it, the same class of issue this project already hit with teleported Select overlays/ProgressBar/Toast, except here it's the component's own root losing the tie, not a teleported node. Check computed styles on any restyled PrimeVue root, teleported or not.
