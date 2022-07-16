import React, {useState, useEffect} from "react";
import TelegramForm from "./TelegramForm";
import Loader from "../../helpers/Loader";
import TelegramList from "./TelegramList";
import api from "../../../utils/axiosInterceptors";



const Telegrams = () => {
    const [users, setUsers] = useState([])
    const [isFetching, setFetching] = useState(false)
    const handleDelete = async(id) => {
        try {
            setFetching(true)
            await api.delete('/telegram/' + id)
            setUsers(users.filter((user) => user._id !== id))
            setFetching(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleGet = async () => {
        try {
            setFetching(true)
            const response = await api.get('/telegram')
            setUsers(response.data.users)
            setFetching(false)
        } catch (err) {
            setFetching(false)
            setUsers([])
            throw err
        }
    }

    useEffect(() => {
        handleGet()
        return () => {
            setUsers([])
        }
    }, [])

    return (
        <div className="flex flex-col items-center w-full">
            <TelegramForm
                getUsers={async () => handleGet()}
                disabled={isFetching}
            />
            {isFetching && <Loader className={'h-10 w-10'}/>}
            <div
                className={'mt-1 w-1/2 border-gray-900 border rounded-md bg-gray-700 divide-y'}
                style={{display: users.length ? 'block' : 'none'}}
            >
                {users.map((user, i) => (
                    <TelegramList
                        key={i}
                        i={i}
                        id={user._id}
                        chatID={user.chat_id}
                        token={user.token}
                        handleDelete={async () => handleDelete(user._id)}
                        disabled={isFetching}
                    />

                ))}
            </div>
        </div>
    );
}

export default Telegrams;