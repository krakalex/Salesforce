import { Page } from "@playwright/test";
import BasePage from "./base.page";

export default class LoginPage extends BasePage {
    get usernameInput() { return this.page.locator('#username') }
    get passwordInput() { return this.page.locator('#password') }
    get logInButton() { return this.page.locator('#Login') }
    constructor(page: Page) {
        super(page);
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.logInButton.click();
    }
}