import React, {useEffect, useState} from 'react';
import ProjectCard from "./ProjectCard";
import api from "../../utils/axiosInterceptors";

interface Project {
    id: number;
    title: string;
    description: string;
    logo: string;
    onGoing: boolean;
}

const Projects = () => {
    const [projects, setProjects] = useState<Project[] | null>(null);

    const fetchProjects = async () => {
        try {
            const response = await api.get('projects');
            console.log(response)
            const mappedProjects = response.data.map((project: Project) => {
                return {
                    id: project.id,
                    title: project.title,
                    description: project.description,
                    logo: project.logo,
                    onGoing: project.onGoing,
                }
            });
            setProjects(mappedProjects);
        } catch (e) {
            throw (e);
        }
    }

    useEffect(() => {
        async function fetchApi() {
            await fetchProjects()
        }
        fetchApi()
    }, [])


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
                        logo={project.logo}
                        onGoing={project.onGoing}
                    />
                    ))
                }
            </div>
        </div>
    );
}

export default Projects;