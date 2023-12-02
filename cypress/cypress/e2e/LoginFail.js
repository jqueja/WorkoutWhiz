// cypress/integration/login_spec.js

describe("Login Page", () => {
     beforeEach(() => {
          cy.visit("http://localhost:3000/login"); // Update the URL accordingly
     });

     it("should display an error for invalid credentials", () => {
          // Input invalid credentials and click the login button
          cy.get("#typeEmailX").type("invalid-email@example.com");
          cy.get("#typePasswordX").type("invalid-password");
          cy.get("button").contains("Login").click();

          // Assert that an alert is shown for login failure
          cy.on("window:alert", (alertText) => {
               expect(alertText).to.contain(
                    "Login failed. Please check your credentials."
               );
          });

          // Assert that navigation did not occur after failed login
          cy.url().should("eq", "http://localhost:3000/login");
     });
});
