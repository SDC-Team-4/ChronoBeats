import { useState } from 'react';
import Navbar from './Navbar/Navbar.jsx';
import Topper from './Topper/Topper.jsx';
import SearchResults from './Main/SearchResults.jsx';
import Home from './Main/Home.jsx';
import Playlist from './Main/Playlist.jsx';

function App() {
  const [mode, setMode] = useState('home');
  return (
    <>
      <Navbar mode={mode} setMode={setMode} />
      <Topper mode={mode} />
      <div className="main" id="viewbox">
        {mode === 'home' && <Home />}
        {mode === 'search' && <SearchResults />}
        {mode === 'playlist' && <Playlist />}
      </div>
    </>
  );
}

export default App;
