import { Page } from '@playwright/test';
import BasePage from './base.page';
import { extendedTimeout } from 'playwright.config';

export default class SalesPage extends BasePage {
    get newLeadButton() {
        return this.page.locator('//span[text()="Leads"]/ancestor::div[@class="slds-grid"]/descendant::a[@title="New"]');
    }
    get newLeadLastNameInput() {
        return this.page.getByPlaceholder('Last Name');
    }
    get newLeadCompanyInput() {
        return this.page.getByLabel('*Company');
    }
    get newLeadSaveButton() {
        return this.page.getByRole('button', { name: 'Save', exact: true });
    }
    get leadLastName() {
        return this.page.locator('records-highlights2 lightning-formatted-name');
    }
    get leadFileActionsDropDown() {
        return this.page.getByRole('button', { name: 'Show more actions' })
    }
    get deleteOption() {
        return this.page.getByRole('menuitem', { name: 'Delete' });
    }
    get deleteButton() {
        return this.page.getByRole('button', { name: 'Delete' });
    }
    get leadLastNames() {
        return this.page.locator(`a[data-refid="recordId"]`);
    }
    specificLeadListName(leadLastname: string) {
        return this.page.locator(`a[data-refid="recordId"][title='${leadLastname}']`);
    }
    specificStatusTab(status: string) {
        return this.page.locator(`a[data-tab-name='${status}']`)
    }
    get markAsCurrentButton() {
        return this.page.locator('button').filter({ hasText: 'Mark as Current Status' });
    }
    filledStatusField(status: string) {
        return this.page.locator('lightning-formatted-text').filter({ hasText: `${status}` });
    }
    get editLeadStatusDropdown() {
        return this.page.locator('button[title="Edit Lead Status"]');
    }
    get qualifiedLeadStatusOption() {
        return this.page.getByRole('option', { name: 'Qualified', exact: true }).locator('span').nth(1);
    }
    get saveButton() {
        return this.page.getByRole('button', { name: 'Save' });
    }
    get selectConvertedStatusButton() {
        return this.page.locator('button').filter({ hasText: 'Select Converted Status' });
    }
    get completeStatusButton() {
        return this.page.locator('button').filter({ hasText: 'Mark Status as Complete' })
    }
    get convertTheLeadButton() {
        return this.page.getByRole('button', { name: 'Convert' })
    }
    get convertTheLeadPopupButton() {
        return this.page.locator('//button[text()="Convert"][@class="slds-button slds-button_brand"]');
    }
    get successHeading() {
        return this.page.getByRole('heading', { name: 'Your lead has been converted' })
    }
    get goToLeadsButton() {
        return this.page.getByRole('button', { name: 'Go to Leads' });
    }
    get leadsTab() {
        return this.page.getByRole('link', { name: 'Leads' });
    }
    

    constructor(page: Page) {
        super(page);
    }

    
    async clickNewLeadButton() {
        await this.leadsTab.click();
        await this.page.getByRole('row', { name: 'Select item 1' }).getByRole('button').waitFor({state: 'visible'});
        await this.leadLastNames.waitFor({state: 'visible'});
        await this.newLeadButton.click();
    }
    async enterLeadLastName(lastName: string) {
        await this.newLeadLastNameInput.fill(lastName, extendedTimeout);
    } 
    async enterLeadCompany(leadCompany: string) {
        await this.newLeadCompanyInput.fill(leadCompany);
    }
    async saveNewLead() {
        await this.newLeadSaveButton.click();
    }

    async clickLeadFileActionsDropDown() {
        await this.leadFileActionsDropDown.click(extendedTimeout);
    }
    async deleteTheLead() {
        await this.deleteOption.click();
        await this.deleteButton.click();
    }

    async openSpecificLeadFile(leadLastname: string) {
        await this.leadsTab.click();
        await this.specificLeadListName(leadLastname).click()
    }
    async changeLeadStatus(desiredStatus: string) {
        await this.specificStatusTab(desiredStatus).click(extendedTimeout);
        await this.markAsCurrentButton.click();
    }
    async revertStatusToNew() {
        await this.specificStatusTab('New').locator('xpath=./descendant::lightning-icon[@icon-name="utility:check"]').waitFor({state: 'visible'});
        await this.specificStatusTab('New').click();
        await this.page.locator('a[data-tab-name="New"][aria-selected="true"]').waitFor({state: 'visible'});
        await this.markAsCurrentButton.click();
    }
    async changeStatusToConverted() {
        await this.convertTheLeadButton.click();
        await this.page.getByText('0 Account Matches', { exact: true }).waitFor({state: 'visible', ...extendedTimeout});
        await this.convertTheLeadPopupButton.click();
    } 
    async returnToLeads() {
        await this.goToLeadsButton.click();
    }
}