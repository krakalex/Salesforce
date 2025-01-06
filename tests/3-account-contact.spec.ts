import { test, expect } from '@playwright/test';
import HomePage from 'pages/home.page';
import AccountsPage from 'pages/accounts.page';
import LoginPage from 'pages/login.page';
import ContactsPage from 'pages/contacts.page';

test.describe.only('Creating new Contact and Account', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let accountsPage: AccountsPage;
    let contactsPage: ContactsPage;
    let accountName = 'TestAccount';
    test.beforeEach(({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        accountsPage = new AccountsPage(page);
        contactsPage = new ContactsPage(page);
    });
    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.BASE_URL!);
        await loginPage.login(process.env.PASSWORD!, process.env.PASSWORD!);
        await expect(homePage.newContactButton).toBeEnabled({ timeout: 20000 });
    });
    test.afterEach(async ({ page }) => {
        const context = page.context();
        await context.clearCookies();
        await page.evaluate(() => sessionStorage.clear());
    });
    // test.afterAll(async ({ page }) => {
    //     await page.goto(process.env.BASE_URL!);
    //     await loginPage.login('jacekmarkevicz-4gyr@force.com', process.env.PASSWORD!);
    //     await homePage.clickAccountsTab();
    //     await accountsPage.deleteSpecificAccount(accountName);
    // });

    test.describe.skip('Test 03: Create New Account', () => {
        test('Test 03: Create New Account', async ({ page }) => {
            // await homePage.clickHomeTab()
            await homePage.clickNewContactButton();
            await homePage.clickAccountNameDropDown();
            await homePage.clickNewAccountOption();
            await homePage.enterAccountName(accountName);
            await homePage.clickSavebutton();
            await expect(homePage.accountNameDropDown).toHaveAttribute('placeholder', accountName);
            await homePage.clickCloseTheWindowButton();
            await homePage.clickAccountsTab();
            await expect(accountsPage.specificAccountName(accountName)).toBeVisible();
            await accountsPage.deleteSpecificAccount(accountName);
            await expect(accountsPage.specificAccountName(accountName)).not.toBeVisible();
        });
    //     test.afterEach(async ({ page }) => {
    //         const context = page.context();
    //         await page.goto(process.env.BASE_URL!);
    //         await loginPage.login('jacekmarkevicz-4gyr@force.com', process.env.PASSWORD!);
    //         await homePage.clickAccountsTab();
    //         await accountsPage.deleteSpecificAccount(accountName);
    //     });
    });
    test('Test 04: Create New Contact', async ({ page }) => {
        await homePage.clickNewContactButton();
        await homePage.clickAccountNameDropDown();
        await homePage.pickSpecificAccountOption('Accnam');
        let contactName = 'Testlastname';
        await homePage.enterContactLastName('Testlastname');
        await homePage.clickSavebutton();
        await expect(contactsPage.contactFileLastNamePlaceHolder).toHaveText(contactName);
        await contactsPage.deleteCreatedContact();
        await homePage.clickContactsTab()
        await expect(contactsPage.specificContactName(contactName)).not.toBeVisible();
    });
});
