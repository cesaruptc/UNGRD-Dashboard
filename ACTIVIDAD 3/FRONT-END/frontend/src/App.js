import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import MyChart from './components/MyChart';
import Top5Events from './components/Top5Events';

function App() {
  return (
    <div className="App">
      <Home />
      <MyChart/>
      <Top5Events/>
    </div>
  );
}

export default App;
