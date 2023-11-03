# Introduction

Welcome to WorkoutWhiz! 

### Initialization Steps

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
