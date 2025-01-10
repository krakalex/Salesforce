import { Page } from '@playwright/test';
import BasePage from './base.page';

export default class HomePage extends BasePage {
    get titleText() {
        return this.page.locator('.spotlightTitleText');
    }
    get homeTab() {
        return this.page.getByText('HomeHome');
    }
    get accountsTab() {
        return this.page.locator('//span[text()="Accounts"][contains(@class, "small")]/parent::a[@tabindex="0"]');
    }
    get contactsTab() {
        return this.page.getByRole('link', { name: 'Contacts', exact: true })
    }
    get newContactButton() {
        return this.page.locator('//div/input[@data-value="My Contacts"]/ancestor::div[contains(@class, "headerWrapping")]/child::lightning-button');
    }
    get newContactLastNameInput() {
        return this.page.getByPlaceholder('Last Name');
    }
    get accountNameDropDown() {
        return this.page.locator('//label[text()="Account Name"]/following-sibling::div[contains(@class, "element__control")]/descendant::input');
    }
    get newAccountOption() {
        return this.page.locator("[data-value='actionCreateNew']");
    }
    get accountNameInput() {
        return this.page.getByLabel('*', { exact: true });
    }
    get saveButton() {
        return this.page.getByRole('button', { name: 'Save', exact: true });
    }
    get closeTheWindowButton() {
        return this.page.getByRole('button', { name: 'Close this window' });
    }
    get allAccountOptions() {
        return this.page.locator('//ul[@aria-label="Recent Accounts"]/descendant::span[@class="slds-truncate"]');
    }
    get salesTab() {
        return this.page.getByRole('link', { name: 'Sales' });
    }


    constructor(page: Page) {
        super(page);
    }

    async clickHomeTab() {
        return await this.homeTab.click({ timeout: 20000 });
    }
    async clickAccountsTab() {
        await this.accountsTab.click();
    }
    async clickContactsTab() {
        await this.contactsTab.click();
    }

    async clickNewContactButton() {
        await this.newContactButton.click();
    }
    async clickAccountNameDropDown() {
        await this.accountNameDropDown.click();
    }
    async clickNewAccountOption() {
        await this.newAccountOption.click();
    }
    async enterAccountName(accountName: string) {
        await this.accountNameInput.fill(accountName)
    }
    async clickCloseTheWindowButton() {
        await this.closeTheWindowButton.click();
    }
    async pickSpecificAccountOption(accountName: String) {
        await this.allAccountOptions.filter({ hasText: `${accountName}` }).click();
    }
    async enterContactLastName(lastName: string) {
        await this.newContactLastNameInput.fill(lastName);
    }
    async clickSavebutton() {
        await this.saveButton.click();
    }
    async clickSalesTab() {
        await this.salesTab.click({ timeout: 20000 });
    }

}   
