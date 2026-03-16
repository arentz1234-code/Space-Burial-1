# Space Burial Website

## Project Overview
A premium space burial memorial service website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Auth**: Mock auth (ready for NextAuth integration)

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── services/          # Memorial packages page
│   ├── how-it-works/      # Process explainer
│   ├── about/             # Company story
│   ├── contact/           # Contact form
│   ├── checkout/          # Purchase flow
│   ├── investor/          # Investor portal
│   │   ├── login/         # Investor login
│   │   └── dashboard/     # Dashboard, docs, financials, updates
│   └── api/               # API routes
├── components/            # React components
│   ├── layout/            # Navbar, Footer
│   ├── home/              # Homepage sections
│   ├── shared/            # StarField, SectionHeading
│   └── investor/          # Dashboard components
├── lib/                   # Constants and mock data
│   ├── constants.ts       # Site copy, package data
│   ├── mock-investors.ts  # Mock investor accounts
│   └── mock-financials.ts # Mock dashboard data
└── public/images/         # Static assets
```

## Commands
```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Key Pages
- `/` - Homepage with hero, packages preview, testimonials
- `/services` - Full package comparison
- `/how-it-works` - 6-step process explanation
- `/about` - Company story and values
- `/contact` - Contact form
- `/checkout` - Package selection and reservation
- `/investor/login` - Investor portal login
- `/investor/dashboard` - Investor metrics, charts, updates

## Demo Credentials
**Investor Portal:**
- Email: `demo@spaceburial.com`
- Password: `investor123`

## Design System
- **Colors**: Deep space blacks, purple nebula glows, gold accents
- **Fonts**: Orbitron (headings), Inter (body)
- **Components**: Glass-morphism cards, animated star field, gradient text

## Custom Tailwind Classes
- `glass-card` - Frosted glass card effect
- `glow-border` - Purple glow box shadow
- `text-gradient` - Multi-color gradient text
- `btn-primary` - Primary gradient button
- `btn-secondary` - Secondary outlined button

## Environment Notes
- Mock auth is used for investor portal (replace with NextAuth + DB for production)
- No real payment processing (integrate Stripe for production)
- Contact form is client-side only (add API route for production)

## Future Enhancements
- [ ] Stripe payment integration
- [ ] NextAuth + database for real auth
- [ ] Email notifications (SendGrid/Resend)
- [ ] CMS integration (Sanity/Contentful)
- [ ] Real mission tracking API
- [ ] SEO optimization
