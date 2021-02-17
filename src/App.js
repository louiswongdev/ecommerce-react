import { Switch, Route } from 'react-router-dom';
import './App.scss';
import FeaturedCollection from './component/featured-collection/FeaturedCollection';
import Footer from './component/footer/Footer';
import Header from './component/header/Header';
import Hero from './component/hero/Hero';
import HomePage from './component/HomePage';
import MainSection from './component/main-section/MainSection';
import NotFound from './component/notFound';
import Shop from './component/pages/shop/Shop';
import SingleProduct from './component/single-product/SingleProduct';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={Shop} />
        <Route path="/product/:id" component={SingleProduct} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
