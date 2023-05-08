import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Search from './components/Search'
import {useState } from 'react';



const App = () =>  {
  const [word,setWord] = useState('')
  const handleSearchSubmit = (e) =>{
    e.preventDefault()
    console.log(word)
  }
  
  console.log(word) //anytime when the state of the component is change, the component is rerendered
  return (
    <div className="App">
      <Header title="Images Gallery"/>
      <Search  setWord={setWord} word={word} handleSubmit={handleSearchSubmit}/>
    </div>
  );
}

export default App;
