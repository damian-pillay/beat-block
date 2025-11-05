/// <reference types="cypress" />

describe("", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.visit("/");
    cy.fixture("user").as("userData");

    cy.get("@userData").then((user) => {
      cy.get('input[placeholder="Enter your email"]').type(user.email);
      cy.get('input[placeholder="Enter your password"]').type(user.password);
    });

    cy.contains("button", "LOGIN").click();
    cy.get("#greetings-message").should("exist").should("be.visible");
  });

  it("should open project modal when project block is clicked", () => {
    cy.get(".project-block").first().click();

    const projectViewerModal = cy.get(".project-viewer-modal");

    projectViewerModal.should("exist").should("be.visible");
    projectViewerModal.get("#project-title").should("be.visible");
    projectViewerModal.get("#project-description").should("be.visible");

    projectViewerModal
      .get(".icon-label")
      .get('[id="Key Signature"]')
      .should("exist")
      .should("be.visible");

    projectViewerModal
      .get(".icon-label")
      .get('[id="Beats Per Minute"]')
      .should("exist")
      .should("be.visible");

    projectViewerModal
      .get(".icon-label")
      .get('[id="Digital Audio Workstation"]')
      .should("exist")
      .should("be.visible");

    projectViewerModal
      .get(".icon-label")
      .get('[id="Genre"]')
      .should("exist")
      .should("be.visible");

    projectViewerModal
      .get("#date-created")
      .should("exist")
      .should("be.visible");

    projectViewerModal
      .get("#date-updated")
      .should("exist")
      .should("be.visible");

    projectViewerModal
      .get("#project-audio-image")
      .should("exist")
      .should("be.visible");

    projectViewerModal
      .get('[id="Delete Project"]')
      .should("exist")
      .should("be.visible");

    projectViewerModal
      .get('[id="Edit Project"]')
      .should("exist")
      .should("be.visible");

    projectViewerModal
      .get('[id="Play Audio"]')
      .should("exist")
      .should("be.visible");

    projectViewerModal
      .get("#files-download-button")
      .should("exist")
      .should("be.visible");

    projectViewerModal
      .get("#audio-download-button")
      .should("exist")
      .should("be.visible");
  });

  it("should open audio player when project play button is clicked", () => {
    cy.get(".project-block").first().click();
    const projectViewerModal = cy.get(".project-viewer-modal");

    projectViewerModal.should("exist").should("be.visible");

    projectViewerModal
      .get("#project-title")
      .invoke("text")
      .then((text) => {
        projectViewerModal
          .get('[id="Play Audio"]')
          .should("exist")
          .should("be.visible")
          .click();

        cy.get("#audio-player")
          .should("exist")
          .should("be.visible")
          .contains(text);
      });
  });
});
