
const DueCustomerCard = ({ item, i }) => {



    return (
        <tr className={`border-b text-xs ${i % 2 === 1 ? 'bg-[#FAF9EE] dark:bg-[#040404] dark:text-white' : 'bg-white dark:bg-[#1C2426] dark:text-white'}`}>
            <th scope="col" className="p-1 border-x font-thin text-center">{i+1}</th>
            {/* <th scope="col" className="p-1 border-r font-thin text-xs">
                <span>{item?.address}</span>
            </th> */}
            <th scope="col" className="p-1 border-r font-thin text-xs">
                <span>{item?.name} -- {item?.address}, {item?.state?.name}</span>
            </th>
            <th scope="col" className={`p-1 border-r font-bold  text-center`}>
                {item?.balance}
            </th>
        </tr>
    )
}

export default DueCustomerCard