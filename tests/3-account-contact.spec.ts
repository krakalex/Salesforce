import { test, expect } from '@playwright/test';
import HomePage from 'pages/home.page';
import AccountsPage from 'pages/accounts.page';
import LoginPage from 'pages/login.page';
import ContactsPage from 'pages/contacts.page';
import { access } from 'fs';

test.describe('Creating Account, Contact and linking the necessities', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let accountsPage: AccountsPage;
    let contactsPage: ContactsPage;
    const extendedTimeout = { timeout: 20000 };
    let accountName = 'Accnam';

    test.beforeEach(({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        accountsPage = new AccountsPage(page);
        contactsPage = new ContactsPage(page);
    });
    test.beforeEach(async ({ page }) => {
        await await homePage.navigateToApplication(process.env.BASE_URL!);
        await loginPage.login(process.env.TESTUSERNAME!, process.env.PASSWORD!);
    });

    test('Test 03: Create New Account', async ({ page }) => {
        await homePage.clickHomeTab();
        await expect(homePage.newContactButton).toBeEnabled(extendedTimeout);
        await homePage.clickNewContactButton();
        await homePage.clickAccountNameDropDown();
        await homePage.clickNewAccountOption();
        let accountNameT = 'TestAccount';
        await homePage.enterAccountName(accountNameT);
        await homePage.clickSavebutton();
        await expect(homePage.accountNameDropDown).toHaveAttribute('placeholder', accountNameT);
        await homePage.clickCloseTheWindowButton();
        await homePage.clickAccountsTab();
        await expect(accountsPage.specificAccountName(accountNameT)).toBeVisible();
        await accountsPage.deleteSpecificAccount(accountNameT);
        await expect(accountsPage.specificAccountName(accountNameT)).not.toBeVisible();
    });

    test('Test 04: Create New Contact', async ({ page }) => {
        await homePage.clickHomeTab();
        await homePage.clickNewContactButton();
        await homePage.clickAccountNameDropDown();
        await homePage.pickSpecificAccountOption('first_account');
        let contactName = 'Testlastname';
        await homePage.enterContactLastName(contactName);
        await homePage.clickSavebutton();
        await expect(contactsPage.contactFileLastNamePlaceHolder).toHaveText(contactName);
    });

    test('Test 05: Create New Opportunity', async ({ page }) => {
        await homePage.clickAccountsTab();
        await accountsPage.openSpecificAccountFile(accountName);
        await accountsPage.clickNewOpportunityButton();
        let opportunityName = 'Testopportunity';
        await accountsPage.enterOpportunityName(opportunityName);
        await accountsPage.saveNewOpportunity();
        await expect(accountsPage.specificOpportunity(opportunityName)).toBeVisible();
        await accountsPage.deleteSpecificOpportunity(opportunityName);
        await expect(accountsPage.specificOpportunity(opportunityName)).not.toBeVisible();
    });

    test('Test 06: Link a File to a Account', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await homePage.clickAccountsTab();
        await accountsPage.openSpecificAccountFile(accountName);
        let uploadFileName = '70100005.JPG';
        await accountsPage.uploadSpecificFile(uploadFileName);
        await accountsPage.confirmUpload();
        await expect(accountsPage.specificFileName(uploadFileName)).toBeVisible();
        await accountsPage.deleteSpecificUploadFile(uploadFileName);
        await expect(accountsPage.specificFileName(uploadFileName)).not.toBeVisible();
    });
});
