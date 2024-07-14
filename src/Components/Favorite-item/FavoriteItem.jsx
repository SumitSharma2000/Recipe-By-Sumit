import React from "react";
import "./FavoriteItem.css";
import { ThemeContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const FavoriteItem = (props) => {
  const { id, image, title, removeFromFav } = props;
  const {theme} = useContext(ThemeContext)
  const navigate = useNavigate();

  const handleGetRecipe = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div key={id} className="favorite-item">
      <div>
        <img src={image} alt="image of recipe" />
      </div>

      <p style={theme ? {color : "#12343b"} : {}}>{title}</p>
      <button type="button" style={theme ? {backgroundColor : "#12343b"} : {}} onClick={removeFromFav}>
        Remove from Favorite
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
