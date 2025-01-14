import { test, expect } from '@playwright/test';
import HomePage from 'pages/home.page';
import LoginPage from 'pages/login.page';

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
});
test.beforeEach(async ({ page }) => {
    await homePage.navigateToApplication(process.env.BASE_URL!);
});
test('Test 01: Positive Login Test', { tag: '@smoke' }, async ({ page }) => {
    await loginPage.login(process.env.TESTUSERNAME!, process.env.PASSWORD!);
    await homePage.clickHomeTab();
    await expect(homePage.titleText).toContainText('Welcome');
});
test('Test 02: Negative Login Test', { tag: '@regression' }, async ({ page }) => {
    await loginPage.login(process.env.TESTUSERNAME!, 'WrongPassword');
    await expect(homePage.titleText).toContainText('Welcome');
});
