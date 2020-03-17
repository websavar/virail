import React from "react";
import "../index.css";
import "./app.scss";
import Header from './Header';
import Footer from "./Footer";
import Body from "../components/Body";

class App extends React.Component {

  render() {

    return (
      <div>
        <Header />
        <Body />
        <Footer />
      </div>
    )

  }
}

export default App;