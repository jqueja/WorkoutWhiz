describe("The home page", () => {
     it("Home navigates to the Login if no UUID", () => {
          // Attempt to navigate to home
          cy.visit("/");

          // Assert that the URL is redirected to /login
          cy.url().should("include", "/login");

          // Confirm at log in via text
          cy.get("h2").should("contain", "Login Page"); // Replace with an actual selector from your login page
     });
});
