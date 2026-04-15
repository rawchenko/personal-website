import type { ReactNode } from "react";

export interface CaseStudyMediaFrame {
  width: number;
  height: number;
  left: number;
  top: number;
}

export interface CaseStudyBlock {
  subHeader: string;
  content: ReactNode;
  videoUrl?: string;
  imagePlaceholder?: string;
  imageUrl?: string;
  imageAlt?: string;
  mediaLayout?: "full" | "canvas";
  desktopFrame?: CaseStudyMediaFrame;
  mobileFrame?: CaseStudyMediaFrame;
}

export interface CaseStudySection {
  title: string;
  content: ReactNode;
  imagePlaceholder?: string;
  videoUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  mediaLayout?: "full" | "canvas";
  desktopFrame?: CaseStudyMediaFrame;
  mobileFrame?: CaseStudyMediaFrame;
  /** Layout variant for this section */
  layout?: "default" | "two-column" | "blocks-with-media" | "narrow";
  /** Right column content for two-column layout */
  rightColumn?: ReactNode;
  /** Sub-blocks for blocks-with-media layout */
  blocks?: CaseStudyBlock[];
  /** Gap between text group and media in blocks-with-media (default 12px) */
  blockMediaGap?: "normal" | "large";
}

export interface CaseStudyContent {
  slug: string;
  /** Optional CTA button shown in the header */
  ctaUrl?: string;
  ctaLabel?: string;
  /** Legacy format — used by design-system, layersweep */
  challenge?: ReactNode;
  process?: ReactNode;
  solution?: ReactNode;
  /** Flexible sections format */
  sections?: CaseStudySection[];
}

const layersweepMedia = {
  before: "/images/projects/layersweep-before.jpg",
  after: "/images/projects/layersweep-after.jpg",
  scan: "/images/projects/layersweep-scan-feature.png",
  swap: "/images/projects/layersweep-swap-feature.png",
} as const;

