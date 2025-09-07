
const WarehouseCardPdf = ({ item, i }) => {


    return (

        <tr className={`border-b ${i % 2 === 1 ? 'bg-[#FAF9EE]' : ''}`}>
            <th className="px-2 py-1 border-x font-thin text-[#212529]">{item?.name}</th>
            <th className="px-2 py-1 border-r font-thin text-[#212529]">{item?.count}</th>
            <th className="px-2 py-1 border-r font-thin text-[#212529]"> {item?.TotalCost}</th>
            <th className="px-2 py-1 border-r font-thin text-[#212529]">{item?.TotalCost}</th>
            <th className="px-2 py-1 border-r font-thin text-[#212529]"> {item?.TotalWorth}</th>
            <th className="px-2 py-1 border-r font-thin text-[#212529]"> {item?.TotalWorth - item?.TotalCost}</th>
            <th className="px-2 py-1 border-r font-thin text-[#212529]"> {item?.employee}</th>
            <th className="px-2 py-1 border-r font-thin text-[#212529]">{item?.creator}</th>

        </tr>
    )
}

export default WarehouseCardPdf