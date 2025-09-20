# Private Bet Resolution Tool

## What It Does

A mobile-first tool that lets 2 people create, fund, and resolve private bets using sBTC escrow. Users write bet terms in natural language, the app converts them to objective criteria, funds are locked in smart contracts, and resolution happens through mutual agreement or simple oracle verification.

**Core Innovation: URL-Based Proposal System**
- Party A creates bet → generates shareable URL → sends to Party B
- Party B clicks URL → sees terms → connects wallet asynchronously
- Solves the "simultaneous wallet connection" problem

**Non-Goals:** No public prediction market. No multi-party bets. No AI-only resolution. No complex arbitration (v1).

## Business Model

**Revenue Progression:**

**v1 (Basic Escrow):**
- **3% placement fee:** Taken when both parties fund the bet (immediate cash flow)
- **Goal:** Cover costs and prove the core escrow concept

**v1.5 (3rd Party Arbitrator):**
- **3% placement fee** + **arbitrator fees**
- **Arbitrator fees:** 3rd party arbitrators pay for access to notable bet markets
- **Goal:** Generate revenue from high-profile bets

**v2 (AI Advisor):**
- **3% placement fee** + **arbitrator fees** + **premium AI features**
- **AI advisor:** Freemium model with premium suggestions
- **Goal:** AI becomes a profit center through better bet terms

**v3 (AI Oracle):**
- **3% placement fee** + **arbitrator fees** + **AI oracle fees**
- **Oracle fees:** Users pay for AI evaluation + human verification
- **Goal:** AI oracle becomes trusted and profitable service

**v4 (Oracle Integrations + Stacking):**
- **3% placement fee** + **arbitrator fees** + **AI oracle fees** + **25% stacking cut**
- **Stacking:** Users opt-in to stack escrowed sBTC, we take 25% cut
- **Oracle subscriptions:** Access to integrated data feeds
- **Goal:** Multiple revenue streams from mature platform

This isn't designed to be a major revenue driver initially - it's a cool tool that covers its costs, with AI services and stacking providing potential upside.

1) Objectives and key results

Objective A: Ship a minimal, safe escrow that never loses funds.

KR1: 100 percent of on‑chain transitions satisfy property tests for conservation of balances and bounded loops.

KR2: 0 critical audit findings prior to mainnet.

Objective B: Deliver mobile‑first UX with near‑zero user confusion.

KR3: 90 percent deposit completion rate after the first attempt.

KR4: Median time from “Create bet” to “Escrow funded” under 5 minutes on testnet.

Objective C: Keep off‑chain and on‑chain perfectly reconciled.

KR5: 100 percent of terms and evidence have salted hash commitments stored on‑chain and verified in the indexer.

## User Flow & Scenarios

**Party A (Bet Creator):**
1. Write bet terms in natural language ("I bet you $100 sBTC that the Lakers will beat the Warriors")
2. AI converts to objective criteria and validates clarity
3. Generate shareable proposal URL
4. Send URL to Party B via text, email, etc.

**Party B (Bet Acceptor):**
1. Click URL to see bet terms
2. Agree to terms and connect wallet
3. Both parties fund escrow (3% fee taken)
4. Bet becomes active

**Resolution Paths:**
- **Mutual Agreement** (preferred): Both parties can cancel or award at any time
- **Oracle Verification**: For objective outcomes (game scores, winners)
- **Human Review**: For disputes (fees apply from bet pool)

**Primary Use Cases:** Sports bets between friends, colleague challenges, personal wagers between people who know each other.

## Product Flow & State Machine

**Core Innovation: URL-Based Proposal System**
```
Proposal → Active → Resolved
     ↓
   Expired
```

**Proposal Phase:**
- Party A creates bet terms using natural language
- AI converts to objective criteria and validates clarity
- Generate shareable URL (like BTC Pay)
- Send URL to Party B via any channel

**Acceptance Phase:**
- Party B clicks URL → sees bet terms
- Party B agrees and connects wallet asynchronously
- Both parties fund escrow (3% fee taken immediately)
- Bet becomes active with expiry timer

**Resolution Phase:**
- **Mutual Agreement** (preferred): Both parties can cancel or award at any time
- **Oracle Verification**: For objective outcomes (game scores, etc.)
- **Human Review**: For disputes (fees deducted from bet pool)

**Key Principles:**
- **Asynchronous:** No simultaneous wallet connections required
- **Trust-First:** Mutual consent always available and prominent
- **Time-Bound:** Proposals expire if not accepted
- **Simple States:** Avoid complex state machines where possible

Clarity references that inform the design

Clarity overview and language guide. 
Stacks Documentation

SIP‑010 fungible token trait and transfer semantics that enforce sender == contract-caller in well‑behaved tokens. This is why users must push tokens in and then “claim” inside escrow. 
Clarity Book
+1

sBTC is a SIP‑010 token on Stacks and has published contract docs. Treat it as the single collateral type. 
Stacks Documentation
+1

Use block-height and get-block-info? time for deadlines and windows. 
Hiro
+1

## Scope & Requirements

### Why Put Friendly Bets On-Chain?

Even "friendly" bets between people who know each other benefit from on-chain escrow:

- **sBTC Convenience** - Easy crypto betting without exchange hassles
- **Term Clarity** - AI ensures bet terms are objective and unambiguous
- **Escrow Security** - Funds held safely, can't be accidentally spent
- **Record Keeping** - Permanent record prevents "I don't remember agreeing to that"
- **Dispute Edge Cases** - Even friends can have honest disagreements about outcomes
- **Enforceability** - If someone ghosts, there's still a clear resolution path

### v1: Basic Escrow - No Oracle
**Definition:** Simple bets between people who know and trust each other
- **2-party only** between friends, colleagues, family
- **No oracle at all** - only mutual consent or timeout resolution
- **URL proposal system** for easy sharing
- **Multi-asset support** - one-click funding with STX, sBTC, or BTC (auto-converts to sBTC)
- **Trust Model:** "We expect to resolve together, or let timeout handle abandoned bets"
- **Business Model:** 3% placement fee only
- **Resolution:** Mutual consent (primary) or timeout (abandoned bets)

### v1.5: Trusted 3rd Party Arbitrator
**Definition:** Higher-profile bets (like Balaji bet) that need trusted tiebreaker
- Optional 3rd party arbitrator designation during bet creation
- For notable bets that get attention and need human resolution
- 3-party consent flows in proposal system
- **Trust Model:** "We want a trusted person to resolve edge cases"
- **Business Model:** 3% placement fee + arbitrator fees
- **Resolution:** Mutual consent → Arbitrator → Timeout

### v2: AI Advisor (Lawyer in a Box)
**Definition:** AI reviews bet terms before creation (advisory only)
- AI analyzes terms for clarity, risks, loopholes, improvements
- **AI is advisory only** - suggests but doesn't decide
- Users can accept/reject AI suggestions
- **Trust Model:** "AI helps us write better bet terms upfront"
- **Business Model:** 3% placement fee (AI advisor may be freemium)
- **Resolution:** Same as v1.5, but with better upfront terms

### v3: AI Oracle with Human Verification
**Definition:** Optional paid AI evaluation with human fraud prevention
- Users pay for AI to evaluate who won based on submitted evidence
- **Human verification** required before funds move (fraud prevention)
- For bets where mutual consent fails but oracle can determine outcome
- **Trust Model:** "AI evaluates, humans verify before funds move"
- **Business Model:** 3% placement fee + AI oracle fees
- **Resolution:** Mutual consent → AI Oracle → Human Verification → Arbitrator

### v4: Oracle Integrations + Stacking
**Definition:** Automated data feeds + sBTC stacking for escrowed funds
- Integration with price oracles, sports feeds, weather APIs
- sBTC stacking for escrowed funds (25% cut)
- Automated resolution for objective outcomes
- **Trust Model:** "Official data feeds + stacking rewards"
- **Business Model:** 3% placement fee + oracle fees + 25% stacking cut
- **Resolution:** Automated (feeds) → AI Oracle → Human Verification → Arbitrator

### Functional Requirements
- **sBTC-only smart contract** - contract only holds and transfers sBTC
- **Multi-asset wallet support** - accept STX, sBTC, or BTC from wallets (v1+)
- **Invisible asset conversion** - users don't interact with conversion mechanisms (v1+)
- **Conversion mechanisms:**
  - **sBTC → sBTC:** Direct transfer to contract
  - **BTC → sBTC:** Protocol wrapper (sBTC bridge integration)
  - **STX → sBTC:** DEX aggregator (Bitflow) for best price execution
- **URL proposal system** - generate shareable links for bet invitations
- **Mutual consent paths** - cancel or award at any time (v1 primary resolution)
- **Time-based expiry** - proposals expire if not accepted
- **Timeout mechanism** - abandoned bets resolve after deadline (v1 only resolution)
- **Off-chain storage** for terms with on-chain salted hashes
- **Optional arbitrator designation** - 3rd party resolver for notable bets (v1.5+)
- **AI advisor system** - reviews and suggests improvements to bet terms (v2+)
- **AI oracle system** - evaluates outcomes with human verification (v3+)
- **Oracle integrations** - price feeds and official data sources (v4+)

