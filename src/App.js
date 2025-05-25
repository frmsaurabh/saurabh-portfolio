import { useState } from "react";
import { Sun, Moon } from "lucide-react";

function App() {
  const [dark, setDark] = useState(false);
  const toggleTheme = () => setDark(!dark);

  return (
    <div className={dark ? "bg-gray-900 text-white min-h-screen" : "bg-white text-gray-900 min-h-screen"}>
      <header className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">Saurabh Chandra</h1>
        <button onClick={toggleTheme}>
          {dark ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </header>
      <main className="flex flex-col items-center justify-center h-[80vh] text-center">
        <h2 className="text-4xl font-semibold mb-4">Simplifying Insurance Through Tech</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400">A modern portfolio in progress.</p>
      </main>
    </div>
  );
}

export default App;
