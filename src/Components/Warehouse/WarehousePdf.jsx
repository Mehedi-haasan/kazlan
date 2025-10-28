
const WarehouseCardPdf = ({ item, i }) => {


    return (

        <tr className={`border-b text-black`}>
            <td className="px-2 py-1 border-x font-thin ">{item?.name}</td>
            <td className="px-2 py-1 border-r font-thin ">{item?.count}</td>
            <td className="px-2 py-1 border-r font-thin "> {item?.TotalCost}</td>
            <td className="px-2 py-1 border-r font-thin ">{item?.TotalCost}</td>
            <td className="px-2 py-1 border-r font-thin "> {item?.TotalWorth}</td>
            <td className="px-2 py-1 border-r font-thin "> {item?.TotalWorth - item?.TotalCost}</td>
            <td className="px-2 py-1 border-r font-thin "> {item?.employee}</td>
            <td className="px-2 py-1 border-r font-thin ">{item?.creator}</td>

        </tr>
    )
}

export default WarehouseCardPdf