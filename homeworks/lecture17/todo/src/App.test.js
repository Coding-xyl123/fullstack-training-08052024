import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import ReactDOM from "react-dom/client";
import "./index.css";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
