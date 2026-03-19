# Space Burial Website

## Project Overview
A premium space burial memorial service website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Auth**: Mock auth with 3 permission levels (ready for NextAuth integration)

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
│   ├── login/             # Main login (Admin + Immortal)
│   ├── admin/             # Admin portal
│   │   └── dashboard/     # Admin dashboard, users, CMS, analytics
│   ├── investor/          # Investor portal
│   │   ├── login/         # Investor login (separate)
│   │   ├── signup/        # Investor signup with NDA
│   │   └── dashboard/     # Dashboard, docs, financials, updates
│   ├── immortal/          # Immortal (purchaser) portal
│   │   └── dashboard/     # Countdown, memories, photos
│   ├── memorial/[slug]    # Public memorial pages for family
│   └── api/               # API routes
│       └── auth/          # Login, logout endpoints
├── components/            # React components
│   ├── layout/            # Navbar, Footer
│   ├── home/              # Homepage sections
│   ├── shared/            # StarField, SectionHeading
│   └── investor/          # Dashboard components
├── lib/                   # Constants and mock data
│   ├── constants.ts       # Site copy, package data
│   ├── mock-users.ts      # Mock user accounts (Admin, Investor, Immortal)
│   ├── mock-investors.ts  # Legacy investor data
│   ├── mock-financials.ts # Mock dashboard data
│   └── session.ts         # Session helpers
└── public/images/         # Static assets
```

## Commands
```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Authentication System

### 3 Permission Levels

1. **Admin** - Highest level
   - User management (view, edit, delete all accounts)
   - CMS (edit packages, pages, testimonials)
   - Analytics dashboard (metrics, charts, reports)
   - Login via: `/login`

2. **Investor** - Separate login
   - NDA agreement with typed signature required
   - View shares, value, ownership percentage
   - Access documents (NDA, agreements, reports)
   - Financial charts and company updates
   - Login via: `/investor/login`
   - Signup via: `/investor/signup`

3. **Immortal** (Purchaser) - Same login as Admin
   - Launch countdown timer
   - Subscription tier display
   - Add/edit memories and photos
   - Public memorial page for family sharing
   - Login via: `/login`

## Demo Credentials

**Admin:**
- Email: `admin@spaceburial.com`
- Password: `admin123`
- Dashboard: `/admin/dashboard`

**Investor:**
- Email: `demo@spaceburial.com`
- Password: `investor123`
- Dashboard: `/investor/dashboard`

**Immortal (Purchaser):**
- Email: `eternal@example.com`
- Password: `eternal123`
- Dashboard: `/immortal/dashboard`

## Key Pages

### Public Pages
- `/` - Homepage with hero, packages preview, testimonials
- `/services` - Full package comparison
- `/how-it-works` - 6-step process explanation
- `/about` - Company story and values
- `/contact` - Contact form
- `/checkout` - Package selection and reservation
- `/memorial/[slug]` - Public memorial pages (shareable with family)

### Auth Pages
- `/login` - Main login (Admin + Immortal)
- `/investor/login` - Investor-only login
- `/investor/signup` - Investor signup with NDA

### Admin Dashboard (`/admin/dashboard`)
- `/admin/dashboard` - Overview with stats
- `/admin/dashboard/users` - User management
- `/admin/dashboard/cms` - Content management
- `/admin/dashboard/analytics` - Reports & metrics

### Investor Dashboard (`/investor/dashboard`)
- `/investor/dashboard` - Shares, value, ownership
- `/investor/dashboard/documents` - View/download documents
- `/investor/dashboard/financials` - Financial reports
- `/investor/dashboard/updates` - Company news

### Immortal Dashboard (`/immortal/dashboard`)
- Launch countdown timer
- Subscription tier info
- Memories section (add/edit)
- Photo gallery (upload)
- Public memorial link sharing

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
- Mock auth is used for all portals (replace with NextAuth + DB for production)
- No real payment processing (integrate Stripe for production)
- Contact form is client-side only (add API route for production)
- Documents are placeholder URLs (add real file storage for production)

## Future Enhancements
- [ ] Stripe payment integration
- [ ] NextAuth + database for real auth
- [ ] Email notifications (SendGrid/Resend)
- [ ] CMS integration (Sanity/Contentful)
- [ ] Real mission tracking API
- [ ] SEO optimization
- [ ] Real file upload for photos/documents
- [ ] Family account invitations
