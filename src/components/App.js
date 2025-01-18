
import React from "react";
import './../styles/App.css';

import BookList from "../components/BookList";
import { Provider } from 'react-redux'
import { store } from "../redux/store";

const App = () => {
  return (
    <Provider store={store}>
        <BookList />
    </Provider>
  )
}

export default App;