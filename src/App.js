import './App.css';
import FirstForm from './components/FirstForm';
import RegForm2 from './components/RegForm2';
import List from './components/List';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={FirstForm} />
          <Route path="/step2" component={RegForm2} />
          <Route path="/list" component={List} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
