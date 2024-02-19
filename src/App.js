import "./App.css";
import React, { createContext, useState } from "react";
import { HomePage } from "./Pages/HomePage/HomePage";
import ThemeButton from "./Components/theme-button/theme";
import Footer from "./Components/Footer/Footer";

// Create the context with a default value
export const ThemeContext = createContext({ theme: false, setTheme: () => {} });

function App() {
  const [theme, setTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="App" style={theme ? { backgroundColor: "#feb300" } : {}}>
        <ThemeButton />
        <HomePage />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
