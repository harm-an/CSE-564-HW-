import logo from './logo.svg';
import './App.css';
// import './components/ToolBar'
import ToolBar from './components/ToolBar';
import Body from './components/Body'
import React from "react";

const countries = require("./data/countries.json")
const draft_years = require("./data/draft_years.json")
class App extends React.Component{
  
  constructor(props) {
      super(props);

      this.state = {
          attr: "countries",
          changeChart: false
      }
  }
  handleAttrChange = (val) => {
      console.log(val)
      this.setState({attr: val, changeChart: true})
  }
  render() {
    return (
      <div className="App">
        <ToolBar onDropDownChange={this.handleAttrChange}/>
        <Body attr = {this.state.attr} changeChart = {this.state.changeChart}/>
      </div>
    );
  }
  
}

export default App;
