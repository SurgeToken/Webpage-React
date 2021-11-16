import { FaRegCopy } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

const tokens = [
    {
            'address': '0x14fEe7d23233AC941ADd278c123989b86eA7e1fF',
            'decimals': 1,
            'name': 'SurgeUSD',
            'symbol': 'sUSD'
        },
        {
            'address': '0x5B1d1BBDCc432213F83b15214B93Dc24D31855Ef',
            'decimals': 1,
            'name': 'SurgeETH',
            'symbol': 'sETH'
        },
        {
            'address': '0xb68c9D9BD82BdF4EeEcB22CAa7F3Ab94393108a1',
            'decimals': 1,
            'name': 'SurgeBTC',
            'symbol': 'sBTC'
        },
        {
            'address': '0xbF6bB9b8004942DFb3C1cDE3Cb950AF78ab8A5AF',
            'decimals': 1,
            'name': 'SurgeADA',
            'symbol': 'sADA'
        },
        {
            'address': '0x2e62e57d1D36517D4b0F329490AC1b78139967C0',
            'decimals': 1,
            'name': 'SurgeUSELESS',
            'symbol': 'sUSLS'
        },
        {
            'address': '0x254246331cacbC0b2ea12bEF6632E4C6075f60e2',
            'decimals': 18,
            'name': 'xUSD',
            'symbol': 'xUSD'
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

function TokenStats(props){

    

    return (
        <div className="token">
            <table className="table table-borderless tokenTable" >
                <tbody>
                    <tr>
                        <td className="tokenImg">
                            <img alt="" src="assets/img/logo.png" className="tokenLogo"/> 
                        </td>
                        <td className="tokenName">{props.tokenName}</td>
                        <td  className="tokenAddress">{props.tokenAddress} <FaRegCopy /></td>
                        <td  className="tokenPrice">{props.tokenPrice}</td>
                        <td className="tokenBSC"><Button className="bscBtn"><a href={props.tokenBSC} rel="noreferrer" target="_blank"><img alt="" src="assets/img/bsc.png" className="imgBSC"/></a></Button></td>
                        <td  className="tokenMeta"><Button className="metaBtn" onClick={addToMetamask.bind(this, props.tokenSymbol)}><img alt="" src="assets/img/metamask.png" className="imgMeta"/></Button></td>
                    </tr>
                </tbody>
            </table>
        </div>
            
    )
}

export default TokenStats;