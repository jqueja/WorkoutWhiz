// cypress/integration/login_spec.js

describe("New User Sign Up", () => {
     beforeEach(() => {
          cy.visit("http://localhost:3000/login"); // Update the URL accordingly
     });

     it("should successfully login with valid credentials", () => {
          //
          cy.get('a.text-black-50.fw-bold[href="/signup"]').click();

          // Assert that navigation occurred after successful login
          cy.url().should("eq", "http://localhost:3000/signup");

          // Check if the home page is displayed
          cy.get(".page-header").should("contain", "Sign Up");
          // Fill in the form fields
          cy.get("input#firstName").type("John");
          cy.get("input#lastName").type("Doe");
          cy.get("input#email").type("john.doe@example.com");
          cy.get("input#password").type("password@123");
          cy.get("input#confirmPassword").type("password@123");

          // Submit the form
          cy.get('button[type="submit"]').click();

          // Check path of Successful Submit
          cy.url().should("include", "/info");

          // Fill in the form fields with valid data
          cy.get('input[name="dob"]').type("2000-01-01"); // Example date
          cy.get('input[name="age"]').type("25");
          cy.get('select[name="gender"]').select("Male");
          cy.get('input[name="weight"]').type("70");
          cy.get('input[name="height"]').type("175");

          // Submit the form
          cy.get('button[type="submit"]').click();

          // Add assertions to check for successful form submission
          // For example, you might want to assert that the user is redirected to a new page or sees a success message
          cy.url().should("include", "/successful-signup");
          cy.contains("Thank you for signing up!");
     });

     it("Displays error message for mismatched passwords", () => {
          // Visit the webpage where the form is located
          cy.visit("http://localhost:3000/signup");

          // Fill in the form fields with mismatched passwords
          cy.get("input#firstName").type("John");
          cy.get("input#lastName").type("Doe");
          cy.get("input#email").type("john.doe@example.com");
          cy.get("input#password").type("password123");
          cy.get("input#confirmPassword").type("password456"); // Mismatched password

          // Submit the form
          cy.get('button[type="submit"]').click();

          // Add assertions to check for the error message
          cy.get(".invalid-feedback").should(
               "contain",
               "Passwords do not match."
          );
     });
});
