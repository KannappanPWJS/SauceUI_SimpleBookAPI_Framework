// This file contains the page object for the product page
// The page object is used to interact with the product page and perform actions on it
// We also verify the product page functionality for different products

import {Page, Locator, expect} from "@playwright/test";

export class ProductPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly productList: Locator;
    readonly productItems: Locator;
    readonly sortDropdown: Locator;
    readonly shoppingCart: Locator;    
    
constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator("//span[@class='title' and text()='Products']");
    this.productList = page.locator("//div[@data-test='inventory-list']");
    this.productItems = page.locator("//div[@data-test='inventory-item']");
    this.sortDropdown = page.getByRole("combobox", { name: "Sort products" });
    this.shoppingCart = page.locator("//div[@id='shopping_cart_container']");
    
}

async verifyProductPage() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.productList).toBeVisible();
    await expect(this.productItems).toHaveCount(6);
    await expect(this.sortDropdown).toBeVisible();
    await expect(this.shoppingCart).toBeVisible();
}

async verifyProductIsDisplayed(productName: string) {
    const productLocator = this.page.locator("//div[@data-test='inventory-item']").filter({ has: this.page.getByText(productName, { exact: true }) });
    await expect(productLocator).toBeVisible(); 
}

async verifyProductPrice(productName: string, expectedPrice: string) {
    const productLocator = this.page.locator("//div[@data-test='inventory-item']").filter({ has: this.page.getByText(productName, { exact: true }) });
    const priceLocator = productLocator.locator("//div[@data-test='inventory-item-price']");
    await expect(priceLocator).toHaveText(expectedPrice);
}

async sortProductsBy(option: string) {
    await this.sortDropdown.selectOption({ label: option });
}

async addProductToCart(productName: string) {
    const productLocator = this.page.locator("//div[@data-test='inventory-item']").filter({ has: this.page.getByText(productName, { exact: true }) });
    await expect(productLocator).toBeVisible();
    const addToCartButton = productLocator.getByRole("button", { name: "Add to cart" });
    await addToCartButton.click();
}

async removeProductFromCart(productName: string) {
    const productLocator = this.page.locator("//div[@data-test='inventory-item']").filter({ has: this.page.getByText(productName, { exact: true }) });
    await expect(productLocator).toBeVisible();
    const removeButton = productLocator.getByRole("button", { name: "Remove" });
    await removeButton.click();
}

async clickShoppingCart() {
    await this.shoppingCart.click();
    await expect(this.page).toHaveURL("https://www.saucedemo.com/cart.html");
}

}