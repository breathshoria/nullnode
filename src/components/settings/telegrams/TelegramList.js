import React from 'react';
import PropTypes from 'prop-types'

const TelegramList = (props) => {
    return(
        <div className={'flex gap-3 flex-row pt-3 pb-3 '}>
            <div className={'pl-2'}>
                #{props.i + 1}
            </div>
            <div className={'flex grow flex-col break-all'}>
                <p>Chat ID: {props.chatID}</p>
                <p> Token: {props.token}</p>
            </div>
            <div className={'self-center mr-2'}>
                <button
                    className={'bg-gray-800 text-white px-3 py-2 h-10 self-end rounded-md text-sm font-medium'}
                    onClick={props.handleDelete}
                    disabled={props.disabled}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

TelegramList.propTypes = {
    i: PropTypes.number,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    token: PropTypes.string,
    chatID: PropTypes.string,
    handleDelete: PropTypes.func,

}

export default TelegramList