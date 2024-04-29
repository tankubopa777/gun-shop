import React from 'react';

const AddressForm = ({ address, setAddress, phone, setPhone}) => {
    return (
        <div className="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
            <h2 className="text-xl font-thin text-white mb-4">Enter your address</h2>
            <div className="mb-4">
                <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className="mb-4">
                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Delivery Address" value={address} onChange={e => setAddress(e.target.value)}></textarea>
            </div>
            {/* <div className="flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-thin py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button" onClick={onConfirm}>
                    Confirm address
                </button>
            </div> */}
        </div>
    );
};

export default AddressForm;

