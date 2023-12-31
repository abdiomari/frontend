
import { Container } from 'react-bootstrap'
import { HashRouter as Router,Route,Routes } from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'


import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';


function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          
          <Route path='/' element ={<HomeScreen />} exact />
           <Route path='/product/:id' element={<ProductScreen/>} /> 
           <Route path='/cart/:id?' component={CartScreen} />
           
        </Container>       
      </main>
      <Footer />
     </Router>
  );
}

export default App;
