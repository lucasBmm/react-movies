import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Link } from 'react-router-dom';
import { CardComponent } from './Card';

afterEach(cleanup);

interface Props {
    src:  string,
    date?: Date | string,
    name: string,
    id:   number
};

describe('CardComponent', () => {
  it('renders with required props', () => {
    const props: Props = {
      src: 'image-src',
      name: 'Movie Name',
      id: 1,
    };

    const { getByText, getByAltText } = render(<CardComponent {...props} />);

    expect(getByAltText(props.name)).toBeInTheDocument();
    expect(getByText(props.name)).toBeInTheDocument();
    expect(getByText(/^\/movies\//)).toBeInTheDocument();
  });

  it('formats date correctly', () => {
    const props = {
      src: 'image-src',
      date: new Date('2022-12-31'),
      name: 'Movie Name',
      id: 1,
    };

    const { getByText } = render(<CardComponent {...props} />);

    expect(getByText('31/12/2022')).toBeInTheDocument();
  });

  it('renders with an optional date prop', () => {
    const props: Props = {
      src: 'image-src',
      name: 'Movie Name',
      id: 1,
    };

    const { queryByText } = render(<CardComponent {...props} />);

    expect(queryByText(/\d{2}\/\d{2}\/\d{4}/)).not.toBeInTheDocument();
  });

  it('formats string date correctly', () => {
    const props: Props = {
      src: 'image-src',
      date: '2022-12-31',
      name: 'Movie Name',
      id: 1,
    };

    const { getByText } = render(<CardComponent {...props} />);

    expect(getByText('31/12/2022')).toBeInTheDocument();
  });
});

export {}