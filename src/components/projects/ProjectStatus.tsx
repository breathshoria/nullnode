import React from 'react';

interface Props {
    onGoing: boolean;
    className: string;
}

const ProjectStatus = ({onGoing, className}: Props) => {
    if (onGoing) {
        return (
            <div className={className}>
                <img className={'p-1 h-7'} src={'/signal-good.svg'}/>
            </div>
        )
    }
    return (
        <div className={className}>
            <img className={'p-1 h-7'} src={'/signal-fair.svg'}/>
        </div>
    )
}
export default ProjectStatus;