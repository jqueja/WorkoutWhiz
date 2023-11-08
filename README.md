# Introduction

Welcome to WorkoutWhiz! 

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
    cd flask-backend
    source venv/bin/activate
    pip install flask
    python3 app.py
    ```
    Go to http://127.0.0.1:5000/
   
## Contributing

### Coding Standards

Code contributors to this project are expected to follow specific coding standards to maintain code consistency and readability.

- **JavaScript Style Guide**: The project adheres to the [Standard](https://standardjs.com/) JavaScript coding style guide.

### Linting with Standard ESLint

To ensure adherence to the coding standards, we use Standard ESLint as a linter. It helps identify and fix code issues, making your contributions consistent with our coding style.

- **Standard ESLint Configuration**: Our ESLint configuration extends the Standard style guide. You can find the specific configuration in the `.eslintrc` file in the project repository.

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

