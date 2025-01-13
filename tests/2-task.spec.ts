import { test, expect } from '@playwright/test';
import HomePage from 'pages/home.page';
import LoginPage from 'pages/login.page';
import { extendedTimeout } from 'playwright.config';

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
});
test.beforeEach(async ({ page }) => {
    await homePage.navigateToApplication(process.env.BASE_URL!);
    await loginPage.login(process.env.TESTUSERNAME!, process.env.PASSWORD!);
});
test('Test 03: Add New Task @regression', async ({ page }) => {
    await homePage.clickHomeTab();
    await expect(homePage.titleText).toContainText('Welcome', extendedTimeout);
    await homePage.clickToDoListButton();
    await homePage.addNewCallTask();
    await expect(homePage.callToDoRecord).toBeVisible();
    await homePage.markTheTaskAsComplete();
    await expect(homePage.callToDoRecord).not.toBeVisible();
});