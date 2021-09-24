Feature("Clouds");

Scenario("Load page and see clouds while clicking on regions", ({ I }) => {
  I.amOnPage("/");
  I.see("Enhanced cloud selection");
  I.click("Google Cloud Platform");
  I.click("Asia");
  I.see("Asia, Korea - Google Cloud: Seoul");
  I.click("Canada");
  I.see("Canada, Ontario - Google Cloud: Toronto");
  I.dontSee("Asia, Korea - Google Cloud: Seoul");
  I.click("Amazon Web Services");
  I.click("Europe");
  I.see("Europe, England - Amazon Web Services: London");
  I.dontSee("Canada, Ontario - Google Cloud: Toronto");
  I.dontSee("Asia, Korea - Google Cloud: Seoul");
}).retry(3);

export {};
