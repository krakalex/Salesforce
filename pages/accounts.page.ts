import { Page } from '@playwright/test';
import BasePage from './base.page';

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
}
