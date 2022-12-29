import React from "react";
import "./App.css";
import Router from "./Router";
import Error404 from "./pages/error/Error404.jsx"
class App extends React.Component {
  constructor(props) {
    console.log("Props App.js", props)
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log("Error from Error Boundery", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Error404 error={this.state.hasError}/>
    }

    return   <Router /> 
  }
}


export default App;
