// This file contains the page object for the cart page
// The page object is used to interact with the cart page and perform actions on it
// We also verify the cart page functionality for different products

import {Page, Locator, expect} from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly cartItems: Locator;

constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator("//span[@class='title' and text()='Your Cart']");
    this.cartItems = page.locator("//div[@data-test='inventory-item']");
}

async verifyCartPage() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.cartItems).toHaveCount(1);
}

async verifyProductInCart(productName: string) {
    const productLocator = this.page.locator("//div[@data-test='inventory-item']").filter({ has: this.page.getByText(productName, { exact: true }) });
    await expect(productLocator).toBeVisible();
}

async removeProductFromCart(productName: string) {
    const productLocator = this.page.locator("//div[@data-test='inventory-item']").filter({ has: this.page.getByText(productName, { exact: true }) });
    await expect(productLocator).toBeVisible();
    const removeButton = productLocator.getByRole("button", { name: "Remove" });
    await removeButton.click();
}

async verifyContinueShoppingButton() {
    const continueShoppingButton = this.page.getByRole("button", { name: "Continue Shopping" });
    await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
}

async clickCheckoutButton() {
    const checkoutButton = this.page.getByRole("button", { name: "Checkout" });
    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();
    await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
}

async CheckoutStepOnePage() {
    const firstNameInput = this.page.getByRole("textbox", { name: "First Name" });
    const lastNameInput = this.page.getByRole("textbox", { name: "Last Name" });
    const postalCodeInput = this.page.getByRole("textbox", { name: "Zip/Postal Code" });
    const continueButton = this.page.getByRole("button", { name: "Continue" });
    await firstNameInput.fill("Will");
    await lastNameInput.fill("Smith");
    await postalCodeInput.fill("12345");
    await continueButton.click();
    await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
}

async CheckoutStepTwoPage() {
    const finishButton = this.page.getByRole("button", { name: "Finish" });
    await expect(finishButton).toBeVisible();
    await finishButton.click();
    await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
}

async verifyCheckoutCompletePage() {
    const checkoutCompleteTitle = this.page.locator("//span[@class='title' and text()='Checkout: Complete!']");
    await expect(checkoutCompleteTitle).toBeVisible();
    const checkoutCompleteMessage = this.page.locator("//h2[@class='complete-header' and text()='Thank you for your order!']");
    await expect(checkoutCompleteMessage).toBeVisible();
}

}