import React from "react"
import "../styles/button.css"

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: [],
      userInput: "",
      history: [],
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.movies !== this.props.movies) {
      this.setState({ rows: this.props.movies })
    }
  }

  onChange = e => {
    const userInput = e.currentTarget.value
    this.setState({
      userInput: e.currentTarget.value,
    })
    this.props.fetchApiData(userInput)
  }

  onClick = e => {
    const timestamp = Date.now()
    console.log(
      new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(timestamp)
    )
    const newHistory = Array.from(this.state.history)
    newHistory.push(e.currentTarget.innerText)
    this.setState(
      {
        userInput: e.currentTarget.innerText,
        history: newHistory,
      },
      () => console.log(this.state.history)
    )
  }

  deleteSearch(index, e) {
    const history = Object.assign([], this.state.history)
    history.splice(index, 1)
    this.setState({ history: history })
  }

  clearHistory(e) {
    this.setState({
      history: [],
    })
  }

  render() {
    const {
      onChange,
      onClick,
      state: { rows, userInput },
    } = this
    // console.log(rows)
    let moviesListComponent
    if (rows) {
      moviesListComponent = (
        <ul
          style={{
            background: "#fff",
            padding: 30,
            listStyleType: "none",
            height: "100px",
            overflowY: "scroll",
          }}
        >
          {rows.map((movie, index) => {
            // console.log(movie)
            return (
              <li style={{ marginBottom: 10 }} key={index} onClick={onClick}>
                {movie.title}
              </li>
            )
          })}
        </ul>
      )
    } else {
      moviesListComponent = (
        <>
          <p>No movies found. Try again!</p>
        </>
      )
    }

    return (
      <>
        <form type="submit">
          <input
            style={{
              width: "100%",
              padding: "10px 5px",
              boxSizing: "border-box",
            }}
            type="search"
            onChange={onChange}
            value={userInput}
          />
        </form>
        {moviesListComponent}

        <h2>Search history</h2>
        <button
          className="clear-history"
          onClick={this.clearHistory.bind(this)}
        >
          Clear history
        </button>
        <ul style={{ background: "#fff", padding: 30, listStyleType: "none" }}>
          {this.state.history.map((item, index) => (
            <li style={{ marginBottom: 10 }} key={index}>
              {item}
              <button
                className="del"
                onClick={this.deleteSearch.bind(this, index)}
              ></button>
            </li>
          ))}
        </ul>
      </>
    )
  }
}
