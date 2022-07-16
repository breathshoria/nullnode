import React from 'react'

const HorizontalLine = ({ color, className }) => (
    <hr
        className={className}
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

export default HorizontalLine