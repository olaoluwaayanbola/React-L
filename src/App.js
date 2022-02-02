import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: "56y",
    points: 4,
    objectID: 0,
  },
];
function Searched(searchTerm){
  return function (item) {
  return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
  };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: '',
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  onDismiss(object) {
    const isNotId = item => item.objectID !== object;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
    }
  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  // render() {
  //   return (
  //     <div className="App">
  //       {this.state.list.map(item =>
  //         <div key={item.objectID}>
  //           <span>
  //             <a href={item.url}>{item.title}</a>
  //           </span>
  //           <span>{item.author}</span>
  //           <span>{item.num_comments}</span>
  //           <span>{item.points}</span>
  //           <span>
  //           <button
  //             onClick={()=>{console.log(item.objectID)}}
  //             type="button"
  //           >
  //           Dismiss
  //           </button>
  //           </span>
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

  // render(){
  //   const { searchTerm, list } = this.state;
  //   return(
  //     <div className='App'>
  //       <form>
  //       <input
  //           type="text"
  //           onChange={this.onSearchChange}
  //           value= {searchTerm}
  //         />
  //       </form>
  //       {this.state.list.filter(Searched(this.state.searchTerm)).map(item =>
  //         <div key={item.objectID}>
  //           <span>
  //             <a href={item.url}>{item.title}</a>
  //           </span>
  //           <span>{item.author}</span>
  //           <span>{item.num_comments}</span>
  //           <span>{item.points}</span>
  //           <span>
  //             <button
  //               onClick={() => this.onDismiss(item.objectID)}
  //               type="button"
  //             >
  //               Dismiss
  //             </button>
  //           </span>
  //         </div>
  //       )}
  //     </div>
  //   )
  // }
  render(){
    const { searchTerm, list} = this.state;
    return(
      <div className='page'>
        <div className='interaction'>
          <Search 
            value = {searchTerm}
            onChange = {this.onSearchChange}
          />
          <Table
            list = {list}
            onDismiss = {this.onDismiss}
            pattern={searchTerm}
          />
        </div>
      </div>
    )
  }
}

class Search extends Component{
  render(){
    const {value , onChange,children} = this.props
    return(
      <form>
         {children} <input
          type = "text"
          value = {value}
          onChange={onChange}
        />
      </form>
    );
  };
}

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      <div className="table">
        {list.filter(Searched(pattern)).map(item =>
          <div key={item.objectID} className="table-row">
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => onDismiss(item.objectID)}
                type="button"
                className='button-inline'
              >
                Dismiss
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default App;