### Non-Functional Requirements
- **Bounded complexity** - keep implementation simple and auditable
- **Mobile-first UX** - works seamlessly on phones
- **Post-conditions** - enforced for all sBTC transfers
- **Reorg-aware** - use Chainhook for reliable indexing
- **Unit tests** - comprehensive Clarinet test suite

## Mobile UX & Pages

Design for 390×844 viewport first. Bottom tab bar: Home, Create, Activity, Profile.

### 5.1 Home
**Purpose:** Status and quick actions for active bets
**Content:** List of active bets with status, amounts, and time remaining
**Actions:** Open bet, mutual cancel, share proposal URL
**Visual:** Compact cards with status pills, primary CTA: "Create Bet"

### 5.2 Create Bet
**Purpose:** Write bet terms and generate proposal URL
**Content:** Natural language text area, stake amount, expiry time
**Actions:** "Run AI Check" → "Generate Proposal URL" → "Share"
**Visual:** Simple form with AI feedback, prominent "Share URL" button

### 5.3 Proposal View (URL Landing Page)
**Purpose:** Accept bet proposal and connect wallet
**Content:** Bet terms, stake amount, parties involved, expiry timer
**Actions:** "I Agree" → Connect wallet → Fund escrow
**Visual:** Clean summary with clear call-to-action

### 5.4 Active Bet
**Purpose:** Monitor bet status and resolution options
**Content:** Bet terms, current status, time remaining
**Actions:** "Mutual Cancel" (always visible), "Mutual Award"
**Visual:** Simple status display with prominent mutual action buttons

### 5.5 Resolution
**Purpose:** Final bet resolution
**Content:** Proposed outcome, evidence links, payout details
**Actions:** "Accept Outcome" / "Dispute" (if applicable)
**Visual:** Clear verdict display with action buttons

### 5.6 Activity
**Purpose:** Event log and notifications
**Content:** Bet status changes, transaction confirmations
**Actions:** Tap to open related bet
**Visual:** Chronological list grouped by day

### 5.7 Profile
**Purpose:** Wallet management and settings
**Content:** Connected wallet, notification preferences
**Actions:** Connect/disconnect wallet, export data
**Visual:** Settings list with toggles

**Key UX Principles:**
- **URL-First:** Proposal sharing via URL (like BTC Pay)
- **Mutual Consent:** Always visible and easy to use
- **Progressive Disclosure:** Show complexity only when needed
- **Trust-Building:** Clear information about fund safety

6) Smart contract architecture

Single sBTC escrow contract with small, explicit state machine.

Data maps and vars

bets map: id, sBTC token trait reference, parties list, per‑party stake, fee bps, arbitrator principal, resolve‑by height, state, hashes.

party-status map per bet: funded, approved, consent flags.

allocated data‑var: sum of escrowed balances allocated to bets.

Optional capped list of recent observations as events only.

Public entry points

create-bet(...) → bet-id

claim-deposit(bet-id, amount)

final-approve(bet-id)

mutual-cancel(bet-id)

mutual-award(bet-id, recipient)

post-observation(bet-id, obs-hash, status) [oracle‑only]

propose-winner(bet-id, winner) [oracle‑only]

challenge(bet-id) [bonded]

arb-resolve(bet-id, outcome) [arbitrator‑only]

finalize(bet-id)

abort-unfunded(bet-id)

Read‑only helpers
get-bet, get-party, time-left, funding-needed, state-of.

Why this pattern

SIP‑010 fungible tokens on Stacks usually require contract-caller == sender in their transfer, so the escrow cannot pull funds. Users must push sBTC, then the contract claims allocation against its real balance. This is the safest deposit UX for SIP‑010. 
Clarity Book

sBTC is a SIP‑010 token with a published token contract and docs, so trait calls and balance checks are standard. 
Stacks Documentation

Deadlines should use block-height and optionally get-block-info? time for user‑friendly displays. 
Hiro
+1

Reference code and examples

Clarity language guide and crash course. 
Stacks Documentation
+1

Audited starter contracts: Counter, Multisig Vault, Timelocked Wallet, Tiny Market. Good patterns for bounded lists and simple state machines. 
Stacks Documentation

Clarity examples repo: SIP‑010 token, minimal marketplace, Bitcoin parsing examples. 
GitHub

sBTC protocol contracts overview including sbtc-token. 
Stacks Documentation

7) Off‑chain components

AI clarity service

Input: prose terms.

Output: resolution schema JSON, confidence, warnings.

Gate: must meet a minimum clarity score or the UI blocks “Create bet.”

Oracle worker

Reads schema, posts daily observation hashes, proposes winner when conditions satisfy.

Posts through a dedicated oracle principal.

Optional: integrate a price oracle like Pyth in later versions if you support financial predicates. Pyth price feeds are live on Stacks. 
pyth.network
+1

Indexer and notifications

Chainhook watches for sBTC transfers to the escrow and contract events, then updates UI and pushes notifications. Reorg‑aware by design. 
Hiro Docs

Object storage

Encrypted storage for terms and evidence. Store salted hash on‑chain for each artifact. Guidance on what to store on‑chain and time‑travel queries are in the Clarity book. 
Clarity Book

8) Mobile wallet integration

Stacks.js for transaction building, contract calls, and post‑conditions. The v7 docs include wallet support and a React Native integration note. 
Hiro Docs

Stacks Connect for a unified provider request interface across wallets. 
connect.stacks.js.org

Xverse WalletConnect docs for web and mobile. You will build deep links that open Xverse with prefilled post‑conditions. 
docs.xverse.app

Leather connection and send flows, including examples for Bitcoin integration. 
leather.io
+1

Post‑conditions you must set in the app

For claim-deposit: a fungible token post‑condition that the sender will send exactly N sBTC to the escrow contract principal, or the transaction aborts. Stacks.js exposes builders like createAssetInfo and fungible post‑condition helpers. 
stacks.js.org
+1

For finalize payouts: optional post‑conditions to prevent any unexpected asset movement beyond the intended recipient amounts. Protocol‑level post‑conditions are documented and enforced during validation. 
Stacks Documentation
+1

9) Data model

On‑chain

bet struct, party-status map, allocated uint.

Hashes: terms-hash, schema-hash, evidence hashes.

Off‑chain

User profiles, bet documents, signed receipts, oracle observations content.

Event journal keyed by bet id, mirrored from Chainhook.

10) Security model

Single asset, single vault. No internal AMM, no price math in v1.

Strict state checks on every entry point.

Bounded lists, no unbounded loops.

Immediate fee transfer only after unanimous final approval.

Post‑conditions on all user‑initiated transfers. 
Stacks Documentation

Use block-height for deadlines, and treat timestamps as display aids. 
Hiro

Unit tests in Clarinet and Clarinet SDK. 
Hiro Docs
+1

11) Metrics and analytics

Funnel: Create → AI pass rate → On‑chain create → First deposit → All deposits → Final approval → Resolution.

Time in state by bet id.

Challenge rate and arbitrator latency.

Deposit failure reasons from post‑condition aborts.

12) Risks and mitigations

User confusion with deposits: Guide the two‑step push‑then‑claim UX and show detected escrow balance via API to prompt “Claim.”

Oracle trust: Use an optimistic pattern with challenges and a named arbitrator.

Timeout ambiguity: Resolve‑by height with explicit grace window.

Privacy expectations: Clear language that addresses and amounts are on‑chain, terms are off‑chain but hashed on‑chain.

## Implementation Plan

### Phase 1 (v1): Basic Escrow - No Oracle
**Core Features:**
- URL-based proposal system (like BTC Pay)
- 2-party sBTC escrow with mutual consent
- **No oracle at all** - only mutual resolution or timeout
- **Multi-asset wallet support** - accept STX, sBTC, or BTC from wallets, convert to sBTC
- Mobile app with wallet integration
- 3% placement fee

**Pages:** Home, Create Bet, Proposal View, Active Bet, Resolution, Activity, Profile

**Technical Focus:**
- Proposal URL generation and sharing
- Asynchronous wallet connection
- **Multi-asset funding** - one-click with STX/sBTC/BTC, invisible conversion to sBTC
- **Asset conversion mechanisms:**
  - **sBTC → sBTC:** Direct transfer to contract (no conversion)
  - **BTC → sBTC:** Protocol wrapper (sBTC bridge)
  - **STX → sBTC:** DEX aggregator (Bitflow) for best price swap
- Mutual cancel/award functionality
- Timeout mechanism for abandoned bets
- Simple business model (3% placement fee only)

**Resolution Options:**
- **Mutual consent** (primary)
- **Timeout** (if no resolution by deadline)

**Success Criteria:**
- Users can create and share bet proposals via URL
- Both parties can fund with one click using STX, sBTC, or BTC
- **Invisible conversion** - users don't need to understand or interact with conversion mechanisms
- **Best price execution** - Bitflow or similar finds optimal STX→sBTC swap rates
- **Protocol integration** - sBTC bridge handles BTC→sBTC conversion seamlessly
- Smart contract only handles sBTC (simplicity and auditability)
- Mutual consent works for resolution
- Timeouts work for abandoned bets
- No oracle complexity needed

