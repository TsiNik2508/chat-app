import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { auth } from '../../firebase';

jest.mock('../../firebase', () => ({
    auth: {
        currentUser: {
            uid: 'user123',
            displayName: 'Test User',
            photoURL: 'test-avatar-url',
        },
        signOut: jest.fn(),
    },
}));

describe('Header', () => {
    it('renders title and menu button', () => {
        render(<Header onToggleMenu={jest.fn()} isMenuOpen={false} onEditProfile={jest.fn()} />);
        expect(screen.getByText(/ChatApp/i)).toBeInTheDocument();
        expect(screen.getByTitle(/Открыть меню/i)).toBeInTheDocument();
    });

    it('toggles menu button icon', () => {
        render(<Header onToggleMenu={jest.fn()} isMenuOpen={true} onEditProfile={jest.fn()} />);
        expect(screen.getByTitle(/Закрыть меню/i)).toBeInTheDocument();
    });

    it('displays user avatar and name when logged in', () => {
        render(<Header onToggleMenu={jest.fn()} isMenuOpen={false} onEditProfile={jest.fn()} />);
        expect(screen.getByAltText(/Test User/i)).toBeInTheDocument();
        expect(screen.getByText(/Test User/i)).toBeInTheDocument();
    });

    it('calls signOut when "Выйти" button is clicked', () => {
        render(<Header onToggleMenu={jest.fn()} isMenuOpen={false} onEditProfile={jest.fn()} />);
        const signOutButton = screen.getByText(/Выйти/i);

        fireEvent.click(signOutButton);

        expect(auth.signOut).toHaveBeenCalled();
    });
});
