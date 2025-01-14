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
    let accountName = 'Accnam';

    test.beforeEach(({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        accountsPage = new AccountsPage(page);
        contactsPage = new ContactsPage(page);
    });
    test.beforeEach(async ({ page }) => {
        await homePage.navigateToApplication(process.env.BASE_URL!);
        await loginPage.login(process.env.TESTUSERNAME!, process.env.PASSWORD!);
        await homePage.clickHomeTab();
        await expect(homePage.titleText).toContainText('Welcome');
    });

    test('Test 04: Create New Account', { tag: '@regression' }, async ({ page }) => {
        await homePage.clickContactsTab();
        await contactsPage.clickNewContactButton();
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

    test('Test 05: Create New Contact', { tag: '@regression' }, async ({ page }) => {
        await homePage.clickContactsTab();
        await contactsPage.clickNewContactButton();
        await homePage.clickAccountNameDropDown();
        await homePage.pickSpecificAccountOption('first_account');
        let contactName = 'Testlastname';
        await homePage.enterContactLastName(contactName);
        await homePage.clickSavebutton();
        await expect(contactsPage.contactFileLastNamePlaceHolder).toHaveText(contactName);
        await homePage.clickHomeCloudButton();
        await contactsPage.openSpecificContactActionsDropdown(contactName);
        await contactsPage.deleteContact();
        await expect(contactsPage.specificContactName(contactName)).not.toBeVisible();
    });

    test('Test 06: Create New Opportunity', { tag: '@regression' }, async ({ page }) => {
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

    test('Test 07: Link a File to an Account', { tag: '@regression' }, async ({ page }) => {
        await homePage.clickAccountsTab();
        await accountsPage.openSpecificAccountFile(accountName);
        let uploadFileName = '70100005.JPG';
        await accountsPage.uploadSpecificFile(uploadFileName);
        await accountsPage.confirmUpload();
        await accountsPage.uploadSpecificOwnedFile(uploadFileName);
        await expect(accountsPage.specificFileName(uploadFileName)).toBeVisible();
        await accountsPage.deleteSpecificUploadFile(uploadFileName);
        await expect(accountsPage.specificFileName(uploadFileName)).not.toBeVisible();
    });
});
