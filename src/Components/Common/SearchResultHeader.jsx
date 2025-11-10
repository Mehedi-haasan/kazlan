


const SearchResultHeader = () => {
    return (
        <div className='border-b text-black text-[15px] grid grid-cols-11'>
            <div className="px-1 py-2 font-semibold grid col-span-3">Name</div>
            <div className="px-1 py-2 font-semibold text-left">Edition</div>
            <div className="px-1 py-2 text-left font-semibold grid col-span-2">Brand</div>
            <div className="px-1 py-2 text-left font-semibold grid col-span-2">Category</div>
            <div className="pl-1 py-2 text-center font-semibold">M.R.P</div>
            <div className="pl-1 py-2 text-center font-semibold">Discount</div>
            <div className="pr-1 py-2 text-center font-semibold">Stock</div>
        </div>
    )
}

export default SearchResultHeader