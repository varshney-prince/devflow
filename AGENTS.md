<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Tech Stack

- **Framework**: Next.js 16.2.10 with App Router
- **React**: 19.2.4
- **TypeScript**: ^5
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: @base-ui/react, shadcn v4
- **Form Handling**: react-hook-form + zod (validation)
- **Auth**: NextAuth v5 (beta) with GitHub & Google providers
- **State**: next-themes for dark mode
- **Toasts**: sonner
- **Utilities**: clsx + tailwind-merge (cn function)

## Project Structure

```
app/
  (auth)/          # Auth route group (sign-in, sign-up)
  (root)/          # Main app routes
  api/auth/        # Auth API routes
  layout.tsx       # Root layout with fonts, providers
  globals.css      # Global styles
components/
  ui/              # Base UI components (button, input, etc.)
  forms/           # Form components
  navigation/      # Navbar and nav components
lib/
  actions/         # Server actions
  utils.ts         # cn() utility function
constants/         # Route constants, etc.
context/           # React context providers
hooks/             # Custom hooks
```

## Code Conventions

- Use `@/*` path alias for absolute imports
- Components use `cn()` from `@/lib/utils` for className merging
- Server actions use `"use server"` directive
- Client components use `"use client"` directive
- UI components follow shadcn patterns with CVA variants
- Auth flows use NextAuth v5 with `auth()` in middleware

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## ESLint Rules

- Enforces import ordering with groups: builtin, external, internal, parent/sibling, index, object
- Tailwind CSS plugin for class ordering
- Prettier integration (disables conflicting rules)
- Ignores: .next/, out/, build/, next-env.d.ts
