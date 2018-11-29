import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import './App.css';
import Search from './components/Search';
import Companies from './components/Companies';

const API = 'https://sheets.googleapis.com/v4/spreadsheets/1Km9bsx0SWPDiOPMYvremSDujyS5sF0ZQvbxr5S52wSA/values:batchGet?ranges=A12:Q400&majorDimension=ROWS&key=AIzaSyD012huNG91uTNFP6YcHfbsN_xxGyEwcok';

class App extends Component {

  state = {
    items: [],
    searchItems: [],
    searchQuery: '',
  }

  componentDidMount() {
    axios.get( API )
      .then( response => {
        let values = response.data.valueRanges[0].values;
        const rows = [];
        for (let i = 0; i < values.length; i++) {
          if ( values[i][5] === "" ) continue;
          let rowObject = {
            key: uuid.v4(),
            name: values[i][0],
            base: parseInt(values[i][5].replace(',', '').slice(1)),
            stock: parseInt(values[i][6].replace(',', '').slice(1)),
            sign: parseInt(values[i][7].replace(',', '').slice(1)),
            count: values[i][8]
          };
          rows.push( rowObject );
        }
        console.log( rows );
        this.setState( {
          items: rows,
          searchItems: rows,
        } )
      } )
      .catch( error => {
        throw new Error( "Request Error: ", error );
      })
  }

  handleChange = ( e ) => {
    let query = e.target.value;
    let items = this.state.items;
    console.log( items[0].name );
    let filtered = items.filter( item => item.name.toLowerCase().search( query.toLowerCase() ) !== -1 );

    this.setState( {
      searchItems: filtered,
      searchQuery: e.target.value
    } )
  }

  render() {
    return (
      <div className="App">
        <h1>Software Engineer Grad Salary Search</h1>
        <p>All data is from Reddit Salary Sharing <a href="https://docs.google.com/spreadsheets/d/1Km9bsx0SWPDiOPMYvremSDujyS5sF0ZQvbxr5S52wSA/htmlview?usp=sharing&utm_content=buffer8659f&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer&sle=true" target="_blank">Google Sheets</a></p>
        <Search query={ this.state.searchQuery } handleChange={ this.handleChange } />
        <Companies items={ this.state.searchItems } />
      </div>
    );
  }
}

export default App;
