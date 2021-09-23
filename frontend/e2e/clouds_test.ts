Feature("clouds");

Scenario("Load page and see AWS regions", ({ I }) => {
  I.amOnPage("/");
  I.see("Enhanced cloud selection");
  I.see("Asia");
});

export {};
