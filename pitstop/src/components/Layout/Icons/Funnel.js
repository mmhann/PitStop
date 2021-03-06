import React from 'react'

const SVG = ({
    fill = '#FFFFFF',
    width = '100%',
    className = ''
}) => (

        <svg
            width={width}
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            className={`svg-icon ${className || ""}`}>
            <path fill={fill} d="M469.327 0H42.67c-9.256 0-16.76 7.504-16.76 16.761v47.1c0 9.256 7.504 16.761 16.76 16.761h22.412l34.347 40.002c-19.324 13.256-32.028 35.489-32.028 60.641 0 40.527 32.971 73.497 73.497 73.497 21.154 0 40.237-8.995 53.658-23.347l19.432 22.632v241.191a16.762 16.762 0 0 0 27.373 12.974l50.499-41.308a16.76 16.76 0 0 0 6.149-12.973V254.047L446.916 80.622h22.412c9.256 0 16.76-7.504 16.76-16.761v-47.1C486.087 7.504 478.583 0 469.327 0zM140.898 221.241c-22.043 0-39.976-17.934-39.976-39.976 0-15.006 8.315-28.102 20.578-34.938l50.993 59.389c-7.321 9.436-18.757 15.525-31.595 15.525z" />
        </svg>

    )

export default SVG
