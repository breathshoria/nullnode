import React, {useState} from 'react';
import useAuth from '../../hooks/useAuth';
import {useNavigate} from 'react-router-dom'
import Loader from "../helpers/Loader";
import Error from "../helpers/Error";

const Register = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        email: '',
    })

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setCredentials({...credentials, [name]: value});
    }

    const handleSubmit = async (event: any) => {

        await event.preventDefault();
        await auth?.registerUser(credentials, () => navigate('/'))
    }
    return (
        <div className={'min-h-screen mt-5 flex flex-col items-center'}>
            {auth?.error && <Error error={auth.error}></Error>}
            <form className={'w-2/3 sm:w-1/3'}>
                <div className={'pb-2'}>
                    <label>
                        <span className={'text-lg sm:text-base'}>Username</span>
                        <input
                            className={'mt-3 h-10 pl-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1'}
                            type="text"
                            name={'username'}
                            value={credentials.username}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className={'pt-2 pb-2'}>
                    <label>
                        <span className={'text-lg sm:text-base'}>E-mail</span>
                        <input
                            className={'mt-3 h-10 pl-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1'}
                            type="text"
                            name={'email'}
                            value={credentials.email}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className={'pt-2 pb-2'}>
                    <label>
                        <span className={'text-lg sm:text-base'}>Password</span>
                        <input
                            className={'mt-3 h-10 pl-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}
                            value={credentials.password}
                            name={'password'}
                            onChange={handleChange}
                            type="password"
                        />
                    </label>
                </div>
                <button
                    className="mt-3 bg-gray-700 text-white px-3 py-2 h-10 rounded-md text-sm font-medium flex items-center"
                    onClick={handleSubmit}
                >
                    {auth?.isLoading && <Loader className={'w-5 h-5'}></Loader>}
                    <span className={'text-lg sm:text-base'}>Register</span>
                </button>
            </form>
        </div>
    )
}

export default Register