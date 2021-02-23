describe("To-do list tasks", () => {
  it("Adds tasks", () => {
    cy.visit("/");

    cy.get("#menu-icon").click();
    cy.get("input#text").type("task");
    cy.get("button#submit-btn").click();
    cy.get("input#text").type("task2");
    cy.get("button#submit-btn").click();
    cy.get("input#text").type("task3");
    cy.get("button#submit-btn").click();

    cy.get("ul#list").children("li").should("have.length", 3);
    cy.get("ul#list")
      .children("li")
      .eq(0)
      .contains(/^task$/);
    cy.get("ul#list")
      .children("li")
      .eq(1)
      .contains(/^task2$/);
    cy.get("ul#list")
      .children("li")
      .eq(2)
      .contains(/^task3$/);

    cy.get("ul#list li div.task-container div i").should(
      "have.class",
      "fa-check"
    );
  });

  it("Done tasks", () => {
    cy.visit("/");

    cy.get("#menu-icon").click();
    cy.get("input#text").type("task");
    cy.get("button#submit-btn").click();

    cy.get("ul#list li div.task-container div i").eq(0).click();

    cy.get("ul#list li div.task-container div i")
      .eq(0)
      .should("have.class", "fa-times");
  });

  it("Remove tasks", () => {
    cy.visit("/");

    cy.get("#menu-icon").click();
    cy.get("input#text").type("task");
    cy.get("button#submit-btn").click();
    cy.get("input#text").type("task2");
    cy.get("button#submit-btn").click();
    cy.get("input#text").type("task3");
    cy.get("button#submit-btn").click();

    cy.get("ul#list li div.task-container div i").eq(0).click();
    cy.get("ul#list li div.task-container div i").eq(0).click();

    cy.get("ul#list").children().should("have.length", 2);
  });

  it("List's scroll", () => {
    cy.visit("http://127.0.0.1:5500");

    cy.get("#menu-icon").click();

    for (let i = 1; i <= 20; i++) {
      let task = `task${i}`;
      cy.get("input#text").type(task);
      cy.get("button#submit-btn").click();
    }

    cy.get("ul.scrollbar").scrollTo("bottom");
  });
});
