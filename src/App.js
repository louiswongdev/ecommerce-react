import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Checkout from './component/checkout/Checkout';
import Cancelled from './component/checkout/stripe-checkout/Cancelled';
import Success from './component/checkout/stripe-checkout/Success';
import HomePage from './component/HomePage';
import NotFound from './component/notFound';
import CartPage from './component/pages/cart-page/CartPage';
import Shop from './component/pages/shop/Shop';
import SingleProduct from './component/single-product/SingleProduct';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={Shop} />
        <Route path="/product/:id" component={SingleProduct} />
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/success" component={Success} />
        <Route path="/cancelled" component={Cancelled} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
