import React, { Component } from "react";

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
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
      title: this.state.title,
      description: this.state.description,
      image: this.state.image
    };
    this.setState({
        response: ""
    })

    fetch("http://recipe.project/recipe/", {
      method: "POST",
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
      <div className="addRecipe">
        <p className="response">{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <label> Recipe Title: </label>
          <input
            name="title"
            type="text"
            onChange={this.updateValue}
            value={this.state.title}
            required
          />
          <label> Recipe Description </label>
          <input
            name="description"
            type="text"
            onChange={this.updateValue}
            value={this.state.description}
            required
          />
          <label> Recipe ImageUrl </label>
          <input
            name="image"
            type="text"
            onChange={this.updateValue}
            value={this.state.addRecipeImage}
            required
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddRecipe;
