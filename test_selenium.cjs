const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function example() {
    let options = new chrome.Options();
    options.addArguments('--headless'); // run headless Chrome
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        let fileUrl = 'file:///' + __dirname.replace(/\\/g, '/') + '/index.html';
        console.log("Navigating to " + fileUrl);
        await driver.get(fileUrl);
        
        // Wait a bit for React to render
        await driver.sleep(1000);
        
        // Get browser logs
        let logs = await driver.manage().logs().get('browser');
        console.log("Browser Logs:");
        logs.forEach(log => {
            console.log(`[${log.level.name}] ${log.message}`);
        });

    } catch (e) {
        console.error(e);
    } finally {
        await driver.quit();
    }
})();
