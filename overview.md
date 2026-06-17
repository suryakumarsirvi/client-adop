# WebTour Frontend Documentation: Architecture & Foundations

**Repository Link**: [suryakumarsirvi/client-adop](https://github.com/suryakumarsirvi/client-adop)

This document provides a detailed, step-by-step technical breakdown of the WebTour frontend application's foundational setup, styling setup, layout architecture patterns, state management strategy, and error handling framework.

---

## 1. Tech Stack Overview & Rationale

WebTour is designed as a modern, multi-tenant Software-as-a-Service (SaaS) portal. Its core stack consists of:

### Core Framework & Build System
*   **React 19 & React DOM 19**: Leverages the latest React features, optimized rendering performance, and cleaner hooks.
*   **Vite 8**: Serves as the ultra-fast development server and bundler, providing instant Hot Module Replacement (HMR) and highly optimized production builds.

### Styling & Design System
*   **Tailwind CSS v4 (Alpha/Beta)**: Implements Tailwind's next-generation engine, featuring:
    *   **CSS-first configuration**: Replaces the JavaScript-based `tailwind.config.js` with direct CSS `@theme` directives in [App.css](file:///a:/Dap/client-adop/src/app/App.css).
    *   **CSS Variables Mapping**: Binds Tailwind colors to CSS Custom Properties (e.g., `--color-brand-primary` mapped to `var(--dap-brand-primary)`) to support dynamic runtime multi-tenant white-labeling and theming.
    *   **Custom Fonts**: Seeding of branding-aligned fonts: `PrimaryFont` (sans), `SecondaryFont` (headings), and `JetBrainFont` (monospaced/code syntax) loaded directly via local `@font-face` rules.

### Navigation & Routing
*   **React Router v7**: The unified routing solution that replaces React Router DOM v6. It introduces:
    *   `createBrowserRouter` and `RouterProvider` for robust, history-backed routing.
    *   Nested routing layouts utilizing `<Outlet />` to separate layouts (e.g., dashboard shell vs. authentication panels).

### State Management
*   **TanStack Query v5 (React Query)**: The server-state management engine. Used to coordinate backend communications, mutation tracking, query caching, and status tracking (pending/success/error).
    *   *Why React Query?* Caches remote server states out-of-the-box, manages complex request loading/error lifecycles declaratively (eliminating manual `useEffect` fetches and manual `loading` states), and automates retry logic and revalidation.
*   **Redux Toolkit**: Client-state manager configured in [App.store.js](file:///a:/Dap/client-adop/src/app/App.store.js). Primarily reserved for global UI state overrides, configurations, and mock settings.

### Notification System
*   **Sonner**: A lightweight, highly customizable toast notification library. Used for rich-color success alerts, warning notifications, and error reporting.

---

## 2. Layout Architecture & Subdomain Routing Patterns

WebTour uses a multi-tenant workspace architecture based on URL subdomains (e.g., `company-slug.localhost:5173`). 

### Subdomain Detection & State Lifecycle
The foundation of the workspace resolution resides in the custom [useTenant.js](file:///a:/Dap/client-adop/src/hooks/useTenant.js) hook:
1.  **Subdomain Parsing (`getSubdomain`)**: Analyzes `window.location.hostname` to extract the primary sub-identifier (e.g., in `google.localhost`, it extracts `google`).
2.  **Storage Synchronization (`getLocalTenants` / `saveLocalTenant`)**: Works with `localStorage` (key: `dap_tenants`) to read and persist configured tenants.
3.  **Active Workspace Verification**: Resolves the tenant metadata matching the current active subdomain. If a subdomain is active but no matching tenant exists in local storage, it flags the workspace as a simulated environment.

### Router & Layout Map
Defined in [App.route.jsx](file:///a:/Dap/client-adop/src/app/App.route.jsx), the route configuration dictates how routes are guarded:

```mermaid
graph TD
    A[Visitor Access] --> B{Subdomain Active?}
    B -- No Subdomain --> C[Root Paths]
    C --> D[Landing Page "/"]
    C --> E[Auth Page "/auth" - Register/Login]
    
    B -- Subdomain Active --> F[Workspace Paths]
    F --> G[MainLayout "/dashboard"]
    G --> H[Dashboard Overview "/dashboard"]
    G --> I[Flows Management "/dashboard/flows"]
    G --> J[Branding Settings "/dashboard/settings"]
    
    H & I & J --> K{PermissionGuard}
```

*   **Subdomain Check redirection**: If a subdomain is active, visiting `/` or `/auth` redirects the user to `/dashboard`. Conversely, if no subdomain is active, visiting `/dashboard` redirects the user to `/auth`.
*   **Root Layouts**:
    *   **[AuthLayout.jsx](file:///a:/Dap/client-adop/src/layouts/AuthLayout.jsx)**: A centered, clean card structure designed for login and signup.
    *   **[MainLayout.jsx](file:///a:/Dap/client-adop/src/layouts/MainLayout.jsx)**: The authenticated application dashboard. Houses a sticky main header with theme toggling, logouts, a left navigation sidebar containing module links, and a main `<main className="flex-1 p-8"><Outlet /></main>` container that displays active children.

### Guards & Permission System
Granular client-side route access control is managed via the **PermissionGuard** and **PermissionProvider** pattern:
1.  **[PermissionProvider.jsx](file:///a:/Dap/client-adop/src/context/PermissionProvider.jsx)**: Supplies a React context exposing the user's active permission keys, along with utility predicates:
    *   `hasPermission(required)`: Supports exact match and wildcard prefix matches (e.g., permission `flow:*` validates checks for `flow:create` or `flow:view`). The character `*` denotes a super-administrator bypass.
    *   `hasAnyPermission(array)` & `hasAllPermissions(array)`.
2.  **[PermissionGuard.jsx](file:///a:/Dap/client-adop/src/guards/PermissionGuard.jsx)**: Wraps protected nested routes inside the router configuration:
    *   Reads requirements from attributes (`requiredPermission`, `anyOf`, `allOf`).
    *   If unauthorized, triggers a soft redirect (`replace`) to `/forbidden`.
    *   If authorized, renders the child route matching the URL using React Router's `<Outlet />`.

---

## 3. The Dynamic Branding Design System

Multi-tenant SaaS products require custom colors, branding, and layouts. WebTour implements this dynamically using:

### Dynamic Styling System via CSS Custom Properties
1.  The base design tokens are declared as CSS variables in [App.css](file:///a:/Dap/client-adop/src/app/App.css):
    *   `--dap-brand-primary`
    *   `--dap-brand-secondary`
    *   `--dap-brand-accent`
    *   `--dap-brand-bg`
    *   `--dap-brand-card`
    *   `--dap-brand-text`
    *   `--dap-brand-border`
2.  **[ThemeProvider.jsx](file:///a:/Dap/client-adop/src/context/ThemeProvider.jsx)** monitors the system theme mode (light vs. dark toggle). It also exposes a function `applyTenantColors(colors)`:
    *   It updates custom variables directly in the DOM root element (`document.documentElement.style.setProperty`).
    *   Whenever a tenant branding configuration is loaded, these variables override the defaults, and the entire app's Tailwind-based UI components instantly match the client's colors.

---

## 4. Centralized Error Management

The application features a robust error architecture configured across several layers:

1.  **React Error Boundary ([ErrorBoundary.jsx](file:///a:/Dap/client-adop/src/errors/ErrorBoundary.jsx))**: 
    *   Wraps the top-level `<App />` render entry.
    *   Catches React rendering errors, logs them to a custom Logger utility, and shows a premium, styled fallback page allowing a user-driven reload.
2.  **Router Error Boundary ([router.error.jsx](file:///a:/Dap/client-adop/src/errors/router.error.jsx))**:
    *   Bound directly within React Router v7 routes.
    *   Catches errors thrown during route resolution, route loading, or page component initializations.
    *   Uses React Router's `useRouteError` and `isRouteErrorResponse` to dynamically parse and show user-friendly error statuses (e.g., 404 Page Not Found, 401 Unauthorized, or 403 Forbidden).
3.  **Global Async/HTTP Error Handling ([query.error.js](file:///a:/Dap/client-adop/src/errors/query.error.js))**:
    *   Hooked directly into TanStack's `QueryCache` and `MutationCache` error handlers inside [App.stack.js](file:///a:/Dap/client-adop/src/app/App.stack.js).
    *   Any backend query failure or mutation failure is captured, logged with metadata (query keys, sources, modules), and displays a clean visual toast warning using `sonner`.
