describe("New User Sign Up", () => {
     beforeEach(() => {
          cy.visit("http://localhost:3000/login"); // Update the URL accordingly
          cy.viewport("iphone-6");
     });

     it("should successfully sign up with valid credentials", () => {
          cy.get('a.text-black-50.fw-bold[href="/signup"]').click();

          // Assert that navigation occurred after clicking on sign up link
          cy.url().should("eq", "http://localhost:3000/signup");

          // Check if the sign-up page is displayed
          cy.get(".page-header").should("contain", "Sign Up");

          // Generate a random email
          const randomEmail = `testuser${Math.floor(
               Math.random() * 100000
          )}@example.com`;

          // Fill in the form fields
          cy.get("input#firstName").type("John");
          cy.get("input#lastName").type("Doe");
          cy.get("input#email").type(randomEmail);
          cy.get("input#password").type("password@123");
          cy.get("input#confirmPassword").type("password@123");

          // Submit the form
          cy.get('button[type="submit"]').click();

          // Check path after successful submit
          cy.url().should("include", "/info");

          // Fill in the form fields with valid data
          cy.get('input[name="dob"]').type("2000-01-01"); // Example date
          cy.get('select[name="gender"]').select("Male");
          cy.get('input[name="weight"]').type("70");
          cy.get('input[name="height"]').type("175");

          // Submit the form
          cy.get('button[type="submit"]').click();

          // Ensure that the success page is displayed
          cy.url().should("include", "/successful-signup");
          cy.get("h2.page-header").should("have.text", "Successful Signup");
          cy.contains("You have successfully signed up!");

          // Click the "Go to Login" button
          // Find the "Go to Login" button and click it
          cy.get(".btn-primary").contains("Go to Login").click();

          // Ensure that the user is redirected to /login
          cy.url().should("include", "/login");
     });
});
