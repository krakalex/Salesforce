import { Page } from '@playwright/test';
import BasePage from './base.page';
import path from 'path';

export default class AccountPage extends BasePage {
    specificAccountName(accountName: String) {
        return this.page.locator(`a[data-refid="recordId"][title=${accountName}]`);
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
        return this.page.getByRole('button', { name: 'Save' });
    }
    specificOpportunity(opportunityName: String) {
        return this.page.locator(`//article[@aria-label="Opportunities"]/descendant::article[@aria-label='${opportunityName}']`);
    }
    get firstOpportunityActionsDropdown() {
        return this.page.getByRole('button', { name: 'Show Actions' }).first();
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
    get filesActionsDropdown() {
        return this.page.getByRole('button', { name: 'Show actions for Files' });
    }
    get addFilesOption() {
        return this.page.getByRole('menuitem', { name: 'Add Files' }).first();
    }
    specificFileName(fileName: String) {
        return this.page.locator(`span[class*="desktop"][title='${fileName.substring(0, fileName.indexOf('.'))}']`);
    }
    specificOwnedFile(fileName: String) {
        return this.page.locator(`//span[@title='${fileName.substring(0, fileName.indexOf('.'))}']/ancestor::a[@role='option']`);
    }
    get addOwnedFileButton() {
        return this.page.getByRole('button', { name: 'Add (1)' });
    }
    get fileActionsDropdown() {
        return this.page.getByRole('button', { name: 'Show More' });
    }
    get deleteTheFileOption() {
        return this.page.getByRole('link', { name: 'Delete' });
    }
    get accountsHeading() {
        return this.page.getByRole('heading', { name: 'Accounts' }).locator('span');
    }

    constructor(page: Page) {
        super(page);
    }
    async findSpecificAccountName(accountName: String) {
        await this.allAccountNames.filter({ hasText: `${accountName}` });
    }
    async deleteSpecificAccount(accountName: String) {
        await this.accountsHeading.waitFor({ state: 'visible' });
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
        await this.newOpportunityNameInput.fill(opportunityName);
    }
    async saveNewOpportunity() {
        await this.saveButton.click();
    }
    async deleteSpecificOpportunity(opportunityName: string) {
        await this.firstOpportunityActionsDropdown.click();
        await this.deleteTheOpportunityOption.click();
        await this.deleteButton.click();
    }
    async uploadSpecificFile(filepath: string) {
        await this.fileInput.setInputFiles(path.join('upload-data', filepath));
    }
    async confirmUpload() {
        await this.doneUploadButton.click();
    }
    async uploadSpecificOwnedFile(fileName: string) {
        await this.filesActionsDropdown.click();
        await this.addFilesOption.click();
        await this.specificOwnedFile(fileName).click();
        await this.addOwnedFileButton.click();
    }
    async deleteSpecificUploadFile(fileName: string) {
        await this.specificFileName(fileName).click();
        await this.fileActionsDropdown.click();
        await this.deleteTheFileOption.click();
        await this.deleteButton.click();
    }
}
