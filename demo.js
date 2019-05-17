const puppeteer = require('puppeteer');

const VALID_STATUS = [200, 304, 206, 302, 204];

class Browser {
    async prepareBrowser() {
        let browser = await puppeteer.launch({
            headless: true,
            args: ['--proxy-server=']
        });


        // open chromium
        let page = await browser.newPage();

        // setup console logging
        page.on('console',
            msg => {
                if (msg._type === "error") {
                    let message = 'ERROR Console: ' + msg.text();
                    console.log(message);
                }
            }
        );

        // setup network logging
        await page.setRequestInterception(true);

        page.on('request', request => {
            request.continue(); // pass it through.
        });

        page.on('response', response => {
            const req = response.request();
            let status = response.status();
            if (!Util.isStatusOk(status)) {
                let message = 'ERROR Brow-Net: url ' + req.url() + ' status ' + status;
                console.log(message);
            }
        });

        page.setViewport({width: 1920, height: 1200});

        await page.goto("https://www.softwerkskammer.org/");
    }
}

class Util {

    static isStatusOk(status) {
        return VALID_STATUS.includes(status);
    };
}

new Browser().prepareBrowser();
