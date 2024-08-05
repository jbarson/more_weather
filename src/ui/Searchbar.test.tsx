import { render, screen, fireEvent } from '@testing-library/react';
import Searchbar from '@/ui/Searchbar';

describe('Searchbar', () => {
  test('renders input element', () => {
    render(<Searchbar />);
    const inputElement = screen.getByPlaceholderText('Enter your location');
    expect(inputElement).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    render(<Searchbar />);
    const inputElement = screen.getByPlaceholderText('Enter your location');
    fireEvent.change(inputElement, { target: { value: 'New York' } });
    expect(inputElement.value).toBe('New York');
  });

  test('renders dropdown when cities are available', () => {
    render(<Searchbar />);
    const inputElement = screen.getByPlaceholderText('Enter your location');
    fireEvent.change(inputElement, { target: { value: 'New York' } });
    const dropdownElement = screen.getByTestId('dropdown');
    expect(dropdownElement).toBeInTheDocument();
  });

  test('selects city on click', () => {
    render(<Searchbar />);
    const inputElement = screen.getByPlaceholderText('Enter your location');
    fireEvent.change(inputElement, { target: { value: 'New York' } });
    const cityElement = screen.getByText('New York');
    fireEvent.click(cityElement);
    expect(inputElement.value).toBe('');
  });
});