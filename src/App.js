import { Container } from 'react-bootstrap';
import './App.css';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomeScreen from './screens/HomeScreen';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';


function App() {
  return (
    <Router>
      <Header />
        <main className="py-5">
          <Container>
            <Route path="/" component={HomeScreen} exact/>
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
          </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App;
