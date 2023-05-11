import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Search from './components/Search'
import {useState } from 'react'
import ImageCard from './components/ImageCard'
import Welcome from './components/Welcome'
import { Container, Row, Col } from 'react-bootstrap'

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY

const App = () =>  {
  const [word,setWord] = useState('')
  const [images, setImages] = useState([])

  const handleSearchSubmit = async(e) =>{
    e.preventDefault()
    const response = await fetch(`https://api.unsplash.com//photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`)
      // .then((res) => res.json())
      // .then((data) => console.log(data))
      // .catch((err) => console.log(err))
      const data = await response.json()
      setImages([{...data, title: word}, ...images])
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
