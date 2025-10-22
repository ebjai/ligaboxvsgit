Claude Sonnet 4 — Full Master README (LDB.AI)
Overview
This README explains the complete system build and deployment process for the Liga de Boxeo (LDB.AI) website powered by Claude Sonnet 4. It ensures consistency across design, development, health verification, continuous integration (CI), preview, and production promotion.
The purpose is to enable Claude Sonnet 4 (via VS Code + GitHub integration) to fully execute the build — from generating production-grade code to verifying the deployment health and promoting the final output to production.

🔧 Tech Stack
	•	Framework: Next.js 14 + TypeScript
	•	UI: Tailwind CSS + Framer Motion + Shadcn/UI + Lucide React Icons
	•	Hosting: Vercel (auto-deploys via GitHub CI)
	•	Automation: Claude Sonnet 4 (Claude.ai + VS Code Copilot integration)
	•	Version Control: GitHub main + dev branches
	•	Assets: Stored in /public/ for logos, wallpapers, and metadata
	•	CI/CD: GitHub Actions — continuous integration & deployment pipelines
	•	Monitoring: Health endpoint /api/health + badge /api/health/badge

🧱 Folder Structure
root/
├── .github/workflows/
│   ├── health-check.yml           # Runs tests and health verification
│   ├── preview.yml                # Deploys preview branch to Vercel
│   ├── production.yml             # Promotes verified build to production
├── public/
│   ├── brand/logo.png             # Main logo
│   ├── wallpaper.jpg              # Hero wallpaper background
├── src/
│   ├── components/                # Reusable UI components (Brand, Hero, etc.)
│   ├── pages/                     # Route pages
│   │   ├── Home2035.tsx           # Main landing page with hero + AI bar
│   └── utils/                     # Helper scripts and constants
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── # Liga de Boxeo (LDB.AI)

AI-powered boxing analysis, live news, and matchup predictions.

## 🥊 Features

- **Real-time Fighter Analysis**: 300-500 fighters from Wikidata with photos and stats
- **AI-Powered Fight Predictions**: Data-driven matchup analysis using records, physicals, and ELO
- **Live News Aggregation**: RSS feeds from ESPN, DAZN, FOX Sports, RingTV, Forbes, TMZ
- **Smart Search**: AI-powered search across all content
- **Health Monitoring**: Real-time verification of all data sources
- **Performance Optimized**: Sub-1.3s FCP, CLS < 0.1, TBT < 200ms

## 🚀 Quick Start

### Prerequisites

You need these assets in place:
- `public/brand/logo.png` (your logo, 512x512px recommended)
- `public/wallpaper.png` (background image, 2400x1400px recommended)

### Installation

```bash
# Install dependencies
npm ci

# Build fighter roster (downloads 300-500 fighters + images)
npm run fighters:build

# Start development server
npm run dev
```

### Verification

```bash
# Check if everything is working (health gates)
npm run verify:real
```

## 📁 Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── api/v1/            # API endpoints
│   │   ├── health/        # Site health checks
│   │   ├── news/          # RSS + local articles
│   │   └── predict/       # Fight predictions
│   ├── news/[slug]/       # Article pages
│   ├── search/            # Search results
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Hero.tsx           # Landing hero
│   ├── CompactFightWidget.tsx # 300px fight analyzer
│   ├── TrendingFeed.tsx   # News grid
│   ├── HealthBadge.tsx    # Real-time health
│   └── ...
├── lib/                   # Data & utilities
│   ├── fighters.json      # Fighter database
│   ├── fighterCredits.json # Image attributions
│   └── rss/sources.ts     # News sources
├── server/src/jobs/       # Background tasks
│   ├── buildFighterRoster.mjs # Wikidata scraper
│   └── scheduleRosterUpdate.mjs # Cron scheduler
├── scripts/               # CI/CD utilities
├── content/articles/      # Local MDX articles
└── .github/workflows/     # GitHub Actions
```

## 🎯 Pixel-Perfect Specs

- **Header**: 56px height with logo
- **Fight Widget**: 300px height, 1100px max width
- **Fighter Photos**: 120×120px circles with credit badges
- **News Cards**: 160px image height, 12px border radius
- **Ticker**: 32px height, 12px text
- **Colors**: Brand gold `#d4af37`, border `#2d2d2d`

## 🔧 Available Scripts

```bash
npm run dev              # Development server
npm run build            # Production build
npm run start            # Production server
npm run fighters:build   # Scrape fighter roster
npm run fighters:schedule # Start cron scheduler
npm run verify:real      # Health preflight check
npm run health:ci        # Full CI health pipeline
npm run prod:smoke       # Production smoke test
```

## 🚦 Health Monitoring

The site includes real-time health monitoring that fails if:
- Logo or wallpaper assets are missing
- Fighter roster has < 50 entries
- Fighter images folder has < 30 images  
- News API returns < 6 items with real thumbnails

Health status is visible on the homepage and queryable at `/api/health`.

## 🔄 CI/CD Pipeline

### Preview Deploys
- **Trigger**: Every PR and push to main
- **Process**: Health gate → Vercel Preview → Smoke test
- **Artifacts**: Fighter images + health report

### Production Deploys  
- **Trigger**: Manual or version tags (`v1.2.3`)
- **Process**: Full rebuild → Health gate → Production deploy → Smoke test
- **Verification**: Automatic rollback if health fails

## 📊 Performance Budgets

- **First Contentful Paint**: < 1.3s local
- **Cumulative Layout Shift**: < 0.1  
- **Total Blocking Time**: < 200ms
- **Main Thread**: No blocking work > 3ms per tick

