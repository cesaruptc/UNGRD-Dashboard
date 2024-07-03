
import './App.css';
import Dashboard from "./pages/Dashboard/Dashboard";
import {YearProvider} from "./context/YearContext";

function App() {
  return (
    <YearProvider className="App">
        <Dashboard/>
    </YearProvider>
  );
}

export default App;
