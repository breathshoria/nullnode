import React from 'react';
import {Link} from "react-router-dom";
import ProjectStatus from "./ProjectStatus";
import ProjectType from "../../types/project.interface";

type Props = Pick<ProjectType, "id" | "logoUrl" | "title" | "description" | "onGoing">

const ProjectCard = ({id, title, onGoing, logoUrl, description}: Props) => {
    return (
            <Link
                className={`relative w-3/4 sm:w-full flex flex-col items-center justify-center bg-sky-700 hover:bg-sky-600 rounded-lg p-4 flex-nowrap min-h-full cursor-pointer`}
                to={`/projects/${id}`}
            >
                    <img
                        className={'w-20 mx-auto rounded-full'}
                        src={`${process.env.REACT_APP_API_DOMAIN}/${logoUrl}`}
                        alt={'project logo'}
                    />
                    <span className={'py-2 inline-block w-full text-center'}>{title}</span>
                    <p className={'inline-block w-full text-start'}>{description}</p>
                    <ProjectStatus className={'absolute top-1 right-1'} onGoing={onGoing} />
            </Link>
    )
}
export default ProjectCard;