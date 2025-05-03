import { test, expect } from '@playwright/test';

test.beforeEach( async ({page}) => {
    await page.goto('https://pokemondb.net/pokedex/all');
});

test.describe('Testing pokedex', () => {
    test('Verify number by name', async ({page}) => {
        await page.getByLabel('Name:').fill('Nincada');
        const infoNumber = page.getByText('0290');
        await expect(infoNumber).toBeVisible();
    });

    test('Verify search by type', async ({page}) => {
        await page.getByLabel('Type:').selectOption('Bug')
        const infoName = page.getByRole('cell', { name: 'Beedrill', exact: true }).getByRole('link');
        await infoName.scrollIntoViewIfNeeded();
        await expect(infoName).toBeVisible();
    });

    test('Verify footer Privacy Policy locator', async ({page}) => {
        const footerInfo = page.locator('a', {hasText: 'Privacy Policy'})
        await expect(footerInfo).toHaveCount(1);
    });
});
