import React from 'react'

export const Container = ({children,...props}) => {
    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-2 py-2" {...props}>
            {children}
        </div>
    )
}
