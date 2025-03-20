import React from "react";
import WholeSell from "../Wholesale/Wholesale";
import Sell from "../Sell/Sell";

const Sale = ({ category = [], type = [], brand = [], entries = [], shop = [], state = [], paytype = [], info = {} }) => {
    return (
        <div>
            {
                info?.usertype === "Wholesaler" ? <WholeSell category={category} type={type} brand={brand} entries={entries} shop={shop} state={state} paytype={paytype} info={info} /> :
                    <Sell category={category} type={type} brand={brand} entries={entries} shop={shop} state={state} paytype={paytype} info={info} />
            }
        </div>
    )
}

export default Sale

