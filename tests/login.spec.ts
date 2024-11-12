import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { invalidUsers, validUsers } from '../setup/userCredentials';
import * as translations from '../setup/languages/eng.json'
import { loginPageUrl, productPageUrl } from '../setup/urls';

test.beforeEach(async({page}) => {
    await page.goto(loginPageUrl)
})

test.describe("Successful Login As All Types Of Users", () => {
  
    test("Should be successfully logged in as standard user after typing valid credentials and clicking LOGIN button", async({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.loginUser(validUsers[0].user, validUsers[0].password)
        expect(page.url()).toEqual(productPageUrl)
    })

    test("Should be successfully logged in as problem user after typing valid credentials and clicking LOGIN button", async({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.loginUser(validUsers[1].user, validUsers[1].password)
        expect(page.url()).toEqual(productPageUrl)

    })

    test("Should be successfully logged in as performance glitch user after typing valid credentials and clicking LOGIN button", async({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.loginUser(validUsers[2].user, validUsers[2].password)
        expect(page.url()).toEqual(productPageUrl)
    })
})

test.describe("Failed Login", () => {

    test("Should fail after typing locked user credentials and clicking LOGIN button", async({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.loginUser(invalidUsers[0].user, invalidUsers[0].password)
        await expect(page.locator('#login_button_container')).toContainText(translations['loginPage.error.userLockedOut'])
    })

    test("Should fail after typing invalid username and valid password", async({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.loginUser('wrong_username', validUsers[0].password)
        await expect(page.locator('#login_button_container')).toContainText(translations['loginPage.error.wrongCredentials'])
    })

    test("Should fail after typing valid username and invalid password", async({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.loginUser(validUsers[0].user, "wrong_password")
        await expect(page.locator('#login_button_container')).toContainText(translations['loginPage.error.wrongCredentials'])
    })
})