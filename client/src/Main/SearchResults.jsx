import { useState } from 'react';

const filterList = ['All', 'Songs', 'Artists', 'Albums', 'Playlists', 'Users'];
const fakeResults = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function SearchResults() {
  const [filter, setFilter] = useState('All');
  const [results, setResults] = useState(fakeResults);

  function changeFilter(str) {
    setFilter(str);
  }

  return (
    <>
      <div className="filters">
        {filterList.map((item) => (
          <div
            className="filter"
            onClick={() => changeFilter(item)}
            style={filter === item ? { backgroundColor: 'var(--creamy)', color: 'var(--red)', fontFamily: 'Bold' } : {}}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="results">
        {results.map((item) => (
          <div className="card">
            <div className="cardimage">
              <div className="cardoverlay">{item}</div>
            </div>
            <div className="cardtitle">Artist: {item}</div>
          </div>
        ))}
      </div>
    </>
  );
}
