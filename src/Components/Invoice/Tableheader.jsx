import React from "react";

const Tabeheader = ({ type }) => {

    const GetType = (type) => {
        let value = "বিক্রয় মূল্য";

        if (type === "Sale" || type === "Sale Return") {
            value = "বিক্রয় মূল্য";
        } else if (type === "Purchase items" || type === "Purchase Return") {
            value = "ক্রয় মূল্য";
        }

        return value;
    };
    return (
        <thead className="text-gray-900 dark:bg-[#040404] dark:text-white">
            <tr className='border font-thin'>
                <th scope="col" className="p-2 text-center">পরিমাণ</th>
                <th scope="col" className="p-2 border-l">বইয়ের নাম এবং শ্রেণি</th>
                <th scope="col" className="p-2 border-l">প্রকাশনি</th>
                <th scope="col" className="p-2 text-center border-l">মূল্য</th>
                <th scope="col" className="p-2 text-center border-l">{GetType(type)}</th>
                <th scope="col" className="p-2 text-right border-l">মোট মূল্য</th>
            </tr>
        </thead>
    )
}

export default Tabeheader