import { useState } from 'react';
import './App.css';
import Search from './components/Search';
import SearchResult from './components/SearchResult';
import { TMDB_API_URL, tmdbApiOptions } from './components/api'
import MovieResult from './components/MoviesResult';

function App() {
  const [result, setResult] = useState(null)

  const handleOnSearchChange = (searchData) => {
    const searchResult = JSON.parse(searchData.value)
    fetch(`${TMDB_API_URL}?query=${searchResult.title || searchResult.name}&include_adult=false&page=1`, tmdbApiOptions)
      .then(response => response.json())
      .then(response => setResult(response.results[0]))
      .catch(err => console.error('error:' + err));
  }

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {result && <SearchResult data={result} />}
      {result && <MovieResult data={result}/>}
    </div>
  );
}

export default App;
