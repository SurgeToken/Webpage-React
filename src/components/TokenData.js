import React from 'react';
import { FaRegCopy } from "react-icons/fa";
import Image from 'react-bootstrap/Image';


export default function TokenData(props) {

    
	return (
		<div className="tokenData">
            <div className="cValueSpacer">
                <Image src="assets/img/dot.png" className="dot" fluid /> <span className="cValueTxt">Current <span className="herospan"> value:</span></span>
            </div>
                
            <table className="table table-borderless statsTable" cellSpacing="0">
                <tbody>
                    <tr>
                        <td colSpan="5" className="coloredTD">
                            <div className="tdLabel">Price</div>
                            <div className="tdData">price data</div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="5" className="uncoloredTD">
                            <div className="tdLabel">Holders</div>
                            <div className="tdData">holder data</div>
                        </td>
                    </tr>
                    <tr><td>&nbsp;</td></tr>
                    <tr>
                        <td colSpan="5" className="coloredTD">
                            <div className="tdLabel">Contract Address</div>
                            <div className="tdData"><FaRegCopy/></div>
                        </td>
                    </tr>
                    <tr>
                        <td className="">
                            <div className="cAddressData">{props.tokenAddress}</div>
                        </td>
                    </tr>
                    <tr><td>&nbsp;</td></tr>
                    <tr>
                        <td className="">
                            <div className="uLabel">Underlying Asset</div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="5" className="coloredTD">
                            <div className="tdLabel">uasset name</div>
                            <div className="tdData"><FaRegCopy/></div>
                        </td>
                    </tr>
                    <tr>
                        <td className="">
                            <div className="cAddressData">contract addresss</div>
                        </td>
                    </tr>
                </tbody>
            </table>
           
        </div>
	)
	
		
}