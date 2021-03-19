import React from 'react';

function Badge({ text }){

    return(
        <span class="mr-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
            {text}
        </span>
    )

}

export default Badge