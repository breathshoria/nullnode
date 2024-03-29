import React, {useCallback, useEffect, useState} from 'react';
import ProjectType from "../../types/project.interface";
import api from "../../utils/axiosInterceptors";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import Loader from "../helpers/Loader";

interface Props {
    toggleEditForm: Function;
    projectId: number;
}

type EditProjectType = ProjectType & {
    logo: File | null;
}


const EditProject = ({toggleEditForm, projectId}: Props) => {
    const [project, setProject] = useState<EditProjectType>({
        id: undefined,
        title: '',
        description: '',
        summary: '',
        startDate: '',
        stage: '',
        discord: '',
        website: '',
        telegram: '',
        involvement: '',
        logoUrl: '',
        logo: null,
        github: '',
        onGoing: false,
        guide: '',
    });

    const [imgPreview, setImgPreview] = useState<string>('');
    const [isLoading, setLoading] = useState(true);

    const fetchProject = async () => {
        const response = await api.get(`/projects/getProject/${projectId}`)
        response.data.logo = null;
        setImgPreview(`${process.env.REACT_APP_API_DOMAIN}/${response.data.logoUrl}`);
        setProject(response.data);
    }

    const handleChange = (event: any) => {
        const {name, value, checked, files} = event.target;
        if (name === 'onGoing') {
            event.target.checked = checked;
            project.onGoing = event.target.checked.toString();
            return setProject(project)
        }
        if (name === 'logo') {
            project.logo = files[0];
            setImgPreview(URL.createObjectURL(project.logo!))
            console.log(event.target.src)
            return setProject(project)
        }
        setProject({...project, [name]: value});
    }

    const handleSubmit = async (event: any) => {
        await event.preventDefault();
        let formData = new FormData();
        for (let key in project) {
            if(key === 'logo' && (project as any)[key] === null ) {
                continue;
            }
            formData.append(key, (project as any)[key])
        }
        await api.post('projects/updateProject', formData)
        toggleEditForm();
    }

    useEffect(() => {
        const populateForm = async () => {
            await fetchProject();
            setLoading(false);
        }
        populateForm()
    }, [projectId])

    if (isLoading) {
        return (
            <div className={'bg-gray-800 min-h-screen flex items-center justify-center'}>
                <Loader className={'w-10 h-10'}></Loader>
            </div>
        )
    }
    return (
        <div className={'min-h-screen p-5 flex flex-col items-center relative'}>
            <button className={'absolute top-0 right-0 p-5'} onClick={() => toggleEditForm()}>
                <FontAwesomeIcon icon={faClose} size={'2x'} />
            </button>
            <form className={'w-2/3'}>
                <div className={'pb-2'}>
                    <label>
                        <span className={'text-lg sm:text-base'}>Title</span>
                        <input
                            className={'mt-3 h-10 pl-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1'}
                            type="text"
                            name={'title'}
                            value={project.title}
                            placeholder={'Title of the project'}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className={'pb-2'}>
                    <label>
                        <span className={'text-lg sm:text-base'}>Logo</span>
                        <img className={'w-20 rounded-full'} src={imgPreview} />
                    </label>
                    <input
                        className={'mt-2 block w-full text-sm rounded-lg border cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 file:font-semibold file:rounded-lg file:border-0 file:p-1 file:m-1 file:bg-gray-500 file:cursor-pointer file:text-white'}
                        type="file"
                        name={'logo'}
                        onChange={handleChange}
                    />
                </div>
                <div className={'pt-2 pb-2'}>
                    <label>
                        <span className={'text-lg sm:text-base'}>Description</span>
                        <textarea
                            className={'mt-3 p-2 border text-white sm:text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white mb-1'}
                            name={'description'}
                            rows={5}
                            placeholder={'Describe the project'}
                            value={project.description}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className={'pt-2 pb-2'}>
                    <label>
                        <span className={'text-lg sm:text-base'}>Summary</span>
                        <textarea
                            className={'mt-3 p-2 bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}
                            value={project.summary}
                            rows={5}
                            name={'summary'}
                            placeholder={'What is this project for?'}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className={'pt-2 pb-2'}>
                    <label>
                        <span className={'text-lg sm:text-base'}>Contribution</span>
                        <textarea
                            className={'mt-3 p-2 bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}
                            value={project.involvement}
                            name={'involvement'}
                            placeholder={'My contribution to the project'}
                            onChange={handleChange}
                            rows={5}
                        />
                    </label>
                </div>
                <div className={'pt-2 pb-2'}>
                    <label>
                        <span className={'text-lg sm:text-base'}>Guide</span>
                        <textarea
                            className={'mt-3 p-2 bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}
                            value={project.guide}
                            name={'guide'}
                            placeholder={'How to install it'}
                            onChange={handleChange}
                            rows={5}
                        />
                    </label>
                </div>
                <div className={'pt-2 pb-2'}>
                    <label>
                        <span className={'text-lg sm:text-base'}>Stage</span>
                        <input
                            className={'mt-3 h-10 pl-2 bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1'}
                            type="text"
                            name={'stage'}
                            value={project.stage}
                            placeholder={'What stage of this project?'}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className={'pt-2 pb-2'}>
                    <label>
                        <span className={'text-lg sm:text-base'}>Start Date</span>
                        <input
                            className={'mt-3 h-10 pl-2 bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1'}
                            type="text"
                            name={'startDate'}
                            placeholder={'When it started?'}
                            value={project.startDate}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className={'pt-2 pb-2'}>
                    <label>
                        <span className={'text-lg sm:text-base'}>Github</span>
                        <input
                            className={'mt-3 h-10 pl-2 bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1'}
                            type="text"
                            name={'github'}
                            placeholder={'Github link'}
                            value={project.github}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className={'pt-2 pb-2'}>
                    <label>
                        <span className={'text-lg sm:text-base'}>Website</span>
                        <input
                            className={'mt-3 h-10 pl-2 bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1'}
                            type="text"
                            name={'website'}
                            placeholder={'Website link'}
                            value={project.website}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className={'pt-2 pb-2'}>
                    <label>
                        <span className={'text-lg sm:text-base'}>Telegram</span>
                        <input
                            className={'mt-3 h-10 pl-2 bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1'}
                            type="text"
                            name={'telegram'}
                            placeholder={'Telegram link'}
                            value={project.telegram}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className={'pt-2 pb-2'}>
                    <label>
                        <span className={'text-lg sm:text-base'}>Discord</span>
                        <input
                            className={'mt-3 h-10 pl-2 bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1'}
                            type="text"
                            name={'discord'}
                            placeholder={'Discord link'}
                            value={project.discord}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className={'pt-2 pb-2'}>
                    <label>
                        <span className={'text-lg sm:text-base align-middle'}>On Going?</span>
                        <input
                            className={'ml-2 align-middle rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}
                            type="checkbox"
                            name={'onGoing'}
                            placeholder={'Are you participating here now?'}
                            defaultChecked={project.onGoing}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button
                    className="mx-auto w-20 bg-gray-700 text-white px-3 py-2 h-10 rounded-md text-sm font-medium flex items-center"
                    onClick={handleSubmit}
                >
                    <span className={'text-lg w-full text-center sm:text-base'}>Edit</span>
                </button>
            </form>
        </div>
    )
}

export default EditProject