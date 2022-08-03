let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, timeout = 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, timeout = 60000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  }, timeout = 60000);
});

test("The h1 should contain 'team'", async () => {
  await page.goto("https://github.com");
  const teamLink = await page.$("header nav > ul > li:nth-child(2) > a");
  await teamLink.click();

  await page.waitForNavigation()

  await page.waitForSelector("h1");
  const title3 = await page.title();
  expect(title3).toEqual("GitHub for teams · Build like the best teams on the planet · GitHub");
}, timeout = 60000);

test("The h1 should contain 'marketplace'", async () => {
  await page.goto("https://github.com");
  const marketplaceLink = await page.$("nav > ul > li:nth-child(5) > a");
  await marketplaceLink.click();

  await page.waitForNavigation()

  await page.waitForSelector("h1");
  const title4 = await page.title();
  expect(title4).toEqual("GitHub Marketplace · to improve your workflow · GitHub");
}, timeout = 60000);

test("The h1 should contain search", async () => {
  await page.goto("https://github.com");
  const searchLink = await page.$("[placeholder='Search GitHub']");
  await searchLink.type("JavaScript");
  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  await page.waitForSelector("h2");
  const title5 = await page.title();
  expect(title5).toEqual("Search · JavaScript · GitHub");
}, timeout = 60000);