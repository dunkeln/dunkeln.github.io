# AGENTS.md

## Identity

Maintain Prateek Pravanjan's personal portfolio and technical blog. Treat it as a small, content-first website, not a product platform.

## Priorities

1. Make Prateek's work and thinking easy to understand.
2. Keep pages fast, accessible, and useful without client-side JavaScript.
3. Keep content pleasant to write and difficult to duplicate.
4. Prefer a small complete change over site-wide architecture or speculative polish.

## Site shape

- Use Astro at the repository root and Bun for package management and scripts.
- Produce a static GitHub Pages site for `https://dunkeln.github.io/`.
- Do not add SSR, server endpoints, databases, authentication, or runtime-only routes.
- Use direct file-based routes for pages and posts.
- Keep each post as its single source of truth. Derive indexes, feeds, and links from post files; never maintain a second post registry by hand.
- Share only the repeated document shell through layouts: metadata, navigation, article typography, and footer.
- Migrate useful writing, facts, and assets from the previous site selectively. Do not port the old Svelte application wholesale.

## Components and interactivity

- Start with `.astro`, semantic HTML, CSS, and small standard `<script>` blocks.
- Use React or Svelte only for an interaction that is materially clearer as a framework component or when reusing an existing component.
- Framework components are isolated islands. Hydrate them only when needed, using the narrowest suitable `client:*` directive.
- Do not add a component library, state library, animation framework, or CSS framework for convenience alone.
- Respect reduced-motion preferences and keep every essential path usable without animation.

## Posts

- Handwrite posts in MDX when they need components or JavaScript; plain Markdown is fine otherwise.
- Require one metadata block containing a descriptive `title`, concise `description`, and ISO `date`. Add optional fields only when the site uses them.
- The filename determines the stable URL. Avoid changing published URLs; add redirects only when a real URL moves.
- Each post should serve one primary reader and one purpose: tutorial, how-to, explanation, or reference. Do not force every post into the same structure.
- Open with what the reader will learn or understand. Put the common path before background and edge cases.
- Use descriptive headings, short paragraphs, active voice, consistent terminology, and concrete examples.
- Make sections understandable when reached directly from search or an AI assistant. State prerequisites and define uncommon terms.
- Prefer complete runnable examples. Explain failures and limitations when they affect the result.
- Link related posts with descriptive anchor text, not "click here."

## Navigation and discovery

- Keep top-level navigation small and named plainly: work, writing, about, and contact unless content proves another section is needed.
- Generate the writing index from post files and sort it by date.
- Use one descriptive H1 per page followed by correctly nested headings.
- Give every public page a unique title and description. Keep canonical URLs, sitemap, RSS, and social metadata correct when those features exist.
- Write titles for readers first. Do not stuff keywords or create pages solely for SEO.

## Media

- Add an image, diagram, animation, or video only when it explains something text cannot explain as clearly.
- Provide useful alt text; use empty alt text for decoration. Caption media when its relevance is not obvious.
- Optimize local images and reserve their dimensions to avoid layout shift.
- Avoid screenshots of fast-changing interfaces when text or code will age better.

## Maintenance

- Remove inaccurate content or mark it clearly as historical. Wrong content is worse than missing content.
- Update content when the underlying project or claim changes; do not add calendar-driven maintenance machinery.
- Treat post metadata as the source for generated navigation. Fix generation instead of patching generated lists.
- Add analytics, feedback widgets, search, or content linting only after a demonstrated need.

## Changes and checks

- Inspect the affected page, its layout, its generated index path, and the deployment configuration before editing.
- Reuse existing styles and components before adding new ones.
- Keep the diff to the smallest vertical slice that completes the request.
- Run the production build after non-trivial changes. Check affected pages at narrow and wide widths when visual behavior changes.
- Do not add unit tests during an implementation turn unless Prateek approves them after a runtime failure. Use the build and the smallest relevant runnable check instead.
- Never commit or deploy unless explicitly asked.
