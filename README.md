# Introduction

Welcome to WorkoutWhiz! 

### Initialization Steps

These steps are required for any type of deployment when first accessing the source code:

1. `Clone the project`

    ```bash
    git clone https://github.com/jqueja/WorkoutWhiz.git
    ```
2. `Enter the project repository and install required dependencies`

    ```bash
    cd react-frontend && npm install
    cd react-frontend && npm install react-bootstrap bootstrap
    cd react-frontend && npm install @mui/material --legacy-peer-deps && npm install --save-dev @babel/plugin-proposal-private-property-in-object --legacy-peer-deps && npm install @mui/icons-material
    ```

3. `Enter the project repository and install required dependencies`

    ```bash
    cd flask-backend
    source venv/bin/activate
    pip install flask
    python3 app.py
    ```
    Go to http://127.0.0.1:5000/
