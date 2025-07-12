


const SearchResultHeader = () => {
    return (
        <div className='border-b border-black text-[16px] grid grid-cols-8'>
            <div scope="col" className="px-1 py-2 font-thin grid col-span-2">Name</div>
            <div scope="col" className="px-1 py-2 font-thin">Edition</div>
            <div scope="col" className="px-2 py-2 text-left font-thin">Brand</div>
            <div scope="col" className="px-2 py-2 text-left font-thin">Category</div>
            {/* <div scope="col" className="px-2 py-2 text-left font-thin">P Price</div> */}
            <div scope="col" className="pl-2 py-2 text-left font-thin">M.R.P</div>
            <div scope="col" className="pl-2 py-2 text-left font-thin ">Discount</div>
            <div scope="col" className="pr-3 py-2 text-right font-thin">Stock</div>
        </div>
    )
}

export default SearchResultHeader