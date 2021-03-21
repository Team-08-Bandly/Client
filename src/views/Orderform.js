import React, { useState } from 'react';

import axios from 'axios';
import SuccessForm from './SuccessForm';

function Orderform(){

    let [successOrder, setSuccessOrder] = useState(false);

    function payButton(){
        axios.get('http://localhost:3001/transactions/reqSnapToken').then( snapResponse => { 
          window.snap.pay(snapResponse.data.snapToken,{
            onSuccess: function(result){
                setSuccessOrder(true);
            },
          });
        })
    }

    if(successOrder)
        return <SuccessForm />

    return(
        <div className="flex container mx-auto justify-center items-center">
            <div className="flex flex-col w-full lg:w-1/2 bg-white shadow rounded-lg px-4 py-4">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Appointment Form
                    </h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    Please fill detail about your appointment.
                    </p>
                </div>
                <div class="w-full mt-4">
                    <label for="first_name" class="block text-sm font-medium text-gray-700">Band Name</label>
                    <input type="text" name="first_name" id="first_name" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div class="w-full mt-4">
                    <label for="tanggal" class="block text-sm font-medium text-gray-700">Date</label>
                    <input type="date" name="tanggal" id="tanggal" autocomplete="tanggal" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div class="w-full mt-4">
                    <label for="lokasi" class="block text-sm font-medium text-gray-700">Location</label>
                    <textarea type="text" name="lokasi" id="lokasi" autocomplete="lokasi" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
                </div>
                <div class="w-full mt-4">
                    <label for="durasi" class="block text-sm font-medium text-gray-700">Duration ( in hour )</label>
                    <input type="number" min={1} name="durasi" id="durasi" autocomplete="durasi" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div class="w-full mt-4">
                    <button onClick={payButton} type="button" class="w-full justify-center inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Submit
                    </button>
                </div>
            </div>
        </div>
    )

}

export default Orderform