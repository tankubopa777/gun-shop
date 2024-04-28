import React from 'react';

const AddressForm: React.FC = () => {
    return (
        <div className="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
            <h2 className="text-xl font-thin text-white mb-4">Enter your address</h2>
            <div className="mb-4">
                <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Recipient's Name" />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email Address" />
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="tel" placeholder="Phone Number" />
            </div>
            <div className="mb-4">
                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" placeholder="Delivery Address"></textarea>
            </div>
            <div className="mb-4">
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="country" type="text" placeholder="Country" />
            </div>
            <div className="mb-4 grid grid-cols-3 gap-4">
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="city" type="text" placeholder="City" />
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="state" type="text" placeholder="State" />
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="zipcode" type="text" placeholder="Zip code" />
            </div>
            <div className="flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-thin py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Confirm address
                </button>
            </div>
        </div>
    );
};

export default AddressForm;
