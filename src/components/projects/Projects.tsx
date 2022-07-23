import React, {useEffect, useState} from 'react';
import Project from "./Project";
import api from "../../utils/axiosInterceptors";

interface Project {
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
            <span className={'text-xl inline-block w-full text-center p-2'}>Projects</span>
            <div  className={'p-5 mx-auto grid sm:grid-cols-3 gap-4 items-center w-3/4 justify-center'}>
                {projects?.map((project) => (
                    <Project
                        key={project.title}
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