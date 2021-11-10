import React from 'react';
import TokenStats from './TokenStats';
import Web3 from 'web3';

const web3 = new Web3('https://bsc-dataseed1.binance.org:443')

function getTokenPrice(tokenName, contractAddress) {
	// Need to import contract ABI json
	//let jsonInterface = <contract abi json>
	// Once we have that, we can load up the contract and make the calculatePrice call on any token we want to display a price for
	let contract = new web3.eth.Contract(jsonInterface, contractAddress);
	
	contract.methods.calculatePrice().call().then(function(result){
		console.log("xUSD token price "+Web3.utils.fromWei(result, 'ether'))
	});
}

class VS extends React.Component{
	render() {
		return (
			<div className="widget spacerToken tokenList">
				<TokenStats tokenName="surgeUSD" tokenAddress="0x14fEe7d23233AC941ADd278c123989b86eA7e1fF" tokenPrice="0.0000000292825018" tokenHolderCount="997" tokenMeta="https://vittominacori.github.io/watch-token/page/?hash=0x7b2261646472657373223a22307831346645653764323332333341433934314144643237386331323339383962383665413765316646222c226c6f676f223a2268747470733a2f2f7873757267652e6e65742f6173736574732f696d672f786c6f676f2e706e67227d&network=bsc_mainnet"/>

				<TokenStats tokenName="surgeETH" tokenAddress="0x5B1d1BBDCc432213F83b15214B93Dc24D31855Ef" tokenPrice="0.0000000000083659" tokenHolderCount="4,321" tokenMeta="https://vittominacori.github.io/watch-token/page/?hash=0x7b2261646472657373223a22307835423164314242444363343332323133463833623135323134423933446332344433313835354566222c226c6f676f223a2268747470733a2f2f7873757267652e6e65742f6173736574732f696d672f786c6f676f2e706e67227d&network=bsc_mainnet"/>

				<TokenStats tokenName="surgeBTC" tokenAddress="0xb68c9D9BD82BdF4EeEcB22CAa7F3Ab94393108a1" tokenPrice="0.000000000000477" tokenHolderCount="1,200" tokenMeta="https://vittominacori.github.io/watch-token/page/?hash=0x7b2261646472657373223a22307862363863394439424438324264463445654563423232434161374633416239343339333130386131222c226c6f676f223a2268747470733a2f2f7873757267652e6e65742f6173736574732f696d672f786c6f676f2e706e67227d&network=bsc_mainnet"/>

				<TokenStats tokenName="surgeADA" tokenAddress="0xbF6bB9b8004942DFb3C1cDE3Cb950AF78ab8A5AF" tokenPrice="0.000000008162759" tokenHolderCount="452" tokenMeta="https://vittominacori.github.io/watch-token/page/?hash=0x7b2261646472657373223a22307862463662423962383030343934324446623343316344453343623935304146373861623841354146222c226c6f676f223a2268747470733a2f2f7873757267652e6e65742f6173736574732f696d672f786c6f676f2e706e67227d&network=bsc_mainnet"/>

				<TokenStats tokenName="surgeUSLS" tokenAddress="0x2e62e57d1D36517D4b0F329490AC1b78139967C0" tokenPrice="0.504574026279359" tokenHolderCount="679" tokenMeta="https://vittominacori.github.io/watch-token/page/?hash=0x7b2261646472657373223a22307832653632653537643144333635313744346230463332393439304143316237383133393936374330222c226c6f676f223a2268747470733a2f2f7873757267652e6e65742f6173736574732f696d672f786c6f676f2e706e67227d&network=bsc_mainnet"/>

				<TokenStats tokenName="xUSD" tokenAddress="0x254246331cacbC0b2ea12bEF6632E4C6075f60e2" tokenPrice={getTokenPrice()} tokenHolderCount="???" tokenMeta="https://vittominacori.github.io/watch-token/page/?hash=0x7b2261646472657373223a22307832353432343633333163616362433062326561313262454636363332453443363037356636306532222c226c6f676f223a2268747470733a2f2f7873757267652e6e65742f6173736574732f696d672f786c6f676f2e706e67227d&network=bsc_mainnet"/>

				<TokenStats tokenName="xUSD-BNB Farm" tokenAddress="0x579aaF9882A1941885fADa7A6243cEACf3037659" tokenPrice="0" tokenHolderCount="???" tokenMeta="hhttps://vittominacori.github.io/watch-token/page/?hash=0x7b2261646472657373223a22307835373961614639383832413139343138383566414461374136323433634541436633303337363539222c226c6f676f223a2268747470733a2f2f7873757267652e6e65742f6173736574732f696d672f786c6f676f2e706e67227d&network=bsc_mainnet"/>
			</div>
		)
	}
	
}

export default VS;