import Home from './components/Home.js'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import MainScript from './components/MainScript'


function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/song_info" exact component={MainScript} />
      </Router>
    </div>
  );
}

export default App;