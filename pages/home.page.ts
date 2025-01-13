import { Page } from '@playwright/test';
import BasePage from './base.page';
import { extendedTimeout } from 'playwright.config';

export default class HomePage extends BasePage {
    get titleText() {
        return this.page.locator('.spotlightTitleText');
    }
    get homeTab() {
        return this.page.getByText('HomeHome');
    }
    get homeCloudButton() {
        return this.page.locator('#oneHeader').getByRole('link', { name: 'Home' });
    }
    get accountsTab() {
        return this.page.locator('//span[text()="Accounts"][contains(@class, "small")]/parent::a[@tabindex="0"]');
    }
    get accountsInnerTab() {
        return this.page.getByLabel('Global', { exact: true }).getByRole('link', { name: 'Accounts' });
    }
    get contactsTab() {
        return this.page.getByRole('link', { name: 'Contacts', exact: true });
    }
    get contactsInnerTab() {
        return this.page.getByLabel('Global', { exact: true }).getByRole('link', { name: 'Contacts' });
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
    get toDoListButton() {
        return this.page.getByRole('button', { name: 'To Do List' });
    }
    get newTaskButton() {
        return this.page.getByRole('button', { name: 'New Task' });
    }
    get newTaskSubjectDropdown() {
        return this.page.getByLabel('*Subject');
    }
    get callOption() {
        return this.page.getByRole('option', { name: 'Call' });
    }
    get callToDoRecord() {
        return this.page.getByLabel('To Do List').getByRole('link', { name: 'Call' });
    }
    get markTheTaskAsCompleteButton() {
        return this.page.getByTitle('Mark Complete');
    }
    
    constructor(page: Page) {
        super(page);
    }

    async clickHomeTab() {
        return await this.homeTab.click(extendedTimeout);
    }
    async clickAccountsTab() {
        await this.accountsTab.click(extendedTimeout);
        await this.accountsInnerTab.click();
    }
    async clickContactsTab() {
        await this.contactsTab.click(extendedTimeout);
        await this.contactsInnerTab.click();
    }

    async clickNewContactButton() {
        await this.newContactButton.click();
    }
    async clickAccountNameDropDown() {
        await this.page.locator('force-record-avatar span').waitFor({state: 'visible', ...extendedTimeout});
        await this.accountNameDropDown.click(extendedTimeout);
    }
    async clickNewAccountOption() {
        await this.newAccountOption.click();
    }
    async enterAccountName(accountName: string) {
        await this.accountNameInput.fill(accountName, extendedTimeout)
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
        await this.salesTab.click(extendedTimeout);
    }
    
    async clickToDoListButton() {
        await this.toDoListButton.click();
    }
    async addNewCallTask() {
        await this.newTaskButton.click();
        await this.newTaskSubjectDropdown.click(extendedTimeout);
        await this.callOption.click();
        await this.saveButton.click();
    }
    async markTheTaskAsComplete() {
        return this.markTheTaskAsCompleteButton.click();
    }
    async clickHomeCloudButton() {
        await this.homeCloudButton.click();
    }

}   
