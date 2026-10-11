// This file contains the test cases for the login page of our application
// The test cases are used to verify the login functionality for different users available in the application
// We also verify the invalid login functionality

import { test } from "../fixtures/fixture"

test("verify login functionality with Standard User Login", async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.standardUserLogin();
    await loginPage.verifyStandardUserLogin();
});

test("verify login functionality with Locked User Login", async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.lockedUserLogin();
    await loginPage.verifyLockedUserLogin();
});

test("verify login functionality with Problem User Login", async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.problemUserLogin();
    await loginPage.verifyProblemUserLogin();
});

test("verify login functionality with Performance Glitch User Login", async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.performanceGlitchUserLogin();
    await loginPage.verifyPerformanceGlitchUserLogin();
});

test("verify login functionality with Error User Login", async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.errorUserLogin();
    await loginPage.verifyErrorUserLogin();
});

test("verify login functionality with Visual User Login", async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.visualUserLogin();
    await loginPage.verifyVisualUserLogin();
});

test("verify invalid login functionality", async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.invalidLogin();
    await loginPage.verifyInvalidLogin();
});
