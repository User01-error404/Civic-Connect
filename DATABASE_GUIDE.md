# CivicConnect: Database Guide (Firebase Firestore)

## 1. The key design idea (from the research)
In Mira-Bhayandar, **a damaged road is not always MBMC's to fix.** Public reports show repairs split between MBMC's PWD, MMRDA (Metro Line 9 corridor, Dahisar Check Naka to Bhayandar), the State PWD (Ghodbunder Road) and NHAI. So every complaint stores a `roadOwnerId`, and complaints are also filed under one of MBMC's **6 official Ward Committees** (`wardId`). This is what makes the database "smart" instead of a plain list.

## 2. Collections

| Collection | Purpose | Key fields |
|---|---|---|
| `wards` (6) | MBMC Ward Committees 1-6 with real office addresses | `no`, `name`, `area`, `office`, `email`, `centroid`, `source` |
| `roadOwners` (4) | Who maintains a road | `name`, `type` (municipal / authority / state / national) |
| `categories` | Road damage + 6 subcategories (en/hi/mr) | `name{en,hi,mr}`, `subcategories[]`, `defaultSlaHours` |
| `complaints` | The main data | `ticketNo`, `subcategory`, `description`, `location{geo,address}`, `wardId`, `roadOwnerId`, `status`, `severity`, `priority`, `upvoteCount`, `createdAt` |
| `complaints/{id}/updates` | Status timeline (subcollection) | `fromStatus`, `toStatus`, `note`, `actorRole`, `visibility`, `createdAt` |
| `complaints/{id}/upvotes` | "Me too" votes, one doc per user | existence = vote |
| `campaigns` | Weekly Campaign section | `title{en,hi,mr}`, `type`, `wardIds[]`, `weekStart`, `status` |
| `users` | Created on sign-up | `displayName`, `preferredLang`, `role`, `fcmTokens[]` |
| `config` | `contacts` (MBMC numbers), `city` | verified from mbmc.gov.in |

**Status flow:** `submitted → acknowledged → assigned → in_progress → resolved` (and `rejected`, `duplicate`, `reopened`).

## 3. How data is sorted and queried (indexes in `firestore.indexes.json`)
- Citizen "My Complaints": `reporterId` + newest first
- Ward officer inbox: `wardId` + `status` + newest first
- "Which agency owes us a repair?": `roadOwnerId` + `status` + newest first
- Most-supported open issues: `status` + `upvoteCount` descending
- This week's campaigns: `status == published` + `weekStart` descending

## 4. Set it up (about 10 minutes)
1. Go to console.firebase.google.com and create a **new project** (for example `civicconnect-mbmc`). Do **not** reuse `shor-meter`.
2. **Build > Firestore Database > Create database > Production mode > location `asia-south1` (Mumbai).**
3. **Build > Authentication > Get started**, then enable *Email/Password* and *Google*.
4. **Project settings > Your apps > Web (`</>`)**: register the app and copy the config. Send me that config; it is not a secret.
5. **Project settings > Service accounts > Generate new private key.** Keep the file on your computer only. **Never send it to me, never commit it to Git.**
6. In this folder run:
   ```
   npm init -y && npm i firebase-admin
   set FIREBASE_PROJECT_ID=civicconnect-mbmc
   set GOOGLE_APPLICATION_CREDENTIALS=serviceAccount.json
   node seed.mjs
   ```
   (On Mac/Linux use `export` instead of `set`.)
7. Deploy rules and indexes:
   ```
   npm i -g firebase-tools
   firebase login
   firebase use civicconnect-mbmc
   firebase deploy --only firestore:rules,firestore:indexes
   ```

## 5. Demo script for the invigilator (3 minutes)
1. Open **Firestore Database > Data** and show the 6 collections: `wards`, `roadOwners`, `categories`, `complaints`, `campaigns`, `config`.
2. Open `wards/ward04` and show the real MBMC office address and email, with the `source` field pointing to mbmc.gov.in.
3. Open a complaint, show `location.geo`, `wardId`, `roadOwnerId`, then its **`updates` subcollection** (the timeline).
4. Open the **Rules** tab and explain: citizens can only create `submitted` complaints, and only staff can change status.
5. Put the app and the console side by side, submit a complaint, and **refresh the console to show the new document appear.**
6. Mention the design choice from section 1 (road ownership) as your "smart" feature.

## 6. Honest notes
- Seed complaints are **sample data written by us**, inspired by public reports. They are flagged `isSample: true`. Coordinates are **approximate** (`approx: true`); the ward centroids are approximate too.
- Ward 3 and Ward 5 emails are `null` because I could not confirm them on the MBMC site. Ward 5's office comes from a 2022 MBMC notice. Which neighbourhood falls under which ward committee is **indicative**, not an official boundary. Ask MBMC for the ward boundary map.
- Photos: Firestore documents are limited to 1 MiB. For a free demo, store a small compressed photo (about 40-60 KB) in a separate `complaintPhotos` document. For real use, switch to Firebase Storage (needs the pay-as-you-go plan; verify current terms in the console).
- Phone-OTP login is left out of the demo because SMS has costs and limits. Add it later.

## 7. Sources (accessed 18 Nov 2026)
- mbmc.gov.in: Ward Offices, Ward Committee 1, 2, 4, 6 pages; Contact Us (head office, phones, toll-free); PWD department page
- MBMC notice of 8 June 2022 listing Ward Committee office locations (mbmc.gov.in/assets/uploads/file-3612.pdf)
- Free Press Journal reports on MBMC pothole repair, Metro-related road damage, Ghodbunder Road, and mastic asphalt (2022 to 2026)
