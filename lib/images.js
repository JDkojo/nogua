/**
 * Centralized Unsplash image library for the Real Estate Portal.
 *
 * All images use Unsplash's resizing API:
 *   ?w=   → pixel width
 *   &q=   → quality (1-100)
 *   &auto=format → serve WebP/AVIF where supported
 *   &fit=crop → crop to exact dimensions
 *
 * Usage:
 *   import { IMAGES } from "@/lib/images";
 *   <img src={IMAGES.hero.main} ... />
 */

const BASE = "https://images.unsplash.com";

// ─── Hero / Banner ────────────────────────────────────────────────────────────
// Large landscape images for full-width hero sections
export const HERO = {
  main:       `${BASE}/photo-1600596542815-ffad4c1539a9?w=1600&q=80&auto=format&fit=crop`, // luxury house exterior
  luxury:     `${BASE}/photo-1613977257363-707ba9348227?w=1600&q=80&auto=format&fit=crop`, // modern luxury villa
  residential:`${BASE}/photo-1570129477492-45c003edd2be?w=1600&q=80&auto=format&fit=crop`, // suburban house
  commercial: `${BASE}/photo-1486325212027-8081e485255e?w=1600&q=80&auto=format&fit=crop`, // modern office building
  newLaunches:`${BASE}/photo-1545324418-cc1a3fa10c00?w=1600&q=80&auto=format&fit=crop`, // construction/new development
  investment: `${BASE}/photo-1560518883-ce09059eeffa?w=1600&q=80&auto=format&fit=crop`, // city skyline investment
  mapView:    `${BASE}/photo-1524813686514-a57563d77965?w=1600&q=80&auto=format&fit=crop`, // aerial city view
  bookVisit:  `${BASE}/photo-1582407947304-fd86f28320be?w=1600&q=80&auto=format&fit=crop`, // house front door
};

// ─── Property Listings ────────────────────────────────────────────────────────
// Portrait-oriented (5:6) property card images
export const PROPERTIES = {
  // Residential
  villa:        `${BASE}/photo-1600585154340-be6161a56a0c?w=800&q=75&auto=format&fit=crop`, // beachfront villa
  apartment:    `${BASE}/photo-1522708323590-d24dbb6b0267?w=800&q=75&auto=format&fit=crop`, // city apartment interior
  house:        `${BASE}/photo-1568605114967-8130f3a36994?w=800&q=75&auto=format&fit=crop`, // suburban house
  penthouse:    `${BASE}/photo-1512917774080-9991f1c4c750?w=800&q=75&auto=format&fit=crop`, // luxury penthouse
  cottage:      `${BASE}/photo-1449844908441-8829872d2607?w=800&q=75&auto=format&fit=crop`, // lakefront cottage
  townhouse:    `${BASE}/photo-1605276374104-dee2a0ed3cd6?w=800&q=75&auto=format&fit=crop`, // townhouse
  loft:         `${BASE}/photo-1493809842364-78817add7ffb?w=800&q=75&auto=format&fit=crop`, // downtown loft interior
  estate:       `${BASE}/photo-1600047509807-ba8f99d2cdde?w=800&q=75&auto=format&fit=crop`, // riverside estate
  // Commercial
  office:       `${BASE}/photo-1497366216548-37526070297c?w=800&q=75&auto=format&fit=crop`, // modern office space
  retail:       `${BASE}/photo-1441986300917-64674bd600d8?w=800&q=75&auto=format&fit=crop`, // retail storefront
  warehouse:    `${BASE}/photo-1586528116311-ad8dd3c8310d?w=800&q=75&auto=format&fit=crop`, // warehouse/industrial
  coworking:    `${BASE}/photo-1497366754035-f200968a6e72?w=800&q=75&auto=format&fit=crop`, // coworking space
  // Luxury
  luxuryVilla:  `${BASE}/photo-1600607687939-ce8a6c25118c?w=800&q=75&auto=format&fit=crop`, // luxury villa pool
  luxuryInt:    `${BASE}/photo-1600210492493-0946911123ea?w=800&q=75&auto=format&fit=crop`, // luxury interior
  penthouseExt: `${BASE}/photo-1600566753086-00f18fb6b3ea?w=800&q=75&auto=format&fit=crop`, // penthouse exterior
  // Land / New Launches
  land:         `${BASE}/photo-1500382017468-9049fed747ef?w=800&q=75&auto=format&fit=crop`, // open land
  newBuild:     `${BASE}/photo-1558618666-fcd25c85cd64?w=800&q=75&auto=format&fit=crop`, // new construction
};

// ─── Gallery (square) ─────────────────────────────────────────────────────────
export const GALLERY = [
  `${BASE}/photo-1600585154526-990dced4db0d?w=600&q=75&auto=format&fit=crop`, // living room
  `${BASE}/photo-1556909114-f6e7ad7d3136?w=600&q=75&auto=format&fit=crop`, // kitchen
  `${BASE}/photo-1600566753190-17f0baa2a6c3?w=600&q=75&auto=format&fit=crop`, // bedroom
  `${BASE}/photo-1552321554-5fefe8c9ef14?w=600&q=75&auto=format&fit=crop`, // bathroom
  `${BASE}/photo-1600047509358-9dc75507daeb?w=600&q=75&auto=format&fit=crop`, // pool/garden
  `${BASE}/photo-1600573472591-ee6b68d14c68?w=600&q=75&auto=format&fit=crop`, // dining area
];

