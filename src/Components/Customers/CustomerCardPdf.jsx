
const CustomerCardPdf = ({ item, i }) => {



    function formatDate(isoString) {
        const date = new Date(isoString);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }


    return (
        <tr className={`text-xs border-b border-black`}>
            <td className="p-1 px-2 border-l border-black font-thin align-top" style={{ paddingBottom: '10px' }}>
                {item?.name}
            </td>
            <td className="p-1 px-2 border-x border-black  font-thin" style={{ paddingBottom: '10px' }}>
                {item?.id}
            </td>
            <td className="p-1 px-2 border-r border-black font-thin" style={{ paddingBottom: '10px' }}>
                {item?.phone}
            </td>
            <td className="p-1 px-2 border-r border-black font-thin" style={{ paddingBottom: '10px' }}>
                {item?.email}
            </td>
            <td className="p-1 px-2 border-r border-black font-thin" style={{ paddingBottom: '10px' }}>
                {item?.bankname}
            </td>
            <td className="p-1 px-2 border-r border-black font-thin" style={{ paddingBottom: '10px' }}>
                <p className="pb-1">{item?.accountname}</p>
            </td>
            <td className="p-1 px-2 border-r border-black font-thin text-xs" style={{ paddingBottom: '10px' }}>
                <span>{item?.address}</span> <span>{item?.state?.name}</span><br />
            </td>
            <td className="p-1 px-2 border-r border-black font-bold text-center" style={{ paddingBottom: '10px' }}>
                <p>{item?.balance}</p>
            </td>
            <td className="p-1 px-2 border-r border-black font-thin" style={{ paddingBottom: '10px' }}>
                {item?.creator}
            </td>
            <td className="p-1 px-2 border-r border-black font-thin" style={{ paddingBottom: '10px' }}>
                {formatDate(item?.createdAt)}
            </td>
        </tr>
    )
}

export default CustomerCardPdf