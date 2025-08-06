import logo from '../Logo/photo.png'


const CategoryCardPdf = ({ item, i }) => {


    function formatDate(isoString) {
        const date = new Date(isoString);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }

    return (

        <tr className={`${i % 2 === 1 ? 'bg-[#FAF9EE]' : ''} border-b border-x`}>

            <th scope="col" className="px-2 py-2 border-x font-thin text-[#212529]">{item?.name}</th>
            <th scope="col" className="px-2 py-1 border-r font-thin text-[#212529]">
                <img src={item?.image_url ? item?.image_url : logo} alt={item?.image_url ? item?.image_url : logo} className="h-10 w-10 rounded" />
            </th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.creator}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{formatDate(item?.createdAt)}</th>
        </tr>
    )
}

export default CategoryCardPdf