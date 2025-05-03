import {test,  expect} from '@playwright/test'
/** 
  Testin for Chrome browser
**/

test.beforeEach(async ({page}) => {
    await page.goto('https://www.bing.com/')
});

test.describe('Testing Search Information', () => {
    test('Search Information', async ({page}) => {
        // Search information
        const searchBarForm = page.getByRole('search')
        const textbox = searchBarForm.getByRole('textbox')
        await textbox.fill('Tesla');
        await page.waitForTimeout(1000);
        await expect(textbox).toHaveValue('Tesla')
        await searchBarForm.getByRole('textbox').press('Enter');
        
        // Wait for the page load
        await page.waitForURL('**/search*');
        const info = page.locator('#b_results');
        await info.scrollIntoViewIfNeeded();
        expect(info).toBeVisible();

        // Click the link and save the new tab context
        const [newTab] = await Promise.all([
            page.waitForEvent('popup'),
            info.locator('h2').first().click()
        ])
        
        // Verify new tab
        expect( newTab ).toHaveURL(/(tesla|vw|volvo|bmw)/);
    });
});