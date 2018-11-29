import React from 'react';
import { Input } from 'antd';


const Search = ( { query, handleChange } ) => (
  <Input
    style={{ width: '600px' }}
    placeholder="Search a Company"
    value={ query }
    onChange={ ( e ) => handleChange( e ) }
  />
)

export default Search;