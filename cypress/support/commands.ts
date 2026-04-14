import { selectors } from "./selectors";

// Drag-and-drop для добавления ингредиента
Cypress.Commands.add("addIngredient", (category: string) => {
  const dropZone = cy.get(selectors.constructorContainer).first();

  cy.contains(category)
    .first()
    .parents("section")
    .first()
    .find(selectors.ingredientCard)
    .first()
    .trigger("dragstart", { force: true });

  dropZone
    .trigger("dragenter", { force: true })
    .trigger("dragover", { force: true })
    .trigger("drop", { force: true });

  cy.get(selectors.ingredientCard).first().trigger("dragend", { force: true });
});

// Закрытие модального окна
Cypress.Commands.add("closeModal", () => {
  cy.get(selectors.modalCloseButton).click();
  cy.get(selectors.modal).should("not.exist");
});

// Авторизация
Cypress.Commands.add("login", (email: string, password: string) => {
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').should("not.be.disabled").click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredient(category: string): Chainable<void>;
      closeModal(): Chainable<void>;
      login(email: string, password: string): Chainable<void>;
    }
  }
}
