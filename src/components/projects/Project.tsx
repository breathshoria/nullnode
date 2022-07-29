import React, {useEffect, useState} from 'react';
import api from "../../utils/axiosInterceptors";
import {useParams} from "react-router-dom";
import Loader from "../helpers/Loader";

interface Project {
    title: string;
    description: string;
    logo: string;
}

const Project = () => {
    const {projectId} = useParams();
    const [project, setProject] = useState<Project | null>(null);

    const fetchProject = async () => {
        try {
            const response = await api.get(`projects/getProject/${projectId}`);
            setProject(response.data)
        } catch (e) {
            throw (e);
        }
    }

    useEffect(() => {
        async function fetchApi() {
            await fetchProject()
        }

        fetchApi()
    }, [])

    if (!project) {
        return (
            <div className={'bg-gray-800 min-h-screen flex items-center justify-center'}>
                <Loader className={'w-10 h-10'}></Loader>
            </div>
        )
    }

    return (
        <>
            <div className={'min-h-screen p-2 w-3/4 flex flex-col gap-4 items-center mx-auto'}>
                <div
                    className={'bg-sky-900 rounded-lg w-full p-2 flex flex-col justify-center sm:flex-row items-center'}>
                    <img className={'w-20 ml-3 inline-block'}
                         src={`${process.env.REACT_APP_API_DOMAIN}/${project.logo}`}/>
                    <div className={'grow text-center'}>
                        <span className={'text-4xl sm:text-5xl font-medium font-mono'}>{project.title}</span>
                    </div>
                </div>
                <div className={'grid sm:grid-cols-2 gap-5 w-full min-h-screen'}>
                    <div className={'bg-blue-700'}>
                        <span>content</span>
                    </div>
                    <div className={'bg-blue-900'}>
                        <span>content2</span>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Project;