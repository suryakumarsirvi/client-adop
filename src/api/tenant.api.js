export const createTenant = async ({ fullName, companyName, email, password, planCode }) => {

  const response = await fetch('http://localhost:3000/api/v1/tenants', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fullName,
      companyName,
      email,
      password,
      planCode,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.message || errorData.error || `Server returned status ${response.status}`;
    throw new Error(message);
  }

  return response.json();
};
