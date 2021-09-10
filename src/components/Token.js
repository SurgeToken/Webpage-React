function Token(props){
    return (
        <div>
            <img className="sWordmark" src={props.img} alt="surgetoken" />
            <div className="contractAddress text-end">
                <p className="cAddress" id={props.tokenName}>{props.tokenAddress}  <i onClick={() => navigator.clipboard.writeText(props.tokenAddress)} className="far fa-copy"></i></p>
            </div>
        </div>
    )
}

export default Token;