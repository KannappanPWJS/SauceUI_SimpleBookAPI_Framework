// This file contains the fixture for the tests
// The fixture is used to create instances of the page objects and pass them to the tests

import {test as base} from "@playwright/test"

import {LoginPage} from "../pages/LoginPage"

import {ProductPage} from "../pages/ProductPage"

import {CartPage} from "../pages/CartPage"

export const test = base.extend<{ loginPage: LoginPage, productPage: ProductPage, cartPage: CartPage }>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    }   
});