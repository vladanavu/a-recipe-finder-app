import React, {useEffect, useState} from 'react';

import './App.css';

import Recipe from './Recipe';

const App = () => {

  const APP_ID = "7c0cbf53";
  const APP_KEY = "7c71114d194e4909fa8c8f58a5351166"
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query,setQuery] = useState('chicken')
  
  
  useEffect(() => {
    getRecipes();
  
  }, [query]);
  
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
    console.log (data.hits);
  }
   
  const updateSearch = e => {
    setSearch(e.target.value);
   
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }
  return (
    <div className="App">
    <form onSubmit={getSearch} className="search-form">
      <input className="search-bar" 
      type="text" 
      value={search} 
      onChange={updateSearch}>

      </input>
      <button  className="search-bar" type="submit"> Search </button>
    </form>
    <div> 
  {recipes.map(recipe => (
    <Recipe 
      key={recipe.recipe.label}
      title={recipe.recipe.label} 
      calories={recipe.recipe.calories}
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}
    />
  ))}
  </div>
    </div>
  );
};

export default App;