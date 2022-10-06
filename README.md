# [wordle](https://dudushy.github.io/wordle/)
**wordle** is a web game about finding the correct word within the certain amount of tries that you are given to do so.
---

## Prerequisites:
- [NodeJS](https://nodejs.org/)

## How to install:
1. Install Packages
    ```bash
    npm i
    ```
2. Run project
    ```bash
    ng serve
    ```

## Steps:
1. Create new project
    ```bash
    ng new wordle

    ? Would you like to share anonymous usage data about this project with the Angular Team at
    Google under Google’s Privacy Policy at https://policies.google.com/privacy. For more
    details and how to change this setting, see https://angular.io/analytics. No
    ? Would you like to add Angular routing? Yes
    ? Which stylesheet format would you like to use? SCSS
    ```

2. Setup ESLint
    ```bash
    npm init @eslint/config
    ```

3. Generate
    ```bash
    bash generate.sh
    ```

    > [generate.sh](/generate.sh)

4. Run project
    ```bash
    ng serve
    ```

5. Build project
    ```bash
    bash build.sh
    ```

    > [build.sh](/build.sh)
