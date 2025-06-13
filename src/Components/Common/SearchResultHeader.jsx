


const SearchResultHeader = () => {
    return (
        <tr className='border-b border-black text-[16px]'>
            <th scope="col" className="px-1 py-2 font-thin">Name</th>
            <th scope="col" className="px-1 py-2 font-thin">Edition</th>
            <th scope="col" className="px-4 py-2 text-left font-thin">Brand</th>
            <th scope="col" className="px-4 py-2 text-left font-thin">Category</th>
            <th scope="col" className="px-4 py-2 text-left font-thin">Purchase Price</th>
            <th scope="col" className="pl-4 py-2 text-left font-thin">Salse Price</th>
            <th scope="col" className="pl-4 py-2 text-left font-thin ">Discount</th>
            <th scope="col" className="pr-3 py-2 text-right font-thin">Stock</th>
        </tr>
    )
}

export default SearchResultHeader