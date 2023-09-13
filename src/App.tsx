import "./App.css";
import Header from "./components/Header";
import TaskList from "./components/TaskList";

function App() { 
  return (
    <main className="flex flex-col h-screen bg-zinc-200">
      <Header />
      <TaskList />
      <footer className="mt-auto mb-3">Copyright 2023 - Britoskies</footer>
    </main>
  );
}

export default App;
