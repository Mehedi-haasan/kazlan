
const DueCustomerCard = ({ item, i }) => {



    return (
        <tr className={`border-b `}>
            <th scope="col" className="p-1 border-x font-thin text-center">{i + 1}</th>
            {/* <th scope="col" className="p-1 border-r font-thin text-xs">
                <span>{item?.address}</span>
            </th> */}
            <th scope="col" className="p-1 border-r font-thin" id="kalpurush">
                <span id="kalpurush">{item?.name} -- {item?.address}, {item?.state?.name}</span>
            </th>
            <th scope="col" className={`p-1 border-r font-thin text-center`}>
                {item?.balance * -1}.00
            </th>
        </tr>
    )
}

export default DueCustomerCard