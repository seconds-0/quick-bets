# Quick-Bets AI Agent Guide

## Project Overview

**Quick-Bets** is a mobile-first private bet resolution tool built on Bitcoin using sBTC escrow. It allows two people to create, fund, and resolve private bets with seamless multi-asset support and invisible conversions.

### Core Innovation
- **URL-based proposal system** (like BTC Pay) - solves simultaneous wallet connection problem
- **Multi-asset funding** with invisible conversion (STX/BTC/sBTC → sBTC)
- **Progressive oracle system** - starts with mutual consent, evolves to AI with human verification

### Target Users
- Friends betting on sports/games
- Colleagues making work-related wagers
- High-profile bets that need trusted resolution (like Balaji bet scenario)

## Architecture Decisions

### Smart Contract (sBTC-Only)
- **Single asset:** Only handles sBTC for simplicity and auditability
- **Multi-asset input:** Accepts STX, BTC, sBTC from wallets with invisible conversion
- **Conversion mechanisms:**
  - sBTC → sBTC: Direct transfer
  - BTC → sBTC: Protocol wrapper (sBTC bridge)
  - STX → sBTC: DEX aggregator (Bitflow) for best price

### Development Phasing
1. **v1:** Basic escrow - no oracle, mutual consent + timeout only
2. **v1.5:** Trusted 3rd party arbitrator for notable bets
3. **v2:** AI Advisor (lawyer in a box for terms review)
4. **v3:** AI Oracle with human verification
5. **v4:** Oracle integrations + sBTC stacking

### Technology Stack
- **Smart Contracts:** Clarity on Stacks
- **Mobile App:** React Native (mobile-first)
- **Backend:** Node.js/TypeScript
- **Database:** PostgreSQL
- **Indexing:** Chainhook for reorg-aware indexing
- **Wallets:** Leather, Xverse integration
- **AI Services:** OpenAI for terms analysis
- **DEX Integration:** Bitflow for STX→sBTC swaps

## Development Guidelines

### Code Standards
- **Clarity:** Use Clarity 3, epoch 3.0
- **TypeScript:** Strict mode, comprehensive interfaces
- **React Native:** Functional components with hooks
- **Testing:** 100% test coverage for smart contracts
- **Security:** All sBTC transfers use post-conditions

### Project Structure
```
quick-bets/
├── contracts/           # Clarity smart contracts
│   ├── bet-escrow.clar # Main escrow contract
│   └── mock-sbtc.clar  # Test token
├── src/                # Mobile app source
│   ├── components/     # Reusable UI components
│   ├── screens/        # App screens
│   ├── services/       # API services
│   └── types/          # TypeScript interfaces
├── tests/              # Test files
├── docs/               # Documentation
└── scripts/            # Deployment scripts
```

### Mobile UX Principles
- **URL-First:** Proposal sharing via URL (like BTC Pay)
- **Asynchronous:** No simultaneous wallet connections
- **Invisible Conversion:** Users never interact with conversion mechanisms
- **Mutual Consent First:** Always make cancel/award most visible
- **Progressive Disclosure:** Show complexity only when needed

## Important Context

### Business Model
- **3% placement fee** (v1+)
- **Arbitrator fees** (v1.5+)
- **AI oracle fees** (v3+)
- **25% stacking cut** (v4+)

### Trust Model
- **v1:** Mutual consent or timeout
- **v1.5:** Trusted 3rd party arbitrator
- **v2+:** AI with human verification

### Conversion Integration
- **Bitflow:** DEX aggregator for STX→sBTC swaps
- **sBTC Bridge:** Protocol wrapper for BTC→sBTC
- **Invisible UX:** Users never interact with these directly

## Development Workflow

### Git Strategy
- **main:** Stable releases
- **develop:** Integration branch
- **feature/xxx:** New features
- **ui-mockup:** UI/UX exploration (current focus)

### Commit Convention
- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation updates
- **refactor:** Code restructuring
- **test:** Test additions
- **chore:** Maintenance tasks

### Testing Requirements
- **Smart Contracts:** 100% test coverage with Clarinet
- **Unit Tests:** Jest for business logic
- **Integration Tests:** Full user flows
- **E2E Tests:** Mobile app testing

## Success Criteria

### v1 (Basic Escrow)
- ✅ URL proposal system works
- ✅ Multi-asset funding with invisible conversion
- ✅ Mutual consent resolution
- ✅ Timeout mechanism for abandoned bets
- ✅ Mobile-first UX

### v1.5 (3rd Party Arbitrator)
- ✅ Optional arbitrator designation
- ✅ 3-party consent flows
- ✅ Notable bets can use trusted arbitrators

### v2 (AI Advisor)
- ✅ AI reviews bet terms for clarity/risks
- ✅ Better upfront terms reduce disputes

## Important Reminders

1. **sBTC-Only Contract:** Smart contract never handles STX or BTC directly
2. **Invisible Conversion:** Users should never need to understand conversion mechanisms
3. **Mobile-First:** Design for phone usage, not desktop
4. **Trust Through Simplicity:** Complex features come after proven simple foundation
5. **Progressive Enhancement:** Each phase adds value without breaking previous functionality

## Current Focus
- **UI Mockup Branch:** Exploring mobile UX for URL proposal system
- **Multi-Asset Funding:** Seamless STX/BTC/sBTC conversion
- **Invisible UX:** Users never interact with conversion complexity
