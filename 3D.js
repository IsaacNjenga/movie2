function Header()
{

  return(
<div>
<a href = "movie.html"><i class = "material-icons">arrow_back</i> Back Home</a>
</div>    
  )
}

function App() {
    const [movieList, setMovieList] = React.useState({}); 
    const [suggestion, setSuggestions] = React.useState([]) 
    const [count, setCount] = React.useState(1); 
    const [counter, setCounter] = React.useState(1);
    const [background, setBackground] = React.useState('');
    const [isfirst, setIsFirst] = React.useState(false)
  
    React.useEffect(() => {
      const fetchBackgroundImage = async () => {
        try {
          const response = await fetch(`https://yts.mx/api/v2/list_movies.json?page=${counter}&quality=3D`);
          const data = await response.json();
          setBackground(data.data.movies[0].large_cover_image);
        } catch (error) {
          console.error('Error fetching background image:', error);
        }
      };
  
      fetchBackgroundImage();
    }, [counter]);
  
    React.useEffect(() => {
        document.body.style.backgroundImage = `url(${background})`;
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backdropFilter = 'blur(5px)';
        return () => {
          document.body.style.backgroundImage = '';
          document.body.style.backgroundRepeat = '';
          document.body.style.backgroundSize = '';
          document.body.style.backgroundPosition = '';
          document.body.style.backgroundAttachment = '';
          document.body.style.backdropFilter = '';
        };
      }, [background]);
  
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const movieResponse = await fetch(`https://yts.mx/api/v2/list_movies.json?page=${count}&quality=3D`);
          const movieData = await movieResponse.json();
          setMovieList(movieData.data.movies[0]);
  
          const suggestionResponse = await fetch(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${movieData.data.movies[0].id}`);
          const suggestionData = await suggestionResponse.json();
          setSuggestions(suggestionData.data.movies.slice(0, 5));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [count]);

    function url()
    {
      window.open(suggestion.url, '_blank')
    }

    function trailer(movieList)
    {
      const youtubeBaseUrl = 'https://www.youtube.com/watch?v=';
      const youtubeUrl = youtubeBaseUrl + movieList.yt_trailer_code;
      window.open(youtubeUrl, '_blank')
    }

    return (
        <div>
          <div className = "hero">
            <img className = "hero-img" src = {movieList.large_cover_image}></img>
            <div className = "hero-details">
            <p>Title: {movieList.title}</p>
            <p>Year: {movieList.year !== 0 ? `${movieList.year}` : "N/A"}</p> 
            <p>Rating: {movieList.rating !== 0 ? `${movieList.rating}/10` : "N/A"}</p>
            <p>Runtime: {movieList.runtime !== 0? `${movieList.runtime} minutes` : "N/A"}</p> 
            <p>Genres:{" "}{movieList.genres &&(Array.isArray(movieList.genres)? movieList.genres.join(", "): "N/A")}</p>
            <button className = "btn2" onClick = {url}>Download</button>
            <button className = "btn2" onClick={() => trailer(movieList)}>Watch trailer</button>
            <p>Plot Summary: {movieList.description_full}</p> 
            </div> 
          </div>
          <button className = "btn" onClick={() => {setCount((prevCount) => prevCount + 1); setCounter((prevCount) => prevCount + 1); setIsFirst(true)}}>Next page</button> 
          {isfirst === true? <button className = "btn" onClick={() => {setCount((prevCount) => prevCount - 1); setCounter((prevCount) => prevCount - 1)}}>Previous page</button>: "" }        

          <h2 className="p">Similar movies</h2>
          <div className = "suggestions-container">
          
            {suggestion.map((suggestedMovie) => (
              <div key={suggestedMovie.id}>
                <img src={suggestedMovie.medium_cover_image} alt={suggestedMovie.title} onClick = {() => {window.open(suggestedMovie.url,'_blank')}} style={{ cursor: 'pointer' }}/>
                <p onClick = {() => {window.open(suggestedMovie.url,'_blank')}} style={{ cursor: 'pointer' }}>{suggestedMovie.title}</p>
              </div>))}
          </div>
      </div>
    )
  }
  
function Close()
{
  return(
    <div>
      <Header/>
      <App/>
    </div>
  )
}

  ReactDOM.render(<Close />, document.getElementById("root"));
 //<pre>{JSON.stringify(movieList, null, 2)}</pre>
