import React from "react";

const Tabeheader = () => {
    return (
        <thead className="text-gray-900 dark:bg-[#040404] dark:text-white">
            <tr className='border font-thin'>
                <th scope="col" className="p-2 text-center">পরিমাণ</th>
                <th scope="col" className="p-2 border-l">বইয়ের নাম এবং শ্রেণি</th>
                <th scope="col" className="p-2 border-l">প্রকাশনি</th>
                <th scope="col" className="p-2 text-center border-l">মূল্য</th>
                <th scope="col" className="p-2 text-center border-l">বিক্রয় মূল্য</th>
                <th scope="col" className="p-2 text-right border-l">মোট মূল্য</th>
            </tr>
        </thead>
    )
}

export default Tabeheader