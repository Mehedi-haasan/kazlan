


const SearchResultHeader = () => {
    return (
        <div className='border-b border-black text-black text-[15px] grid grid-cols-8'>
            <div scope="col" className="px-1 py-2 font-semibold grid col-span-2">Name</div>
            <div scope="col" className="px-1 py-2 font-semibold">Edition</div>
            <div scope="col" className="px-2 py-2 text-left font-semibold">Brand</div>
            <div scope="col" className="px-2 py-2 text-left font-semibold">Category</div>
            <div scope="col" className="pl-2 py-2 text-left font-semibold">M.R.P</div>
            <div scope="col" className="pl-2 py-2 text-left font-semibold ">Discount</div>
            <div scope="col" className="pr-3 py-2 text-right font-semibold">Stock</div>
        </div>
    )
}

export default SearchResultHeader