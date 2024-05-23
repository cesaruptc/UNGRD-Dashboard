
import './App.css';
import Querys from './pages/Querys';
import Consulta2 from './components/Consulta2/Consulta2';

import Consulta1 from './components/Consulta1/Consulta1';
import Consulta3 from './components/Consulta3/Consulta3';
import Consulta5 from "./components/Consulta5/Consulta5";

function App() {
  return (
    <div className="App">

        <div className={"flex flex-col"}>
            <Consulta1></Consulta1>
            <Consulta3></Consulta3>
            <Querys />
            <Consulta2 />
            <Consulta5></Consulta5>
        </div>
    </div>
  );
}

export default App;
