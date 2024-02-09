import { useContext } from 'react';
import './theme.css'
import { ThemeContext } from '../../App';


const ThemeButton =()=>{
    const {theme, setTheme} = useContext(ThemeContext)
    return(
        <button style={theme ? {backgroundColor: "#12343b"} : {}} onClick={()=>setTheme(!theme)} className="themeButton">Theme Button</button>
    )
}
export default ThemeButton;