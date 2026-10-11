// This file contains the test cases for the product order flow functionality of our application
// The test cases can be used to verify the product order flow functionality for different products available in the application

import {test} from "../fixtures/fixture"

test("verify product order flow functionality", async ({ loginPage, productPage, cartPage }) => {

    await loginPage.navigateToLoginPage();
    await loginPage.standardUserLogin();
    await loginPage.verifyStandardUserLogin();
    await productPage.verifyProductPage();
    await productPage.verifyProductIsDisplayed("Sauce Labs Backpack");
    await productPage.verifyProductPrice("Sauce Labs Backpack", "$29.99");
    await productPage.addProductToCart("Sauce Labs Backpack");
    await productPage.verifyProductIsDisplayed("Sauce Labs Bike Light");
    await productPage.verifyProductPrice("Sauce Labs Bike Light", "$9.99");
    await productPage.addProductToCart("Sauce Labs Bike Light");
    await productPage.removeProductFromCart("Sauce Labs Bike Light");
    await productPage.clickShoppingCart();
    await cartPage.verifyCartPage();
    await cartPage.verifyProductInCart("Sauce Labs Backpack");
    await cartPage.clickCheckoutButton();
    await cartPage.CheckoutStepOnePage();
    await cartPage.CheckoutStepTwoPage();
    await cartPage.verifyCheckoutCompletePage();

});
