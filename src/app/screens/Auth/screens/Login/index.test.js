import React from 'react';
import * as redux from 'react-redux';
import { render, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react-native';
import Login from '@authScreens/Login';

const INVALID_EMAIL = 'hello';
const VALID_EMAIL = 'email@email.com';
const VALID_PASSWORD = 'HelloWord1234';

describe('<Login />', () => {
  test('Invalid inputs', async () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const dispatch = jest.fn();
    useDispatchSpy.mockReturnValue(dispatch);

    const { getByText, getAllByText, getByTestId } = render(<Login />);

    const submitButton = getByText('Iniciar sesión');
    const emailInput = getByTestId('Email');

    fireEvent.press(submitButton);

    await waitFor(() => expect(getAllByText('Este campo es obligatorio')).toHaveLength(2));

    fireEvent.changeText(emailInput, INVALID_EMAIL);
    fireEvent.press(submitButton);

    await waitFor(() => getByText('El formato del mail es inválido'));

    fireEvent.changeText(emailInput, VALID_EMAIL);
    fireEvent.press(submitButton);

    await waitForElementToBeRemoved(() => getByText('El formato del mail es inválido'));
    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  test('Log in', async () => {
    const navigation = {
      navigate: jest.fn()
    };
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const dispatch = jest.fn();
    useDispatchSpy.mockReturnValue(dispatch);
    const { getByText, getByTestId } = render(<Login navigation={navigation} />);
    const emailInput = getByTestId('Email');
    const passwordInput = getByTestId('Contraseña');
    const submitButton = getByText('Iniciar sesión');
    fireEvent.changeText(emailInput, VALID_EMAIL);
    fireEvent.changeText(passwordInput, VALID_PASSWORD);
    await waitFor(() => fireEvent.press(submitButton));
    expect(dispatch).toHaveBeenCalled();
    useDispatchSpy.mockClear();
  });

  test('Sign up', () => {
    const navigation = {
      navigate: jest.fn()
    };
    const spy = jest.spyOn(navigation, 'navigate');
    const { getByText } = render(<Login navigation={navigation} />);
    const button = getByText('No tenes cuenta? Registrate!');
    fireEvent.press(button);
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });

  test('Login Snapshot', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue({ auth: { currentUserError: null } });
    const login = render(<Login />).toJSON();
    expect(login).toMatchSnapshot();
    spy.mockClear();
  });

  test('Login Error Snapshot', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue({ auth: { currentUserError: 'error' } });
    const login = render(<Login />);
    const { getByText } = login;
    getByText('Email y/o contraseña incorrecto/s');
    expect(login.toJSON()).toMatchSnapshot();
    spy.mockClear();
  });
});
