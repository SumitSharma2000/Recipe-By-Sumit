import React from "react";
import "./RecipeItem.css";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import { useNavigate } from "react-router-dom";

export const RecipeItem = (props) => {
  const { id, image, title, addToFavorites } = props;
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleGetRecipe = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} alt="image of recipe" />
      </div>

      <p style={theme ? { color: "#12343b" } : {}}>{title}</p>
      <button
        type="button"
        style={theme ? { backgroundColor: "#12343b" } : {}}
        onClick={addToFavorites}
      >
        Add to Favorite
      </button>
      <button
        onClick={handleGetRecipe}
        type="button"
        style={theme ? { backgroundColor: "#12343b" } : {}}
      >
        Get Recipe
      </button>
    </div>
  );
};
