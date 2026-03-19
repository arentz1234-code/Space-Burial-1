# Space Burial - Complete Build Guide

A premium space burial memorial service website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Live Links

- **Production Site:** https://spaceburial.vercel.app
- **GitHub Repository:** https://github.com/arentz1234-code/Space-Burial-1

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/arentz1234-code/Space-Burial-1.git
cd Space-Burial-1

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 | React framework (App Router) |
| TypeScript | Type safety |
| Tailwind CSS v3 | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

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

---

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, packages preview, testimonials |
| `/services` | Full package comparison |
| `/how-it-works` | 6-step process explanation |
| `/about` | Company story and values |
| `/contact` | Contact form |
| `/checkout` | Package selection and reservation |
| `/investor/login` | Investor portal login |
| `/investor/dashboard` | Investor metrics, charts, updates |
| `/investor/dashboard/documents` | Investor documents |
| `/investor/dashboard/financials` | Financial reports |
| `/investor/dashboard/updates` | Company updates |

---

## Demo Credentials

**Investor Portal:**
- **Email:** `demo@spaceburial.com`
- **Password:** `investor123`

---

## Design System

### Colors
- Deep space blacks
- Purple nebula glows
- Gold accents

### Fonts
- **Headings:** Orbitron
- **Body:** Inter

### Custom Tailwind Classes

| Class | Description |
|-------|-------------|
| `glass-card` | Frosted glass card effect |
| `glow-border` | Purple glow box shadow |
| `text-gradient` | Multi-color gradient text |
| `btn-primary` | Primary gradient button |
| `btn-secondary` | Secondary outlined button |

---

## Deployment

### Vercel (Recommended)

The project is connected to Vercel for automatic deployments.

**Manual Deploy:**
```bash
npx vercel --prod
```

**Auto Deploy:**
Push to the `main` branch on GitHub - Vercel will automatically build and deploy.

### Environment Variables (Production)

For production, add these environment variables in Vercel dashboard:

| Variable | Description |
|----------|-------------|
| `NEXTAUTH_SECRET` | Auth secret (when adding real auth) |
| `STRIPE_SECRET_KEY` | Stripe API key (when adding payments) |
| `DATABASE_URL` | Database connection (when adding database) |

---

## Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup Steps

1. **Clone the repo:**
   ```bash
   git clone https://github.com/arentz1234-code/Space-Burial-1.git
   cd Space-Burial-1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start dev server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to http://localhost:3000

---

## Production Build

```bash
# Build for production
npm run build

# Start production server
npm run start
```

---

## Future Enhancements

- [ ] Stripe payment integration
- [ ] NextAuth + database for real authentication
- [ ] Email notifications (SendGrid/Resend)
- [ ] CMS integration (Sanity/Contentful)
- [ ] Real mission tracking API
- [ ] SEO optimization

---

## Environment Notes

- Mock auth is used for investor portal (replace with NextAuth + DB for production)
- No real payment processing (integrate Stripe for production)
- Contact form is client-side only (add API route for production)

---

## Support

For issues or questions, open an issue on the GitHub repository.
