import { chromium } from "playwright";

let nextPage = true;
const jobsList = [];

(async() => {
    const browser = await chromium.launch({headless: false});
    const page = await browser.newPage();
    try {

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
        while (nextPage) {
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
                    .filter({hasText: 'Unternehmen'})
                    .getByTestId('key-value-pair-content')
                    .textContent();
                const url = await job
                    .getByRole('link')
                    .first()
                    .getAttribute('href');
                jobsList.push({
                    title: cleanTitle,
                    company: company,
                    location: "Wien",
                    description: null,
                    url: url
                })
            }

            const nextButton = page?.getByTestId('ams-pagination-list-next-link');
            const buttonIsVisible = await nextButton?.isVisible();
            const isDisabled =  await page.
            locator('.disabled[data-testid="ams-pagination-list-next"]')
                .isVisible()
            console.error("visible:", buttonIsVisible, "disabled:", isDisabled);

            if (buttonIsVisible && !isDisabled) {
                await page?.getByTestId('ams-pagination-list-next-link').click();
                await page.waitForTimeout(2000);

            }
            else {
                nextPage = false;
            }
        }
        const scraperOutput = JSON.stringify(jobsList)
        console.log(scraperOutput)

    }
    catch(e){
        console.error("Scraper failed:", e);
        throw e
    }
    finally {

        await browser.close();
}

})()

