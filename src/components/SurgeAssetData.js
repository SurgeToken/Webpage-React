import SUSDJSON from './json/token_abis/surge_usd_abi.json';
import SETHJSON from './json/token_abis/surge_eth_abi.json';
import SBTCJSON from './json/token_abis/surge_btc_abi.json';
import SADAJSON from './json/token_abis/surge_ada_abi.json';
import SUSLSJSON from './json/token_abis/surge_useless_abi.json';
import XUSDJSON from './json/token_abis/surge_xusd_abi.json';
import BNBxUSDFARM from './json/farm_abis/bnb_xusd_farm_abi.json';
import SurgeTokensData from './json/surge_tokens.json';
import SurgeFarmsData from './json/surge_farms.json';

const SurgeTokens = SurgeTokensData;
const SurgeFarms = SurgeFarmsData;

export function getSurgeTokenData() {
	for (const token in SurgeTokens) {
		let abi = '';
		switch (SurgeTokens[token]['abi_name']) {
			case 'SUSDJSON':
				abi = SUSDJSON;
				break;
			case 'SETHJSON':
				abi = SETHJSON;
				break;
			case 'SBTCJSON':
				abi = SBTCJSON;
				break;
			case 'SADAJSON':
				abi = SADAJSON;
				break;
			case 'SUSLSJSON':
				abi = SUSLSJSON;
				break;
			case 'XUSDJSON':
				abi = XUSDJSON;
				break;
			default:
				abi = '';
				break;
		}

		SurgeTokens[token]['abi'] = abi;
	}

	return SurgeTokens;
}

export function getSurgeFarmData() {
	for (const farm in SurgeFarms) {
		let abi = '';
		switch (SurgeFarms[farm]['abi_name']) {
			case 'BNBxUSDFARM':
				abi = BNBxUSDFARM;
				break;
			default:
				abi = '';
				break;
		}
		
		SurgeFarms[farm]['abi'] = abi;
	}

	return SurgeFarms;
}