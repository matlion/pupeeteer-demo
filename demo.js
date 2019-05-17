const puppeteer = require('puppeteer');

class Browser {
    async prepareBrowser() {
        let browser = await puppeteer.launch({
            headless: false,
            args: ['--proxy-server='],
        });

        // open chromium
        let page = await browser.newPage();

        page.setViewport({width: 1920, height: 1200});

        await page.goto("https://www.softwerkskammer.org/");
    }
}

new Browser().prepareBrowser();