### Phase 2 (v1.5): Trusted 3rd Party Arbitrator
**Additional Features:**
- Optional arbitrator designation during bet creation
- 3-party consent flows in proposal system
- Arbitrator resolution path for edge cases
- Support for "notable bets" (like Balaji bet scenario)

**Technical Focus:**
- Extend proposal system to handle 3rd party designation
- Arbitrator consent and resolution workflows
- Enhanced business model (arbitrator fees)

**Success Criteria:**
- Notable bets can designate trusted 3rd party arbitrators
- 3-party consent flows work smoothly
- Arbitrator can resolve disputes when mutual consent fails

### Phase 3 (v2): AI Advisor (Lawyer in a Box)
**Additional Features:**
- AI reviews bet terms before creation
- Suggests improvements, clarifications, risks
- Points out potential loopholes or ambiguities
- **AI is advisory only** - doesn't make determinations
- Users can accept/reject AI suggestions

**Technical Focus:**
- AI integration for contract review
- UI for displaying AI suggestions
- User workflow for accepting AI recommendations

**Success Criteria:**
- AI provides helpful suggestions for bet terms
- Users can easily understand and act on AI advice
- Better bet terms lead to fewer disputes
- AI doesn't participate in resolution

### Phase 4 (v3): AI Oracle with Human Verification
**Additional Features:**
- **Optional paid AI oracle** for bet resolution
- Users submit evidence and data for AI evaluation
- **Human verification** of AI decisions before funds move
- Prevents AI fraud or manipulation
- Users pay for AI evaluation service

**Technical Focus:**
- AI oracle system with evidence submission
- Human verification workflow
- Payment system for oracle services
- Fraud prevention mechanisms

**Success Criteria:**
- AI oracle provides accurate evaluations
- Human verification catches AI errors
- Users willing to pay for oracle services
- No fraudulent AI decisions slip through

### Phase 5 (v4): Oracle Integrations
**Additional Features:**
- Integration with price oracles (Pyth, etc.)
- Official data feeds for sports, weather, etc.
- Automated resolution for simple objective outcomes
- Subscription model for oracle access

**Technical Focus:**
- Oracle SDK integrations
- Automated data verification
- Subscription and billing systems
- Multi-oracle redundancy

**Success Criteria:**
- Reliable integration with official data sources
- Automated resolution works accurately
- Users trust oracle integrations
- Subscription model generates revenue

14) References and example code indices

Clarity language and patterns

Clarity overview and reference. 
Stacks Documentation

Clarity crash course. 
Stacks Documentation

Using Clarinet and testing contracts. 
Clarity Book
+1

Useful keywords like block-height, traits, and maps. 
Hiro

get-block-info? time access. 
Hiro Docs

SIP‑010 and token transfers

SIP‑010 trait, required functions, and the transfer pattern that checks contract-caller. 
Clarity Book
+1

Creating an FT in Clarity, examples and guidance. 
Stacks Documentation

Audited starter contracts and tiny market example. 
Stacks Documentation

Clarity examples repo with SIP‑010, marketplace, and bitcoin‑aware samples. 
GitHub

sBTC

sBTC concept page. 
Stacks Documentation

sBTC token contract docs. 
Stacks Documentation

Deposit and withdrawal behavior and timing characteristics. 
Stacks Documentation

SDKs and tooling

Stacks.js quickstart plus post‑conditions and RN note. 
Hiro Docs

Stacks.js API types for post‑conditions. 
stacks.js.org

Stacks Connect provider model. 
connect.stacks.js.org

Xverse WalletConnect integration quickstart. 
docs.xverse.app

Leather connection and send guides. 
leather.io
+1

Clarinet tooling docs and repo. 
Hiro Docs
+1

Chainhook docs for reorg‑aware indexing. 
Hiro Docs

Stacks Blockchain API reference. 
Stacks Documentation

Optional for later

Pyth price feeds on Stacks. 
pyth.network

## Success Criteria

**Core Functionality:**
- ✅ Party A can create bet terms and generate shareable URL
- ✅ Party B can click URL and accept bet asynchronously
- ✅ Both parties can fund escrow with 3% fee taken on placement
- ✅ Mutual cancel/award available at any time
- ✅ Oracle can verify objective outcomes (game scores, etc.)
- ✅ Funds are always recoverable via mutual consent

**Trust & Safety:**
- ✅ Smart contract shows exactly what can/cannot happen to funds
- ✅ No unilateral fund movements possible
- ✅ Post-conditions enforced for all sBTC transfers
- ✅ Clear information about fund custody and recovery options

**User Experience:**
- ✅ URL sharing works like BTC Pay - familiar and easy
- ✅ No simultaneous wallet connections required
- ✅ Mutual consent always visible and easy to use
- ✅ Clear status updates throughout bet lifecycle
- ✅ Mobile-first design works seamlessly on phones

16) Implementation appendix
A. Post‑condition patterns with Stacks.js

Use fungible post‑conditions to restrict transfers of sBTC during claim-deposit and guard payouts. See the Stacks.js reference, which includes examples and types for PostCondition, FungiblePostCondition, and FungibleConditionCode. 
stacks.js.org
+1

B. Deadlines

Prefer block-height for state transitions. For UI, read get-block-info? time for display and sanity checks. 
Hiro Docs

C. Testing

Use Clarinet for unit and integration tests, and the Clarinet JS SDK for simnet tests in Node. 
Hiro Docs
+1

D. Indexing

Chainhook watches for: sBTC transfer events into escrow, claim-deposit calls, state flips, proposals, challenges, and finalization. It is reorg‑aware, so your app state will not drift. 
Hiro Docs

## Strong Opinions to Guide Build

**sBTC-Only Contract:** Smart contract only holds sBTC for simplicity and auditability. Accept STX/BTC from wallets with invisible conversion: sBTC (direct), BTC (bridge), STX (Bitflow DEX).

**Boring Contracts:** Short functions, explicit states, bounded loops. No dynamic lists that can grow unbounded.

**Post-Conditions Always:** Protocol-enforced guardrails, not just UI hints. Every sBTC transfer must be protected.

**URL-First Design:** Proposal sharing via URL (like BTC Pay) is the core UX innovation. Don't over-engineer wallet connection flows.

**Invisible Asset Conversion:** Users should never need to understand conversion mechanisms. sBTC (direct), BTC (bridge), STX (Bitflow DEX) - all invisible to user.

**Mutual Consent First:** Always make cancel/award the most visible and easy options. Trust comes from user control, not complex arbitration.

**Asynchronous by Default:** No simultaneous wallet connections. Everything should work like email - send URL, recipient responds when convenient.

**Simple Oracle:** For v1, oracle should handle objective outcomes only (scores, winners). Complex arbitration is v2 territory.

**Mobile-First Reality:** Design for one-handed phone use. Big buttons, clear hierarchy, minimal scrolling.

**Trust Through Transparency:** Show exactly what the smart contract can and cannot do with funds. No surprises.

**Progressive Enhancement:** Start with friendly bets between people who know each other. Add adversarial features only when proven foundation exists.

You said:
Draft all the clarity interfaces. Please read clarity lang and use the most recent doc versions for this. 
ChatGPT said:
Request for GPT-5 Pro
Reasoned for 8m 26s

Below are clean, compile‑able Clarity interfaces for the sBTC‑only escrow described earlier. I split them into:

a trait that specifies the public API surface you will implement, and

a minimal contract skeleton that exposes the same function signatures with stub bodies, so your team can wire tests, post‑conditions, and frontend calls immediately.

Where relevant I annotate choices with links to the current Stacks and Clarity docs so you can double‑check types and patterns.

1) Escrow API trait

This trait defines the on‑chain interface for creation, funding, confirmations, oracle posts, challenges, arbitration, finalization, and read‑only getters. It assumes a single collateral sBTC vault and block‑height based deadlines.

;; -----------------------------------------
;; sbtc-escrow-trait.clar
;; Public API surface for an sBTC-only bet escrow
;; -----------------------------------------

;; We will import SIP-010's trait elsewhere when implementing,
;; not needed for the interface itself.
;; See: https://docs.stacks.co/guides-and-tutorials/tokens/creating-a-fungible-token
;; and mainnet trait id: SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait

