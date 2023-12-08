// cypress/integration/login_spec.js

describe("Login Page", () => {
     beforeEach(() => {
          cy.visit("http://localhost:3000/login"); // Update the URL accordingly
          cy.viewport("iphone-6");
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
          cy.get('input[name="workoutName"]').clear().type("Bench Press");
          cy.get('input[name="weight"]').clear().type(Number("100"));
          cy.get('input[name="sets"]').clear().type(Number("3"));
          cy.get('input[name="reps"]').clear().type(Number("10"));

          // Check if the workout is successfully logged
          cy.get(".alert").should("not.exist"); // Check if there are no error alerts

          // Verify the close button
          // cy.get('button.btn-close[aria-label="Close"]').should("exist");
          // cy.get('button.btn-close[aria-label="Close"]').click();

          // Select the submit button by its class and click it
          cy.get('button.btn-primary[type="submit"]')
               .should("have.text", "Submit") // Optional: Check if the button has the text 'Submit'
               .click();

          // Check if the new workout card is displayed
          cy.get(".card").should("exist");

          // Select the specific card based on its content
          cy.contains(".card-title.h5", "Sun 1/1/23")
               .parents(".card")
               .within(() => {
                    // Verify the card content
                    cy.get(".table thead th")
                         .eq(1)
                         .should("have.text", "Exercise");
                    cy.get(".table thead th")
                         .eq(2)
                         .should("have.text", "Weight");
                    cy.get(".table thead th").eq(3).should("have.text", "Sets");
                    cy.get(".table thead th").eq(4).should("have.text", "Reps");

                    // Verify table row content
                    cy.get(".table tbody tr td")
                         .eq(1)
                         .should("have.text", "Bench Press");
                    cy.get(".table tbody tr td")
                         .eq(2)
                         .should("have.text", "100");
                    cy.get(".table tbody tr td").eq(3).should("have.text", "3");
                    cy.get(".table tbody tr td")
                         .eq(4)
                         .should("have.text", "10");
               });
     });
});
