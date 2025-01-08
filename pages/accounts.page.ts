import { Page } from '@playwright/test';
import BasePage from './base.page';
import path from 'path';
import { TIMEOUT } from 'dns';

export default class AccountPage extends BasePage {
    specificAccountName(accountName: String) {
        return this.page.locator(`a[data-refid="recordId"][title=${accountName}]`)
    }
    get allAccountNames() {
        return this.page.locator('a[data-refid="recordId"]');
    }
    get accountActionsDropdown() {
        return this.page.locator('records-highlights2').getByRole('button', { name: 'Show more actions' });
    }
    get deleteDropdownOption() {
        return this.page.locator('[title="Delete"]');
    }
    get deleteButton() {
        return this.page.getByRole('button', { name: 'Delete' });
    }
    get newOpportunityButton() {
        return this.page.getByRole('button', { name: 'New Opportunity' });
    }
    get newOpportunityNameInput() {
        return this.page.getByLabel('Opportunity Name');
    }
    get saveButton() {
        return this.page.getByRole('button', { name: 'Save' })
    }
    specificOpportunity(opportunityName: String) {
        return this.page.locator(`//article[@aria-label="Opportunities"]/descendant::article[@aria-label='${opportunityName}']`)
    }
    get firstOpportunityActionsDropdown() {
        return this.page.getByRole('button', { name: 'Show Actions' }).nth(1);
    }
    get deleteTheOpportunityOption() {
        return this.page.getByRole('menuitem', { name: 'Delete' });
    }
    get fileInput() {
        return this.page.locator('input[type="file"]');
    }
    get doneUploadButton() {
        return this.page.getByRole('button', { name: 'Done' });
    }
    specificFileName(fileName: String) {
        return this.page.locator(`span[title='${fileName.substring(0, fileName.indexOf('.'))}']`);
    }
    get fileActionsDropdown() {
        return this.page.getByRole('button', { name: 'Show More' });
    }
    get deleteTheFileOption() {
        return this.page.getByRole('link', { name: 'Delete' });
    }


    constructor(page: Page) {
        super(page);
    }
    async findSpecificAccountName(accountName: String) {
        await this.allAccountNames.filter({ hasText: `${accountName}` });
    }
    async deleteSpecificAccount(accountName: String) {
        await this.allAccountNames.filter({ hasText: `${accountName}` }).click();
        await this.accountActionsDropdown.click();
        await this.deleteDropdownOption.click();
        await this.deleteButton.click();
    }
    async openSpecificAccountFile(accountName: String) {
        await this.specificAccountName(accountName).click();
    }
    async clickNewOpportunityButton() {
        await this.newOpportunityButton.click();
    }
    async enterOpportunityName(opportunityName: string) {
        await this.newOpportunityNameInput.fill(opportunityName)
    }
    async saveNewOpportunity() {
        await this.saveButton.click();
    }
    async deleteSpecificOpportunity(opportunityName: string) {
        // await this.specificOpportunity(opportunityName).locator('/descendant::button[@aria-expanded="false"]').click();
        await this.firstOpportunityActionsDropdown.click();
        await this.deleteTheOpportunityOption.click();
        await this.deleteButton.click();
    }
    async uploadSpecificFile(filepath: string) {
        // await this.fileInput.scrollIntoViewIfNeeded({ timeout: 30000 });
        await this.fileInput.setInputFiles(path.join('upload-data', filepath));
    }
    async confirmUpload() {
        await this.doneUploadButton.click({ timeout: 10000 });
    }
    async deleteSpecificUploadFile(fileName: string) {
        await this.specificFileName(fileName).click();
        await this.fileActionsDropdown.click();
        await this.deleteTheFileOption.click()
        await this.deleteButton.click();
    }
    
}
