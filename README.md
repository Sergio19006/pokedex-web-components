# javascript-boilerplate
This is JavaScript Multipage Boilerplate using Webpack 5. In this boilerplate,
we have setup
- **HTML Templates**
- **SCSS and assets (images**)
- **Babel**
- **Hot Reload**
- **ESLInt and prettier**
- **Lint-staged and husky** (Setup pre-commit hook to run linter before each commit)
- **Github Actions** (Run linter on whenever code is pushed or PR is created)

#### Project Setup Instructions
1. Navigate to the project directory
   `cd javascript-boilerplate`
2. Run command `npm install` to install all the dependencies
3. Run command `npm run dev` to run the project in the dev environment

#### How to Add New Module?
Open the `webpack.config.js` file,
1. add page name in `pages` array.
   `const pages = ['signup'];`
2. add a new entry in the `entry` object

   `entry: {
     signup: './src/signup/signup.js',
   },`

3. Restart server and open the new module

   **Example URL for signup page:** `localhost:port/signup.html`
