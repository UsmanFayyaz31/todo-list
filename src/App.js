import React from 'react';
import './App.css';

class DisplayData extends React.Component {
  render() {
    var temp = this.props.inp;
    var completeTasks = this.props.inp.map(function (i) {
      if (i.checked === true) {
        return <li key={temp.indexOf(i)}>{i.data}</li>
      }
    });

    var inCompleteTasks = this.props.inp.map(function (i) {
      if (i.checked === false) {
        return <li key={temp.indexOf(i)}>{i.data}</li>
      }
    });
    return (
      <div>
        <div id="incompleted-list">
          <h2>Incomplete Tasks</h2>
          <ul>
            {inCompleteTasks}
          </ul>
        </div>
        <div id="completed-list">
          <h2>Complete Tasks</h2>
          <ul>
            {completeTasks}
          </ul>
        </div>
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
    var temp1 = {
      data: this.state.input,
      checked: false
    }
    temp.push(temp1);
    temp.sort(function (a, b) { return a.checked - b.checked });
    this.setState({
      input: '',
      submit: this.state.input,
      arr: temp
    });
  }

  handleCheck(event) {
    var tempArr = this.state.arr;
    var index = event.currentTarget.dataset.id;

    tempArr[index].checked = !tempArr[index].checked;
    tempArr.sort(function (a, b) { return a.checked - b.checked });

    this.setState({
      arr: tempArr
    });
  }

  handleDelete(event) {
    event.preventDefault();
    var index = event.currentTarget.dataset.id;
    var temp = this.state.arr;
    temp.splice(index, 1);

    this.setState({
      arr: temp
    });

  }

  render() {
    const items = this.state.arr.map(i =>
      <li key={this.state.arr.indexOf(i)} >
        <input onChange={this.handleCheck} data-id={this.state.arr.indexOf(i)} type="checkbox" value={i.data} checked={(i.checked === true) ? true : false} />
        {(i.checked === true) ? <p style={{ textDecoration: "line-through" }}>{i.data}</p> : <p>{i.data}</p>}
        <button id="delButton" value={i.data} data-id={this.state.arr.indexOf(i)} onClick={this.handleDelete}>x</button>
      </li>
    );
    return (
      <div>
        <div className="form">
          <h2>Todo List</h2>
          <form>
            <input id="text-field" type='text' value={this.state.input} onChange={this.handleChange} />
            <button className="roundButton" onClick={this.handleSubmit}>+</button>
          </form>
          <ul>
            {items}
          </ul>
          <DisplayData inp={this.state.arr} />
        </div>
        <div id="author">
          <p>Designed and Coded by <b>Usman Fayyaz</b>.</p> <br />
          <a href="https://github.com/UsmanFayyaz/todo-list">Link to github repository.</a>
        </div>
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
