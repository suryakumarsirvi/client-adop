export const createApiKeys = async () => {
    const response = await fetch('http://localhost:3000/api/v1/tenant-api-keys', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include"
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData.message || errorData.error || `Server returned status ${response.status}`;
        throw new Error(message);
    }

    return response.json();
};

export const getApiKeys = async () => {
    const response = await fetch('http://localhost:3000/api/v1/tenant-api-keys', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include"
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData.message || errorData.error || `Server returned status ${response.status}`;
        throw new Error(message);
    }

    return response.json();
};
