import React from 'react'
import ApplicationLogo from './Components/ApplicationLogo'
import { ColorRing } from 'react-loader-spinner'
import { PageLoader } from './Components/PageLoader'

export const Guest = ({ processing=false, children }) => {
    return (
        <>
           <PageLoader show={processing}/>
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div>
                    <a href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </a>
                </div>

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">

                    {children}
                </div>
            </div>
        </>
    )
}
