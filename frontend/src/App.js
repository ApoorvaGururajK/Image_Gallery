import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Search from './components/Search'
import {useState } from 'react';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY

const App = () =>  {
  const [word,setWord] = useState('')
  const [images, setImages] = useState([])

  console.log(images)
  
  const handleSearchSubmit = async(e) =>{
    e.preventDefault()
    console.log(word)
    const response = await fetch(`https://api.unsplash.com//photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`)
      // .then((res) => res.json())
      // .then((data) => console.log(data))
      // .catch((err) => console.log(err))
      const data = await response.json()
      setImages([data, ...images])
      setWord("")
       
  }
  
  // console.log(process.env) //anytime when the state of the component is change, the component is rerendered

  return (
    <div className="App">
      <Header title="Images Gallery"/>
      <Search  setWord={setWord} word={word} handleSubmit={handleSearchSubmit}/>
    </div>
  );
}

export default App;
