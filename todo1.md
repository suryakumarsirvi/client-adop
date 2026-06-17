# Client Registration Flow: How Clients Sign Up

**Repository Link**: [suryakumarsirvi/client-adop](https://github.com/suryakumarsirvi/client-adop)

This guide explains how clients register their companies on our platform, what API we call, and how the code handles success or server errors.

---

## 1. The API (How the Frontend talks to the Backend)

When a client clicks the register button, the frontend sends their details to the backend server.

*   **Request URL (Endpoint)**: `http://localhost:3000/api/v1/tenants`
*   **Method**: `POST`
*   **Request Headers**: `Content-Type: application/json`

### What we send to the Backend (Request Body)
```json
{
  "companyName": "test company",
  "email": "test@test.com",
  "fullName": "test user",
  "password": "Test@2026",
  "planCode": "growth-tier"
}
```

### What we get back from the Backend (Response Payload)
```json
{
  "success": true,
  "data": {
    "tenant": {
      "id": "f21714d2-7a9e-49e7-a385-96a3e2307166",
      "name": "test company",
      "slug": "test-company",
      "createdAt": "2026-06-17T20:27:04.061Z",
      "updatedAt": "2026-06-17T20:27:04.061Z"
    },
    "user": {
      "id": "32097058-4cbb-4092-b00b-ba08cdeefc07",
      "fullName": "test user",
      "email": "test@test.com",
      "role": "owner",
      "tenantId": "f21714d2-7a9e-49e7-a385-96a3e2307166"
    },
    "subscription": {
      "id": "5fcea04c-9ef1-4c04-9810-4c5176e7d1f4",
      "status": "trialing",
      "tenantId": "f21714d2-7a9e-49e7-a385-96a3e2307166",
      "planId": "f600c66e-4add-4ce1-b062-11a4fc0eb28a"
    }
  }
}
```

---

## 2. Step-by-Step Registration Flow

Here is exactly what happens when a user signs up on our site:

### Step 1: User fills out the Form
The user enters their **Name**, **Company Name**, **Email**, and **Password**. 
*   *Validation Check*: The system makes sure no fields are empty, the password is at least 6 characters, and passwords match.

### Step 2: User selects a Plan
The user chooses a pricing tier (Starter, Growth, or Enterprise).

### Step 3: Submitting the Request
The app triggers a request using the `createTenant` function, which calls our API.

---

### Step 4: The Result (Success or Error Fallback)

#### Scenario A: If the backend is running perfectly (Success)
1.  The backend successfully creates the company (Tenant) and user account.
2.  It sends back the response data (IDs, settings, subscription status).
3.  The app saves these details inside the browser's local storage (`localStorage`).
4.  A green success message pops up: *"Tenant created successfully!"*.
5.  After 1 second, the user is redirected to their new custom workspace URL (e.g., `http://company-slug.localhost:5173/dashboard`).

#### Scenario B: If the backend server is offline or fails (Offline Fallback)
1.  Instead of crashing, the app shows an error message toast in the UI.
2.  It automatically creates a simulated URL slug from the company name.
3.  It saves a temporary, simulated workspace in local storage (flagged as `simulated: true`).
4.  A warning pops up: *"Offline Fallback: Redirecting to simulated workspace..."*.
5.  After 2 seconds, the user is sent to the simulated workspace (e.g., `http://company-slug.localhost:5173/dashboard`) so they can still see and try out the app offline.

---

## 3. The Code Files Involved

There are two main code files that handle this registration process:

### File 1: The API Caller
Located in: [tenant.api.js](file:///a:/Dap/client-adop/src/api/tenant.api.js)

This function physically makes the HTTP network request to the backend server and returns the server response.
```javascript
export const createTenant = async ({ fullName, companyName, email, password, planCode }) => {
  const response = await fetch('http://localhost:3000/api/v1/tenants', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fullName, companyName, email, password, planCode }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Server returned an error');
  }

  return response.json();
};
```

### File 2: The Registration Interface (UI)
Located in: [AuthPage.jsx](file:///a:/Dap/client-adop/src/features/auth/AuthPage.jsx)

This component renders the input forms, validates inputs, and triggers the API call. It uses **TanStack Query**'s `useMutation` hook to coordinate success/error states:

*   **On Success**: Saves data to local storage and redirects user.
*   **On Error**: Performs the offline fallback simulation and redirects user.
