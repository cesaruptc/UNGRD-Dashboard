import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Top5Events from './components/Top5Events';
import Top5EventsChart from './components/Top5EventsChart';
import './index.css'; 

function App() {
  return (
    <div className="App">
      <Home />
      <div class="flex flex-row">
        <Top5Events/>
        <Top5EventsChart/>
      </div>
      
    </div>
  );
}

export default App;
