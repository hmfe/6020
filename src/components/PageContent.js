import React from "react"
import Autocomplete from "./Autocomplete"
// import movies from "../data/movies.js"

export class PageContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
    }
    this.fetchData = this.fetchData.bind(this)
  }

  async fetchData(searchTerm) {
    await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=2a8816ff925fd7270b4772129bad4ab5&query=` +
        searchTerm
    )
      .then(response => response.json())
      .then(responseData => {
        // console.log(responseData)
        this.setState({
          movies: responseData.results,
        })
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error)
      })
  }

  render() {
    // console.log(this.state.movies)
    return (
      <>
        <h1>Movies</h1>
        <Autocomplete
          movies={this.state.movies}
          fetchApiData={this.fetchData}
        />
      </>
    )
  }
}
