


const DataHeader = () => {
    return (
        <div className='text-[15px] grid grid-cols-12'>
            <div className="p-2 text-center font-semibold border-y border-l">Action</div>
            <div className="p-2 border-y border-l h-full">Qty</div>
            <div className="p-2 border-y border-l">Year</div>
            <div className="p-2 border-y border-l">Category</div>
            <div className="p-2 border-y border-l">Brand</div>
            <div className="p-2 border-y border-l grid col-span-2">Item name</div>
            <div className="p-2 border-y border-l">M.R.P</div>
            <div className="p-2 border-y border-l">Discount</div>
            <div className="p-2 border-y border-l">Discount Type</div>
            <div className="p-2 border-y border-l">Sale Price</div>
            <div className="p-2 border">Total price</div>
        </div>
    )
}

export default DataHeader