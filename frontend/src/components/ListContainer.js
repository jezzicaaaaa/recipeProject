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
              <Recipe submitRecipe={this.props.submitRecipe} dbId={recipe.id} key={recipe.id} title={recipe.title} desc={recipe.description} />
              </div>
            ))}
          </li>
        </ul>
      </div>
    );
  }
}
 
export default ListContainer;
