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
     });
     it("should open LogWorkout and verify form elements", () => {
          // Open LogWorkout
          cy.get("button.page-icon").click();

          // Verify the form elements
          cy.get('[name="date"]').should("exist");
          cy.get('[name="workoutName"]').should("exist");
          cy.get('[name="weight"]').should("exist");
          cy.get('[name="sets"]').should("exist");
          cy.get('[name="reps"]').should("exist");
          cy.get('button[type="submit"]').should("exist");
     });

     it("should log a workout successfully", () => {
          // Open LogWorkout
          cy.get("button").contains("Log Workout").click();

          // Fill in the workout details
          cy.get('[name="date"]').type("2023-01-01");
          cy.get('[name="workoutName"]').type("Bench Press");
          cy.get('[name="weight"]').type("100");
          cy.get('[name="sets"]').type("3");
          cy.get('[name="reps"]').type("10");

          // Submit the form
          cy.get('button[type="submit"]').click();

          // Check if the workout is successfully logged
          // You might need to adjust these assertions based on your actual application behavior
          cy.get(".alert").should("not.exist"); // Check if there are no error alerts
          cy.get(".WorkoutCard").should("exist"); // Check if the new workout card is displayed
     });
});
