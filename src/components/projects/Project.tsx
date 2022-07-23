import React from 'react';

interface Props {
    title: string;
    logo: string;
    description: string;
}

const Project = ({title, logo, description}: Props) => {
    return (
        <>
            <div className={'flex flex-row sm:flex-col items-center bg-sky-700 rounded-md p-4 flex-nowrap min-h-full'}>
                <div className={''}>
                    <img className={'w-20 mx-auto'} src={`${process.env.REACT_APP_API_DOMAIN}/${logo}`}/>
                    <span>{title}</span>
                    <p>{description}</p>
                </div>
            </div>
        </>
    )
}

export default Project;