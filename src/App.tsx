import './App.css';
import CharacterSheets from './components/CharacterSheets';
import { CharacterProvider } from './contexts/CharacterContext';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <CharacterProvider>
          <CharacterSheets />
        </CharacterProvider>
      </section>
    </div>
  );
}

export default App;
