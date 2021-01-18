import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductSreen'
import Planillas from './components/Planillas'
import PlanillaMaster from './components/PlanillaMaster'
import EmpleadoPlanilla from './components/EmpleadoPlanilla'
import Index from './components/Index'
import MarcaHoras from './components/MarcaHora'

function App() {
  return (
    <Router>
      <Header>
      </Header>
      <main className='py-3'>
      
         <Route path='/' component={Index} exact />
          <Route path='/planillas' component={Planillas} exact />
          <Route path='/planillaMaster' component={PlanillaMaster} exact />
          <Route path='/planillas/:id' component={ProductScreen} />
          <Route path='/empleados' component={EmpleadoPlanilla} />
          <Route path='/marca-hora' component={MarcaHoras} />

      </main>
      <Footer>
      </Footer>
    </Router>
  );
}
export default App;
