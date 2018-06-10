import React, { Component } from "react";
import "./App.css";
import "./components/Search";
import Search from "./components/Search";
import ListContainer from "./components/ListContainer";
import AddRecipe from "./components/AddRecipe";
// import AddRecipe from './components/AddRecipe';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      addRecipe: false,
      updateRecipe : false
    };
  }

  fetchRecipe = () => 
    fetch("http://recipe.project/recipe/")
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({
          list: data.recipes
        });
      });
  componentDidMount() {
    this.fetchRecipe();
  }
  addRecipe = () => {
    this.setState(
      {
        addRecipe: !this.state.addRecipe
      },
      () => console.log(this.state.addRecipe)
    );
  };

  render() {
    return (
      <div className="App">
        <Search />
        <button
          className="addRecipe"
          onClick={this.addRecipe}
        >
          Add Recipe
        </button>
        {this.state.addRecipe ? <AddRecipe fetchRecipe={this.fetchRecipe}/> : null}
        <ListContainer recipes={this.state.list} />
      </div>
    );
  }
}

export default App;
