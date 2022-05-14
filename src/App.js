import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
import NotFound from './components/NotFound/NotFound';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Router basename='/react-movie/'>
        <React.Fragment>
          <Header />
            <Switch>
              <Route exact path="/" component={ Home } />
              <Route exact path="/:movieId" component={ Movie } />
              <Route component={ NotFound } />
            </Switch>
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
