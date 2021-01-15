import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductSreen'

function App() {
  return (
    <Router>
      <Header>
      </Header>
      <main className='py-3'>
        <Container>
          <Route path='/planillas' component={HomeScreen} exact />
          <Route path='/planillas/:id' component={ProductScreen} />
        </Container>
      </main>
      <Footer>
      </Footer>
    </Router>
  );
}
export default App;
