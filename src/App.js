import React from 'react';
import './App.css';
import githubLogo from './GitHub-Mark-32px.png';
import TextField from '@material-ui/core/TextField';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async validate(response){
    if (response.ok) {
      return response.json()
    }
    else {
      let errorMessage = 'Error commmunicating with the API';
      if (response.status === 404)
        errorMessage = 'User not found';

      return Promise.reject(new Error(errorMessage))
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    try{
      await fetch(`https://api.github.com/users/${this.state.user}/repos`)
      .then(this.validate)
    }
    catch (error) {
      console.log(error)
    }
  }

  handleChange(event) {
    this.setState({user: event.target.value});
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Enter a GitHub user:
          </p>
          <form onSubmit={this.handleSubmit}>
            <div className='input-container'>
              <img src={githubLogo} alt="github user" className='github-logo' />
              <TextField className='input-box' id="input-with-icon-textfield" variant="outlined" onChange={this.handleChange}/>
            </div>
          </form>
        </header>
      </div>);
  }
}

export default App;
