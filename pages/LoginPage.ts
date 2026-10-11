// This file contains the page object for the login page
// The page object is used to interact with the login page and perform actions on it
// We also verify the login functionality for different users

import {Page, Locator, expect} from "@playwright/test"
import {url, users, loginPassword} from "../config/qaEnv"

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

constructor(page:Page){
    this.page = page;
    this.usernameInput = page.getByRole("textbox",{name:"Username"});
    this.passwordInput = page.getByRole("textbox",{name:"Password"});
    this.loginButton = page.getByRole("button",{name:"Login"});
}

async navigateToLoginPage() {
    await this.page.goto(url);
}

async standardUserLogin(username: string = users.standardUsername, password: string = loginPassword) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
}

async lockedUserLogin(username: string = users.lockedUsername, password: string = loginPassword) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
}

async problemUserLogin(username: string = users.problemUsername, password: string = loginPassword) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.screenshot({ path: "screenshots/problem-user-login-chromium-win32.png" });
    await this.page.screenshot({ path: "screenshots/problem-user-login-firefox-win32.png" });
}

async performanceGlitchUserLogin(username: string = users.performanceGlitchUsername, password: string = loginPassword) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
}

async errorUserLogin(username: string = users.errorUsername, password: string = loginPassword) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
}

async visualUserLogin(username: string = users.visualUsername, password: string = loginPassword) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
}

async invalidLogin(username: string = users.invalidUsername, password: string = loginPassword) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
}

async verifyStandardUserLogin() {    
    await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
}

async verifyLockedUserLogin() {
    await expect(this.page.getByText("Epic sadface: Sorry, this user has been locked out.")).toBeVisible();
}

async verifyProblemUserLogin() {
    await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");   
}

async verifyPerformanceGlitchUserLogin() {
    await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
}

async verifyErrorUserLogin() {
    await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
}

async verifyVisualUserLogin() {
    await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
}

async verifyInvalidLogin() {
    await expect(this.page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
}

}   
