import React, { Component } from "react";
import UpdateRecipe from "./UpdateRecipe";
import DeleteRecipe from "./DeletRecipe";
// import { confirmable } from 'react-confirm';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeId: this.props.dbId,
      initialTitle: this.props.title,
      initialDescription: this.props.description,
      updateRecipe: false,
      deleteRecipe: false
    };
  }
  update = () => {
    this.setState({
      updateRecipe: !this.state.updateRecipe
    });
  };
  delete = () => {
    let isDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if(isDelete){
      this.setState(
        {
          deleteRecipe: true
        },
        () => console.log(this.state.deleteRecipe)
      );
    }
    let recipeId = this.state.recipeId
    // submit form data to api
    fetch("http://recipe.project/recipe/", {
      method: "DELETE",
      body: JSON.stringify(recipeId)
    })
      .then(data => data.json())
      .then(res => {
        if (res.success) {
          this.props.fetchRecipe();
          this.setState({
            response: res.message
          });
        } else {
          throw new Error(res.message);
        }
        //if successful add a function that updates App.js state
      })
      .catch(err => {
        this.setState({
          response: err.message
        });
      }); //otherwise, throw an error msg    
  };

  render() {
    return (
      <div className="recipe_container">
        <h3>{this.props.title}</h3>
        <p>{this.props.desc}</p>
        <button onClick={this.update}>Update</button>
        <button onClick={this.delete}>Delete</button>
        {this.state.updateRecipe ? (
          <UpdateRecipe
            fetchRecipe={this.props.fetchRecipe}
            recipeId={this.state.recipeId}
            title={this.props.title}
            desc={this.props.desc}
          />
        ) : null}
        {this.state.deleteRecipe ? (
          <DeleteRecipe
            recipeId={this.state.recipeId}
          />
        ) : null}
      </div>
    );
  }
}

export default Recipe;
