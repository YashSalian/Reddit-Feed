import React, { useState, useEffect } from 'react'
import Articles from './Components/Articles'
import './App.css';

function App() {

  const [subreddit, setSubreddit] = useState("webdev")
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch("https://www.reddit.com/r/" + subreddit + ".json").then(res => {
      if(res.status != 200) {
        console.log("Error")
        return
      }

      res.json().then(data => {
        if(data != null) {
          setArticles(data.data.children)
        }
      })
    })
  }, [subreddit])

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" className="input" value={subreddit} onChange={e => setSubreddit(e.target.value)}></input>
      </header>
      <div className='articles'>
        {
          (articles != null) ? articles.map((article, index) => <Articles key={index} article={article.data} />) : ''
        }
      </div>
    </div>
  );
}

export default App;
