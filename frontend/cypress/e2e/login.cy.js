/// <reference types="cypress" />

describe("Logging in", () => {
  beforeEach(function () {
    cy.clearAllCookies();
    cy.visit("/");
    cy.fixture("user").as("userData");
  });

  it("should redirect to login page", () => {
    cy.contains("Login").should("be.visible");
    cy.url().should("include", "/login");
  });

  it("should not accept invalid credentials", () => {
    cy.contains("button", "LOGIN").click();
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
  });

  it("should log into home page with valid credentials", () => {
    cy.get("@userData").then((user) => {
      cy.get('input[placeholder="Enter your email"]').type(user.email);
      cy.get('input[placeholder="Enter your password"]').type(user.password);
    });

    cy.contains("button", "LOGIN").click();
    cy.get("#greetings-message").should("exist").should("be.visible");
  });
});