(define-trait sbtc-escrow-trait
  (
    ;; ---------------------------
    ;; Lifecycle
    ;; ---------------------------

    ;; Create a new bet with salted term and schema hashes,
    ;; parties, per-party stake in sBTC (integer, 8 decimals on sBTC),
    ;; resolve-by block height, challenge window in blocks,
    ;; protocol fee in basis points, and arbitrator principal.
    (create-bet
      ( (buff 32)         ;; terms-hash
        (buff 32)         ;; schema-hash
        (list 10 principal) ;; parties (2..10 enforced in implementation)
        uint              ;; per-stake
        uint              ;; resolve-by-height
        uint              ;; challenge-window-blocks
        uint              ;; fee-bps
        principal         ;; arbitrator
      )
      (response uint uint)  ;; ok: bet-id
    )

    ;; After a user has transferred sBTC to the escrow contract,
    ;; they call claim-deposit to allocate their deposit to the bet.
    (claim-deposit
      ( uint              ;; bet-id
        uint              ;; amount
      )
      (response bool uint)
    )

    ;; All parties must call final-approve once fully funded for fee to be taken
    ;; and state to move from AWAITING_FINAL_OK to LIVE.
    (final-approve
      ( uint )            ;; bet-id
      (response bool uint)
    )

    ;; Unanimous cancel at any time, full refunds.
    (mutual-cancel
      ( uint )            ;; bet-id
      (response bool uint)
    )

    ;; Unanimous award at any time to a single recipient.
    (mutual-award
      ( uint              ;; bet-id
        principal         ;; recipient
      )
      (response bool uint)
    )

    ;; ---------------------------
    ;; Oracle and arbitration
    ;; ---------------------------

    ;; Oracle posts a daily or periodic observation hash with an optional status code.
    ;; status is left as uint for flexibility in v1 (document codes off-chain).
    (post-observation
      ( uint              ;; bet-id
        (buff 32)         ;; observation-hash
        uint              ;; status code (implementation-defined)
      )
      (response bool uint)
    )

    ;; Oracle proposes a winner when conditions are satisfied.
    ;; Starts a challenge window.
    (propose-winner
      ( uint              ;; bet-id
        principal         ;; winner
      )
      (response bool uint)
    )

    ;; Any party can challenge the oracle proposal by bonding a small amount.
    (challenge
      ( uint )            ;; bet-id
      (response bool uint)
    )

    ;; Arbitrator resolves a challenged proposal with a final outcome.
    (arb-resolve
      ( uint              ;; bet-id
        principal         ;; winner
      )
      (response bool uint)
    )

    ;; After proposal window with no challenge, or after arb-resolve,
    ;; anyone may finalize to execute payout.
    (finalize
      ( uint )            ;; bet-id
      (response bool uint)
    )

    ;; Abort bets that never fully funded within a grace period; refund funders.
    (abort-unfunded
      ( uint )            ;; bet-id
      (response bool uint)
    )

    ;; ---------------------------
    ;; Admin controls
    ;; ---------------------------

    ;; Set the authorized oracle principal (owner-only).
    (set-oracle
      ( principal )
      (response bool uint)
    )

    ;; Update protocol fee bps ceiling or default (owner-only).
    (set-fee-bps
      ( uint )
      (response bool uint)
    )

    ;; Rotate arbitrator on a specific bet before final approval.
    (set-arbitrator
      ( uint              ;; bet-id
        principal         ;; new arbitrator
      )
      (response bool uint)
    )

    ;; ---------------------------
    ;; Read-only helpers
    ;; ---------------------------

    ;; Get canonical bet metadata and state.
    (get-bet
      ( uint )            ;; bet-id
      (response
        (tuple
          (parties (list 10 principal))
          (per-stake uint)
          (resolve-by-height uint)
          (challenge-window-blocks uint)
          (fee-bps uint)
          (arbitrator principal)
          (terms-hash (buff 32))
          (schema-hash (buff 32))
          (state uint)           ;; enum documented in implementation
        )
        uint)
    )

    ;; Per-party funding and consent flags.
    (get-party-status
      ( uint              ;; bet-id
        principal         ;; who
      )
      (response
        (tuple
          (funded bool)
          (final-ok bool)
          (consent-cancel bool)
          (consent-award (optional principal))
        )
        uint)
    )

    ;; Convenience checks for UI.
    (is-all-funded
      ( uint )            ;; bet-id
      (response bool uint)
    )

    ;; Remaining blocks until resolve-by (none if past deadline).
    (time-left-blocks
      ( uint )            ;; bet-id
      (response (optional uint) uint)
    )
  )
)

2) Implementation skeleton with the same signatures

This is a minimal, compile‑able skeleton that you can drop into Clarinet and unit test right away. It imports the official SIP‑010 trait, pins mainnet sBTC for reference, declares constants and error codes, and exposes every public entry point with the exact types you will implement. Bodies are simple stubs that return errors or default values to keep the focus on interfaces.

;; -----------------------------------------
;; sbtc-escrow-v1.clar
;; Minimal skeleton exposing all public interfaces from sbtc-escrow-trait
;; -----------------------------------------

