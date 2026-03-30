describe("Страница Конструктор", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("должна собрать бургер, создать заказ и показать номер заказа", () => {
    cy.contains("Соберите бургер");

    const dropZone = cy.get('[class*="burger-constructor_container"]').first();

    // drag-and-drop
    const dragAndDrop = (dragElement: Cypress.Chainable) => {
      dragElement.trigger("dragstart", { force: true });
      dropZone.trigger("dragenter", { force: true });
      dropZone.trigger("dragover", { force: true });
      dropZone.trigger("drop", { force: true });
      dragElement.trigger("dragend", { force: true });
    };

    // Собираем бургер
    const bun = cy
      .contains("Булки")
      .first()
      .parents("section")
      .first()
      .find('[class*="burger-ingredient_ingredientCard"]')
      .first();
    dragAndDrop(bun);

    const sauce = cy
      .contains("Соусы")
      .first()
      .parents("section")
      .first()
      .find('[class*="burger-ingredient_ingredientCard"]')
      .first();
    dragAndDrop(sauce);

    const main = cy
      .contains("Начинки")
      .first()
      .parents("section")
      .first()
      .find('[class*="burger-ingredient_ingredientCard"]')
      .first();
    dragAndDrop(main);

    // Проверка, что ингредиенты добавились
    cy.get('[class*="constructor-element"]').should("have.length.at.least", 3);

    // Оформление заказ
    cy.intercept("POST", "**/api/orders").as("createOrder");
    cy.contains("Оформить заказ").click();

    // Авторизация
    cy.url().should("include", "/login");
    cy.get('input[name="email"]').type("harinova2003@mail.ru");
    cy.get('input[name="password"]').type("1234512345");
    cy.get('button[type="submit"]').should("not.be.disabled").click();
    cy.url().should("include", "/");
    cy.get('[class*="login_containerLogin"]').should("not.exist");
    cy.contains("Соберите бургер").should("be.visible");

    // Снова на "Оформить заказ"
    cy.contains("Оформить заказ").click();
    cy.wait(2000);
    cy.wait("@createOrder", { timeout: 20000 });
    cy.wait(1000);

    // Появление модального окна
    cy.contains("идентификатор заказа", { timeout: 20000 }).should("exist");

    // Закрытие модальное окно
    cy.get('[class*="modal_closeButton"]').click();
    cy.get('[class*="modal_modal"]').should("not.exist");
  });

  describe("Модальное окно ингредиента", () => {
    it("должно открываться при клике на ингредиент", () => {
      cy.contains("Соберите бургер");

      // Загрузки ингредиентов
      cy.get('[class*="burger-ingredient_ingredientCard"]', { timeout: 10000 })
        .should("have.length.at.least", 1)
        .first()
        .click();
      cy.get('[class*="modal_modal"]', { timeout: 5000 }).should("be.visible");

      // Проверка,в модальном окне есть детали ингредиента
      cy.contains("Детали ингредиента").should("exist");
      cy.get('[class*="modal_nutrients"]').should("exist");
    });

    it("должно закрываться по клику на крестик", () => {
      cy.contains("Соберите бургер");
      cy.get('[class*="burger-ingredient_ingredientCard"]').first().click();
      cy.get('[class*="modal_modal"]').should("be.visible");

      cy.get('[class*="modal_closeButton"]').click();
      cy.get('[class*="modal_modal"]').should("not.exist");
    });

    it("должно закрываться по клику на оверлей (вне модалки)", () => {
      cy.contains("Соберите бургер");
      cy.get('[class*="burger-ingredient_ingredientCard"]').first().click();
      cy.get('[class*="modal_modal"]').should("be.visible");

      cy.get('[class*="modal_overlay"]').click({ force: true });
      cy.get('[class*="modal_modal"]').should("not.exist");
    });
  });
});
