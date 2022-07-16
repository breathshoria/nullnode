import React from "react";
import PropTypes from 'prop-types'
import api from "../../../utils/axiosInterceptors";


class TelegramForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {token: '', chatID: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    fetchApi = async (body) => {
        try {
            return await api.post('/telegram/addTelegram', body);
        } catch(err) {
            console.log(err)
        }
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        await event.preventDefault();
        const response = await this.fetchApi( {chat_id: this.state.chatID, token: this.state.token})
        if (response.status === 200) {
            this.setState({chatID: '', token: ''})
            this.props.getUsers(event)
        }
    }

    render() {
        return (
            <div className={`w-1/4 ${this.props.className}`}>
            <form onSubmit={this.handleSubmit}>
                    <input
                        className={'mt-2 h-10 pl-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}
                        name={'chatID'}
                        type="text"
                        value={this.state.chatID}
                        onChange={this.handleChange}
                        placeholder={'Chat ID'}
                    />
                <input
                        className={'mt-2 h-10 pl-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}
                        type="text"
                        name={'token'}
                        value={this.state.token}
                        onChange={this.handleChange}
                        placeholder={'Telegram Token'}
                    />
                    <input
                        className="mt-2 bg-gray-700 text-white px-3 py-2 h-10 self-end rounded-md text-sm font-medium"
                        type={'submit'}
                        value={'Add'}
                        disabled={this.props.disabled}
                    />
            </form>
            </div>
        )
    }
}

export default TelegramForm

TelegramForm.propTypes = {
    getUsers: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
}