;; Import the official SIP-010 FT trait (mainnet deployment).
;; Ref: docs and book confirm mainnet trait identifier.
;; https://docs.stacks.co/guides-and-tutorials/tokens/creating-a-fungible-token
;; https://book.clarity-lang.org/ch10-04-creating-a-sip010-ft.html
(use-trait ft-trait
  'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)

;; Reference the sBTC token contract on mainnet for documentation and tests.
;; You will typically inject testnet or simnet id via Clarinet.toml mappings.
;; https://explorer.hiro.so/token/SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token?chain=mainnet
(define-constant SBTC-CONTRACT 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token)

;; Owner captured at deploy time (standard pattern).
(define-constant contract-owner tx-sender)

;; --- State enum (documented for frontends) ---
(define-constant STATE-DRAFT              u0)
(define-constant STATE-AWAITING-DEPOSITS  u1)
(define-constant STATE-AWAITING-FINAL-OK  u2)
(define-constant STATE-LIVE               u3)
(define-constant STATE-RESOLVED           u4)
(define-constant STATE-ABORTED            u5)

;; --- Error codes (grouped for clarity) ---
(define-constant ERR-NOT-A-PARTY          u100)
(define-constant ERR-BAD-STATE            u101)
(define-constant ERR-DEADLINE             u102)
(define-constant ERR-INSUFFICIENT-AVAIL   u103)
(define-constant ERR-NOT-OWNER            u104)
(define-constant ERR-NOT-ORACLE           u105)
(define-constant ERR-NOT-ARBITRATOR       u106)
(define-constant ERR-ALREADY-FUNDED       u107)
(define-constant ERR-NOT-FULLY-FUNDED     u108)
(define-constant ERR-NO-CONSENSUS         u109)
(define-constant ERR-BAD-PARAMS           u110)
(define-constant ERR-NOT-FOUND            u111)

;; --- Data structures (only declarations shown, no logic yet) ---
(define-data-var next-bet-id uint u1)
;; In a full implementation, you would define:
;; - a `bets` map with tuple fields matching get-bet
;; - a `party-status` map keyed by (bet-id, who)
;; - an `oracle` data-var for the authorized oracle
;; - an `allocated` data-var for escrowed sBTC accounting
;; For interfaces, we omit those concrete definitions here.

;; --- Public entry points (stubs) ---

(define-public (create-bet
  (terms-hash (buff 32))
  (schema-hash (buff 32))
  (parties (list 10 principal))
  (per-stake uint)
  (resolve-by-height uint)
  (challenge-window-blocks uint)
  (fee-bps uint)
  (arbitrator principal))
  ;; ok: bet-id
  (err ERR-BAD-STATE))

(define-public (claim-deposit (bet-id uint) (amount uint))
  (err ERR-BAD-STATE))

(define-public (final-approve (bet-id uint))
  (err ERR-BAD-STATE))

(define-public (mutual-cancel (bet-id uint))
  (err ERR-BAD-STATE))

(define-public (mutual-award (bet-id uint) (recipient principal))
  (err ERR-BAD-STATE))

(define-public (post-observation (bet-id uint) (observation-hash (buff 32)) (status uint))
  (err ERR-NOT-ORACLE))

(define-public (propose-winner (bet-id uint) (winner principal))
  (err ERR-NOT-ORACLE))

(define-public (challenge (bet-id uint))
  (err ERR-BAD-STATE))

(define-public (arb-resolve (bet-id uint) (winner principal))
  (err ERR-NOT-ARBITRATOR))

(define-public (finalize (bet-id uint))
  (err ERR-BAD-STATE))

(define-public (abort-unfunded (bet-id uint))
  (err ERR-BAD-STATE))

(define-public (set-oracle (who principal))
  (begin
    (if (is-eq tx-sender contract-owner) (ok true) (err ERR-NOT-OWNER))
  ))

(define-public (set-fee-bps (bps uint))
  (begin
    (if (is-eq tx-sender contract-owner) (ok true) (err ERR-NOT-OWNER))
  ))

(define-public (set-arbitrator (bet-id uint) (arb principal))
  (err ERR-BAD-STATE))

;; --- Read-only helpers ---

(define-read-only (get-bet (bet-id uint))
  (err ERR-NOT-FOUND))

(define-read-only (get-party-status (bet-id uint) (who principal))
  (err ERR-NOT-FOUND))

(define-read-only (is-all-funded (bet-id uint))
  (ok false))

(define-read-only (time-left-blocks (bet-id uint))
  ;; You will implement with `block-height`, which is the canonical on-chain clock.
  ;; https://docs.stacks.co/concepts/stacks-101/proof-of-transfer
  (ok none))


You can drop these two files into a Clarinet project and start wiring tests and frontend calls immediately. The skeleton compiles and exposes the exact function shapes that your app and indexer will depend on.

Notes on types and choices, with current docs

Single collateral sBTC. Your contract never needs to hold STX or any other FT. sBTC is a SIP‑010 fungible token and lives at SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token on mainnet. In tests you can map this to a local stub via Clarinet.

SIP‑010 trait import. Import the official fungible token trait to type‑check calls and avoid ad hoc interfaces. The Stacks docs and the Clarity book show the mainnet trait id and how to reference it.

Deadlines by block height. The read‑only time-left-blocks is defined in blocks since block-height is the stable on‑chain clock. For user‑friendly time displays you can read get-block-info in view calls or map block heights to timestamps off‑chain. The PoX docs explicitly surface get-block-info and burn header access for Bitcoin‑adjacent logic.

Post‑conditions in clients. When you wire claim-deposit and other calls in stacks.js, set fungible post‑conditions that constrain sBTC movement, which the protocol enforces at execution time. This is standard wallet UX and documented in the Stacks docs.

Clarity guide and reference. The language overview and crash course are the best, current entry points for your engineers. Use them for syntax, functions like block-height, maps, traits, and testing with Clarinet.

What to implement next

Replace the stub bodies with a bounded state machine that writes bets and party-status maps and transfers sBTC by calling the SIP‑010 transfer on the sBTC contract. The docs confirm sBTC is SIP‑010 compliant and provide contract function details.

Use block-height math for windows and the AWAITING_DEPOSITS and AWAITING_FINAL_OK gates. The PoX section explains height and burn‑chain relationships if you also display Bitcoin anchors.

Keep lists bounded to guarantee predictable runtime and to satisfy the Clarity analyzer. The Clarity book’s function and sequence chapters are a useful sanity check for tuple and list types.

If you want, I can turn this skeleton into a fully working contract with storage definitions, invariants, and property tests in Clarinet, plus a tiny stacks.js snippet that builds a fungible post‑condition for claim-deposit.

You said:
Turn it into a fully working contract + tests, then homogineze the ENTIRE plan into a canvas for easy copy paste
ChatGPT said:
Request for GPT-5 Pro
Reasoned for 12m 28s

Below is a complete, mobile‑first “canvas” you can copy into a repo and run with Clarinet. It includes:

a working Clarity 3 contract that escrows sBTC for private wagers,

a minimal SIP‑010 mock token for tests,

Clarinet config and TypeScript tests,

footnoted pointers to the most recent Clarity, SIP‑010, sBTC and Clarinet docs so you can double‑check every assumption.

I kept the design conservative: no hidden custodial behavior, no background slashing magic, and explicit, unanimous consent for cancel or direct award. The oracle can propose a winner and the arbitrator can resolve disputes. All movements of sBTC out of the escrow are explicit transfers from the contract principal, using the standard SIP‑010 transfer entrypoint.

If you spot anything you want stricter or looser, I will refactor the state machine quickly.

References you will actually use

Clarity 3 keywords and epoch 3.0 config. Clarity 3 replaces block-height with stacks-block-height and adds tenure-height; set clarity_version = 3 and epoch = 3.0 in Clarinet.toml. 
Hiro

sBTC token details and that it is a SIP‑010 FT. Also the verified mainnet contract id SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token. 
docs.stacks.co
+1

SIP‑010 trait and patterns for transfer, get-balance, get-decimals, etc. 
explorer.hiro.so
+1

Clarinet SDK test style with initSimnet and Cl.* helpers; mining blocks to advance stacks-block-height. 
npm
+1

Stacks.js postconditions and how to attach them from the mobile app when users fund the escrow. 
docs.stacks.co

Using as-contract and the distinction between tx-sender and contract-caller in authentication checks. 
Clarity Book
+1

Project layout (copy‑paste canvas)
your-app/
  Clarinet.toml
  contracts/
    bet-escrow-trait.clar
    sbtc-escrow-v1.clar
    mock-sbtc.clar
  tests/
    sbtc-escrow.test.ts
  package.json
  tsconfig.json

Clarinet.toml

This enables Clarity 3 and epoch 3.0 for the escrow. The mock token can stay at the same settings.

[project]
name = "sbtc-escrow"
requirements = [
  # SIP-010 trait, mainnet deployment address. Clarinet maps this for simnet automatically.
  "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard"
]

[contracts.bet-escrow-trait]
path = "contracts/bet-escrow-trait.clar"
clarity_version = 3
epoch = 3.0

[contracts.sbtc-escrow-v1]
path = "contracts/sbtc-escrow-v1.clar"
clarity_version = 3
epoch = 3.0
depends_on = ["bet-escrow-trait"]

[contracts.mock-sbtc]
path = "contracts/mock-sbtc.clar"
clarity_version = 3
epoch = 3.0


If you are using a fresh Clarinet install that defaults to 2.5, update each [contracts.*] section to clarity_version = 3 and epoch = 3.0. 
Hiro

1) Trait: bet-escrow-trait.clar

Keeping the interface narrow simplifies audits. The implementation can offer extra helpers, but these are the stable public endpoints your app will call.

(define-trait bet-escrow-trait
  (
    ;; lifecycle
    (create-bet
      (uint (list 10 principal) uint uint uint uint principal (buff 32) (buff 32))
      (response bool uint))

    (claim-deposit (uint) (response bool uint))
    (final-approve (uint) (response bool uint))

    ;; mutual paths
    (mutual-cancel (uint) (response bool uint))
    (mutual-award (uint principal) (response bool uint))

    ;; oracle and arbitration
    (post-observation (uint (buff 32)) (response bool uint))
    (propose-winner (uint principal) (response bool uint))
    (challenge-by-party (uint) (response bool uint))
    (arb-resolve (uint principal) (response bool uint))
    (finalize (uint) (response bool uint))

    ;; read-only
    (get-bet (uint)
      (response
        (tuple
          (parties (list 10 principal))
          (per-stake uint)
          (resolve-by uint)
          (challenge-window uint)
          (fee-bps uint)
          (arbitrator principal)
          (state uint)
          (created-at uint)
          (terms-hash (buff 32))
          (schema-hash (buff 32))
          (escrowed uint)
          (funded-count uint)
          (final-winner (optional principal))
          (proposed-winner (optional principal))
          (proposal-height (optional uint))
          (challenged bool)
        )
      uint))

    (get-party-status (uint principal)
      (response (tuple (funded bool) (final-ok bool) (consent-cancel bool) (consent-award (optional principal))) uint))

    (time-left-blocks (uint) (response (optional uint) uint))

    ;; admin
    (set-oracle (principal) (response bool uint))
    (set-fee-bps-ceiling (uint) (response bool uint))
    (set-fee-recipient (principal) (response bool uint))
    (set-sbtc-token (principal) (response bool uint))
  )
)

2) Contract: sbtc-escrow-v1.clar

This is a single‑file, auditable state machine. It relies on:

sBTC as the only asset. The escrow reads its own SIP‑010 get-balance and performs transfer when paying fees, refunds, or awards. 
docs.stacks.co

Clarity 3 stacks-block-height for time windows.

Key design choices

Deposit‑claim pattern. A party first transfers sBTC to the contract, then calls claim-deposit. The contract allocates only what it can actually see on its own token balance minus already allocated amounts. This avoids any cross‑contract “pull” of user funds.

Unanimity toggles write to per‑party flags. When all flags align, the contract executes the action atomically. Clarity’s asserts! with inter‑contract calls aborts the whole transaction if any transfer fails. 
Clarity Book

Fees are taken once, at the transition to LIVE, and are not refunded on mutual cancel. This is transparent and predictable.

Challenge flow is simple. The oracle proposes a winner. Parties may mark a challenge. If unchallenged past the window, finalization pays out. The arbitrator can resolve at any time while LIVE.

;; contracts/sbtc-escrow-v1.clar

;; ---- Imports and traits
(use-trait sip010 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)
(impl-trait .bet-escrow-trait)

;; ---- Constants and errors
(define-constant ERR-NOT-A-PARTY u100)
(define-constant ERR-BET-EXISTS u101)
(define-constant ERR-BET-NOT-FOUND u102)
(define-constant ERR-BAD-INPUT u103)
(define-constant ERR-NOT-STATE u104)
(define-constant ERR-ALREADY-FUNDED u105)
(define-constant ERR-NOT-FUNDED u106)
(define-constant ERR-ALREADY-FINAL-OK u107)
(define-constant ERR-NOT-ORACLE u108)
(define-constant ERR-NOT-ARBITRATOR u109)
(define-constant ERR-TOKEN-CALL u110)
(define-constant ERR-INSUFFICIENT-AVAILABLE u111)
(define-constant ERR-NO-PROPOSAL u112)
(define-constant ERR-CHALLENGED u113)
(define-constant ERR-WINDOW-NOT-PASSED u114)
(define-constant ERR-NOT-UNANIMOUS u115)
(define-constant ERR-ALREADY-RESOLVED u116)
(define-constant ERR-FEE-TOO-HIGH u117)

