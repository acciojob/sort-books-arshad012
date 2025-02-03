
import React from "react";
import './../styles/App.css';

import BooksList from "./BooksList";
import { Provider } from 'react-redux'
import { store } from "../redux/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
          <BooksList />
      </Provider>
    </>
  )
}

export default App;