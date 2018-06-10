import React, { Component } from "react";
import Recipe from "./Recipe";

class ListContainer extends Component {
  render() {
    return (
      <div className="list_container">
        <ul>
          <li>
            {this.props.recipes.map(recipe => (
              <div>
              <p> {recipe.id}</p>
              <Recipe submitRecipe={this.props.submitRecipe} key={recipe.id} title={recipe.title} desc={recipe.description} />
              </div>
            ))}
          </li>
        </ul>
      </div>
    );
  }
}
 
export default ListContainer;