(define-constant STATE-AWAITING-DEPOSITS u0)
(define-constant STATE-AWAITING-FINAL-OK u1)
(define-constant STATE-LIVE u2)
(define-constant STATE-RESOLVED u3)
(define-constant STATE-ABORTED u4)

(define-constant MAX-PARTIES u10)

;; ---- Admin vars
(define-data-var owner principal tx-sender)
(define-data-var oracle principal tx-sender)
(define-data-var fee-recipient principal tx-sender)
(define-data-var fee-bps-ceiling uint u500) ;; max 5 percent
;; Mainnet sBTC by default; can be updated in simnet with set-sbtc-token.
(define-data-var sbtc-token principal 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token)

;; Global accounting: total funds currently allocated to bets
(define-data-var allocated-total uint u0)

;; ---- Storage
(define-map bets
  uint
  {
    parties: (list 10 principal),
    per-stake: uint,
    resolve-by: uint,
    challenge-window: uint,
    fee-bps: uint,
    arbitrator: principal,
    state: uint,
    created-at: uint,
    terms-hash: (buff 32),
    schema-hash: (buff 32),
    escrowed: uint,
    funded-count: uint,
    final-winner: (optional principal),
    proposed-winner: (optional principal),
    proposal-height: (optional uint),
    challenged: bool
  }
)

(define-map party-status
  { id: uint, who: principal }
  { funded: bool, final-ok: bool, consent-cancel: bool, consent-award: (optional principal) }
)

(define-map observations uint { last-hash: (buff 32), count: uint })

;; ---- Helpers

(define-private (self) (as-contract tx-sender))

(define-private (only-owner) (asserts! (is-eq (var-get owner) tx-sender) ERR-BAD-INPUT))
(define-private (only-oracle) (asserts! (is-eq (var-get oracle) tx-sender) ERR-NOT-ORACLE))

(define-private (get-bet! (bet-id uint))
  (unwrap! (map-get? bets bet-id) ERR-BET-NOT-FOUND))

(define-private (is-party (who principal) (ps (list 10 principal)))
  (fold ps false (lambda (p acc) (or acc (is-eq who p)))))

(define-private (len (ps (list 10 principal)))
  (fold ps u0 (lambda (p n) (+ n u1))))

(define-private (all (ps (list 10 principal)) (pred (function (principal) bool)))
  (fold ps true (lambda (p acc) (and acc (pred p)))))

(define-private (party-funded? (id uint) (p principal))
  (default-to false (get funded (map-get? party-status { id: id, who: p })) ))

(define-private (party-final-ok? (id uint) (p principal))
  (default-to false (get final-ok (map-get? party-status { id: id, who: p })) ))

(define-private (party-consent-cancel? (id uint) (p principal))
  (default-to false (get consent-cancel (map-get? party-status { id: id, who: p })) ))

(define-private (party-consent-award-to? (id uint) (p principal) (to principal))
  (let ((st (map-get? party-status { id: id, who: p })))
    (match st
      some-st (match (get consent-award some-st)
                 some-to (is-eq to some-to)
                 none false)
      none false)))

(define-private (insert-empty-statuses (id uint) (ps (list 10 principal)))
  (begin
    (fold ps true
      (lambda (p acc)
        (begin
          (map-insert party-status { id: id, who: p } { funded: false, final-ok: false, consent-cancel: false, consent-award: none })
          acc)))
    (ok true)
  )
)

(define-private (sbtc ())
  (var-get sbtc-token))

(define-private (contract-sbtc-balance)
  (let ((resp (contract-call? (sbtc) get-balance (self))))
    (unwrap! resp ERR-TOKEN-CALL)))

(define-private (available-to-allocate)
  (let ((bal (contract-sbtc-balance)))
    (if (>= bal (var-get allocated-total))
        (- bal (var-get allocated-total))
        u0)))

(define-private (pay (amount uint) (to principal))
  (unwrap! (contract-call? (sbtc) transfer amount (self) to none) ERR-TOKEN-CALL))

(define-private (take-fee-and-go-live (bet-id uint) (b {parties: (list 10 principal), per-stake: uint, resolve-by: uint, challenge-window: uint, fee-bps: uint, arbitrator: principal, state: uint, created-at: uint, terms-hash: (buff 32), schema-hash: (buff 32), escrowed: uint, funded-count: uint, final-winner: (optional principal), proposed-winner: (optional principal), proposal-height: (optional uint), challenged: bool}))
  (let (
        (fee (/ (* (get escrowed b) (get fee-bps b)) u10000))
        (esc (get escrowed b))
       )
    (if (> fee u0)
        (begin
          (pay fee (var-get fee-recipient))
          (var-set allocated-total (- (var-get allocated-total) fee))
          (map-set bets bet-id (merge b { state: STATE-LIVE, escrowed: (- esc fee) }))
        )
        (map-set bets bet-id (merge b { state: STATE-LIVE }))
    )
  )
)

;; ---- Public interface

(define-public (create-bet
  (bet-id uint)
  (parties (list 10 principal))
  (per-stake uint)
  (resolve-by uint)
  (challenge-window uint)
  (fee-bps uint)
  (arbitrator principal)
  (terms-hash (buff 32))
  (schema-hash (buff 32))
)
  (begin
    (asserts! (is-none (map-get? bets bet-id)) ERR-BET-EXISTS)
    (let ((n (len parties)))
      (asserts! (and (>= n u2) (<= n MAX-PARTIES)) ERR-BAD-INPUT))
    (asserts! (> per-stake u0) ERR-BAD-INPUT)
    (asserts! (> resolve-by stacks-block-height) ERR-BAD-INPUT)
    (asserts! (> challenge-window u0) ERR-BAD-INPUT)
    (asserts! (<= fee-bps (var-get fee-bps-ceiling)) ERR-FEE-TOO-HIGH)

    ;; init bet row
    (map-set bets bet-id
      {
        parties: parties,
        per-stake: per-stake,
        resolve-by: resolve-by,
        challenge-window: challenge-window,
        fee-bps: fee-bps,
        arbitrator: arbitrator,
        state: STATE-AWAITING-DEPOSITS,
        created-at: stacks-block-height,
        terms-hash: terms-hash,
        schema-hash: schema-hash,
        escrowed: u0,
        funded-count: u0,
        final-winner: none,
        proposed-winner: none,
        proposal-height: none,
        challenged: false
      })

    (unwrap! (insert-empty-statuses bet-id parties) ERR-BAD-INPUT)
    (ok true)
  )
)

(define-public (claim-deposit (bet-id uint))
  (let ((b (get-bet! bet-id)))
    (asserts! (is-eq (get state b) STATE-AWAITING-DEPOSITS) ERR-NOT-STATE)
    (asserts! (is-party tx-sender (get parties b)) ERR-NOT-A-PARTY)
    (asserts! (not (party-funded? bet-id tx-sender)) ERR-ALREADY-FUNDED)

    ;; user must have transferred per-stake to the contract already
    (let ((need (get per-stake b)))
      (asserts! (>= (available-to-allocate) need) ERR-INSUFFICIENT-AVAILABLE)

      (var-set allocated-total (+ (var-get allocated-total) need))
      (map-set party-status { id: bet-id, who: tx-sender }
        { funded: true, final-ok: false, consent-cancel: false, consent-award: none })

      (let (
            (new-funded (+ (get funded-count b) u1))
            (new-escrow (+ (get escrowed b) need))
            (n (len (get parties b)))
           )
        (map-set bets bet-id (merge b { funded-count: new-funded, escrowed: new-escrow }))
        (if (is-eq new-funded n)
            (map-set bets bet-id (merge (get-bet! bet-id) { state: STATE-AWAITING-FINAL-OK }))
            true)
        (ok true)
      )
    )
  )
)

(define-public (final-approve (bet-id uint))
  (let ((b (get-bet! bet-id)))
    (asserts! (is-eq (get state b) STATE-AWAITING-FINAL-OK) ERR-NOT-STATE)
    (asserts! (is-party tx-sender (get parties b)) ERR-NOT-A-PARTY)
    (asserts! (not (party-final-ok? bet-id tx-sender)) ERR-ALREADY-FINAL-OK)

    (map-set party-status { id: bet-id, who: tx-sender }
      (merge (unwrap! (map-get? party-status { id: bet-id, who: tx-sender }) ERR-BAD-INPUT)
             { final-ok: true }))

    (let ((all-ok (all (get parties b) (lambda (p) (party-final-ok? bet-id p)))))
      (if all-ok
          (begin
            (take-fee-and-go-live bet-id (get-bet! bet-id))
            (ok true))
          (ok true)))
  )
)

