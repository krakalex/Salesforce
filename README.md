# Salesforce website testing automation​

Graduation project.

## Product Overview
Salesforce - is a cloud-based Customer Relationship Management (CRM) platform that helps businesses streamline their operations, manage customer data, and improve customer relationships.

Salesforce structure:
- Sales Cloud: Manage leads, opportunities, and sales pipelines.
- Service Cloud: Enhance customer support with case tracking and self-service options.
- Marketing Cloud: Automate and personalize marketing campaigns.
- Commerce Cloud: Deliver seamless e-commerce experiences.
- Analytics: Gain insights with powerful reporting tools.

Key features:
- Scalable and customizable to fit businesses of all sizes.
- Accessible from anywhere with a reliable cloud infrastructure.
- Robust ecosystem with integrations and third-party apps available on the Salesforce AppExchange.

## Testing Checklist
- Sign Up/Sign In to the account​

- Create and delete a Task​

- Create and delete an Account​

- Create and delete a Contact linked to an Account​

- Create and delete an Opportunity linked to an Account​

- Link and delete a File to an Account​

- Create and delete a Lead​

- Change the Lead status and revert it back​

- Complete a Lead

## Installation Requirements
- VS Code
- npm
## Technologies Stack
- Java Script + TypeScript
- Node.js
- Playwright

## Setting Up The Environment
- Create an account at Salesforce;
- Create the Account with 'Accnam' name: 
  - Accounts tab -> Click the New button
- Set up your IP range in order to avoid Two-factored Authentification:
  - Quick Settings -> Open Advanced Setup;
  - SETTINGS section: > Security -> Network Access;
  - Click the New button and provide your IP range;
  - Save changes.
- Change the credentials in the repository's .env file
  - Provide your username in the TESTUSERNAME variable;
  - Provide your password in the corresponding variable;
- Clone the Project

## Commands For Launching and Reporting
```bash
npx playwright test
```
To start test on Firefox browser:
```bash
npm run test:firefox
```
To start smoke tests:
```bash
npx playwright test --grep '@smoke'
```
To start regression tests:
```bash
npx playwright test --grep '@regression'
```
Generate a report:
```bash
npx playwright show-report
```
Thank you for your attention!

© Aliaksandr Krakasevich