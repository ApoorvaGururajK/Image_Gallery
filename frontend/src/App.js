import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Search from './components/Search'
import {useState } from 'react'
import ImageCard from './components/ImageCard'
import Welcome from './components/Welcome'
import { Container, Row, Col } from 'react-bootstrap'
import axios from "axios"

// const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5001"

const App = () =>  {
  const [word,setWord] = useState('')
  const [images, setImages] = useState([])

  const handleSearchSubmit = async(e) =>{
    e.preventDefault()
    // const response = await fetch(`${API_URL}/new-image?query=${word}`)
    //   // .then((res) => res.json())
    //   // .then((data) => console.log(data))
    //   // .catch((err) => console.log(err))
    //   const data = await response.json()
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`)
      setImages([{...res.data, title: word}, ...images]) 
    } catch (error) {
      console.log(error)
    } 
    setWord("")       
  }

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  }
  
  // console.log(process.env) //anytime when the state of the component is change, the component is rerendered

  return (
    <div className="App">
      <Header title="Images Gallery"/>
      <Search  setWord={setWord} word={word} handleSubmit={handleSearchSubmit}/>
      <Container className="mt-4">
        {images.length ? 
        <Row xs={1} md={2} lg={3}>
        {images.map((image, i) => (
          <Col key={i} className="pb-3">
            <ImageCard  images={image} handleDelete={handleDeleteImage}/> 
          </Col> 
        ))}
      </Row>
      : <Welcome />
      }
        
      </Container>
    </div>
  );
}

export default App;
