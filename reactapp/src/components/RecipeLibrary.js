import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function RecipeLibrary() {
  const { isAuthenticated } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [recipeName, setRecipeName] = useState('');
  const [unit, setUnit] = useState('');

  if (!isAuthenticated) {
    return <div>Please log in to view this page.</div>;
  }

  const handleAddRecipe = (event) => {
    event.preventDefault();
    const newRecipe = {
      name: recipeName,
      unit: unit
    };
    setRecipes([...recipes, newRecipe]);
    setRecipeName('');
    setUnit('');
    // 这里可以添加代码将新食谱发送到后端
  };

  return (
    <div>
      <h1>Recipe Library</h1>
      <form onSubmit={handleAddRecipe}>
        <input
          type="text"
          placeholder="Enter recipe name"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
        />
        <button type="submit">Add Recipe</button>
      </form>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>{recipe.name} - {recipe.unit}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeLibrary;
