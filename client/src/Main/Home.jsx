import { useState } from 'react';

const fakeData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Home() {
  const [list, setList] = useState(fakeData);
  const [count, setCount] = useState(5);

  function calcCount() {
    let box = document.getElementById('viewbox').getBoundingClientRect();
    let width = box.width;
    setCount(Math.floor(width / 244));
  }

  window.addEventListener('resize', calcCount);

  return (
    <>
      <div className="homecontent">
        <div className="homerow">
          <div className="rowtitle">Recent</div>
          <div className="contentrow">
            {list.slice(0, count).map((item) => (
              <div className="card">
                <div className="cardimage">
                  <div className="cardoverlay">{item}</div>
                </div>
                <div className="cardtitle">Artist: {item}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="homerow">
          <div className="rowtitle">Popular Songs</div>

          <div className="contentrow">
            {list.slice(0, count).map((item) => (
              <div className="card">
                <div className="cardimage">
                  <div className="cardoverlay">{item}</div>
                </div>
                <div className="cardtitle">Artist: {item}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="homerow">
          <div className="rowtitle">Top Artists</div>
          <div className="contentrow">
            {list.slice(0, count).map((item) => (
              <div className="card">
                <div className="cardimage">
                  <div className="cardoverlay">{item}</div>
                </div>
                <div className="cardtitle">Artist: {item}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="homerow">
          <div className="rowtitle">Hot Playlists</div>
          <div className="contentrow">
            {list.slice(0, count).map((item) => (
              <div className="card">
                <div className="cardimage">
                  <div className="cardoverlay">{item}</div>
                </div>
                <div className="cardtitle">Artist: {item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
