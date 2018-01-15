import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      owner: "",
      image: "",
      dogs: []
    };
  }

  componentWillMount() {
    fetch("/dogs/")
      .then(response => response.json())
      .then(dogs =>
        this.setState({
          dogs: dogs
        })
      );
  }

  postDog = () => {
    var formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("owner", this.state.owner);
    formData.append("myImage", this.state.image);
    fetch("/upload", {
      method: "POST",
      body: formData
    }).then(() =>
      fetch("/dogs/")
        .then(response => response.json())
        .then(dogs =>
          this.setState({
            dogs: dogs
          })
        )
    );
  };

  render() {
    return (
      <div>
        <header>
          <h1>Image uploading in Node with Multer and Cloudinary</h1>
        </header>
        <div className="uploadForm">
          <h3>Dog Name</h3>
          <input
            type="text"
            placeholder="Dog Name"
            onChange={e => this.setState({ name: e.target.value })}
          />

          <h3>Owner Name</h3>
          <input
            type="text"
            placeholder="Owner Name"
            onChange={e => this.setState({ owner: e.target.value })}
          />

          <h3>Upload Image</h3>
          <input
            type="file"
            onChange={e => this.setState({ image: e.target.files[0] })}
          />
          <button onClick={this.postDog}>Save</button>
        </div>
        <div className="images">
          {this.state.dogs.map(dog => {
            return (
              <div>
                <img src={dog.filePath} alt="dog" width="75px" />
                <p>name: {dog.name}</p> <p>owner: {dog.owner}</p>
              </div>
            );
          })}
        </div>
        <div />
      </div>
    );
  }
}

export default App;
