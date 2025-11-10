import React from "react";

const Tabeheader = ({ type }) => {


    const GetType = (type) => {
        let value = "বিক্রয় মূল্য";

        if (type === "Sale" || type === "Sale Return") {
            value = "বিক্রয় মূল্য";
        } else if (type === "Purchase items" || type === "Purchase Items" || type === "Return Purchase") {
            value = "ক্রয় মূল্য";
        }

        return value
    };


    return (
        <thead className="text-black dark:bg-[#040404] dark:text-white text-[15px] text-black">
            <tr className='border border-black font-thin text-[16px]' id="kalpurush">
                <th scope="col" className="p-1 text-center align-top" style={{ paddingBottom: '10px', paddingTop: '2px' }}>পরিমাণ</th>
                <th scope="col" className="p-1 border-l border-black align-top" style={{ paddingBottom: '10px', paddingTop: '2px' }}>বইয়ের নাম এবং শ্রেণি</th>
                <th scope="col" className="p-1 border-l border-black align-top" style={{ paddingBottom: '10px', paddingTop: '2px' }}>প্রকাশনি</th>
                <th scope="col" className="p-1 text-center border-l border-black align-top" style={{ paddingBottom: '10px', paddingTop: '2px' }}>মূল্য</th>
                <th scope="col" className="p-1 text-center border-l border-black align-top" style={{ paddingBottom: '10px', paddingTop: '2px' }}>{GetType(type)}</th>
                <th scope="col" className="p-1 text-right border-l border-black align-top" style={{ paddingBottom: '10px', paddingTop: '2px' }}>মোট মূল্য</th>
            </tr>
        </thead>
    )
}

export default Tabeheader