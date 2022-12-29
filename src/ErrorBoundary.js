import React from "react";
import Error from "./components/Error";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (err) {
    } finally {
      return { hasError: true };
    }
  }
  componentDidCatch(error, errorInfo) {
    console.log("error", error);
    console.log("errorInfo", errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <Error msg={this.state.hasError.message} />;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
