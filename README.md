# Introduction

Welcome to WorkoutWhiz!


Discover the ultimate workout companion that effortlessly blends into your fitness routine! Tired of fumbling with phones and notebooks while breaking a sweat? Look no further – our cutting-edge workout app is here to simplify your fitness journey. It's your all-in-one solution for tracking a variety of workouts, from gym sessions to yoga flows and outdoor runs. No more distractions, just an intuitive interface that lets you focus on your form and performance. Track your progress, set personalized goals, and revel in your achievements with ease, thanks to detailed analytics and insights. Embrace a new era of hassle-free fitness tracking – grab our workout app now and make every session count!

## Initialization Steps

These steps are required for any type of deployment when first accessing the source code:

1. `Clone the project`

     ```bash
     git clone https://github.com/jqueja/WorkoutWhiz.git
     ```

2. `Enter the project repository and install required dependencies`
   remove package_lock.json and node_modules

     ```bash
     cd react-frontend
     npm i --legacy-peer-deps
     ```

3. `Enter the project repository and install required dependencies`

     ```bash
     cd backend
     pip install -r requirements.txt
     ```

     Go to http://127.0.0.1:5000/

4. `Setting up E2E testing and install required dependencies`

     Initiate backend

     ```
     cd cypress
     npm i
     npm run cy:open
     ```

     Navigate to E2E testing
     Click Chrome
     Start E2E testing in Chrome
     On Specs, click on (insert page).cy.js to see test run

## Contributing

### Coding Standards

Code contributors to this project are expected to follow specific coding standards to maintain code consistency and readability.

-    **JavaScript Style Guide**: The project adheres to the [Standard](https://standardjs.com/) JavaScript coding style guide.

### Linting with Standard ESLint

To ensure adherence to the coding standards, we use Standard ESLint as a linter. It helps identify and fix code issues, making your contributions consistent with our coding style.

-    **Standard ESLint Configuration**: Our ESLint configuration extends the Standard style guide. You can find the specific configuration in the `.eslintrc` file in the project repository.

### Code Formatting with Prettier

We also use Prettier as a code formatter to maintain a consistent code style. The Prettier configuration is defined in the `.prettierrc` file in the project repository and includes the following settings:

```json
{
     "trailingComma": "es5",
     "semi": true,
     "singleQuote": false,
     "printWidth": 80,
     "tabWidth": 5,
     "bracketSpacing": true
}
```
