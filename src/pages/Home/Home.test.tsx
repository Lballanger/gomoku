import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";

describe("Home", () => {
  test("renders correctly", async () => {
    render(<Home />, { wrapper: BrowserRouter });

    // Vérifie que la page d'accueil est rendue
    expect(screen.getByText("Morpion Gomoku")).toBeInTheDocument();
  });
});
