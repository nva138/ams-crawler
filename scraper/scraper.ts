import { chromium } from "playwright";

let hasNextPage = true;
let currentPage = 1;
const jobsList = [];

(async() => {
    const browser = await chromium.launch({headless: true});
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
        while (hasNextPage) {
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
                const lastUpdatedAt = await job
                    .locator('#ams-search-joboffer-lastUpdatedAt')
                    .textContent();
                const lastUpdatedAtClean = lastUpdatedAt?.trim();
                const [tag, monat, jahr] = (lastUpdatedAtClean ?? "").split(".");
                const isoDate = `${jahr}-${monat}-${tag}`

                jobsList.push({
                    title: cleanTitle,
                    company: company,
                    location: "Wien",
                    description: null,
                    url: url,
                    lastUpdatedAt: isoDate
                })
            }

            const nextButton = page.getByTestId('ams-pagination-list-next-link');
            const buttonIsVisible = await nextButton.isVisible();

            const nextButtonWrapper = page.getByTestId('ams-pagination-list-next');
            const wrapperClass = await nextButtonWrapper.getAttribute('class');
            const isDisabled = wrapperClass?.includes('disabled');

            const nextPage = currentPage + 1;
            if (buttonIsVisible && !isDisabled) {
                await page.getByTestId('ams-pagination-list-next-link').click();

                try {

                    await page.waitForFunction(
                        (expectedPage) => window.location.href.includes(`page=${expectedPage}`),
                        nextPage,
                        { timeout: 10000 }
                    )
                    await page.waitForTimeout(700);

                } catch (timeoutError) {
                    console.error(`Timeout beim Laden von Seite ${nextPage}. Breche ab und sichere Daten.`);
                    hasNextPage = false;
                }
            } else {
                hasNextPage = false;
            }
            currentPage = nextPage;

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

