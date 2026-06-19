import { chromium } from "playwright";

let nextPage = true;

(async() => {
    const browser = await chromium.launch( {headless: false} );
    const page = await browser.newPage();
    await page.goto('https://jobs.ams.at/');
    await page
        .getByTestId('job-autocomplete')
        .getByTestId('ams-autocomplete-input')
        .fill('FullStack');
    await page
        .getByTestId('location-autocomplete')
        .getByTestId('ams-autocomplete-input')
        .fill('Wien');
    await page
        .getByRole('button', {name: 'Suchen'})
        .press('Enter');
    while(nextPage) {
        await page.waitForLoadState('networkidle');
        const jobs = await page
            .getByRole('navigation', {name: 'Suchergebnisse'})
            .getByRole('listitem')
            .all();

        for (const job of jobs) {
            const title = await job
                .getByRole('link')
                .first()
                .textContent();
            const cleanTitle = title?.trim();
            const company = await job
                .locator('ams-key-value-pair')
                .filter({ hasText: 'Unternehmen' })
                .getByTestId('key-value-pair-content')
                .textContent();
            const url = await job
                .getByRole('link')
                .first()
                .getAttribute('href');
            console.log(company, cleanTitle, url)
        }
        const nextButton = page?.getByTestId('ams-pagination-list-next-link');
        const buttonExcists = await nextButton?.isVisible();

        if(buttonExcists) {
            await page?.getByTestId('ams-pagination-list-next-link').click();
            // await page.waitForTimeout(2000);

        }
        else {
            nextPage = false;
        }
    }
        await page.pause();
})()
