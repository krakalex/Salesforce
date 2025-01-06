import { Page } from '@playwright/test';
import BasePage from './base.page';

export default class ContactsPage extends BasePage {
    get contactFileLastNamePlaceHolder() {
        return this.page.locator('//records-entity-label[text()="Contact"]/parent::slot/parent::div/following-sibling::slot/child::lightning-formatted-name')
    }
    get contactFileActionsDropDown() {
        return this.page.locator('records-highlights2').getByRole('button', { name: 'Show more actions' })
    }
    get deleteOption() {
        return this.page.getByRole('menuitem', { name: 'Delete' });
    }
    get deleteButton() {
        return this.page.getByRole('button', { name: 'Delete' });
    }
    specificContactName(contactName: String) {
        return this.page.getByRole('link', { name: `${contactName}` })
    }

    constructor(page: Page) {
        super(page);
    }

    async getContactFileLastName() {
        return await this.contactFileLastNamePlaceHolder.textContent();
    }
    async deleteCreatedContact() {
        await this.contactFileActionsDropDown.click();
        await this.deleteOption.click();
        await this.deleteButton.click();
    }
}