import React, { Component } from "react";
import Recipe from "./Recipe";

class ListContainer extends Component {
  render(props) {
    return (
      <div className="list_container">
        <ul>
          <li>
            {this.props.recipes.map(recipe => (
              <div>
              <Recipe fetchRecipe={this.props.fetchRecipe} dbId={recipe.id} key={recipe.id} title={recipe.title} desc={recipe.description} />
              </div>
            ))}
          </li>
        </ul>
      </div>
    );
  }
}
 
export default ListContainer;