// ─── About / Team ─────────────────────────────────────────────────────────────
export const TEAM = {
  office:   `${BASE}/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop`, // modern office
  meeting:  `${BASE}/photo-1600880292203-757bb62b4baf?w=1200&q=80&auto=format&fit=crop`, // team meeting
  exterior: `${BASE}/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop`, // office building exterior
  // Agent avatars (diverse, professional headshots)
  agent1:   `${BASE}/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop&crop=face`, // male agent
  agent2:   `${BASE}/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop&crop=face`, // female agent
  agent3:   `${BASE}/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop&crop=face`, // male agent 2
  agent4:   `${BASE}/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop&crop=face`, // female agent 2
  agent5:   `${BASE}/photo-1472099645785-5658abf4ff4e?w=200&q=80&auto=format&fit=crop&crop=face`, // male agent 3
  agent6:   `${BASE}/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop&crop=face`, // female agent 3
};

// ─── Testimonial Avatars ──────────────────────────────────────────────────────
export const AVATARS = [
  `${BASE}/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop&crop=face`,
  `${BASE}/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop&crop=face`,
  `${BASE}/photo-1500648767791-00dcc994a43e?w=100&q=80&auto=format&fit=crop&crop=face`,
  `${BASE}/photo-1438761681033-6461ffad8d80?w=100&q=80&auto=format&fit=crop&crop=face`,
  `${BASE}/photo-1472099645785-5658abf4ff4e?w=100&q=80&auto=format&fit=crop&crop=face`,
  `${BASE}/photo-1544005313-94ddf0286df2?w=100&q=80&auto=format&fit=crop&crop=face`,
];

// ─── Contact / Office ─────────────────────────────────────────────────────────
export const CONTACT = {
  office:    `${BASE}/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop`, // modern office interior
  reception: `${BASE}/photo-1497366754035-f200968a6e72?w=1200&q=80&auto=format&fit=crop`, // reception desk
  exterior:  `${BASE}/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop`, // office building
  whatsapp:  `${BASE}/photo-1611162617213-7d7a39e9b1d7?w=800&q=80&auto=format&fit=crop`,  // phone/messaging
};

// ─── Services ─────────────────────────────────────────────────────────────────
export const SERVICES = {
  management:  `${BASE}/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop`, // property management
  investment:  `${BASE}/photo-1611974789855-9c2a0a7236a3?w=1200&q=80&auto=format&fit=crop`, // investment/finance
  sales:       `${BASE}/photo-1582407947304-fd86f28320be?w=1200&q=80&auto=format&fit=crop`, // handshake/deal
  rental:      `${BASE}/photo-1554995207-c18c203602cb?w=1200&q=80&auto=format&fit=crop`, // rental property
  consulting:  `${BASE}/photo-1600880292203-757bb62b4baf?w=1200&q=80&auto=format&fit=crop`, // consulting meeting
};

// ─── Landscape (CTA / layout sections) ───────────────────────────────────────
// Wide landscape images for CTA banners and layout sections
export const LANDSCAPE = [
  `${BASE}/photo-1600596542815-ffad4c1539a9?w=1400&q=80&auto=format&fit=crop`, // luxury house
  `${BASE}/photo-1560518883-ce09059eeffa?w=1400&q=80&auto=format&fit=crop`,    // property deal
  `${BASE}/photo-1486325212027-8081e485255e?w=1400&q=80&auto=format&fit=crop`, // office building
  `${BASE}/photo-1582407947304-fd86f28320be?w=1400&q=80&auto=format&fit=crop`, // house front
  `${BASE}/photo-1570129477492-45c003edd2be?w=1400&q=80&auto=format&fit=crop`, // residential street
  `${BASE}/photo-1613977257363-707ba9348227?w=1400&q=80&auto=format&fit=crop`, // modern villa
  `${BASE}/photo-1545324418-cc1a3fa10c00?w=1400&q=80&auto=format&fit=crop`,    // new development
  `${BASE}/photo-1524813686514-a57563d77965?w=1400&q=80&auto=format&fit=crop`, // aerial city
];

// ─── Portrait (layout sections) ──────────────────────────────────────────────
export const PORTRAIT = [
  `${BASE}/photo-1600585154340-be6161a56a0c?w=800&q=75&auto=format&fit=crop`,  // villa portrait
  `${BASE}/photo-1600607687939-ce8a6c25118c?w=800&q=75&auto=format&fit=crop`,  // luxury portrait
  `${BASE}/photo-1568605114967-8130f3a36994?w=800&q=75&auto=format&fit=crop`,  // house portrait
  `${BASE}/photo-1512917774080-9991f1c4c750?w=800&q=75&auto=format&fit=crop`,  // penthouse portrait
];

// ─── Navbar featured images ───────────────────────────────────────────────────
export const NAV_FEATURED = {
  featured1: `${BASE}/photo-1600585154340-be6161a56a0c?w=600&q=75&auto=format&fit=crop`,
  featured2: `${BASE}/photo-1600607687939-ce8a6c25118c?w=600&q=75&auto=format&fit=crop`,
};

// ─── Blog / News ──────────────────────────────────────────────────────────────
export const BLOG = [
  `${BASE}/photo-1560518883-ce09059eeffa?w=800&q=75&auto=format&fit=crop`,
  `${BASE}/photo-1486325212027-8081e485255e?w=800&q=75&auto=format&fit=crop`,
  `${BASE}/photo-1570129477492-45c003edd2be?w=800&q=75&auto=format&fit=crop`,
];

// ─── Convenience: all property card images in order ──────────────────────────
export const PROPERTY_CARDS = [
  PROPERTIES.villa,
  PROPERTIES.apartment,
  PROPERTIES.office,
  PROPERTIES.penthouse,
  PROPERTIES.house,
  PROPERTIES.retail,
  PROPERTIES.loft,
  PROPERTIES.estate,
  PROPERTIES.luxuryVilla,
  PROPERTIES.coworking,
  PROPERTIES.newBuild,
  PROPERTIES.land,
];
