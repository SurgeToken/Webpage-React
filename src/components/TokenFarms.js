import { FaRegCopy } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

const tokens = [
    
        {
            'address': '0x579aaF9882A1941885fADa7A6243cEACf3037659',
            'decimals': 18,
            'name': 'xUSD-BNB FARM',
            'symbol': 'xUSDBNBFARM'
        }
    ]


    const tokenImage = 'https://xsurge.net/assets/img/xlogo.png';


    async function addToMetamask(tokenSymbol) {
        const token = tokens.find(token => token.symbol === tokenSymbol);
        
        try {
            web3.currentProvider.sendAsync({
                method: 'metamask_watchAsset',
                params: {
                  "type":"ERC20",
                  "options":{
                    address: token.address, // The address that the token is at.
                    symbol: token.symbol, // A ticker symbol or shorthand, up to 5 chars.
                    decimals: token.decimals, // The number of decimals in the token
                    image: tokenImage, // A string url of the token logo
                  },
                },
              }, console.log)

        } catch (error) {
        console.log(error);
        }
    }

function TokenFarms(props){

    
    return (
        <div className="token">
            <table className="table table-borderless tokenTable" >
                <tbody>
                    <tr>
                        <td className="tokenName">
                            <img alt="" src="assets/img/logo.png" className="tokenLogo"/>  <span className="tName"  aria-label="">{props.tokenName}</span>
                        </td>
                        <td  className="tokenAddress">{props.tokenAddress} <FaRegCopy /></td>
                        <td  className="tokenMeta"><Button className="metaBtn" onClick={addToMetamask.bind(this, props.tokenSymbol)}><img alt="" src="assets/img/metamask.png" className="imgMeta"/></Button></td>
                    </tr>
                </tbody>
            </table>
        </div>
            
    )
}

export default TokenFarms;