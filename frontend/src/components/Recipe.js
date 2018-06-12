import React, { Component } from "react";
import UpdateRecipe from "./UpdateRecipe";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeId: this.props.dbId,
      initialTitle: this.props.title,
      initialDescription: this.props.description,
      updateRecipe: false
    };
  }
  update = () => {
    this.setState(
      {
        updateRecipe: !this.state.updateRecipe
      },
      () => console.log(this.state.updateRecipe)
    );
  };

  render() {
    return (
      <div className="recipe_container">
        <h3>{this.props.title}</h3>
        <p>{this.props.desc}</p>
        <button onClick={this.update}>Update</button>
        <button>Delete</button>
        {this.state.updateRecipe ? (
          <UpdateRecipe submitRecipe={this.props.submitRecipe} recipeId={this.state.recipeId} title={this.props.title} desc={this.props.desc} />
        ) : null}
      </div>
    );
  }
}

export default Recipe;
