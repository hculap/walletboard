# WalletBoard

Multi-chain crypto portfolio tracker. Connect your wallet to view token balances across Ethereum and Polygon with real-time USD pricing.

## Features

- MetaMask / WalletConnect via RainbowKit
- ETH, USDC, DAI balances on Ethereum mainnet and Polygon
- Real-time USD prices from CoinGecko (30s refresh)
- Dark glassmorphism UI with smooth animations
- Responsive mobile-first design
- Read-only — no private keys ever accessed

## Tech Stack

- React 18, TypeScript, Vite
- wagmi v2 + viem for chain interaction
- RainbowKit for wallet connection
- TanStack Query for data fetching
- Tailwind CSS + Framer Motion

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |

## Deployment

Configured for Netlify via `netlify.toml` with security headers (CSP, X-Frame-Options, etc).

## Architecture

```
src/
  components/   UI components (GlassCard, TokenRow, etc.)
  hooks/        wagmi + TanStack Query hooks
  config/       Chain and token configuration
  lib/          Utilities (formatting, ABI)
```
