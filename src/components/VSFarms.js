import React from 'react';
import TokenFarms from './TokenFarms';




class VSFarms extends React.Component{


	render() {
		return (
			<div className="widget spacerToken tokenList">
				<TokenFarms tokenName="xUSD-BNB Farm" tokenAddress="0x579aaF9882A1941885fADa7A6243cEACf3037659" tokenHolderCount="???"/>
			</div>
			
		)
	}
	
}

export default VSFarms;