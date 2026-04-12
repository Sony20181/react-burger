/// <reference types="cypress" />
describe("Проверка главной страницы", () => {
  it("должна открыться главная страница", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Соберите бургер");
  });
});
