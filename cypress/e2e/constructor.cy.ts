/// <reference types="cypress" />
import { selectors } from "../support/selectors";

describe("Страница Конструктор", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("должна собрать бургер, создать заказ и показать номер заказа", () => {
    cy.contains("Соберите бургер");

    // Собираем бургер
    cy.addIngredient("Булки");
    cy.addIngredient("Соусы");
    cy.addIngredient("Начинки");

    // Проверка, что ингредиенты добавились
    cy.get(selectors.constructorElement).should("have.length.at.least", 3);

    // Оформление заказа
    cy.intercept("POST", "**/api/orders").as("createOrder");
    cy.contains("Оформить заказ").click();

    // Авторизация
    cy.url().should("include", "/login");
    cy.login("harinova2003@mail.ru", "1234512345");

    cy.url().should("include", "/");
    cy.contains("Соберите бургер").should("be.visible");

    // Снова на "Оформить заказ"
    cy.contains("Оформить заказ").click();
    cy.wait("@createOrder", { timeout: 20000 });

    // Появление модального окна
    cy.contains("идентификатор заказа", { timeout: 20000 }).should("exist");
    cy.closeModal();
  });

  describe("Модальное окно ингредиента", () => {
    it("должно открываться при клике на ингредиент", () => {
      cy.get(selectors.ingredientCard, { timeout: 10000 })
        .should("have.length.at.least", 1)
        .first()
        .click();
      cy.get(selectors.modal, { timeout: 5000 }).should("be.visible");
      cy.contains("Детали ингредиента").should("exist");
      cy.get('[class*="modal_nutrients"]').should("exist");
    });

    it("должно закрываться по клику на крестик", () => {
      cy.get(selectors.ingredientCard).first().click();
      cy.get(selectors.modal).should("be.visible");
      cy.closeModal();
    });

    it("должно закрываться по клику на оверлей", () => {
      cy.get(selectors.ingredientCard).first().click();
      cy.get(selectors.modal).should("be.visible");
      cy.get('[class*="modal_overlay"]').click({ force: true });
      cy.get(selectors.modal).should("not.exist");
    });
  });
});
