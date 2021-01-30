import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductScreen from './screens/ProductSreen'
import Planillas from './components/Planillas'
import PlanillaMaster from './components/PlanillaMaster'
import EmpleadoPlanilla from './components/EmpleadoPlanilla'
import Index from './components/Index'
import MarcaHoras from './components/MarcaHora'
import EmpleadosMH from './components/Empleados/EmpleadosMH'
import Test from './components/test'
import CreateCalendaio from './components/Calendario/IndexCalendario'
import HomeScreen from './screens/HomeScreen'
import Excel from './components/excel'



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
          <Route path='/empleadosMH' component={EmpleadosMH} />
          <Route path='/test' component={Excel} />
          
          <Route path='/create-calendario' component={CreateCalendaio} />
          
      </main>
      <Footer>
      </Footer>
    </Router>
  );
}
export default App;
