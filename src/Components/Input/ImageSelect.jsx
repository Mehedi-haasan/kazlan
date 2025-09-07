import React from "react";

const ImageSelect = ({ handleImageChange, imageFile, logo, reset }) => {
    return <div className="bg-[#FFFFFF] dark:bg-[#040404] dark:text-white rounded-lg w-full">
        <div className="flex justify-start items-center gap-5 px-6">
            <div>
                <img src={imageFile ? imageFile : logo} alt="Preview" className="w-28 h-28 object-cover rounded-lg border p-1" />
            </div>
            <div>
                <div className='flex justify-start items-center gap-2 pt-4'>
                    <div className='border border-blue-400 hover:bg-blue-500 hover:text-white rounded-lg px-4 py-1 group cursor-pointer'>
                        <label>
                            <h1 className="pt-1 pb-1 text-blue-400 font-thin group-hover:text-white cursor-pointer">Browse</h1>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                    <button onClick={reset} className='border rounded-lg px-5 py-2 hover:bg-gray-400 hover:text-white  font-thin'>Reset
                    </button>

                </div>
                <p className='font-thin py-1 text-sm'>Allowed JPG, GIF or PNG. Max size of 1MB</p>
            </div>
        </div>
    </div>
}

export default ImageSelect