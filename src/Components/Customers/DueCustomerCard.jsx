
const DueCustomerCard = ({ item, i }) => {



    function formatDate(isoString) {
        const date = new Date(isoString);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }


    return (
        <tr className={`border-b text-xs ${i % 2 === 1 ? 'bg-[#FAF9EE] dark:bg-[#040404] dark:text-white' : 'bg-white dark:bg-[#1C2426] dark:text-white'}`}>
            <th scope="col" className="p-1 border-x font-thin ">{item?.name}</th>
            <th scope="col" className="p-1 border-r font-thin text-xs">
                <span>{item?.state?.name}</span>
            </th>
            <th scope="col" className="p-1 border-r font-thin text-xs">
                <span>{item?.address}</span>
            </th>
            <th scope="col" className={`p-1 border-r font-bold  `}>
                <button className={`border rounded-full px-4 mx-auto block ${item?.balance === 0 ? `text-gray-900 bg-gray-300 border-gray4100` : `${item?.balance < 1 ? `text-red-600 bg-red-100 border-red-100` : `text-[#15CA20] bg-[#DAE9D9] border-[#DAE9D9]`}`} `}>
                    {Math.abs(item?.balance)}
                </button>
            </th>
        </tr>
    )
}

export default DueCustomerCard