# Space Burial Website

## Project Overview
A premium space burial memorial service website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Includes SEC-compliant investor portal for Rule 506(c) private placement.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Auth**: Mock auth with 3 permission levels (ready for NextAuth integration)
- **Deployment**: Vercel

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
│   ├── login/             # Main login (Admin + Immortal + demo)
│   ├── admin/             # Admin portal
│   │   └── dashboard/     # Admin dashboard, users, CMS, analytics
│   ├── investor/          # Investor portal (SEC compliant)
│   │   ├── login/         # Investor login with SEC disclosures
│   │   ├── signup/        # 4-step signup with verification
│   │   ├── verification-pending/  # Waiting for accreditation review
│   │   └── dashboard/     # Dashboard, docs, financials, updates
│   │       ├── offering/      # SEC offering documents (PPM, etc.)
│   │       └── disclosures/   # Material disclosures page
│   ├── immortal/          # Immortal (purchaser) portal
│   │   └── dashboard/     # Countdown, memories, photos
│   ├── memorial/[slug]    # Public memorial pages for family
│   └── api/               # API routes
│       └── auth/          # Login, logout endpoints
├── components/            # React components
│   ├── layout/            # Navbar, Footer
│   ├── home/              # Homepage sections
│   ├── shared/            # StarField, SectionHeading
│   └── investor/          # Dashboard & verification components
├── lib/                   # Constants and mock data
│   ├── constants.ts       # Site copy, package data
│   ├── mock-users.ts      # Mock user accounts (Admin, Investor, Immortal)
│   ├── mock-investors.ts  # Legacy investor data
│   ├── mock-financials.ts # Mock dashboard data
│   ├── content-store.ts   # CMS content with SEC documents
│   ├── user-store.ts      # User management with verification status
│   └── session.ts         # Session helpers
├── middleware.ts          # Route protection for investor dashboard
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

2. **Investor** - Separate login with SEC compliance
   - 4-step signup: Info → Verification → NDA → Investment
   - Accredited investor verification (document upload, third-party, or professional letter)
   - View shares, value, ownership percentage
   - Access SEC offering documents (PPM, Subscription Agreement, etc.)
   - Material disclosures (use of proceeds, management, cap table)
   - Login via: `/investor/login` (includes SEC disclosures)
   - Signup via: `/investor/signup`

3. **Immortal** (Purchaser) - Same login as Admin
   - Launch countdown timer
   - Subscription tier display
   - Add/edit memories and photos
   - Public memorial page for family sharing
   - Login via: `/login`

## Demo Credentials

Both login pages have demo buttons that auto-fill credentials:

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
- `/login` - Main login with demo buttons (Admin, Immortal, Investor)
- `/investor/login` - Investor login with SEC disclosures and mandatory acknowledgment
- `/investor/signup` - 4-step investor signup with verification
- `/investor/verification-pending` - Shown while accreditation is being reviewed

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
- `/investor/dashboard/offering` - SEC offering documents (PPM, etc.)
- `/investor/dashboard/disclosures` - Material disclosures (use of proceeds, management, cap table)

### Immortal Dashboard (`/immortal/dashboard`)
- Launch countdown timer
- Subscription tier info
- Memories section (add/edit)
- Photo gallery (upload)
- Public memorial link sharing

## SEC Compliance Features

The investor portal implements Rule 506(c) compliance:

1. **No General Solicitation** - Investor portal not linked from public navbar
2. **Accredited Investor Verification** - 4-step signup with verification options:
   - Document upload (tax returns, W-2s, bank statements)
   - Third-party verification (VerifyInvestor.com)
   - Professional letter (CPA, attorney, broker-dealer)
3. **Securities Disclosures** - Prominent notices on investor login:
   - No offer or solicitation disclaimer
   - Unregistered securities warning
   - Restricted access notice
   - Jurisdictional limitations
4. **Risk Disclosures** - Investment risks clearly stated:
   - Total loss risk
   - Illiquidity warning
   - Transfer restrictions
   - Speculative nature
5. **Offering Documents** - SEC-required documents:
   - Private Placement Memorandum (PPM)
   - Subscription Agreement
   - Investor Questionnaire
   - SEC Form D filing reference
6. **Material Disclosures** - Required disclosures:
   - Use of proceeds breakdown
   - Management team backgrounds
   - Related party transactions
   - Capitalization table
7. **Mandatory Acknowledgment** - Checkbox required before login
8. **Route Protection** - Middleware protects dashboard from unauthenticated access

## Design System
- **Colors**: Deep space blacks, purple nebula glows, gold accents
- **Fonts**: Orbitron (headings), Inter (body)
- **Components**: Glass-morphism cards, animated star field, gradient text
- **Navbar Height**: 96px (mobile) / 112px (desktop) - pages use `pt-28 sm:pt-32`

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
- Verification uploads are mocked (add real document storage for production)
- Uses FAA-licensed launch provider partnerships (not NASA)

## Future Enhancements
- [ ] Stripe payment integration
- [ ] NextAuth + database for real auth
- [ ] Email notifications (SendGrid/Resend)
- [ ] CMS integration (Sanity/Contentful)
- [ ] Real mission tracking API
- [ ] SEO optimization
- [ ] Real file upload for photos/documents
- [ ] Family account invitations
- [ ] Real accredited investor verification service integration
- [ ] Document signing integration (DocuSign/HelloSign)
