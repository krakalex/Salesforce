import { test, expect } from '@playwright/test';
import LoginPage from 'pages/login.page';
import AccountsPage from 'pages/accounts.page';
import HomePage from 'pages/home.page';
import SalesPage from 'pages/sales.page';
import { beforeEach, describe } from 'node:test';
import { extendedTimeout } from 'playwright.config';

test.describe('Lead creating', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let salesPage: SalesPage;
    let accountsPage: AccountsPage;

    test.beforeEach(({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        salesPage = new SalesPage(page);
        accountsPage = new AccountsPage(page);
    });
    test.beforeEach(async ({ page }) => {
        await homePage.navigateToApplication(process.env.BASE_URL!);
        await loginPage.login(process.env.TESTUSERNAME!, process.env.PASSWORD!);
        await homePage.clickHomeTab();
        await expect(homePage.titleText).toContainText('Welcome', extendedTimeout);
    });

    test('Test 08: Create New Lead @smoke', async ({ page }) => {
        await homePage.clickSalesTab();
        await salesPage.clickNewLeadButton();
        let leadCompany = 'Testleadcompany';
        await salesPage.enterLeadLastName('Testleadlastname');
        await salesPage.enterLeadCompany(leadCompany);
        await salesPage.saveNewLead();
        await salesPage.clickLeadFileActionsDropDown();
        await salesPage.deleteTheLead();
        await homePage.clickAccountsTab();
        await expect(accountsPage.specificAccountName(leadCompany)).not.toBeVisible();
        await homePage.clickSalesTab();
    });

    test('Test 09: Change the Status of a lead @regression', async ({ page }) => {
        await homePage.clickSalesTab();
        await salesPage.openSpecificLeadFile('Firstleadlastname');
        await salesPage.changeLeadStatus('Contacted');
        await homePage.clickSalesTab();
        await salesPage.openSpecificLeadFile('Firstleadlastname');
        expect(salesPage.filledStatusField('Contacted')).toBeVisible(extendedTimeout);
        await salesPage.revertStatusToNew();
    });

    test('Test 10: Complete the Lead @smoke', async ({ page }) => {
        let leadCompany = 'Testleadcompany';
        await homePage.clickSalesTab();
        await salesPage.clickNewLeadButton();
        await salesPage.enterLeadLastName('Testleadlastname');
        await salesPage.enterLeadCompany(leadCompany);
        await salesPage.saveNewLead();
        await salesPage.changeStatusToConverted();
        await expect(salesPage.successHeading).toBeVisible();
        await salesPage.returnToLeads();
        await homePage.clickAccountsTab();
        await accountsPage.deleteSpecificAccount(leadCompany);
    });
});
