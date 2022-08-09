import React, {useEffect, useState} from 'react';
import api from "../../utils/axiosInterceptors";
import {useParams} from "react-router-dom";
import Loader from "../helpers/Loader";
import ReactMarkdown from 'react-markdown'
import ProjectType from "../../types/project.interface";

const Project = () => {
    const {projectId} = useParams();
    const [isLoading, setLoading] = useState(true)
    const [project, setProject] = useState<ProjectType | null>(null);

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
            setLoading(false)
        }
        fetchApi()
    }, [projectId])

    if (isLoading) {
        return (
            <div className={'bg-gray-800 min-h-screen flex items-center justify-center'}>
                <Loader className={'w-10 h-10'}></Loader>
            </div>
        )
    }
    if (!project) {
        return (
            <div className={'bg-gray-800 min-h-screen flex items-center justify-center'}>
                <div className={'w-10 h-10'}>404</div>
            </div>
        )
    }
    return (
        <>
            <div className={'min-h-screen p-5 w-full flex flex-col gap-4 items-center mx-auto'}>
                <div
                    className={'w-1/2 p-2 flex flex-col justify-evenly sm:flex-row sm:flex-wrap items-center'}>
                    <img
                        className={'w-20 ml-3 inline-block'}
                        src={`${process.env.REACT_APP_API_DOMAIN}/${project.logoUrl}`}
                        alt={'project logo'}
                    />
                    <div className={'text-center'}>
                        <span className={'text-4xl sm:text-5xl font-medium'}>{project.title}</span>
                    </div>
                    <div className={'flex flex-col items-center gap-2 p-2 font-medium text-base text-black sm:text-lg'}>
                        <div className={'bg-white rounded-md p-2 w-full'}>
                            <p className={'text-center'}>{project.stage}</p>
                        </div>
                        <div className={'bg-white rounded-md p-2 w-full flex flex-row gap-2'}>
                            <a href={project.website}><img className={'w-5'} src={'/website.svg'} alt={'website logo'}/></a>
                            <a href={project.github}><img className={'w-5'} src={'/github.svg'} alt={'github logo'}/></a>
                            <a href={project.discord}><img className={'w-5'} src={'/discord.svg'} alt={'discord logo'}/></a>
                            <a href={project.telegram}><img className={'w-5'} src={'/telegram.svg'} alt={'tg logo'}/></a>
                        </div>
                    </div>
                </div>
                <div className={'mt-2 grid sm:grid-cols-2 gap-5 w-3/4'}>
                    <div className={'border-sky-700 border-2 rounded-md p-4 flex flex-col'}>
                        <p className={'text-center font-medium text-lg bg-sky-700 mb-2 rounded-md'}>Summary</p>
                        <ReactMarkdown className={'prose prose-invert'}>{project.summary}</ReactMarkdown>
                    </div>
                    <div className={'border-sky-700 border-2 rounded-md p-4 flex flex-col'}>
                        <p className={'text-center font-medium text-lg bg-sky-700 mb-2 rounded-md'}>Contribution</p>
                        <ReactMarkdown className={'prose prose-md prose-invert m-0'}>{project.involvement}</ReactMarkdown>
                    </div>
                </div>
                <div className={'mt-2 flex flex-col w-3/4'}>
                    <div className={'border-sky-700 border-2 rounded-md p-4 flex flex-col'}>
                        <h1 className={'text-center font-medium text-lg bg-sky-700 mb-2 rounded-md'}>Guide</h1>
                        <ReactMarkdown className={'prose prose-invert'}>{project.guide}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Project;