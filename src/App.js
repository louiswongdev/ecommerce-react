import { Switch, Route } from 'react-router-dom';
import './App.scss';
import FeaturedCollection from './component/featured-collection/FeaturedCollection';
import Footer from './component/footer/Footer';
import Header from './component/header/Header';
import Hero from './component/hero/Hero';
import HomePage from './component/HomePage';
import MainSection from './component/main-section/MainSection';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
