import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/HomePage/HomePage";
import RecipeDetail from "./Components/RecipeDetail/RecipeDetail";
import ThemeButton from "./Components/theme-button/theme";
import Footer from "./Components/Footer/Footer";
import "./App.css";

export const ThemeContext = createContext({ theme: false, setTheme: () => {} });

function App() {
  const [theme, setTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Router>
        <div className="App" style={theme ? { backgroundColor: "#feb300" } : {}}>
          <ThemeButton />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
