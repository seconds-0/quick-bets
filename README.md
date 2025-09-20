# Quick-Bets Mobile UI

A beautiful, lightning-fast mobile web UI for private bet resolution with URL-based proposal system.

## Overview

This is a **UI-only implementation** with no backend functionality. All data is mocked for demonstration purposes. The focus is on creating an exceptional user experience for:

- Creating private bets via URL sharing
- Accepting bets from trusted parties
- Multi-asset funding (STX, sBTC, BTC) with invisible conversion
- Mutual consent resolution
- Beautiful animations and transitions

## Features

### v1 (Current)
- ✅ Landing page with wallet login
- ✅ Main screen with bet management
- ✅ Bet details with action buttons
- ✅ Create bet with terms and URL generation
- ✅ Accept bet with warnings and funding
- ✅ Multi-asset support (STX/sBTC/BTC)
- ✅ Beautiful animations and transitions
- ✅ Mobile-first responsive design

### Mocked Services
- All API calls return mock data
- Wallet connections are simulated
- Asset conversions are mocked
- Bet creation/acceptance flows work end-to-end

## Design System

**Colors (Stacks/Hiro inspired):**
- Primary: Bitcoin orange (#f59e0b)
- Secondary: Stacks blue (#3b82f6)
- Neutrals: Clean grays and whites
- Success: Green tones
- Warning: Orange tones
- Error: Red tones

**Typography:**
- Font Family: Inter (clean, modern)
- Font Weights: 300-700
- Responsive sizing

**Animations:**
- Smooth transitions (300ms duration)
- Scale, fade, and slide animations
- Staggered animations for lists
- Success animations for bet resolution

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Primary action button
│   ├── Card.tsx        # Content containers
│   ├── Input.tsx       # Form inputs and text areas
│   └── animations.ts   # Animation utilities
├── screens/            # Main app screens
│   ├── LandingScreen.tsx
│   ├── MainScreen.tsx
│   ├── BetDetailsScreen.tsx
│   ├── CreateBetScreen.tsx
│   └── AcceptBetScreen.tsx
├── services/           # Mock data and API simulation
│   └── mock-data.ts
├── styles/             # Design system
│   └── design-system.ts
└── types/              # TypeScript interfaces
    └── index.ts
```

## Running the Project

### Prerequisites
- Node.js 16+
- React Native CLI
- iOS Simulator or Android Emulator (for mobile testing)

### Installation
```bash
npm install
```

### Development
```bash
# Start Metro bundler
npm start

# Run on web (recommended for UI testing)
npm run web

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Testing UI
The web version is perfect for testing the UI without needing mobile devices. All interactions work the same as they would on mobile.

## Key UX Principles

1. **URL-First:** Proposal sharing via URL (like BTC Pay)
2. **Invisible Conversion:** Users never interact with conversion mechanisms
3. **Mutual Consent First:** Always make cancel/award most visible
4. **Progressive Disclosure:** Show complexity only when needed
5. **Trust-Building:** Clear information about fund safety
6. **Mobile-First:** Optimized for one-handed phone use

## Multi-Asset Support

**User Experience:**
- One-click funding with STX, sBTC, or BTC
- Automatic conversion happens seamlessly
- Best price execution for STX→sBTC swaps

**Conversion Mechanisms:**
- **sBTC → sBTC:** Direct transfer (no conversion)
- **BTC → sBTC:** Protocol wrapper (sBTC bridge)
- **STX → sBTC:** DEX aggregator (Bitflow) for best price

**Smart Contract:**
- Only handles sBTC for simplicity and auditability
- All conversion happens off-chain before funds enter contract

## Animation Examples

- **Screen Transitions:** Smooth slide and fade animations
- **Button Presses:** Scale down and up for tactile feedback
- **List Items:** Staggered slide-in animations
- **Success States:** Fireworks and money animations
- **Loading States:** Elegant spinners and progress indicators

## Browser Support

Works in all modern browsers with CSS Grid and Flexbox support. Mobile Safari and Chrome Mobile are primary targets.

## Contributing

This is a UI mockup - focus on:
- Visual design improvements
- Animation enhancements
- UX flow optimizations
- Accessibility improvements
- Performance optimizations

## License

MIT License - feel free to use for inspiration in your own projects.
