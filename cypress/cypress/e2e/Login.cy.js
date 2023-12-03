// cypress/integration/login_spec.js

describe("Login Page", () => {
     beforeEach(() => {
          cy.visit("http://localhost:3000/login"); // Update the URL accordingly
     });

     it("should successfully login with valid credentials", () => {
          // Input valid credentials and click the login button
          cy.get("#typeEmailX").type("jchou18@calpoly.edu");
          cy.get("#typePasswordX").type("njAiHP!y#VcY5#");
          cy.get("button").contains("Login").click();

          // Assert that navigation occurred after successful login
          cy.url().should("eq", "http://localhost:3000/");

          // Check if the home page is displayed
          cy.get(".page-header").should("contain", "My Workout Log");

          // Check if
          cy.get(
               'button.btn.btn-primary[style="height: 3rem; width: 3rem; padding: 0rem; background: rgb(246, 88, 88); border-color: rgb(246, 88, 88);"]'
          ).should("exist");
          // Open LogWorkout
          cy.get(
               'button.btn.btn-primary[style="height: 3rem; width: 3rem; padding: 0rem; background: rgb(246, 88, 88); border-color: rgb(246, 88, 88);"]'
          ).click();

          // Verify the form elements
          cy.get('input[name="date"]').should("exist");
          cy.get('input[name="workoutName"]').should("exist");
          cy.get('input[name="weight"]').should("exist");
          cy.get('input[name="sets"]').should("exist");
          cy.get('input[name="reps"]').should("exist");
          cy.get('button[type="submit"]').should("exist");

          // Fill in the workout details
          cy.get('input[name="date"]').type("2023-01-01");
          cy.get('input[name="workoutName"]').type("Bench Press");
          cy.get('input[name="weight"]').type("100");
          cy.get('input[name="sets"]').type("3");
          cy.get('input[name="reps"]').type("10");

          // Check if the workout is successfully logged
          cy.get(".alert").should("not.exist"); // Check if there are no error alerts

          // Verify the close button
          cy.get('button.btn-close[aria-label="Close"]').should("exist");
          cy.get('button.btn-close[aria-label="Close"]').click();

          // Check if the new workout card is displayed
          cy.get(".WorkoutCard").should("exist");
     });
});
