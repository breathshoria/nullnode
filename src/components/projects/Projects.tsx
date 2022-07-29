import React, {useEffect, useState} from 'react';
import ProjectCard from "./ProjectCard";
import api from "../../utils/axiosInterceptors";

interface Project {
    id: number;
    title: string;
    description: string;
    logo: string;
}

const Projects = () => {
    const [projects, setProjects] = useState<Project[] | null>(null);

    const fetchProjects = async () => {
        try {
            const response = await api.get('projects');
            const mappedProjects = response.data.map((project: Project) => {
                return {
                    id: project.id,
                    title: project.title,
                    description: project.description,
                    logo: project.logo
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
            <div  className={'p-5 mx-auto grid sm:grid-cols-3 gap-4 items-center justify-center w-3/4'}>
                {projects?.map((project) => (
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        title={project.title}
                        description={project.description}
                        logo={project.logo}
                    />
                    ))
                }
            </div>
        </div>
    );
}

export default Projects;