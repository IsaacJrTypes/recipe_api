import express from 'express';
import { APICredentials } from './apiCred.js';
import axios from 'axios';


const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", 'ejs');
app.set('port', port);


async function getSpoonacularAPIResponse(inputObj = {}, id = null) {
    console.log(inputObj, id);
    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
        headers: APICredentials
    };
    if (id === null && inputObj.hasOwnProperty('query')) {
        options.params = { query: inputObj.query };
    } else {
        options.url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`;
    }

    try {
        const response = await axios.request(options);
        console.log("Fetch status: " + response.status);
       //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

app.get("/", (req, res) => {
    res.type('html');
    res.render("recipes", { data: {} });
});
/*
TODO:
    [x] Use id to fetch recipe 
    [x] Get array, render to ejs
*/
app.get('/recipe/:id', async (req, res) => {
    const urlId = req.params.id;
    const parseNum = Math.abs(parseInt(urlId));

    let jsonResponse;

    if (!isNaN(parseNum)) {
        jsonResponse = await getSpoonacularAPIResponse(null, parseNum);

        // Get ingredients 
        const ingredientArr = jsonResponse.extendedIngredients
        console.log(jsonResponse)
       
        res.type('text/html');
        res.render("ingredients", { ingredientArr: ingredientArr, recipeTitle: jsonResponse.title, instructions:jsonResponse.instructions });

    } else {
        jsonResponse = { 'success': false };
        res.status(406).type('json').send(jsonResponse);
    }
});



/*
TODO:
    [x] Get query from user
    [x] Validate query input
    [x] Pass query to spoonful api
    [x] Create HTML response page
    [x] Create links from api response
    
*/

// Query grocery API
app.get('/recipe', async (req, res) => {
    const userQueryObj = req.query;

    let jsonResponse;

    // Verify query property
    if (userQueryObj.hasOwnProperty('query')) {
        
        jsonResponse = await getSpoonacularAPIResponse(userQueryObj);

    } else {
        jsonResponse = { 'success': false, 'msg': 'Need to use minimum valid format: /recipe?query=pasta' };
        res.status(406).type('json').send(jsonResponse);
    }
    const recipeArr = jsonResponse.results.map((obj) =>
        obj.link = `<a href="/recipe/${obj.id}">${obj.title}</a>`);
  
    res.render("recipes", { recipeArr: recipeArr });
   
});

app.use((req, res) => {
    res.type("text/plain");
    res.status(404);
    res.send('404 error');
});


app.listen(app.get('port'), () => {
    console.log(`Express running at ${port}`);
    console.log(`In browser go to: http://localhost:${port}`);
});