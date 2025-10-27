/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.visit("http://localhost:5174/");
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
    cy.get('input[placeholder="Enter your email"]').type("b-ano@email.com");
    cy.get('input[placeholder="Enter your password"]').type("Dlp131220!");
    cy.contains("button", "LOGIN").click();
    cy.get("#greetings-message").should("exist").should("be.visible");
  });
});