## 🌐 Data Sources

### Fighters
- **Source**: Wikidata SPARQL queries
- **Ranking**: Wikipedia pageviews (60-day) + sitelinks
- **Images**: Wikimedia Commons with attribution
- **Must-have**: Jake Paul, Gervonta Davis, Canelo, Fury, Usyk, etc.

### News
- **RSS Sources**: ESPN, DAZN, FOX Sports, RingTV, Forbes, TMZ
- **Requirements**: Only articles with real thumbnails
- **Refresh**: Every 30 minutes
- **Local**: Authors "Eddie Barberiz Jr" and "Robert Ellis"

## 🎨 Design Language

- **Theme**: Dark glass UI with gold accents
- **Wallpaper**: Always visible (no dark overlays)
- **Typography**: Accessible AA+ contrast
- **Shadows**: Subtle only
- **Layout**: Sticky header, responsive grid, fixed-height analyzer

## 🔑 Environment Variables

```bash
SITE_URL=https://your-domain.com
WIKI_USER_AGENT=YourApp/1.0 (contact@example.com)
FIGHTER_TARGET=400  # Number of fighters to scrape
```

For Vercel deployment, add these secrets to GitHub:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID` 
- `VERCEL_PROJECT_ID`

## 📄 License

All rights reserved © Liga de Boxeo

---

Built with Next.js 14, TypeScript, Tailwind CSS, and real data. (this file)

⚙️ Build Workflow
1. Initial Project Setup
	•	Clone repository and install dependencies:git clone <repo-url>
	•	cd ldb-ai
	•	npm install
	•	
	•	Run local development server:npm run dev
	•	The app will be available at http://localhost:3000
2. Claude Sonnet 4 Build Execution
Claude Sonnet 4 executes full build instructions directly from the MASTER_PROMPT_CLAUDE_SONNET_4.txt file.It handles:
	•	Full Next.js + Tailwind configuration
	•	Component rendering (Hero, AI widgets, Brand, etc.)
	•	Style composition (dark gradient backgrounds, typography, responsiveness)
	•	CI/CD and health test scaffolding
Claude Sonnet 4 should never use placeholders — all content must be real, final assets.

🧠 Hero Section Structure
The hero layout represents the front-facing entry of the LDB.AI site.
	•	Top Section: Logo + slogan + CTA buttons
	•	AI Widget Bar: AI-driven search and data interface
	•	Visual: Wallpaper background (dark gold hue aligned with LDB brand)
Ensure:
	•	No blocking ropes or unnecessary foregrounds.
	•	Dark tones match logo gold (#DAA520) and background blacks (#000, #0A0A0A).
	•	Fully responsive (desktop, tablet, mobile).

🩺 Health Verification
Health endpoints ensure deployment integrity.
/api/health
Returns JSON response verifying uptime, response time, and status code.
/api/health/badge
Generates dynamic badge for CI workflow.
Example response:
{
  "status": "healthy",
  "uptime": "99.99%",
  "response_time": "58ms"
}

🔄 Continuous Integration (CI)
GitHub Actions automate verification and deployment.
health-check.yml
	•	Runs on pull requests and commits to main or dev
	•	Checks build + lint + unit tests
	•	Pings /api/health to verify service health
	•	Blocks promotion if any check fails
preview.yml
	•	Builds and deploys to Vercel preview environment
	•	Adds environment badge and commit reference
production.yml
	•	Promotes verified build from preview → production after passing all checks
	•	Tags release with build ID and timestamp

🚀 Deployment Process
	1	Commit changes to dev branch.
	2	CI runs health-check.yml.
	3	On success, preview.yml triggers a Vercel preview deployment.
	4	Once verified, merge into main.
	5	production.yml promotes deployment to live domain.

🧩 Asset Management
	•	Logos: /public/brand/logo.png (transparent background preferred)
	•	Wallpaper: /public/wallpaper.jpg (dark gradient, boxing ring perspective)
	•	Favicon: Auto-generated by Vercel from logo.png
Ensure file naming and format consistency before running Claude builds.

🧠 Developer Notes
	•	Do not use placeholders for assets or text.
	•	All hero components must use actual brand data.
	•	Maintain responsive layout using Tailwind’s grid/flex utilities.
	•	Keep background effects subtle and brand-aligned.
	•	All AI widgets are to be real and functional (no mockups).

🔍 Verification Checklist
✅ Code builds without error on npm run build✅ Health endpoint returns 200 and status: healthy✅ CI badge displays success✅ Preview deploy verified on Vercel✅ Production domain updated

🧩 Future Integrations
	•	YouTube API for live fight video feeds
	•	AI-driven fighter roster with stats + rankings
	•	Interactive widgets for training camp insights
	•	Partner data API for event results and sponsorships

🧾 Credits
	•	Architect: Eddie Barberiz Jr.
	•	AI Engineer: Claude Sonnet 4 (Anthropic)
	•	Collaborative AI: GPT-5 (OpenAI)
	•	Hosting: Vercel
	•	Version Control: GitHub
	•	Framework: Next.js 14 + Tailwind CSS

🧭 Final Notes
This README, alongside the MASTER PROMPT, serves as the canonical guide for rebuilding and deploying the full LDB.AI site via Claude Sonnet 4.
Claude must follow each instruction sequentially, without summarization, without question, and without placeholder substitution.
Command: Execute full build → verify health → run CI → preview deploy → promote to production.