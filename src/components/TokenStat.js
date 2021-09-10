function TokenStat(props){
    return (
        <div>
            <img className="sWordmark" src={props.img} alt="surgetoken"/>
            <table className="table table-borderless statsTable">
                <tbody>
                    <tr>
                        <td>Price:</td>
                        <td id={props.tokenPrice}>Loading</td>
                    </tr>
                    <tr>
                        <td>Holders:</td>
                        <td id={props.tokenHolderCount}>Loading</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TokenStat;