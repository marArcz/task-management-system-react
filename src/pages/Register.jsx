import React, { useState } from 'react'
import Layout from '../Layout'
import { Guest } from '../Guest'
import axios from 'axios';
import InputError from '../Components/InputError';
import InputLabel from '../Components/InputLabel';
import PrimaryButton from '../Components/PrimaryButton';
import TextInput from '../Components/TextInput';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../useAuth';

export const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [processing, setProcessing] = useState(false)
    const [token, setToken] = useState('')
    const [loginError, setLoginError] = useState(null)
    const navigate = useNavigate();

    const { register } = useAuth()

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setLoginError(null)
        if (password == confirmPassword) {
            register(
                name, username, email, password, confirmPassword
            )
                .then((res) => {
                    setProcessing(false)
                    setToken(res.data.access_token)
                    localStorage.setItem('user_token', res.data.access_token)

                    navigate('/dashboard');

                })
                .catch((err) => {
                    setProcessing(false)
                    console.error(err)
                    // setLoginError(err.response.data.message)
                })
        }else{
            setProcessing(false)
            setLoginError("Passwords does not match!")
        }
    }

    return (
        <Guest processing={processing}>
            <p className="fw-bold fs-5">Sign up Here</p>
            {loginError && (
                <p className='text-danger mb-3'>{loginError}</p>
            )}
            <form className='mt-3' onSubmit={submit}>
                <div className='mb-3'>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        required
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className='mb-3'>
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        type="text"
                        name="username"
                        value={username}
                        required
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <InputError message={errors.username} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        required
                        isFocused={true}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        required
                        value={password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Confirm password" />

                    <TextInput
                        id="confirmPassword"
                        required
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        className="mt-1 block w-full"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">

                    <PrimaryButton className="ms-4" disabled={false}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
            <p className="py-5 text-center text-sm text-secondary">Or</p>
            <div className="text-center">
                <Link
                    to="/"
                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Already have an account?
                </Link>
            </div>
        </Guest>
    )
}
