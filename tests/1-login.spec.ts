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
test('Test 01: Positive Login Test @smoke', async ({ page }) => {
    await homePage.navigateToApplication(process.env.BASE_URL!);
    await loginPage.login(process.env.TESTUSERNAME!, process.env.PASSWORD!);
    await homePage.clickHomeTab();
    await expect(homePage.titleText).toContainText('Welcome', extendedTimeout);
});
test('Test 02: Negative Login Test @regression', async ({ page }) => {
    await homePage.navigateToApplication(process.env.BASE_URL!);
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
    await expect(homePage.titleText).toContainText('Welcome');
});