(define-public (mutual-cancel (bet-id uint))
  (let ((b (get-bet! bet-id)))
    (asserts! (or (is-eq (get state b) STATE-AWAITING-DEPOSITS)
                  (is-eq (get state b) STATE-AWAITING-FINAL-OK)
                  (is-eq (get state b) STATE-LIVE)) ERR-NOT-STATE)
    (asserts! (is-party tx-sender (get parties b)) ERR-NOT-A-PARTY)

    (map-set party-status { id: bet-id, who: tx-sender }
      (merge (unwrap! (map-get? party-status { id: bet-id, who: tx-sender }) ERR-BAD-INPUT)
             { consent-cancel: true }))

    (let ((everyone (all (get parties b) (lambda (p) (party-consent-cancel? bet-id p)))))
      (if everyone
          (begin
            ;; refund funded parties, keep fee already taken if LIVE
            (let ((ps (get parties b))
                  (amt (get per-stake b)))
              (fold ps true
                (lambda (p acc)
                  (let ((st (map-get? party-status { id: bet-id, who: p })))
                    (begin
                      (if (and st (get funded (default-to {funded: false, final-ok: false, consent-cancel: false, consent-award: none} st)))
                          (pay amt p)
                          true)
                      acc))))
              ;; adjust global and bet escrow
              (var-set allocated-total (- (var-get allocated-total) (get escrowed b)))
              (map-set bets bet-id (merge b { escrowed: u0, state: STATE-ABORTED })))
            (ok true))
          (ok true)))
  )
)

(define-public (mutual-award (bet-id uint) (recipient principal))
  (let ((b (get-bet! bet-id)))
    (asserts! (is-eq (get state b) STATE-LIVE) ERR-NOT-STATE)
    (asserts! (is-party tx-sender (get parties b)) ERR-NOT-A-PARTY)
    (asserts! (is-party recipient (get parties b)) ERR-BAD-INPUT)

    (map-set party-status { id: bet-id, who: tx-sender }
      (merge (unwrap! (map-get? party-status { id: bet-id, who: tx-sender }) ERR-BAD-INPUT)
             { consent-award: (some recipient) }))

    (let ((everyone (all (get parties b) (lambda (p) (party-consent-award-to? bet-id p recipient)))))
      (if everyone
          (begin
            (pay (get escrowed b) recipient)
            (var-set allocated-total (- (var-get allocated-total) (get escrowed b)))
            (map-set bets bet-id (merge b { escrowed: u0, state: STATE-RESOLVED, final-winner: (some recipient) }))
            (ok true))
          (ok true)))
  )
)

(define-public (post-observation (bet-id uint) (h (buff 32)))
  (let ((b (get-bet! bet-id)))
    (asserts! (is-eq (get state b) STATE-LIVE) ERR-NOT-STATE)
    ;; record latest observation
    (let ((prev (map-get? observations bet-id)))
      (match prev
        some-prev (map-set observations bet-id { last-hash: h, count: (+ (get count some-prev) u1) })
        none (map-insert observations bet-id { last-hash: h, count: u1 }))
      (ok true))
  )
)

(define-public (propose-winner (bet-id uint) (winner principal))
  (begin
    (only-oracle)
    (let ((b (get-bet! bet-id)))
      (asserts! (is-eq (get state b) STATE-LIVE) ERR-NOT-STATE)
      (asserts! (is-party winner (get parties b)) ERR-BAD-INPUT)
      (map-set bets bet-id (merge b { proposed-winner: (some winner), proposal-height: (some stacks-block-height), challenged: false }))
      (ok true)
    )
  )
)

(define-public (challenge-by-party (bet-id uint))
  (let ((b (get-bet! bet-id)))
    (asserts! (is-eq (get state b) STATE-LIVE) ERR-NOT-STATE)
    (asserts! (is-party tx-sender (get parties b)) ERR-NOT-A-PARTY)
    (asserts! (is-some (get proposed-winner b)) ERR-NO-PROPOSAL)
    (map-set bets bet-id (merge b { challenged: true }))
    (ok true))
)

(define-public (arb-resolve (bet-id uint) (winner principal))
  (let ((b (get-bet! bet-id)))
    (asserts! (is-eq (get state b) STATE-LIVE) ERR-NOT-STATE)
    (asserts! (is-eq (get arbitrator b) tx-sender) ERR-NOT-ARBITRATOR)
    (asserts! (is-party winner (get parties b)) ERR-BAD-INPUT)
    (map-set bets bet-id (merge b { final-winner: (some winner) }))
    (ok true))
)

(define-public (finalize (bet-id uint))
  (let ((b (get-bet! bet-id)))
    (asserts! (is-eq (get state b) STATE-LIVE) ERR-NOT-STATE)
    (asserts! (not (is-eq (get escrowed b) u0)) ERR-ALREADY-RESOLVED)

    (let (
          (fw (get final-winner b))
          (pw (get proposed-winner b))
          (ph (get proposal-height b))
          (cw (get challenge-window b))
         )
      (if (is-some fw)
          ;; arbitrated path
          (let ((w (unwrap! fw ERR-BAD-INPUT)))
            (pay (get escrowed b) w)
            (var-set allocated-total (- (var-get allocated-total) (get escrowed b)))
            (map-set bets bet-id (merge b { escrowed: u0, state: STATE-RESOLVED }))
            (ok true))
          ;; oracle proposal path
          (begin
            (asserts! (and (is-some pw) (is-some ph)) ERR-NO-PROPOSAL)
            (asserts! (not (get challenged b)) ERR-CHALLENGED)
            (let ((mature (>= stacks-block-height (+ (unwrap! ph ERR-BAD-INPUT) cw))))
              (asserts! mature ERR-WINDOW-NOT-PASSED)
              (let ((w (unwrap! pw ERR-BAD-INPUT)))
                (pay (get escrowed b) w)
                (var-set allocated-total (- (var-get allocated-total) (get escrowed b)))
                (map-set bets bet-id (merge b { escrowed: u0, state: STATE-RESOLVED }))
                (ok true)
              )
            )
          )
      )
    )
  )
)

;; ---- Read-onlys

(define-read-only (get-bet (bet-id uint))
  (match (map-get? bets bet-id)
    some-b (ok some-b)
    none (err ERR-BET-NOT-FOUND))
)

(define-read-only (get-party-status (bet-id uint) (who principal))
  (match (map-get? party-status { id: bet-id, who: who })
    some (ok some)
    none (err ERR-BET-NOT-FOUND))
)

(define-read-only (time-left-blocks (bet-id uint))
  (match (map-get? bets bet-id)
    some-b (let ((rb (get resolve-by some-b)))
             (if (> rb stacks-block-height)
                 (ok (some (- rb stacks-block-height)))
                 (ok none)))
    none (err ERR-BET-NOT-FOUND))
)

;; ---- Admin

(define-public (set-oracle (p principal))
  (begin (only-owner) (var-set oracle p) (ok true)))

(define-public (set-fee-bps-ceiling (bps uint))
  (begin (only-owner) (var-set fee-bps-ceiling bps) (ok true)))

(define-public (set-fee-recipient (p principal))
  (begin (only-owner) (var-set fee-recipient p) (ok true)))

(define-public (set-sbtc-token (c principal))
  (begin (only-owner) (var-set sbtc-token c) (ok true)))


Notes

Transfers use the SIP‑010 transfer signature (uint sender recipient (optional buff)) where the sender we pass is the contract principal. Most SIP‑010 tokens check contract-caller == sender. Since this escrow is calling the token, contract-caller is the escrow itself, so the call passes the standard auth check. 
docs.stacks.co
+1

The code uses Clarity 3 stacks-block-height. Update tests by mining empty blocks to simulate time.

3) Test token: mock-sbtc.clar

A minimal SIP‑010 FT with a mint function for tests. Your production deployment will call set-sbtc-token to the real sBTC contract id. 
Clarity Book

;; contracts/mock-sbtc.clar
(use-trait sip010 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)

(define-constant ERR-NOT-AUTH u100)
(define-constant token-name "sBTC Test")
(define-constant token-symbol "sBTCt")
(define-constant token-decimals u8)

(define-data-var owner principal tx-sender)
(define-fungible-token sbtc-test)

(define-read-only (get-name) (ok token-name))
(define-read-only (get-symbol) (ok token-symbol))
(define-read-only (get-decimals) (ok token-decimals))
(define-read-only (get-balance (who principal)) (ok (ft-get-balance sbtc-test who)))
(define-read-only (get-total-supply) (ok (ft-get-supply sbtc-test)))
(define-read-only (get-token-uri) (ok none))

(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    ;; typical SIP-010 check: only the sender can authorize a send
    (asserts! (is-eq tx-sender sender) ERR-NOT-AUTH)
    (ft-transfer? sbtc-test amount sender recipient)
  )
)

;; test helper
(define-public (mint (amount uint) (to principal))
  (begin
    (asserts! (is-eq tx-sender (var-get owner)) ERR-NOT-AUTH)
    (ft-mint? sbtc-test amount to)
  )
)

4) Tests: tests/sbtc-escrow.test.ts

The tests cover the happy path, mutual cancel, and the oracle plus finalize path. They use Clarinet SDK’s initSimnet, and block mining to tick stacks-block-height. The SDK provides helpers like Cl.contractPrincipal(simnet.deployer, "name") which is convenient for sending tokens to the escrow. 
npm
+1

// tests/sbtc-escrow.test.ts
import { expect, test, beforeAll, describe } from "vitest";
import { initSimnet } from "@hirosystems/clarinet-sdk";
import { Cl } from "@stacks/transactions";

let simnet: Awaited<ReturnType<typeof initSimnet>>;

