import React from 'react'
import {
    Link
} from 'react-router-dom'

function Navbar(){
    return (
        <div className="bg-gray-50 pt-6">
            <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6" aria-label="Global">
                <div className="flex items-center flex-1">
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <Link to="/">
                            <span className="sr-only">Workflow</span>
                            <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-teal-200-cyan-400.svg" alt="" />
                        </Link>
                        <div className="-mr-2 flex items-center md:hidden">
                            <button type="button" className="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            </button>
                        </div>
                    </div>
                    <div className="hidden space-x-8 md:flex md:ml-10">
                        <Link to="/">
                            <span className="text-base font-medium text-gray-500 hover:text-gray-300">Home</span>
                        </Link>
                        <Link to="/">
                            <span className="text-base font-medium text-gray-500 hover:text-gray-300">Band</span>
                        </Link>
                        <Link to="/">
                            <span className="text-base font-medium text-gray-500 hover:text-gray-300">Soloist</span>
                        </Link>
                    </div>
                </div>
                <div className="hidden md:flex md:items-center md:space-x-6">
                    <Link to="/">
                        <span className="text-base font-medium text-gray-500 hover:text-gray-300">
                        Log in
                        </span>
                    </Link>
                    <Link to="/">
                        <span className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">
                        Sign up
                        </span>
                    </Link>
                </div>
            </nav>
      </div>
    )
}

export default Navbar