import type { ReactNode } from "react";

export interface CaseStudySection {
  title: string;
  content: ReactNode;
  imagePlaceholder?: string;
  videoUrl?: string;
}

export interface CaseStudyContent {
  slug: string;
  /** Legacy format — used by design-system, layersweep */
  challenge?: ReactNode;
  process?: ReactNode;
  solution?: ReactNode;
  /** Flexible sections format — used by casino-brand (Swiper) */
  sections?: CaseStudySection[];
}

export const caseStudies: CaseStudyContent[] = [
{
    slug: "layersweep",
    sections: [
      {
        title: "Overview",
        content: (
          <>
            <p>
              I initiated and built a Figma plugin that scans a file for bound
              styles, lets users configure old-to-new mapping, and applies
              replacements in bulk. What started as an internal tool to solve a
              specific migration task became a published plugin with 200+ users
              on Figma Community.
            </p>
            <p>
              <strong>Role:</strong> Design Engineer &middot;{" "}
              <strong>Tools:</strong> Figma Plugin API, TypeScript, Claude Code,
              Codex &middot; <strong>Timeline:</strong> ~2 weeks
            </p>
          </>
        ),
        imagePlaceholder: "Plugin overview in Figma",
      },
      {
        title: "The Problem",
        content: (
          <p>
            Our platform was migrating to a completely new token structure.
            Every text, color, and effect style in the master template had to be
            swapped for its new counterpart &mdash; thousands of layers, no
            naming overlap between old and new tokens. Manual replacement would
            take 20&ndash;30 hours of tedious, error-prone work.
          </p>
        ),
      },
      {
        title: "Personal Goals",
        content: (
          <>
            <p>
              Ship a tool that solves a real team problem &mdash; eliminate
              manual style replacement and make token migrations painless for
              any designer on the team.
            </p>
            <p>
              Design and build end-to-end &mdash; own the full cycle from UX
              decisions to production code, proving the Design Engineer skillset
              in practice.
            </p>
            <p>
              Stress-test AI-assisted development &mdash; use Claude Code and
              Codex as primary coding tools and form an honest picture of where
              AI agents accelerate work and where they fall short.
            </p>
          </>
        ),
      },
      {
        title: "Approach: From Hypothesis to Tool",
        content: (
          <>
            <p>
              <strong>Validating the Hypothesis (Days 1&ndash;2):</strong>{" "}
              Before committing to full development, I needed to confirm that
              the Figma API actually supported what I had in mind: recursively
              traversing the layer tree, reading bound styles, and
              programmatically replacing them. I built a minimal
              prototype &mdash; no UI, pure console logic &mdash; and confirmed
              it was feasible. The key question: can you reliably map old styles
              to new ones when their names don&apos;t match and their structures
              differ? The answer: yes, but it requires a well-designed interface
              for configuring the mapping.
            </p>
            <p>
              <strong>Working Version (Week 1):</strong> Over the first week, I
              built the plugin to a state where it solved the core problem: file
              scanning, replacement configuration, and batch-applying new
              styles. The token migration task was completed.
            </p>
            <p>
              <strong>UX/UI Polish (Week 2):</strong> With the instrumental task
              done, I focused on making the plugin usable not just for myself,
              but for the team &mdash; and potentially for any designer facing a
              similar challenge. That meant: thoughtful onboarding, clear
              states, and visual consistency with Figma&apos;s own interface.
            </p>
          </>
        ),
        imagePlaceholder:
          "Early plugin version / first prototype → final plugin UI",
      },
      {
        title: "Scan Result: Transparency Before Action",
        content: (
          <>
            <p>
              Users can&apos;t trust a plugin with bulk style replacement if
              they don&apos;t understand the scope of changes. Before any
              replacement happens, the plugin shows a full scan of the
              file &mdash; all detected styles, layer counts for each, grouped
              by category. This isn&apos;t just a list: it&apos;s a navigable
              report that gives designers a sense of control over the process.
            </p>
            <p>
              Bulk operations create anxiety. Showing users &ldquo;what will be
              affected&rdquo; before anything changes is a fundamental principle
              for tools with potentially irreversible actions.
            </p>
          </>
        ),
        imagePlaceholder: "Scan results screen",
      },
      {
        title: "Swap: Group-Level Mapping",
        content: (
          <>
            <p>
              A file can contain dozens of styles. Configuring replacement for
              each individually is almost as slow as replacing them manually.
              Mapping works at the group level: if old styles are grouped
              under <code>Paragraph/</code> and new ones
              under <code>body/</code>, the plugin suggests matching them as a
              batch. Users can refine individual pairs, but the starting point
              is already there.
            </p>
            <p>
              Alternative I rejected: automatic mapping by name similarity. In
              practice, old and new token names often share nothing in
              common &mdash; an algorithm would create a false sense of
              confidence.
            </p>
          </>
        ),
        imagePlaceholder: "Swap configuration screen",
      },
      {
        title: "Onboarding and Product Tour",
        content: (
          <p>
            Early users from the team would open the plugin and not know where
            to start. Scanning, mapping, replacing &mdash; three steps that
            were obvious to the author but not to a new user. The solution: two
            layers of guidance. First &mdash; an onboarding screen on first
            launch with a brief explanation of the workflow.
            Second &mdash; an interactive product tour that highlights interface
            elements in context. Users can skip both, but the first launch no
            longer causes confusion.
          </p>
        ),
        imagePlaceholder: "Onboarding and product tour screens",
      },
      {
        title: "Swap Result: The Report as a Safety Net",
        content: (
          <p>
            After bulk replacement, users want to know: did everything go
            correctly? The result screen shows the number of affected layers,
            successful replacements, and errors (if a style wasn&apos;t found
            or a layer was protected). This isn&apos;t just
            a &ldquo;Done&rdquo; message &mdash; it&apos;s a report you can
            review and, if needed, partially roll back.
          </p>
        ),
        imagePlaceholder: "Swap results screen",
      },
      {
        title: "Building with AI Agents",
        content: (
          <>
            <p>
              All of LayerSweep&apos;s code was written using Claude Code and
              OpenAI Codex. This was a deliberate experiment &mdash; testing how
              much AI agents accelerate development for a designer who codes but
              isn&apos;t a full-time developer.
            </p>
            <p>
              Claude Code excelled at architectural tasks: structuring the
              project, writing the Figma tree traversal logic, handling edge
              cases. Codex was useful for quickly generating UI components and
              utility functions. Where it got difficult: AI agents struggled
              with Figma Plugin API context &mdash; it&apos;s a niche API with
              limited examples in training data. Another issue &mdash;
              coordination between two agents that didn&apos;t know what each
              other had done.
            </p>
            <p>
              AI agents sped up development roughly 2&ndash;3x for a project of
              this scope. But they don&apos;t replace domain
              understanding &mdash; I needed to know the Figma API to validate
              and steer what the agents generated. The &ldquo;Design
              Engineer&rdquo; role in this process isn&apos;t just writing
              prompts &mdash; it&apos;s being the architect of the solution,
              using AI as a multiplier.
            </p>
          </>
        ),
      },
      {
        title: "Results and Impact",
        content: (
          <>
            <p>
              <strong>For the task:</strong> The token migration of the master
              template &mdash; estimated at 20&ndash;30 hours of manual
              work &mdash; was completed in a few hours (including mapping
              configuration and result verification).
            </p>
            <p>
              <strong>For the team:</strong> The plugin became a standard tool
              for style replacement tasks. Other designers on the team use it
              when updating components and migrating between design system
              versions.
            </p>
            <p>
              <strong>For the community:</strong> The plugin was published on
              Figma Community and has gained 200+ users &mdash; confirming that
              bulk style replacement is a common pain point beyond our team.
            </p>
          </>
        ),
        imagePlaceholder:
          "Plugin in action / final replacement result on a real file",
      },
      {
        title: "What I'd Do Differently",
        content: (
          <>
            <p>
              Involve teammates in testing earlier. The first version of the
              interface made sense to me but confused new users. If I&apos;d
              shown the prototype to the team a day sooner, onboarding and the
              product tour would have been built in from the start.
            </p>
            <p>
              Add usage analytics. Right now I don&apos;t know exactly which
              features the 200+ users rely on most. Built-in analytics would
              help prioritize further development.
            </p>
            <p>
              Establish a stricter AI agent workflow from day one. Early on, I
              switched between Claude Code and Codex haphazardly. Over time I
              realized it&apos;s more effective to divide responsibilities:
              architecture and logic go to Claude Code, UI generation goes to
              Codex.
            </p>
          </>
        ),
      },
    ],
  },
  {
    slug: "casino-brand",
    sections: [
      {
        title: "Overview",
        content: (
          <>
            <p>
              Swiper is a casino product where the core experience is a
              TikTok-style vertical feed. Users swipe through short-form
              content &mdash; a mix of playable casino games, entertainment
              videos, and promotions &mdash; in a single continuous stream. The
              Shorts tab serves as the main entry point: users discover games by
              swiping, not by browsing a traditional lobby.
            </p>
            <p>
              The idea came from an internal experiment that showed short-form
              video content significantly boosted engagement metrics in a casino
              context. The challenge was to take that insight and build an entire
              brand and product around it &mdash; not just bolt a feed onto an
              existing casino, but make the swipe-to-play format the core of the
              experience.
            </p>
            <p>
              I worked on Swiper from concept to handoff alongside another
              product designer, an art team, and developers, collaborating
              closely with a product manager. The project took around 2
              months &mdash; from initial concept to handoff &mdash; covering
              both web and mobile design, including stakeholder approvals along
              the way. Swiper was a B2C brand, shipped on web, Android, and iOS
              simultaneously.
            </p>
          </>
        ),
      },
      {
        title: "Process",
        content: (
          <>
            <p>
              The visual direction went through multiple iterations. Together
              with the art team, we explored different style options &mdash; from
              muted and minimal to bold and saturated &mdash; and presented them
              to stakeholders for approval. The final direction landed on a dark,
              immersive aesthetic with neon accents and 3D-rendered visuals that
              give the brand a premium, entertainment-first feel.
            </p>
            <p>
              One of the key structural decisions was separating Shorts into its
              own dedicated section in the navigation rather than embedding it
              inside the Casino tab. On mobile, Shorts lives as a standalone tab
              in the bottom bar &mdash; making it a first-class entry point, not
              a sub-feature. This was intentional: the whole product hypothesis
              was built around the feed, so it had to be one tap away at all
              times.
            </p>
            <p>
              The navigation itself was designed to cleanly split two very
              different worlds &mdash; Casino (games, live casino, jackpots) and
              Sports (pre-match, live betting) &mdash; while keeping Shorts and
              Promotions accessible from anywhere. Balancing these content types
              in a single sidebar without overwhelming the user was one of the
              trickier UX problems we solved.
            </p>
          </>
        ),
      },
      {
        title: "Entrance Page",
        content: (
          <p>
            The landing page had to set the tone immediately &mdash; this
            isn&apos;t a traditional casino. The visual language uses a dark
            theme with deep blues and purples, accented by vibrant greens and
            3D-rendered visuals. The layout feels closer to a content app than a
            typical gambling product. The hero section focuses on a single
            welcome offer with a clear CTA, while the rest of the page is built
            around horizontal carousels &mdash; Top, New, Popular &mdash; giving
            users a quick way to browse without the density of a classic casino
            lobby.
          </p>
        ),
        imagePlaceholder: "Entrance Page — desktop and mobile",
      },
      {
        title: "Shorts",
        content: (
          <>
            <p>
              The Shorts feed is the heart of the product. Each card in the
              vertical stream is either a playable game demo, an entertainment
              clip, or a promotional offer &mdash; all presented in the same
              full-screen swipeable format. The key design challenge was the
              transition: a user watches a short preview, gets hooked, and taps
              to play &mdash; that moment had to feel instant and seamless, with
              no loading screens or jarring context switches breaking the flow.
            </p>
            <p>
              I spent a lot of time on the information hierarchy within each
              card &mdash; balancing game metadata, CTA elements, and the content
              itself so nothing competes for attention. The feed had to feel
              effortless to scroll, but every card needed to convert.
            </p>
          </>
        ),
        imagePlaceholder: "Shorts feed — mobile",
      },
      {
        title: "Sportsbook",
        content: (
          <p>
            Sportsbook was an addition to the core casino product &mdash; a
            requirement from the business side. The design challenge was
            integrating a data-heavy betting experience into a brand built around
            entertainment and swipe mechanics. The final layout packs a lot into
            one screen: promotional banners at the top, live match cards with
            odds, a Boosted Odds section, sport category icons, and a live
            betting table &mdash; all while keeping the dark visual language
            consistent with the rest of Swiper. The left sidebar switches to a
            sports-focused menu with leagues and disciplines, adapting the
            navigation pattern to a completely different content type.
          </p>
        ),
        imagePlaceholder: "Sportsbook — desktop",
      },
      {
        title: "Promotions",
        content: (
          <p>
            Promotions in Swiper work on two levels. Inside the Shorts feed,
            they appear as native cards that blend into the scrolling rhythm.
            Outside the feed, there&apos;s a dedicated Promotions page with a
            card grid and filters by type &mdash; All, Casino, Sports, Specials.
            Each promo card uses 3D-rendered illustrations in the brand&apos;s
            purple-blue palette, with a category tag, bold headline, terms
            summary, and a &ldquo;Read More&rdquo; CTA. The visual approach
            avoids aggressive banners &mdash; instead, it communicates value
            through the same polished aesthetic as the rest of the product.
          </p>
        ),
        imagePlaceholder: "Promotions page — card grid",
      },
      {
        title: "UI Kit",
        content: (
          <p>
            Since Swiper ran on the company&apos;s shared platform, the UI kit
            had to work within the existing design system while still giving the
            brand its own personality. I built a local set of
            components &mdash; buttons, cards, inputs, navigation
            elements &mdash; that inherited the platform&apos;s structure but
            carried Swiper&apos;s visual identity: its color palette, rounded
            shapes, and typographic choices. This kit served as the single source
            of truth for both the web and Flutter implementations, keeping the
            product consistent across platforms.
          </p>
        ),
        imagePlaceholder: "UI Kit — components from Figma",
      },
      {
        title: "Outcome",
        content: (
          <>
            <p>
              Swiper launched on the Danish and Swedish markets and is live
              today &mdash; a fully operational B2C casino and sportsbook brand.
              The Shorts feature, which started as an internal experiment, became
              the product&apos;s signature differentiator &mdash; something no
              other brand on the platform had at the time. Following
              Swiper&apos;s success, the decision was made to roll out the Shorts
              feature across other brands on the platform.
            </p>
            <p>
              For me, this project was a step up in terms of scope and ownership.
              Designing a full product across web and mobile in 2
              months &mdash; with stakeholder alignment, an art team, and
              cross-platform consistency to manage &mdash; pushed me to think
              beyond individual screens and focus on how all parts of the
              experience connect. Working closely with the Flutter developers
              also gave me a better understanding of mobile constraints and how
              to design with implementation in mind from the start.
            </p>
          </>
        ),
      },
    ],
  },
  {
    slug: "brainrocket-showcase",
    sections: [
      {
        title: "Overview",
        content: (
          <>
            <p>
              During my time at Brainrocket (2022&ndash;2024), I designed 7
              iGaming brands &mdash; online casinos and sportsbooks, each with
              its own identity, audience, and visual direction &mdash; all
              running on a shared platform and design system.
            </p>
            <p>
              My role evolved through this period: from Product Designer on
              individual brands, to Senior Product Designer owning multiple
              brands simultaneously, to Lead Designer on Betoro, where I was
              responsible for the full design direction of a brand from scratch.
            </p>
          </>
        ),
      },
      {
        title: "Betoro.dk",
        content: (
          <>
            <p>
              Betoro is a Danish online casino and sportsbook brand that I led
              from concept to launch. As the Lead Designer, I owned the full
              design direction &mdash; from brand identity and visual language to
              product UX across web and mobile. This was the project where I
              stepped into a leadership role, coordinating with stakeholders,
              guiding junior designers, and making final design decisions across
              the entire product surface.
            </p>
            <p>
              Betoro targets the Danish market with a clean, confident visual
              identity &mdash; bold uppercase logotype, dark theme, and a design
              language that feels more premium sportsbook than flashy casino.
            </p>
          </>
        ),
        imagePlaceholder:
          "Betoro — brand identity, web and mobile product screens",
        videoUrl:
          "https://pub-3dcbbf8f8f7140cb987df422a0768332.r2.dev/brainrocket-showcase/betoro.mp4",
      },
      {
        title: "Swiper.dk / Swiper.se",
        content: (
          <p>
            A casino product built around a TikTok-style vertical feed &mdash;
            users swipe through short-form content mixing playable games,
            entertainment videos, and promotions. I designed the full product
            experience across web and mobile (Flutter), including the core
            Shorts mechanic, sportsbook section, and promotional flows. This
            brand later became its own detailed case study.
          </p>
        ),
        imagePlaceholder: "Swiper — shorts feed and key screens",
        videoUrl:
          "https://pub-3dcbbf8f8f7140cb987df422a0768332.r2.dev/brainrocket-showcase/swiper.mp4",
      },
      {
        title: "Spinnit.com",
        content: (
          <p>
            Spinnit followed a similar concept to Swiper &mdash; a casino
            product with a strong content-driven experience &mdash; but with a
            completely different visual identity and tone. Where Swiper leaned
            into dark, immersive aesthetics, Spinnit explored a different
            stylistic direction while keeping the same platform foundation
            underneath.
          </p>
        ),
        imagePlaceholder:
          "Spinnit — homepage and key product screens showing the brand's distinct visual style",
        videoUrl:
          "https://pub-3dcbbf8f8f7140cb987df422a0768332.r2.dev/brainrocket-showcase/spinit.mp4",
      },
      {
        title: "WildRobin.com",
        content: (
          <p>
            WildRobin is a casino and sportsbook brand for the German market
            with a warm, adventure-themed identity built around a Robin Hood
            mascot. The brand includes gamification features like Wheel of
            Fortune, Spin Rally, Missions, and Tournaments, which required
            designing engagement loops on top of the standard casino and
            sportsbook flows.
          </p>
        ),
        imagePlaceholder:
          "WildRobin — homepage with the Robin Hood mascot, warm color palette, and gamification features",
        videoUrl:
          "https://pub-3dcbbf8f8f7140cb987df422a0768332.r2.dev/brainrocket-showcase/wildrobin.mp4",
      },
      {
        title: "Slotuna.com",
        content: (
          <p>
            Slotuna is a fantasy-themed casino and sportsbook targeting the
            German market. The visual identity leans into a dark teal palette
            with illustrated warriors, mages, and mythical characters &mdash;
            giving the brand a distinct RPG-like atmosphere. The product
            includes a full gamification layer: Challenges, Tournaments, Bonus
            Crab, Shop, and VIP Levels.
          </p>
        ),
        imagePlaceholder:
          "Slotuna — homepage with fantasy illustrations, teal color palette, and gamification sidebar",
        videoUrl:
          "https://pub-3dcbbf8f8f7140cb987df422a0768332.r2.dev/brainrocket-showcase/slotuna.mp4",
      },
      {
        title: "Kingmaker.com",
        content: (
          <p>
            Kingmaker is a premium-styled casino and sportsbook with a
            purple-and-gold palette, 3D-rendered coins and crowns, and a strong
            emphasis on gamification. The brand features Fortune Wheel,
            Challenges, Tournaments, Bonus Crab, a Shop, and VIP
            Levels &mdash; one of the richest feature sets on the platform.
          </p>
        ),
        imagePlaceholder:
          "Kingmaker — homepage with purple-gold palette, 3D crown visuals, and gamification features",
        videoUrl:
          "https://pub-3dcbbf8f8f7140cb987df422a0768332.r2.dev/brainrocket-showcase/kingmaker.mp4",
      },
      {
        title: "Spinrollz",
        content: (
          <p>
            Spinrollz is a casino and sportsbook with the lightest visual tone
            on the platform &mdash; a soft lavender-blue palette, cartoon-style
            category illustrations, and a friendly, approachable feel. The brand
            targets a casual audience and leans away from the dark,
            high-intensity aesthetic typical of most casino products.
          </p>
        ),
        imagePlaceholder:
          "Spinrollz — homepage with pastel lavender-blue palette and cartoon category illustrations",
        videoUrl:
          "https://pub-3dcbbf8f8f7140cb987df422a0768332.r2.dev/brainrocket-showcase/spinrollz.mp4",
      },
      {
        title: "What Tied It All Together",
        content: (
          <>
            <p>
              Working across 7 brands on a shared platform taught me how to
              balance consistency with differentiation. Every brand ran on the
              same tech stack and design system, but each needed its own
              identity, tone, and UX priorities.
            </p>
            <p>
              The key skill I developed here was designing at scale. The
              platform&apos;s shared design system provided the structural
              foundation &mdash; navigation patterns, game lobbies, sportsbook
              layouts, registration flows &mdash; but each brand required its
              own token set, visual language, and art direction. Over time, new
              platform-wide features like gamification were introduced and had to
              be adapted across brands with very different visual identities,
              meaning I had to design flexible patterns that could absorb each
              brand&apos;s personality without requiring a full redesign every
              time.
            </p>
          </>
        ),
      },
    ],
  },
];

export function getCaseStudyContent(
  slug: string
): CaseStudyContent | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
