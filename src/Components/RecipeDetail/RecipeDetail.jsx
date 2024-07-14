import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RecipeDetail.css";
import Footer from "../Footer/Footer";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=9bc2e004c93041baa32b895349e2283f`
      );
      const data = await response.json();
      setRecipe(data);
      setLoading(false);
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-detail">
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <div className="instructions" dangerouslySetInnerHTML={{ __html: recipe.instructions }}></div>
    </div>
  );
};

export default RecipeDetail;
