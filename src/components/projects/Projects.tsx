import React, {useEffect, useState} from 'react';
import ProjectCard from "./ProjectCard";
import api from "../../utils/axiosInterceptors";
import ProjectType from '../../types/project.interface'
import Loader from "../helpers/Loader";

const Projects = () => {
    const [isLoading, setLoading] = useState(true);
    const [projects, setProjects] = useState<ProjectType[] | null>(null);

    const fetchProjects = async () => {
        try {
            const response = await api.get('projects');
            console.log(response)
            const mappedProjects = response.data.map((project: ProjectType) => {
                return {
                    id: project.id,
                    title: project.title,
                    description: project.description,
                    logoUrl: project.logoUrl,
                    onGoing: project.onGoing,
                }
            });
            setProjects(mappedProjects);
        } catch (e) {
            throw (e);
        }
    }

    useEffect(() => {
        const fetchApi = async() => {
            await fetchProjects()
            setLoading(false);
        }
        fetchApi()
    }, [setLoading])

    if (isLoading) {
        return (
            <div className={'bg-gray-800 min-h-screen flex items-center justify-center'}>
                <Loader className={'w-10 h-10'}></Loader>
            </div>
        )
    }
    return (
        <div className="min-h-screen">
            <span className={'text-2xl inline-block w-full text-center p-2'}>My projects</span>
            <div  className={'p-5 flex flex-col sm:grid sm:grid-cols-3 gap-4 items-center justify-center'}>
                {projects?.map((project) => (
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        title={project.title}
                        description={project.description}
                        logoUrl={project.logoUrl}
                        onGoing={project.onGoing}
                    />
                    ))
                }
            </div>
        </div>
    );
}

export default Projects;