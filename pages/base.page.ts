import { Page } from "@playwright/test";

export default abstract class BasePage {
    constructor(readonly page: Page) {}
}