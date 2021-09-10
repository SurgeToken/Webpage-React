

function TokenResults(){
    return (
        <div className="calcResults" id="resultsToken">
            <h3>Your Amount</h3>
            <hr className="hrSpacer"/>
            <table className="table table-borderless priceTable">
                <tbody>
                    <tr>
                        <td>Current Balance:</td>
                        <td id="tokenBalance">Loading</td>
                    </tr>
                    <tr>
                        <td id="tokenName"></td>
                        <td id="tokenValue">Loading</td>
                    </tr>
                    <tr>
                        <td>Current Value (USD):</td>
                        <td id="tokenValueUSD">Loading</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TokenResults;