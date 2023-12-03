describe("The Login page", () => {
     it("successfully loads", () => {
          cy.visit("/login");

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
