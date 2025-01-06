import { test, expect } from '@playwright/test';
import HomePage from 'pages/home.page';
import LoginPage from 'pages/login.page';

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
});
test('Test 01: Positive Login Test', async ({ page }) => {
    await page.goto(process.env.BASE_URL!);
    await loginPage.login('jacekmarkevicz-4gyr@force.com', process.env.PASSWORD!);
    await expect(homePage.titleText).toContainText('Welcome', { timeout: 20000 });
});
