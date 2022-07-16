import React, {useEffect, useState} from "react";
import {Transition} from "@headlessui/react";

interface Props {
    error: number;
}

const Error = ({error}: Props) => {
    const [isShowing, setIsShowing] = useState(false)
    const [message, setMessage] = useState('')


    const findError = (error: number) => {
        switch(error) {
            case 400:
                return setMessage('No user with this name')
            case 401:
                return setMessage('Bad credentials')
            default:
                return setMessage('Something goes wrong')
        }

    }
    useEffect(() => {
        setIsShowing(true)
        findError(error)
        setTimeout(() => setIsShowing(false), 5000)
        return () => {
            setIsShowing(false)
        }
    }, [error])

    return(
        <Transition
            show={isShowing}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className={'flex flex-col justify-center items-center '}>
            <div className="p-4 mt-2 w-full justify-center flex relative mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                 role="alert">
                    <span className="font-medium">{message}</span>
            </div>
            </div>
        </Transition>
    )
}

export default Error