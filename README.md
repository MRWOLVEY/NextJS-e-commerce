# NextJS E-commerce Store

A modern, multilingual e-commerce platform built with Next.js 15, featuring a comprehensive product catalog, shopping cart, wishlist functionality, and complete internationalization support for English and Arabic languages.

## Features

- Full-stack e-commerce functionality with API integration
- Multilingual support (English/Arabic) with next-intl
- Responsive design with Tailwind CSS
- Product catalog with category filtering and sorting
- Shopping cart and wishlist management
- Form validation with React Hook Form and Zod
- SEO optimization with dynamic metadata generation
- Authentication middleware for protected routes

## Setup & Run Instructions

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd store
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# Create .env.local file with:
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build & Production

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

### Other Commands

- `npm run lint` - Run ESLint with auto-fix
- `npm run type-check` - TypeScript type checking
- `npm run preview` - Build and start production preview

## Tech Choices & Tradeoffs

### Core Technologies

**Next.js 15.5.4**

- Choice: Latest stable version with App Router
- Benefits: Server-side rendering, API routes, file-based routing
- Tradeoffs: Learning curve for App Router patterns

**TypeScript**

- Choice: Full TypeScript implementation
- Benefits: Type safety, better developer experience, fewer runtime errors
- Tradeoffs: Additional development overhead for type definitions

**Tailwind CSS 4**

- Choice: Utility-first CSS framework
- Benefits: Rapid development, consistent design system, smaller bundle size
- Tradeoffs: Learning curve for utility classes, potential class name verbosity

### State Management

**React Context + useReducer**

- Choice: Native React state management
- Benefits: No additional dependencies, simple implementation
- Tradeoffs: Less sophisticated than Redux for complex state logic

### Form Handling

**React Hook Form + Zod**

- Choice: Performant form library with schema validation
- Benefits: Minimal re-renders, TypeScript integration, robust validation
- Tradeoffs: Additional learning curve for Zod schemas

### Internationalization

**next-intl**

- Choice: Next.js-specific i18n solution
- Benefits: SSR support, type-safe translations, route localization
- Tradeoffs: More complex setup compared to basic i18n libraries

### API Architecture

**Next.js API Routes**

- Choice: Built-in API functionality
- Benefits: Full-stack in single codebase, serverless deployment ready
- Tradeoffs: Limited compared to dedicated backend frameworks

## SEO Checklist

### Technical SEO

- [x] Dynamic meta titles and descriptions
- [x] Open Graph tags implementation
- [x] Twitter Card metadata
- [x] Canonical URLs
- [x] Robots.txt generation
- [x] XML sitemap generation
- [x] Schema.org structured data (Product, Organization, Breadcrumbs)
- [x] Proper heading hierarchy (H1, H2, H3)
- [x] Image alt attributes
- [x] Semantic HTML structure

### Performance SEO

- [x] Server-side rendering (SSR)
- [x] Static generation where appropriate
- [x] Image optimization with Next.js Image component
- [x] Bundle optimization
- [x] Code splitting
- [x] Font optimization

### Content SEO

- [x] Multilingual content (en/ar)
- [x] Hreflang implementation
- [x] Breadcrumb navigation
- [x] 404 error pages
- [x] Descriptive URLs
- [x] Internal linking structure

### Mobile SEO

- [x] Responsive design
- [x] Mobile-first approach
- [x] Touch-friendly interface
- [x] Viewport meta tag
- [x] Apple mobile web app capabilities

## Performance Metrics

### Lighthouse Screenshots

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── data/               # Static data and types
├── i18n/               # Internationalization config
└── middleware.ts       # Next.js middleware

messages/               # Translation files
├── en.json            # English translations
└── ar.json            # Arabic translations
```
