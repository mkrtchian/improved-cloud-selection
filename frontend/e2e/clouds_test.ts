Feature("Clouds");

Scenario("Load page and see regions while clicking on providers", ({ I }) => {
  I.amOnPage("/");
  I.see("Enhanced cloud selection");
  I.see("Asia");
}).retry(1);

export {};
