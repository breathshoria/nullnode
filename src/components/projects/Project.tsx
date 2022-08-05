import React, {useEffect, useState} from 'react';
import api from "../../utils/axiosInterceptors";
import {useParams} from "react-router-dom";
import Loader from "../helpers/Loader";

interface Project {
    title: string;
    description: string;
    stage: string;
    logo: string;
    website: string;
    discord: string;
    github: string;
    telegram: string;
    summary: string;
    startDate: string;
    involvement: string;
    guide: string;
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
            <div className={'min-h-screen p-5 w-full flex flex-col gap-4 items-center mx-auto'}>
                <div
                    className={'border-sky-800 border-2 rounded-lg w-3/4 p-2 flex flex-col justify-evenly sm:flex-row sm:flex-wrap items-center'}>
                    <img
                        className={'w-20 ml-3 inline-block'}
                        src={`${process.env.REACT_APP_API_DOMAIN}/${project.logo}`}
                    />
                    <div className={'text-center'}>
                        <span className={'text-4xl sm:text-5xl font-medium'}>{project.title}</span>
                    </div>
                    <div className={'flex flex-col items-center gap-2 p-2 font-medium text-base text-black sm:text-lg'}>
                        <div className={'bg-white rounded-md p-2 w-full'}>
                            <p className={'text-center'}>{project.stage}</p>
                        </div>
                        <div className={'bg-white rounded-md p-2 w-full flex flex-row gap-2'}>
                            <a href={project.website}><img className={'fill-sky-700 w-5'} src={'/website.svg'}/></a>
                            <a href={project.github}><img className={'fill-sky-700 w-5'} src={'/github.svg'}/></a>
                            <a href={project.discord}><img className={'fill-sky-700 w-5'} src={'/discord.svg'}/></a>
                            <a href={project.telegram}><img className={'fill-sky-700 w-5'} src={'/telegram.svg'}/></a>
                        </div>
                    </div>
                </div>
                <div className={'mt-2 grid sm:grid-cols-2 gap-5 w-3/4'}>
                    <div className={'border-sky-800 border-2 rounded-md p-4 flex flex-col'}>
                        <p className={'text-center font-medium text-lg'}>Summary</p>
                        <p className={'text-base'}>{project.summary}</p>
                    </div>
                    <div className={'border-sky-800 border-2 rounded-md p-4 flex flex-col'}>
                        <p className={'text-center font-medium text-lg'}>Participation</p>
                        <p>{project.involvement}</p>
                    </div>
                </div>
                <div className={'mt-2 flex flex-col w-3/4'}>
                    <div className={'border-sky-800 border-2 rounded-md p-4 flex flex-col'}>
                        <h1 className={'text-center font-medium text-lg'}>Helpful information</h1>
                        <p>{project.guide}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Project;