import React, { useEffect, useState } from 'react'
import './Search.css'
import { useContext } from 'react'
import { ThemeContext } from '../../App'

export const Search1 = (props) => {
  const {theme} = useContext(ThemeContext)
  const {getDatafromSearchComp , apiSuccess, setApiSuccess} = props

  const [inputValue,setInputValue] = useState('');

  const handleInputValue = (e)=>{
    const {value} = e.target;
    setInputValue(value);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    getDatafromSearchComp(inputValue);
  }
 
  useEffect(()=>{
    if(apiSuccess){
      setInputValue('')
        setApiSuccess(false)
      }
  },[apiSuccess, setApiSuccess])

  return (
    <form onSubmit={handleSubmit} className='Search'>
        <input name="search" onChange={handleInputValue} value={inputValue} placeholder="Search Recipes"  id="search"/>
        <button style={theme ? {backgroundColor: "#12343b"} : {}} type="submit">Search</button>
    </form>
  )
}
