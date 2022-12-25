import { render, screen } from "@testing-library/react";
import { Home } from "./Home";
import { renderWithRouter } from "../../shared/utils/tests/renderWithRouter";

test('renders learn react link', () => {
    renderWithRouter(<Home />);
    const linkElement = screen.getByText(/Home works!/i);
    expect(linkElement).toBeInTheDocument();
});