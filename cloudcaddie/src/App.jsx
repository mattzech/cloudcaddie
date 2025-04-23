function App() {
    return (
      <div className="min-h-screen bg-green-100 flex flex-col">
        {/* Header */}
        <header className="bg-green-700 text-white text-center p-4">
          <h1 className="text-2xl font-bold">CloudCaddie</h1>
        </header>
  
        {/* Main shot tracking area */}
        <main className="flex-grow p-4">
          {/* We'll plug ShotTracker here */}
          <ShotTracker />
        </main>
  
        {/* Footer (optional) */}
        <footer className="bg-green-700 text-white text-center p-2 text-sm">
          &copy; 2025 CloudCaddie
        </footer>
      </div>
    );
  }
  