// API Task
// Using the public API: https://github.com/vdespa/introduction-to-postman-course/blob/main/simple-booksapi.md
// API tests using Playwright for the Simple Books API with tricky operations (GET, POST with token, PATCH, DELETE)

import {test, expect} from '@playwright/test'

const baseUrl: string = "https://simple-books-api.click";

const headers: Record<string, string> = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

let token: string;

let orderId: number;

// Get all books and verify the response

test("Verify GET All Books API", async ({request}) => {
    
    const response = await request.get(`${baseUrl}/books`, {
        headers
    });
    console.log(await response.json());
    await expect(response.status()).toBe(200);
    const allBooksResponse = await response.json();
    await expect(allBooksResponse).toBeInstanceOf(Array);

});

// Get a single book by ID and verify the response

test("Verify GET Single Book By ID API", async ({request}) => {

    const response = await request.get(`${baseUrl}/books/1`, {
        headers
    });
    console.log(await response.json());
    await expect(response.status()).toBe(200);
    const singleBookResponse = await response.json();
    await expect(singleBookResponse).toHaveProperty('id', 1);

});

// Register an API client and get the access token

test("Verify registering API Client and GET Access Token for POST API", async ({request}) => {
    
    const response = await request.post(`${baseUrl}/api-clients/`, {
        headers,
        data: {
            "clientName": "APITestClient",
            "clientEmail": `test-${Date.now()}@testmail.com`
        }
    });

    await expect(response.status()).toBe(201);
    const tokenResponseBody = await response.json();
    token = tokenResponseBody.accessToken;
    console.log(`Access Token: ${token}`);
    await expect(tokenResponseBody.accessToken).toBeTruthy();

});

// Create a new order using the access token

test("Verify POST Create Order API", async ({request}) => {

    const authResponse = await request.post(`${baseUrl}/api-clients/`, {
        headers,
        data: {
            "clientName": "APIOrderTestClient",
            "clientEmail": `order-${Date.now()}@testmail.com`
        }
    })

    await expect(authResponse.status()).toBe(201);
    const authBody = await authResponse.json();
    token = authBody.accessToken;

    const orderCreationResponse = await request.post(`${baseUrl}/orders`, {
        headers: {
            ...headers,
            'Authorization': `Bearer ${token}`
        },
        data: {
            "bookId": 1,
            "customerName": "Will Smith"
        }
    });

    await expect(orderCreationResponse.status()).toBe(201);
    const orderCreationResponseBody = await orderCreationResponse.json();
    await expect(orderCreationResponseBody.created).toBeTruthy();

    orderId = orderCreationResponseBody.orderId;
    console.log(`Order ID: ${orderId}`);
    await expect(orderId).toBeTruthy();

});

// Update an existing order using the access token

test('Verify PATCH Update Existing Order', async ({ request }) => {
    
    const authResponse = await request.post(`${baseUrl}/api-clients/`, {
        headers,
        data: {
            "clientName": "APIUpdateTestClient",
            "clientEmail": `update-${Date.now()}@testmail.com`
        }
    });

    await expect(authResponse.status()).toBe(201);
    const authBody = await authResponse.json();
    token = authBody.accessToken;

    const orderCreationResponse = await request.post(`${baseUrl}/orders`, {
        headers: {
            ...headers,
            'Authorization': `Bearer ${token}`
        },
        data: {
            "bookId": 1,
            "customerName": "Will Smith"
        }
    });

    await expect(orderCreationResponse.status()).toBe(201);
    const orderCreationResponseBody = await orderCreationResponse.json();
    await expect(orderCreationResponseBody.created).toBeTruthy();

    orderId = orderCreationResponseBody.orderId;
    console.log(`Order ID: ${orderId}`);
    await expect(orderId).toBeTruthy();

    const updateResponse = await request.patch(`${baseUrl}/orders/${orderId}`, {
        headers: {
            ...headers,
            'Authorization': `Bearer ${token}`
        },
        data: {
            customerName: 'David Miller'
        }
    });

    await expect(updateResponse.status()).toBe(204);

});

// Delete an existing order using the access token

test('Verify DELETE Remove Existing Order', async ({ request }) => {
    
    const authResponse = await request.post(`${baseUrl}/api-clients/`, {
        headers,
        data: {
            "clientName": "APIDeleteTestClient",
            "clientEmail": `delete-${Date.now()}@testmail.com`
        }
    });

    await expect(authResponse.status()).toBe(201);
    const authBody = await authResponse.json();
    token = authBody.accessToken;

    const orderCreationResponse = await request.post(`${baseUrl}/orders`, {
        headers: {
            ...headers,
            'Authorization': `Bearer ${token}`
        },
        data: {
            "bookId": 1,
            "customerName": "Will Smith"
        }
    });

    await expect(orderCreationResponse.status()).toBe(201);
    const orderCreationResponseBody = await orderCreationResponse.json();
    await expect(orderCreationResponseBody.created).toBeTruthy();

    orderId = orderCreationResponseBody.orderId;
    console.log(`Order ID: ${orderId}`);
    await expect(orderId).toBeTruthy();

    const deleteResponse = await request.delete(`${baseUrl}/orders/${orderId}`, {
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`
        }
    });

    await expect(deleteResponse.status()).toBe(204);

});