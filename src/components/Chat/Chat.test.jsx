import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Chat from './Chat';
import { db, auth } from '../../firebase';

jest.mock('../../firebase', () => ({
    auth: {
        currentUser: {
            uid: 'user123',
            displayName: 'Test User',
        },
    },
    db: jest.fn(),
}));

describe('Chat', () => {
    it('renders chat title', () => {
        render(<Chat chatId="chat1" chatName="General" />);

        expect(screen.getByText(/General/i)).toBeInTheDocument();
    });

    it('disables input when user is not logged in', () => {
        jest.spyOn(auth, 'currentUser').mockImplementationOnce(() => null);

        render(<Chat chatId="chat1" chatName="General" />);
        const input = screen.getByPlaceholderText(/Авторизуйтесь для отправки сообщений/i);

        expect(input).toBeDisabled();
    });

    it('sends a message when user submits the form', () => {
        const mockPush = jest.fn();
        jest.mock('firebase/database', () => ({
            ref: jest.fn(),
            push: mockPush,
        }));

        render(<Chat chatId="chat1" chatName="General" />);
        const input = screen.getByPlaceholderText(/Введите сообщение/i);
        const sendButton = screen.getByText(/Отправить/i);

        fireEvent.change(input, { target: { value: 'Hello World!' } });
        fireEvent.click(sendButton);

        expect(mockPush).toHaveBeenCalledWith(expect.anything(), {
            text: 'Hello World!',
            user: 'Test User',
            uid: 'user123',
            avatar: '',
            timestamp: expect.any(Number),
        });
    });

    it('enables edit mode and saves edited message', () => {
        const mockUpdate = jest.fn();
        jest.mock('firebase/database', () => ({
            ref: jest.fn(),
            update: mockUpdate,
        }));

        render(<Chat chatId="chat1" chatName="General" />);
        const editButton = screen.getByText(/Редактировать/i);

        fireEvent.click(editButton);
        const input = screen.getByPlaceholderText(/Введите сообщение/i);
        fireEvent.change(input, { target: { value: 'Updated Message' } });

        const saveButton = screen.getByText(/Сохранить/i);
        fireEvent.click(saveButton);

        expect(mockUpdate).toHaveBeenCalledWith(expect.anything(), {
            text: 'Updated Message',
        });
    });
});
