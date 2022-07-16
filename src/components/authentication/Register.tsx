import React, {useState} from 'react';
import useAuth from '../../hooks/useAuth';
import {useNavigate} from 'react-router-dom'
import Loader from "../helpers/Loader";
import Error from "../helpers/Error";

const Register = () => {
    // @ts-ignore
    const { registerUser, isLoading, error } = useAuth()
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    })

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setCredentials({...credentials, [name]: value});
    }

    const handleSubmit = async (event: any) => {

        await event.preventDefault();
        await registerUser(credentials, () => navigate('/'))
    }
        return(
            <div className={'min-h-screen flex flex-1 flex-col items-center mt-5'}>
                {error && <Error error={error}></Error>}
                <form className={'`w-1/2'}>
                    <label>
                        <span className={'text-md'}>Username</span>
                        <input
                            className={'mt-2 h-10 pl-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1'}
                            type="text"
                            name={'username'}
                            value={credentials.username}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <p>Password</p>
                        <input
                            className={'mt-2 h-10 pl-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}
                            value={credentials.password}
                            name={'password'}
                            onChange={handleChange}
                            type="password"
                        />
                    </label>
                    <button
                        className="mt-3 bg-gray-700 text-white px-3 py-2 h-10 rounded-md text-sm font-medium flex items-center"
                        onClick={handleSubmit}
                    >
                        {isLoading && <Loader className={'w-5 h-5'}></Loader>}
                        <span>Register</span>
                    </button>
                </form>
            </div>
        )
}

export default Register