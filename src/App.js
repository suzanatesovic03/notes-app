import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import AddNote from "./AddNote";
function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
        <Switch>
          <Route exact path="/">
              <Home/>
          </Route>
          <Route path="/add-note">
              <AddNote/>
          </Route>
        </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
