import React, { Component } from "react";

class UpdateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      description: this.props.desc,
      image: "",
      response: ""
    };
  }
  updateValue = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    let formData = {
      recipeId: this.props.recipeId,
      title: this.state.title,
      description: this.state.description,
      image: this.state.image
    };
    this.setState({
        response: ""
    })

    fetch("http://recipe.project/recipe/", {
      method: "PUT",
      body: JSON.stringify(formData)
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
      <div className="update-recipe">
        <form onSubmit={this.handleSubmit}>
          <label> Recipe Title: </label>
          <input
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.updateValue}
            required
          />
          <label> Recipe Description </label>
          <input
            name="description"
            type="text"
            onChange={this.updateValue}
            value={this.state.desc}
            required
          />
          <input type="submit" value="Save" />
        </form>
        <p className="response">{this.state.response}</p>
      </div>
    );
  }
}

export default UpdateRecipe;
