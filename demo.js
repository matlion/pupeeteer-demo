const puppeteer = require('puppeteer');

const VALID_STATUS = [200, 304, 206, 302, 204];

class Browser {
    async prepareBrowser() {
        let browser = await puppeteer.launch({
            headless: true,
            args: ['--proxy-server='],
            slowMo: 250
        });


        // open chromium
        let page = await browser.newPage();

        page.setViewport({width: 1920, height: 1200});

        await page.goto("https://www.softwerkskammer.org/");

        await page.click('a[href^="/dashboard"]');

        await browser.close();
    }
}

class Util {

    static isStatusOk(status) {
        return VALID_STATUS.includes(status);
    };
}

new Browser().prepareBrowser();
