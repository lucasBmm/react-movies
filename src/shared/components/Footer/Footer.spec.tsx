import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
describe('Footer tests', () => {
    it("Should render footer component", () => {
        render(<Footer />);

        const text = screen.getByText(/This product uses the TMDB API but is not endorsed or certified by TMDB./i);

        expect(text).toBeInTheDocument();
    });
    it('Should render footer image', () => {
        render(<Footer />);

        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();
    });
});

export {}