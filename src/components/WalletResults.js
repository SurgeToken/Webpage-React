

function WalletResults(){
    return (
        <div className="calcResults" id="resultsWallet">
            <h3>Your Amount</h3>
            <hr className="hrSpacer"/>
            <div className="loader" id="resultsLoading"></div>
            <div id="walletResultsDiv">
                <table className="table table-borderless priceTable" >
                    <tbody id="walletResults"></tbody>
                </table>
                <p><em>Powered by BscScan.com APIs</em></p>
            </div>
        </div>
    )
}

export default WalletResults;