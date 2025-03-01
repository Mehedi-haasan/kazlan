import React from "react";

const Tabeheader = () => {
    return (
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
            <tr className='border-b-2 border-black text-lg'>
                <th scope="col" className="pr-6 py-2 ">পরিমাণ</th>
                <th scope="col" className="px-4 py-2 text-center">বইয়ের নাম এবং শ্রেণী</th>
                <th scope="col" className="px-4 py-2 text-center">প্রকাশক</th>
                <th scope="col" className="pl-4 py-2 text-right">মূল্য</th>
                <th scope="col" className="pl-4 py-2 text-right">বিক্রয় মূল্য</th>
                <th scope="col" className="pl-4 py-2 text-right">মোট মূল্য</th>
            </tr>
        </thead>
    )
}

export default Tabeheader