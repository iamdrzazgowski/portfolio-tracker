# Portfolio Tracker

**Portfolio Tracker** is a web application for tracking the value of an
investment portfolio. Users can add various assets (stocks, ETFs,
cryptocurrencies), fetch live prices from external APIs, and analyze portfolio
performance over time.

> Built as a full-stack project to practice modern web development and provide a
> useful portfolio monitoring tool.

---

![Application](https://github.com/user-attachments/assets/3261ff93-7fa8-498b-b464-e2d824a419a7)

---

## Features

- User registration and login
- CRUD operations for investment portfolios
- CRUD operations for individual assets
- Integration with external pricing APIs (e.g., Yahoo Finance, CoinGecko)
- Dashboard showing current portfolio value and statistics
- Responsive UI with charts and graphs

---

## Technologies

This project uses:

- **Frontend:** Next.js 16 (React 19, TypeScript 5)
- **Backend:** Node.js / Next.js API routes
- **Database:** PostgreSQL (via Prisma ORM 7)
- **Auth:** Better Auth + Prisma Adapter
- **UI:** shadcn/ui, Radix UI, Lucide React, Tailwind CSS 4
- **Forms:** React Hook Form
- **Integrations:** Yahoo Finance 2, CoinGecko API

---

## Local Setup

1. **Clone the repository**

```bash
git clone https://github.com/iamdrzazgowski/portfolio-tracker.git
cd portfolio-tracker
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Configure environment variables**

Create a `.env` file with the following variables:

```env
DATABASE_URL="postgresql://..."
BETTER_AUTH_URL="..."
BETTER_AUTH_SECRET="..."
```

4. **Run database migrations**

```bash
npx prisma migrate dev --name init
```

5. **Start the development server**

```bash
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000)
