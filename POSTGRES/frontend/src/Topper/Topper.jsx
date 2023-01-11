export default function Topper(props) {
  return (
    <div className="topper">
      <div className="searchbar">
        {props.mode === 'search' ? (
          <div className="input-container">
            <svg
              className="input-symbol"
              role="img"
              height="24"
              width="24"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-encore-id="icon"
            >
              <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path>
            </svg>
            <input type="text" className="search-field" placeholder="What will you listen to next?" />
            <svg
              className="input-cancel"
              role="img"
              height="24"
              width="24"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-encore-id="icon"
            >
              <path d="M3.293 3.293a1 1 0 011.414 0L12 10.586l7.293-7.293a1 1 0 111.414 1.414L13.414 12l7.293 7.293a1 1 0 01-1.414 1.414L12 13.414l-7.293 7.293a1 1 0 01-1.414-1.414L10.586 12 3.293 4.707a1 1 0 010-1.414z"></path>
            </svg>
          </div>
        ) : (
          <div className="input-placeholder"></div>
        )}
      </div>
      <div className="rowspacer"></div>
      <div className="signup">Sign Up</div>
      <div className="loggin">Log In</div>
    </div>
  );
}
