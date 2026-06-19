import { chromium } from "playwright";

(async() => {
    const browser = await chromium.launch( {headless: false} );
    const page = await browser.newPage();
    await page.goto('https://jobs.ams.at/');
    await page.getByTestId('job-autocomplete').getByTestId('ams-autocomplete-input').fill('FullStack');
    await page.getByTestId('location-autocomplete').getByTestId('ams-autocomplete-input').fill('Wien');
    await page.getByRole('button', {name: 'Suchen'}).press('Enter');
    await page.waitForLoadState('networkidle');
    const jobs = await page.getByRole('navigation', {name: 'Suchergebnisse'}).getByRole('listitem').all();
    console.log(jobs.length);
        await page.pause();
})()
