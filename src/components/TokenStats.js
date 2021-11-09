import { FaRegCopy } from "react-icons/fa";
import Button from 'react-bootstrap/Button';

function Token(props){
    return (
        <div className="token">
            <table className="table table-borderless tokenTable" >
                <tbody>
                    <tr>
                        <td className="tokenName">
                            <img alt="" src="assets/img/logo.png" className="tokenLogo"/>  <span className="tName"  aria-label="">{props.tokenName}</span>
                        </td>
                        <td  className="tokenAddress">{props.tokenAddress} <FaRegCopy /></td>
                        <td  className="tokenPrice">${props.tokenPrice}</td>
                        <td  className="tokenHolders">{props.tokenHolderCount} holders</td>
                        <td  className="tokenName"><img alt="" src="assets/img/metamask.png" className="tokenLogo"/> <a href="{props.tokenMeta}">Add to MetaMask</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
            
    )
}

export default Token;