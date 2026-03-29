# Swiper

Online Casino with Shorts-style content as a gamification and engagement driver.

**Role:** Product Designer
**Brief:** An internal experiment proved that short-form video content drives engagement in a casino context. I designed a full casino brand and product — web and mobile (Flutter) — built around the swipe-to-play format on top of the company's existing platform.
**Platforms:** Web, Android, iOS

*[Video: promotional video — YouTube link or embedded mp4. A short brand trailer or product walkthrough that sets the tone before the user starts reading.]*

---

## Overview

Swiper is a casino product where the core experience is a TikTok-style vertical feed. Users swipe through short-form content — a mix of playable casino games, entertainment videos, and promotions — in a single continuous stream. The Shorts tab serves as the main entry point: users discover games by swiping, not by browsing a traditional lobby.

The idea came from an internal experiment that showed short-form video content significantly boosted engagement metrics in a casino context. The challenge was to take that insight and build an entire brand and product around it — not just bolt a feed onto an existing casino, but make the swipe-to-play format the core of the experience.

I worked on Swiper from concept to handoff alongside another product designer, an art team, and developers, collaborating closely with a product manager. The project took around 2 months — from initial concept to handoff — covering both web and mobile design, including stakeholder approvals along the way. Swiper was a B2C brand, shipped on web, Android, and iOS simultaneously.

---

## Process

The visual direction went through multiple iterations. Together with the art team, we explored different style options — from muted and minimal to bold and saturated — and presented them to stakeholders for approval. The final direction landed on a dark, immersive aesthetic with neon accents and 3D-rendered visuals that give the brand a premium, entertainment-first feel.

One of the key structural decisions was separating Shorts into its own dedicated section in the navigation rather than embedding it inside the Casino tab. On mobile, Shorts lives as a standalone tab in the bottom bar — making it a first-class entry point, not a sub-feature. This was intentional: the whole product hypothesis was built around the feed, so it had to be one tap away at all times.

The navigation itself was designed to cleanly split two very different worlds — Casino (games, live casino, jackpots) and Sports (pre-match, live betting) — while keeping Shorts and Promotions accessible from anywhere. Balancing these content types in a single sidebar without overwhelming the user was one of the trickier UX problems we solved.

---

## Entrance Page

The landing page had to set the tone immediately — this isn't a traditional casino. The visual language uses a dark theme with deep blues and purples, accented by vibrant greens and 3D-rendered visuals. The layout feels closer to a content app than a typical gambling product. The hero section focuses on a single welcome offer with a clear CTA, while the rest of the page is built around horizontal carousels — Top, New, Popular — giving users a quick way to browse without the density of a classic casino lobby.

*[Image: hero section of the landing page — desktop and mobile side by side. Should show the welcome bonus banner, 3D visuals, and the top game carousels below.]*

---

## Shorts

The Shorts feed is the heart of the product. Each card in the vertical stream is either a playable game demo, an entertainment clip, or a promotional offer — all presented in the same full-screen swipeable format. The key design challenge was the transition: a user watches a short preview, gets hooked, and taps to play — that moment had to feel instant and seamless, with no loading screens or jarring context switches breaking the flow.

I spent a lot of time on the information hierarchy within each card — balancing game metadata, CTA elements, and the content itself so nothing competes for attention. The feed had to feel effortless to scroll, but every card needed to convert.

*[Image or Video: the Shorts feed on mobile — full-screen vertical cards with a game preview, game title, CTA button, and swipe indicator. Ideally show 2–3 card states or a short screen recording of swiping through the feed.]*

---

## Sportsbook

Sportsbook was an addition to the core casino product — a requirement from the business side. The design challenge was integrating a data-heavy betting experience into a brand built around entertainment and swipe mechanics. The final layout packs a lot into one screen: promotional banners at the top, live match cards with odds, a Boosted Odds section, sport category icons, and a live betting table — all while keeping the dark visual language consistent with the rest of Swiper. The left sidebar switches to a sports-focused menu with leagues and disciplines, adapting the navigation pattern to a completely different content type.

*[Image: sportsbook page — desktop view showing the promo banners, live match cards with odds, Boosted Odds section, and sport category icons. Optionally a mobile view alongside.]*

---

## Promotions

Promotions in Swiper work on two levels. Inside the Shorts feed, they appear as native cards that blend into the scrolling rhythm. Outside the feed, there's a dedicated Promotions page with a card grid and filters by type — All, Casino, Sports, Specials. Each promo card uses 3D-rendered illustrations in the brand's purple-blue palette, with a category tag, bold headline, terms summary, and a "Read More" CTA. The visual approach avoids aggressive banners — instead, it communicates value through the same polished aesthetic as the rest of the product.

*[Image: promotions page — the card grid with 3D illustrations, category tags (Casino/Sports), and filter tabs at the top. Show at least 3–4 promo cards.]*

---

## UI Kit

Since Swiper ran on the company's shared platform, the UI kit had to work within the existing design system while still giving the brand its own personality. I built a local set of components — buttons, cards, inputs, navigation elements — that inherited the platform's structure but carried Swiper's visual identity: its color palette, rounded shapes, and typographic choices. This kit served as the single source of truth for both the web and Flutter implementations, keeping the product consistent across platforms.

*[Image: UI kit overview from Figma — component grid showing buttons (primary, secondary, ghost), input fields, game cards, navigation elements, and color/type tokens. Export as a clean Figma frame.]*

---

## Outcome

Swiper launched on the Danish and Swedish markets and is live today — a fully operational B2C casino and sportsbook brand. The Shorts feature, which started as an internal experiment, became the product's signature differentiator — something no other brand on the platform had at the time. Following Swiper's success, the decision was made to roll out the Shorts feature across other brands on the platform.

For me, this project was a step up in terms of scope and ownership. Designing a full product across web and mobile in 2 months — with stakeholder alignment, an art team, and cross-platform consistency to manage — pushed me to think beyond individual screens and focus on how all parts of the experience connect. Working closely with the Flutter developers also gave me a better understanding of mobile constraints and how to design with implementation in mind from the start.
