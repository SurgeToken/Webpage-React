function Token(props){
    return (
        <div>
            <img className="sWordmark" src="{props.img}}" alt="surgeusd" />
            <div className="contractAddress text-end">
                <p className="cAddress" id="{props.tokenName}">{props.tokenAddress}  <i onClick={() => navigator.clipboard.writeText('{token.Address}')} className="far fa-copy"></i></p>
            </div>
        </div>
    )
}

export default Token;