# Integrating Third-Party APIs: Spoonacular

## Introduction
The following application is in it's first iteration. It uses [Spoonacular API](https://spoonacular.com/food-api) to fetch recipes for cooks who want an ad free experience. No more scrolling through blog content, Yay! After a user queries in the text field, a list of links are generated based on Spoonacular API response. When a user clicks on a recipe, the ID of the recipe is passed to a GET method route which handles an API call fetching details to the specific recipe. A table is generated which include ingredient, amount, unit, and aisle. 

Technologies: Express.js, Axios and EJS

## Demo
![Live demo](./assets/demo.gif)

# Run The Application

## How to Run the Server
1. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) or [Fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) the repository from Github.
1. In project directory terminal, run `npm install` to install all dependencies. Notice there is now a package-lock.json created.
1. In terminal, run `npm run build` to create a server instance
3. In your web browser, navigate to: http://localhost:3000/ to view a local instance of the server.

## Additional Details
- In terminal, run `node -v`. If the command is not recognized, [Install LTS Version 20.11.0 of Node.js](https://nodejs.org/en/download)
- The server uses [Express](https://www.npmjs.com/package/express) to handle site routing.
- Any errors relating to node version incompatibility, ensure to switch to **node version 20.11.0** using [nvm](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) or [fnm](https://www.freecodecamp.org/news/fnm-fast-node-manager/)
- Use `npx nodemon index.js` to initiate [nodemon](https://www.npmjs.com/package/nodemon) for server development. Use **ctrl + c** to terminate nodemon execution. 

