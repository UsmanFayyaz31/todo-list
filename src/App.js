import React from 'react';
// import logo from './logo.svg';
import './App.css';

class DisplayData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: this.props.inp,
      arrayTemp: [],
      msg: ""
    }
    this.doneTask = this.doneTask.bind(this);
    this.unDoneTask = this.unDoneTask.bind(this);
  }

  doneTask(){
    var temp =[];
    var input = this.props.inp;

    for(var i in input) {
      if(input[i].checked === true) {
        temp.push(input[i]);
      }
    }
    if(temp.length !== 0) {
      this.setState({
        arrayTemp: temp,
        msg: "The completed tasks are:"
      });
    }
  }

  unDoneTask(){
    var temp =[];
    var input = this.props.inp;

    for(var i in input) {
      if(input[i].checked === false) {
        temp.push(input[i]);
      }
    }

    if(temp.length !== 0) {
      this.setState({
        arrayTemp: temp,
        msg: "The incomplete tasks are:"
      });
    }
  }

  render() {
    var list = this.state.arrayTemp.map(i=> <li key = {i.data+1}>{i.data}</li>);
    return (
      <div>
        <button style={{marginRight: 20}} onClick={this.doneTask}>Show Complete Tasks</button>
        <button onClick={this.unDoneTask}>Show Incomplete Tasks</button>
        <h3>{this.state.msg}</h3>
        <ul>
          {list}
        </ul>
      </div>
    );
  }
}

class MyData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: '',
      arr: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }
  
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var temp = this.state.arr;
    var temp1={
      data: this.state.input,
      checked: false
    }
    temp.push(temp1);
    
    this.setState({
      input: '',
      submit: this.state.input,
      arr: temp
    });
  }

  handleCheck(event){
    var tempArr = this.state.arr;
    
    for(var i in this.state.arr) {
      if(tempArr[i].data === event.target.value){
        tempArr[i].checked = !tempArr[i].checked;
      }
    }
    this.setState({
      arr: tempArr
    });
  }

  handleDelete(event){
    event.preventDefault();
    var temp = this.state.arr;
    temp = temp.filter(a => a.data !== event.target.value);

    this.setState({
      arr: temp
    });

  }

  render() {
    const items = this.state.arr.map(i => 
      <li key={i.data+1}>
        <input onChange={this.handleCheck} type="checkbox" value={i.data} /> 
        {(i.checked === true) ? <p style={{textDecoration: "line-through"}}>{i.data}</p> : <p>{i.data}</p>}
        <button id="delButton" value={i.data} onClick={this.handleDelete}>x</button>
      </li>
    );
    return(
      <div className="form">
        <h2>Todo List</h2>
        <form>
          <input type='text' value={this.state.input} onChange={this.handleChange}/>
          <button className="roundButton" onClick={this.handleSubmit}>+</button>
        </form>
        <ul>
          {items}
        </ul>
        <DisplayData inp = {this.state.arr}/>
      </div>
    );
  }
}

function App() {
  return (
      <MyData />
  );
}

export default App;
