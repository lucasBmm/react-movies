import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navbar } from './Navbar';
import { renderWithRouter } from '../../utils/tests/renderWithRouter';
import { createMemoryHistory } from '@remix-run/router';

describe('Navbar Tests', () => {
    const navbarLinks = [
        {
            name: 'Movies',
            url: 'movies'
        },
        {
            name: 'Series',
            url: 'series'
        },
        {
            name: 'People',
            url: 'people'
        },
    ];

    it('Should render navbar', () => {
        renderWithRouter(<Navbar />);

        const navbar = screen.getByRole('navigation');
        expect(navbar).toBeInTheDocument();
    });

    it('Should render navbar links', () => {
        renderWithRouter(<Navbar />);

        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(3);
    });

    it('Should display correct name and url', () => {
        renderWithRouter(<Navbar />);

        const links = screen.getAllByRole('link');
        links.map((link, index) => {
            expect(link).toHaveTextContent(navbarLinks[index].name);
        });
    });

    it('Should change route when use click on link', () => {
        renderWithRouter(<Navbar />);
        const history = createMemoryHistory({ initialEntries: ['/'] });

        expect(history.location.pathname).toBe('/');
        userEvent.click(screen.getByText(navbarLinks[0].name));

        waitFor(() => expect(history.location.pathname).toBe(navbarLinks[0].url));
    });
});

export {}