import React, {useEffect} from "react";
import HorizontalLine from "../helpers/HorizontalLine";

const Profile = () => {
    useEffect(() => {
    }, [])

    return (

        <div className="min-h-screen flex flex-col items-center">
            <p className={'text-md mt-5'}>Profile</p>
            <HorizontalLine color={'text-amber-100'} className={'w-1/3 border rounded-full mt-10'} />
            <p className={'text-md mt-5'}>Under construction</p>
        </div>
    );
}

export default Profile;