export const caseStudies: CaseStudyContent[] = [
  {
    slug: "layersweep",
    ctaUrl:
      "https://www.figma.com/community/plugin/1602717091443258096/layersweep-bulk-style-swap-for-figma",
    ctaLabel: "Open in Figma Community",
    sections: [
      {
        title: "",
        layout: "two-column",
        content: (
          <>
            <div className="flex flex-col gap-3">
              <p className="font-semibold">The Problem</p>
              <p>
                Our team was moving to a new token structure across a large
                Figma file with thousands of layers. The old and new styles did
                not share a naming system, so replacing them by hand would have
                taken days and created a lot of room for mistakes.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold">My Role</p>
              <p>Designer and Engineer</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold">Tools</p>
              <p>Figma Plugin API, TypeScript, Claude Code, OpenAI Codex</p>
            </div>
          </>
        ),
        rightColumn: (
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Project Overview</p>
            <p>
              I built LayerSweep to make style migration in Figma less manual
              and less risky. The plugin scans a file for bound styles, lets
              users choose what to replace, maps old styles to new ones, and
              applies the changes in bulk. I built it around a real migration
              task inside our team, where the main challenge was not scale
              alone, but the fact that the old and new styles did not line up
              by name. After the core workflow worked on the actual file, I
              cleaned up the experience, made it usable for other designers,
              and published it on Figma Community.
            </p>
          </div>
        ),
      },
      {
        title: "Personal Goals",
        content: (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <span className="w-7 h-6 rounded-full border border-border-subtle flex items-center justify-center text-base font-semibold shrink-0">
                  1
                </span>
                <span className="font-semibold leading-[24px]">
                  Solve a real team problem
                </span>
              </div>
              <p>
                Solve a real problem for the team instead of building a
                speculative side project.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <span className="w-7 h-6 rounded-full border border-border-subtle flex items-center justify-center text-base font-semibold shrink-0">
                  2
                </span>
                <span className="font-semibold leading-[24px]">
                  Design and build end-to-end
                </span>
              </div>
              <p>
                Take full ownership across product thinking, interface design,
                and implementation.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <span className="w-7 h-6 rounded-full border border-border-subtle flex items-center justify-center text-base font-semibold shrink-0">
                  3
                </span>
                <span className="font-semibold leading-[24px]">
                  Stress-test AI-assisted development
                </span>
              </div>
              <p>
                Figure out where AI tools actually save time and where they
                still need strong direction.
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "From Prototype to Product",
        layout: "blocks-with-media",
        blockMediaGap: "large",
        content: null,
        blocks: [
          {
            subHeader: "Early Version",
            content: (
              <p>
                I started by validating whether the idea was technically
                feasible. I explored the Figma Plugin API, checked if I could
                scan layers, read style bindings, and replace styles
                reliably. Once the core mechanics worked, I built a rough
                prototype around our actual migration task to test it on a
                real file.
              </p>
            ),
            imageUrl: layersweepMedia.before,
            imageAlt: "Early version of LayerSweep",
            mediaLayout: "full",
          },
          {
            subHeader: "Final Version",
            content: (
              <p>
                After the prototype proved useful, I refined the experience
                for other designers on the team. I improved onboarding,
                added clearer states and safer review steps, and polished
                the UI to feel at home inside Figma. This version was used
                internally for the migration and later published on Figma
                Community.
              </p>
            ),
            imageUrl: layersweepMedia.after,
            imageAlt: "Final version of LayerSweep",
            mediaLayout: "full",
          },
        ],
      },
      {
        title: "Features",
        layout: "blocks-with-media",
        content: null,
        blocks: [
          {
            subHeader: "Scoped Scan",
            content: (
              <p>
                Users can choose which pages and layer types to include before
                running a scan. This keeps the output focused, especially in
                large files.
              </p>
            ),
            videoUrl:
              "https://pub-3dcbbf8f8f7140cb987df422a0768332.r2.dev/LayerSweep/01%20scoped-scan.mp4",
          },
          {
            subHeader: "Scan Results and Filtering",
            content: (
              <p>
                The plugin groups detected styles by source and type, shows
                usage counts, and supports search and filtering. Before
                changing anything, users can see exactly what is in the file.
              </p>
            ),
            videoUrl:
              "https://pub-3dcbbf8f8f7140cb987df422a0768332.r2.dev/LayerSweep/02%20scan-results-and-filtering.mp4",
          },
          {
            subHeader: "Selecting Styles for Swap",
            content: (
              <p>
                Styles can be selected in bulk or one by one. That makes the
                workflow faster without taking control away from the user.
              </p>
            ),
            videoUrl:
              "https://pub-3dcbbf8f8f7140cb987df422a0768332.r2.dev/LayerSweep/03%20selecting-styles-for-swap.mp4",
          },
          {
            subHeader: "Choosing Target Styles",
            content: (
              <p>
                I did not rely on automatic matching by name. In this kind of
                migration, naming is often inconsistent, so forced guesses
                would make the tool less trustworthy. Instead, users choose the
                target styles directly.
              </p>
            ),
            videoUrl:
              "https://pub-3dcbbf8f8f7140cb987df422a0768332.r2.dev/LayerSweep/04%20choosing-target-styles.mp4",
          },
          {
            subHeader: "Review Results",
            content: (
              <p>
                Before replacement starts, the plugin shows what will change
                and where. That gives users a chance to catch bad mappings
                before they commit. After the swap, users can review what was
                updated, what failed, and which layers were affected.
              </p>
            ),
            videoUrl:
              "https://pub-3dcbbf8f8f7140cb987df422a0768332.r2.dev/LayerSweep/05%20review-results.mp4",
          },
          {
            subHeader: "Dark and Light Theme",
            content: (
              <p>
                The interface supports light, dark, and auto themes to match
                the rest of the Figma environment.
              </p>
            ),
            videoUrl:
              "https://pub-3dcbbf8f8f7140cb987df422a0768332.r2.dev/LayerSweep/06%20dark-and-light-theme.mp4",
          },
        ],
      },
      {
        title: "AI Agents Workflow",
        layout: "narrow",
        content: (
          <>
            <p>
              I used Claude Code and Codex while building the plugin, but not
              as a substitute for product or technical judgment.
            </p>
            <p>
              Claude Code helped most with structure and logic-heavy tasks.
              Codex was useful for faster iteration on smaller UI and utility
              pieces.
            </p>
            <p>
              The weak point was the Figma Plugin API itself. It is specific
              enough that I still had to verify methods, correct bad
              assumptions, and steer the implementation. The main value was
              speed, not autonomy.
            </p>
          </>
        ),
      },
      {
        title: "Results",
        layout: "narrow",
        content: (
          <>
            <p>
              The plugin turned a slow, repetitive migration task into a
              workflow the team could actually work through in a reasonable
              amount of time.
            </p>
            <p>
              It also became a reusable internal tool instead of a one-off fix
              for a single file.
            </p>
            <p>
              After that, I published it on Figma Community so the project had
              a public life beyond the original migration work.
            </p>
          </>
        ),
      },
      {
        title: "What I\u2019d Do Differently",
        layout: "narrow",
        content: (
          <div className="flex flex-col gap-3">
            <p>
              I would bring other designers into testing earlier. The first
              version made sense to me because I built it, but new users needed
              more guidance than I expected.
            </p>
            <p>
              I would also add lightweight analytics from the start. That would
              make it easier to see which parts of the workflow people actually
              use and where the tool still creates friction.
            </p>
            <p>
              And I would define a clearer AI workflow earlier. The project
              went more smoothly once I stopped switching tools randomly and
              started using each one for the kind of work it handled best.
            </p>
          </div>
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
        title: "",
        layout: "two-column",
        content: (
          <>
            <div className="flex flex-col gap-3">
              <p className="font-semibold">The Context</p>
              <p>
                An iGaming company behind multiple casino and sportsbook brands
                running on a shared platform. Each brand had its own visual
                identity, but all shared the same tech stack, design system, and
                core feature set.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold">My Role</p>
              <p>Product Designer &rarr; Senior Product Designer</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold">Industry</p>
              <p>iGaming</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold">Period</p>
              <p>2022&ndash;2025</p>
            </div>
          </>
        ),
        rightColumn: (
          <div className="flex flex-col gap-3">
            <p className="font-semibold">What This Covers</p>
            <p>
              A selection of projects I worked on before moving to the platform
              team &mdash; from early UI execution on individual brands to
              owning design concepts, coordinating design teams, and shipping
              full products under tight deadlines. The showcase covers seven
              brands, each with a distinct visual identity but built on the
              same platform foundation.
            </p>
          </div>
        ),
      },
      {
        title: "Betoro.dk",
        content: (
          <>
            <p>
              <strong>Role:</strong> Senior Product Designer
            </p>
            <p>
              A Danish online casino and sportsbook. I created the initial
              design concept &mdash; visual identity, color palette, typography,
              and key page layouts &mdash; which was approved by stakeholders
              and became the foundation for the product. From there, I worked
              with two other designers (Senior and Middle) to design the full
              website and mobile app.
            </p>
            <p>
              Betoro targets the Danish market with a clean, dark-themed visual
              identity that feels more premium sportsbook than flashy
              casino &mdash; built for a regulated Nordic market where trust and
              clarity matter.
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
          <>
            <p>
              <strong>Role:</strong> Senior Product Designer
            </p>
            <p>
              A casino product built around a TikTok-style vertical
              feed &mdash; users swipe through short-form content mixing
              playable games, videos, and promotions. This was a strategically
              important project for the company: the Shorts mechanic we designed
              became a platform-wide feature adopted across other brands.
            </p>
            <p>
              I worked as part of a three-designer team on the full product
              experience across web and mobile (Flutter) &mdash; including the
              core Shorts feed, sportsbook section, and promotional flows.
            </p>
            <p>&rarr; See full Swiper case study</p>
          </>
        ),
        imagePlaceholder: "Swiper — shorts feed and key screens",
        videoUrl:
          "https://pub-3dcbbf8f8f7140cb987df422a0768332.r2.dev/brainrocket-showcase/swiper.mp4",
      },
      {
        title: "Spinnit.com",
        content: (
          <>
            <p>
              <strong>Role:</strong> Senior Product Designer
            </p>
            <p>
              Built on the same platform and Shorts-driven concept as Swiper,
              but repositioned with a different visual identity &mdash; dark
              theme with bold green accents and a more traditional casino
              layout. The design challenge was adapting a novel interaction
              pattern (vertical feed) to a brand that needed to feel familiar to
              a more conventional casino audience. I handled the product design
              across key pages and flows, balancing the shared foundation with a
              distinct brand personality.
            </p>
          </>
        ),
        imagePlaceholder:
          "Spinnit — homepage and key product screens showing the brand's distinct visual style",
        videoUrl:
          "https://pub-3dcbbf8f8f7140cb987df422a0768332.r2.dev/brainrocket-showcase/spinit.mp4",
      },
      {
        title: "WildRobin.com",
        content: (
          <>
            <p>
              <strong>Role:</strong> Senior Product Designer
            </p>
            <p>
              A casino and sportsbook for the German market with a warm,
              adventure-themed identity built around a Robin Hood
              mascot &mdash; brown and gold tones, illustrated characters,
              ornate UI elements. I coordinated a team of 3 designers and we
              shipped the full product in 2.5 weeks &mdash; possible because of
              the team&apos;s deep experience with the shared platform and a
              fast decision-making cadence that kept design reviews tight and
              blockers short-lived. The brand includes a rich gamification
              layer: Wheel of Fortune, Spin Rally, Challenges, Tournaments,
              Shop, and VIP Club.
            </p>
          </>
        ),
        imagePlaceholder:
          "WildRobin — homepage with the Robin Hood mascot, warm color palette, and gamification features",
        videoUrl:
          "https://pub-3dcbbf8f8f7140cb987df422a0768332.r2.dev/brainrocket-showcase/wildrobin.mp4",
      },
      {
        title: "Slotuna.com",
        content: (
          <>
            <p>
              <strong>Role:</strong> Product Designer
            </p>
            <p>
              A fantasy-themed casino and sportsbook for the German
              market &mdash; dark teal palette with medieval illustrated
              characters in an Assassin&apos;s Creed-inspired aesthetic. The
              main design challenge was making dense gamification features
              (Challenges, Tournaments, Bonus Crab, Shop, VIP Levels) feel
              cohesive within a heavily themed visual world without sacrificing
              usability.
            </p>
          </>
        ),
        imagePlaceholder:
          "Slotuna — homepage with fantasy illustrations, teal color palette, and gamification sidebar",
        videoUrl:
          "https://pub-3dcbbf8f8f7140cb987df422a0768332.r2.dev/brainrocket-showcase/slotuna.mp4",
      },
      {
        title: "Kingmaker.com",
        content: (
          <>
            <p>
              <strong>Role:</strong> Product Designer
            </p>
            <p>
              A premium-styled casino and sportsbook with a purple-and-gold
              palette and 3D-rendered coins and crowns. One of the richest
              feature sets on the platform &mdash; Fortune Wheel, Challenges,
              Tournaments, Bonus Crab, Shop, and VIP Levels. I focused on UI
              execution with strong attention to detail, including graphics
              optimization and smooth animations to keep performance tight
              despite heavy visual assets.
            </p>
          </>
        ),
        imagePlaceholder:
          "Kingmaker — homepage with purple-gold palette, 3D crown visuals, and gamification features",
        videoUrl:
          "https://pub-3dcbbf8f8f7140cb987df422a0768332.r2.dev/brainrocket-showcase/kingmaker.mp4",
      },
      {
        title: "Spinrollz",
        content: (
          <>
            <p>
              <strong>Role:</strong> Product Designer
            </p>
            <p>
              The lightest visual tone on the platform &mdash; a soft
              lavender-blue palette with a cartoon wrestler mascot and
              illustrated category cards. The deliberate choice to lean away
              from the dark, high-intensity aesthetic typical of casino products
              was a bet on reaching a more casual audience. I worked on UI, art
              assets, and micro-interactions &mdash; including graphics
              optimization and smooth animations.
            </p>
          </>
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
              All brands ran on a shared platform and design system &mdash; same
              tech stack, same structural patterns (navigation, game lobbies,
              sportsbook, registration), but each brand needed its own visual
              identity, token set, and art direction.
            </p>
            <p>
              The key challenge was designing at scale: making sure brand-level
              customization never broke the underlying system, especially as new
              platform-wide features like gamification were introduced and had to
              work across brands with very different aesthetics.
            </p>
            <p>
              My role grew through this period &mdash; from UI execution on
              individual brands to owning design concepts, coordinating teams,
              and shipping products under tight deadlines. This experience
              across multiple brands led to my transition to the platform team,
              where I worked on the shared design system and core components
              powering all of the company&apos;s brands.
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
