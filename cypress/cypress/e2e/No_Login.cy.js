describe("The home page", () => {
     beforeEach(() => {
          cy.viewport("iphone-6");
     });

     it("Home navigates to the Login if no UUID", () => {
          // Attempt to navigate to home
          cy.visit("/");

          // Assert that the URL is redirected to /login
          cy.url().should("include", "/login");

          // Confirm at log in via text
          cy.get("h2").should("contain", "Login"); // Replace with an actual selector from your login page

          cy.get(".card-body.text-center").should("exist");
          cy.get("h2.page-header").should("contain", "Login");
          cy.get("p.text-black-50").should(
               "contain",
               "Please enter your login and password."
          );
          cy.get('div.form-outline.form-white input[type="email"]').should(
               "exist"
          );
          cy.get('div.form-outline.form-white input[type="password"]').should(
               "exist"
          );
          cy.get("a.text-black-50").should("contain", "Forgot password?");
          cy.get("button.btn.btn-primary").should("exist");
          cy.get("p.mb-1").should("contain", "Don't have an account?");
          cy.get("a.text-black-50.fw-bold").should(
               "have.attr",
               "href",
               "/signup"
          );
     });
});
