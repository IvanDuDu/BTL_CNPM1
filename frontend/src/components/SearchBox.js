import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form className="search-box d-inline-flex ml-4 my-2" onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products"
        className="search-input"
      ></Form.Control>
      <Button type="submit" variant="primary" className="ms-2">
        <i className="fa-solid fa-magnifying-glass"></i>
      </Button>
    </Form>
  );
};

export default SearchBox;
