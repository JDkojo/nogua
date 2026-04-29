PROJECT TITLE:
Real Estate Management System (Website + Admin Dashboard)

==================================================
PROJECT CONTEXT
==================================================

I have already generated a frontend using Next.js (React) from a wireframe.

However, the current system is mostly STATIC:
- Buttons do not perform real actions
- Forms do not submit data
- No backend integration
- No real data flow
- No state management
- No API connections

I DO NOT want to rebuild the system from scratch.

==================================================
PROJECT VISION (SYSTEM-LEVEL)
==================================================

Build a centralized, end-to-end real estate operating system that digitizes and integrates all business operations into a single platform.

This is NOT just a listing website.

It is a full business system to manage:
- property inventory
- land ownership
- customer inquiries (CRM)
- inspections
- sales pipeline
- installment payments
- documents
- staff and agents
- reporting and analytics

The system must act as a SINGLE SOURCE OF TRUTH for all operations.

==================================================
CORE OBJECTIVE
==================================================

You must:

1. AUDIT the existing frontend system
2. COMPARE it against ALL requirements below
3. IDENTIFY missing or incomplete functionality
4. PRESERVE all existing UI and structure
5. EXTEND the system by adding missing features
6. TRANSFORM it into a fully functional real estate operating system

==================================================
CRITICAL ENFORCEMENT RULE (MANDATORY)
==================================================

For EVERY requirement listed:

- IF it EXISTS but is STATIC → make it FUNCTIONAL
- IF it PARTIALLY EXISTS → COMPLETE it
- IF it DOES NOT EXIST → YOU MUST ADD IT

You are NOT allowed to skip missing features.

You MUST:
- Inject missing modules into the current architecture
- Define where they fit
- Ensure full integration with other modules

==================================================
STRICT CONSTRAINTS
==================================================

DO NOT:
- redesign UI
- remove existing components
- rebuild from scratch

ONLY:
- enhance
- connect
- extend
- integrate

==================================================
SYSTEM PRINCIPLES
==================================================

- Centralization (single system)
- Data integrity (consistent & traceable)
- Automation (reduce manual work)
- Accountability (audit logs)
- Scalability (future growth)
- Modularity (clean architecture)

==================================================
FUNCTIONAL UPGRADE REQUIREMENTS
==================================================

ALL static UI must become functional:

1. BUTTONS → trigger real backend actions
2. FORMS → validate, submit, persist, return feedback
3. DATA → replace hardcoded data with API data
4. STATE → implement proper state management
5. API → connect to backend (Node.js + Express)
6. AUTH → JWT authentication system
7. RBAC → role-based permissions
8. FILES → upload via Cloudinary/S3
9. EVENTS → notifications (leads, payments, inspections)

==================================================
SYSTEM MODULES (MANDATORY)
==================================================

The system MUST include and integrate:

1. Public Website
2. Admin Dashboard
3. Property Inventory System
4. CRM (Leads)
5. Sales Pipeline
6. Payment System
7. Land Records
8. Document Management
9. Site Visits / Inspections
10. Staff & Agent Management
11. Communication System
12. Reporting & Analytics
13. RBAC (Permissions)
14. Audit Logs
15. System Settings

FOR EACH MODULE:
- If exists → make functional
- If partial → extend
- If missing → ADD + integrate

==================================================
DETAILED SYSTEM EXPECTATIONS
==================================================

PUBLIC WEBSITE:
- Dynamic property listings (from DB)
- Lead capture → stored in CRM
- SEO + performance optimization
- Google Maps integration

ADMIN DASHBOARD:
- Real-time metrics
- Role-based views
- Alerts (overdue payments, new leads)

PROPERTY SYSTEM:
- Full CRUD
- Lifecycle tracking
- Media gallery
- Geo-location

CRM:
- Lead capture + assignment
- Follow-ups + reminders
- Communication logs

SALES PIPELINE:
- Stage tracking
- Deal management
- Forecasting

PAYMENT SYSTEM:
- Installments
- Payment tracking
- Receipt generation
- Payment gateway integration

LAND RECORDS:
- Ownership tracking
- Transfer history
- Legal validation

DOCUMENT SYSTEM:
- Upload + versioning
- Access control
- Expiry tracking

SITE VISITS:
- Booking + scheduling
- Notifications
- Outcome tracking

STAFF MANAGEMENT:
- Roles + performance
- Commissions
- activity tracking

COMMUNICATION:
- Email/SMS/WhatsApp logs
- Templates
- Automated triggers

REPORTING:
- Sales, revenue, leads
- KPI dashboards
- Export options

RBAC:
- Role hierarchy
- Module + action permissions

AUDIT LOGS:
- Track all actions
- Before/after values
- Login history

SETTINGS:
- Business config
- Payment rules
- Notification settings

==================================================
INTEGRATION REQUIREMENT (CRITICAL)
==================================================

All modules MUST be interconnected:

- Leads → Sales → Payments → Ownership
- Properties → Inspections → Sales
- Users → Roles → Permissions
- Documents → Linked everywhere

NO isolated modules allowed.

==================================================
BACKEND REQUIREMENTS
==================================================

You MUST define:

- REST APIs (Node.js + Express)
- Controllers + routes
- Middleware (auth + RBAC)
- PostgreSQL schema
- Relationships between entities

==================================================
FRONTEND REQUIREMENTS
==================================================

You MUST define:

- React hooks
- State management structure
- API calls
- Event handlers
- Data fetching strategy

==================================================
OUTPUT FORMAT (STRICT)
==================================================

1. SYSTEM AUDIT SUMMARY
2. FUNCTIONAL GAP ANALYSIS
3. MISSING FEATURES ADDED
4. BACKEND ARCHITECTURE
5. DATABASE DESIGN (PostgreSQL)
6. FRONTEND INTEGRATION PLAN
7. STEP-BY-STEP IMPLEMENTATION ROADMAP

==================================================
TECH STACK (FIXED)
==================================================

Frontend:
- Next.js
- Tailwind CSS

Backend:
- Node.js + Express

Database:
- PostgreSQL

Storage:
- Cloudinary / AWS S3

Auth:
- JWT + RBAC

==================================================
FINAL GOAL
==================================================

Upgrade the existing static frontend into a fully functional, scalable, and integrated real estate operating system by:

- preserving UI
- adding missing features
- integrating all modules
- connecting frontend to backend
- ensuring full data flow across the system