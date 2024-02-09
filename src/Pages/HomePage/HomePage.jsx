import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { Search1 } from "../../Components/Search/Search1";
import "./HomePageStyle.css";
import { RecipeItem } from "../../Components/Recipe-item/RecipeItem";
import { FavoriteItem } from "../../Components/Favorite-item/FavoriteItem";
import { ThemeContext } from "../../App";

const dummydata = "dummydata";

const reducer = (state, action) => {
  switch (action.type) {
    case "filterFavorites":
      return {
        ...state,
        filteredValue: action.value,
      };

    default:
      return state;
  }
};

const initialstate = {
  filteredValue: "",
};

export const HomePage = () => {
  // loading state
  const [loadingstate, setloadingState] = useState(false);

  // save result that we  get from search component to the data array.

  const [recipes, setRecipes] = useState([]);

  // favorite data state
  const [favorites, setFavorites] = useState([]);

  // state for api is successfull or not
  const [apiSuccess, setApiSuccess] = useState(false);

  // use reducer functionality
  const [filteredState, dispatch] = useReducer(reducer, initialstate);

  const { theme } = useContext(ThemeContext);

  const getDatafromSearchComp = (getData) => {
    setloadingState(true);
    // calling the api
    async function getRecipe() {
      const apiresponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=9bc2e004c93041baa32b895349e2283f&query=${getData}`
      );

      const res = await apiresponse.json();
      const { results } = res;
      if (results && results.length > 0) {
        // set the loading state as false
        // set the recipe state  with the response of api

        setloadingState(false);
        setRecipes(results);
        setApiSuccess(true);
      }
    }
    getRecipe();
  };

  const addToFavorites = useCallback(
    (getCurrentRecipeItem) => {
      let cpyFavorites = [...favorites];
      const index = cpyFavorites.findIndex(
        (item) => item.id === getCurrentRecipeItem.id
      );
      if (index === -1) {
        cpyFavorites.push(getCurrentRecipeItem);
        setFavorites(cpyFavorites);
        // save the favorites in local storage
        localStorage.setItem("favorites", JSON.stringify(cpyFavorites));
        window.scrollTo({ top: "0", behavior: "smooth" });
      } else {
        alert("This Recipe is already in your Favorite List");
      }
    },
    [favorites]
  );

  const removeFromFav = (idToRemove) => {
    const updatedFavorites = favorites.filter(item => item.id !== idToRemove);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);

  // filter the favorites
  const filteredFavoritesItems =
    favorites && favorites.length > 0
      ? favorites.filter((item) =>
          item.title.toLowerCase().includes(filteredState.filteredValue)
        )
      : [];

  return (
    <div className="homepage">
      <h1 style={theme ? {color: "#000"} : {}} className="homepagesumit">Welcome to the Recipe Mangament App By Sumit </h1>
      <Search1
        getDatafromSearchComp={getDatafromSearchComp}
        dummydata={dummydata}
        apiSuccess={apiSuccess}
        setApiSuccess={setApiSuccess}
      />
      {/* show favorite items*/}

      <div className="favorites-wrapper">
        <h1
          style={theme ? { color: "#12343b" } : {}}
          className="favorites-title"
        >
          Favorites
        </h1>

        <div className="search-favorites">
          <input
            onChange={(e) =>
              dispatch({ type: "filterFavorites", value: e.target.value })
            }
            value={filteredState.filteredValue}
            name="searchfavorites"
            placeholder="search Favorites"
          />
        </div>

        <div className="favorites">
          {!filteredFavoritesItems.length && (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
              className="no-items"
            >
              {" "}
              <p style={theme ? {color: "#000"} : {}} >No Favorites are found</p>
            </div>
          )}
          {filteredFavoritesItems && filteredFavoritesItems.length > 0
            ? filteredFavoritesItems.map((item) => (
                <FavoriteItem
                  removeFromFav={() => removeFromFav(item.id)}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                />
              ))
            : null}
        </div>
      </div>

      {/* show favorite items*/}
      {/* show loading state */}
      {loadingstate && (
        <div className="loading">Loading recipes ! Please wait..</div>
      )}
      {/* show loading state */}

      {/* map through all the recipe */}
      <div className="items">
        {/* {renderRecipe()} */}
        {useMemo(
          () =>
            !loadingstate && recipes && recipes.length > 0
              ? recipes.map((item) => (
                  <RecipeItem
                    addToFavorites={() => addToFavorites(item)}
                    id={item.id}
                    image={item.image}
                    title={item.title}
                  />
                ))
              : null,
          [loadingstate, recipes, addToFavorites]
        )}
      </div>

      {/* map through all the recipe */}
      {!loadingstate && !recipes.length && (
        <div className="no-items" style={theme ? {color: "#000"} : {}}>No Recipes are found</div>
      )}
    </div>
  );
};