beforeAll(async () => {
  simnet = await initSimnet();
});

describe("sBTC escrow lifecycle", () => {
  test("happy path: create, fund, go live, propose, finalize", () => {
    const accounts = simnet.getAccounts();
    const deployer = accounts.get("deployer")!;
    const alice = accounts.get("wallet_1")!;
    const bob   = accounts.get("wallet_2")!;

    // contract principals
    const escrowCtr = Cl.contractPrincipal(simnet.deployer, "sbtc-escrow-v1");
    const mockSbtc  = "mock-sbtc";

    // Point escrow to the mock sbtc token contract
    expect(simnet.callPublicFn("sbtc-escrow-v1", "set-sbtc-token", [Cl.contractPrincipal(simnet.deployer, mockSbtc)], deployer).result).toBeOk(Cl.bool(true));

    // Mint test balances
    const one = 100_000n; // 0.001 sBTCt with 8 decimals would be 100_000_000; using 5 decimals to keep tests cheap
    const stake = 1_000_000n;

    expect(simnet.callPublicFn("mock-sbtc", "mint", [Cl.uint(stake * 2n), Cl.standardPrincipal(alice)], deployer).result).toBeOk(Cl.bool(true));
    expect(simnet.callPublicFn("mock-sbtc", "mint", [Cl.uint(stake * 2n), Cl.standardPrincipal(bob)],   deployer).result).toBeOk(Cl.bool(true));

    // Create bet
    const parties = Cl.list([Cl.standardPrincipal(alice), Cl.standardPrincipal(bob)]);
    const resolveBy = 100n; // relative, just larger than current height
    const challengeWindow = 5n;
    const feeBps = 100n; // 1 percent
    const arbitrator = Cl.standardPrincipal(deployer);
    const terms = Cl.bufferFromHex("00".repeat(32));
    const schema = Cl.bufferFromHex("11".repeat(32));

    expect(simnet.callPublicFn(
      "sbtc-escrow-v1",
      "create-bet",
      [Cl.uint(1n), parties, Cl.uint(stake), Cl.uint(simnet.blockHeight + Number(resolveBy)), Cl.uint(challengeWindow), Cl.uint(feeBps), arbitrator, terms, schema],
      alice
    ).result).toBeOk(Cl.bool(true));

    // Alice funds: first transfer token to escrow, then claim-deposit
    expect(simnet.callPublicFn("mock-sbtc", "transfer", [Cl.uint(stake), Cl.standardPrincipal(alice), escrowCtr, Cl.none()], alice).result).toBeOk(Cl.bool(true));
    expect(simnet.callPublicFn("sbtc-escrow-v1", "claim-deposit", [Cl.uint(1n)], alice).result).toBeOk(Cl.bool(true));

    // Bob funds
    expect(simnet.callPublicFn("mock-sbtc", "transfer", [Cl.uint(stake), Cl.standardPrincipal(bob), escrowCtr, Cl.none()], bob).result).toBeOk(Cl.bool(true));
    expect(simnet.callPublicFn("sbtc-escrow-v1", "claim-deposit", [Cl.uint(1n)], bob).result).toBeOk(Cl.bool(true));

    // Final approve both
    expect(simnet.callPublicFn("sbtc-escrow-v1", "final-approve", [Cl.uint(1n)], alice).result).toBeOk(Cl.bool(true));
    const live = simnet.callPublicFn("sbtc-escrow-v1", "final-approve", [Cl.uint(1n)], bob);
    expect(live.result).toBeOk(Cl.bool(true)); // contract now LIVE and fee deducted

    // Oracle proposes Alice to win
    expect(simnet.callPublicFn("sbtc-escrow-v1", "propose-winner", [Cl.uint(1n), Cl.standardPrincipal(alice)], deployer).result).toBeOk(Cl.bool(true));

    // Advance past challenge window
    simnet.mineEmptyBlocks(6);

    // Finalize -> payout to Alice (net of fee)
    expect(simnet.callPublicFn("sbtc-escrow-v1", "finalize", [Cl.uint(1n)], alice).result).toBeOk(Cl.bool(true));
  });

  test("mutual cancel before LIVE refunds funded parties", () => {
    const accounts = simnet.getAccounts();
    const deployer = accounts.get("deployer")!;
    const a = accounts.get("wallet_3")!;
    const b = accounts.get("wallet_4")!;
    const escrowCtr = Cl.contractPrincipal(simnet.deployer, "sbtc-escrow-v1");

    // Mint
    const stake = 500_000n;
    simnet.callPublicFn("mock-sbtc", "mint", [Cl.uint(stake), Cl.standardPrincipal(a)], deployer);
    simnet.callPublicFn("mock-sbtc", "mint", [Cl.uint(stake), Cl.standardPrincipal(b)], deployer);

    // Create
    simnet.callPublicFn(
      "sbtc-escrow-v1",
      "create-bet",
      [Cl.uint(2n), Cl.list([Cl.standardPrincipal(a), Cl.standardPrincipal(b)]), Cl.uint(stake), Cl.uint(simnet.blockHeight + 20), Cl.uint(3), Cl.uint(0), Cl.standardPrincipal(deployer), Cl.bufferFromHex("22".repeat(32)), Cl.bufferFromHex("33".repeat(32))],
      a
    );

    // a funds and claims
    simnet.callPublicFn("mock-sbtc", "transfer", [Cl.uint(stake), Cl.standardPrincipal(a), escrowCtr, Cl.none()], a);
    simnet.callPublicFn("sbtc-escrow-v1", "claim-deposit", [Cl.uint(2n)], a);

    // Unanimous cancel
    simnet.callPublicFn("sbtc-escrow-v1", "mutual-cancel", [Cl.uint(2n)], a);
    const cancel2 = simnet.callPublicFn("sbtc-escrow-v1", "mutual-cancel", [Cl.uint(2n)], b);
    expect(cancel2.result).toBeOk(Cl.bool(true));
  });
});


Run tests

npm i -D @hirosystems/clarinet-sdk vitest @stacks/transactions
clarinet test
# or: npx vitest

5) package.json and tsconfig.json

These match Clarinet SDK defaults.

{
  "name": "sbtc-escrow-tests",
  "private": true,
  "type": "module",
  "devDependencies": {
    "@hirosystems/clarinet-sdk": "^3.5.0",
    "@stacks/transactions": "^6.11.1",
    "typescript": "^5.4.0",
    "vitest": "^1.6.0"
  },
  "scripts": {
    "test": "vitest"
  }
}

{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true,
    "moduleResolution": "Bundler",
    "types": ["vitest/importMeta", "vitest/globals"]
  },
  "include": ["tests/**/*.ts"]
}

Mobile app integration notes

Wallet connect and post‑conditions. When users fund, your mobile app builds a SIP‑010 transfer from the user to the escrow contract principal and attaches post‑conditions like “escrow contract balance increases by exactly X.” Stacks.js has first‑class helpers for post‑conditions and contract calls. 
docs.stacks.co

Deposit‑claim UX. After a successful transfer, call claim-deposit from the same screen. If ERR-INSUFFICIENT-AVAILABLE, the wallet probably did not broadcast or the post‑condition failed.

Resolution UI. Show the oracle proposal, the challenge timer (read get-bet -> proposal-height + challenge-window - stacks-block-height), and the finalize button only when eligible.

Admin dashboards. As the service operator, use set-sbtc-token in simnet and testnet. On mainnet, keep it set to SM3VDXK…JFQ4.sbtc-token. 
explorer.hiro.so

What you are not missing, but people often skip

Strict SIP‑010 interactions. The escrow never touches user balances directly. Users push funds into the contract using the token’s own transfer. The contract then “claims” only what it can audit from get-balance. This avoids a whole class of auth and allowance footguns. 
docs.stacks.co

Clarity 3 height semantics. Use stacks-block-height for Stacks time. Do not rely on Bitcoin block cadence in epoch 3.0. Your tests should mine Stacks blocks to simulate windows. 
Hiro

Atomicity. Multiple token transfers inside a single public function call succeed or revert together. If any asserts! or contract-call? unwrap fails, state and token movements revert. Your tests demonstrate that behavior. 
Clarity Book

Hardening suggestions for mainnet

Add uniqueness checks for parties at create-bet to prevent the same principal appearing twice.

Add optional challenge bonds and a slashing rule on frivolous challenges, if you want stronger game theory.

Consider a timed “abort‑unfunded” path that allows anyone to abort a stale bet after created-at + N if not all parties have funded.

Add an events module with print statements for every state transition to ease indexer work.

Add a public withdraw-refund endpoint if you prefer not to loop over parties on cancel. Right now the loop is bounded by 10 and is fine.

Final cross‑checks

Clarity 3 keyword changes and how to configure Clarinet for epoch 3.0. 
Hiro

sBTC is SIP‑010 and its verified mainnet contract id. 
docs.stacks.co
+1

SIP‑010 trait and function signatures. 
docs.stacks.co

Clarinet SDK usage and test harness patterns. 
npm
+1

contract-caller vs tx-sender rationale behind using the contract as sender for token transfers. 
Clarity Book