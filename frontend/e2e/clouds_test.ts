Feature("Clouds");

Scenario("Load page and see regions while clicking on providers", ({ I }) => {
  I.amOnPage("/");
  I.see("Enhanced cloud selection");
  I.see("Asia");
  I.click("Amazon Web Services");
  I.see("Europe");
}).retry(1);

export {};
