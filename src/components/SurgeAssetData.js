import SUSDJSON from './json/token_abis/surge_usd_abi.json';
import SETHJSON from './json/token_abis/surge_eth_abi.json';
import SBTCJSON from './json/token_abis/surge_btc_abi.json';
import SADAJSON from './json/token_abis/surge_ada_abi.json';
import SUSLSJSON from './json/token_abis/surge_useless_abi.json';
import XUSDJSON from './json/token_abis/surge_xusd_abi.json';
import BNBXUSDFARM from './json/farm_abis/bnb_xusd_farm_abi.json';
import SBTCXUSDFARM from './json/farm_abis/sbtc_xusd_farm_abi.json';
import SADAXUSDFARM from './json/farm_abis/sada_xusd_farm_abi.json';
import SUSELESSXUSDFARM from './json/farm_abis/suseless_xusd_farm_abi.json';
import BNBXUSDLP from './json/lp_abis/bnb_xusd_lp_abi.json';
import SBTCXUSDLP from './json/lp_abis/sbtc_xusd_lp_abi.json';
import SADAXUSDLP from './json/lp_abis/sada_xusd_lp_abi.json';
import SUSELESSXUSDLP from './json/lp_abis/suseless_xusd_lp_abi.json';
import SurgeTokensData from './json/surge_tokens.json';
import SurgeFarmsData from './json/surge_farms.json';

const SurgeTokens = SurgeTokensData;
const SurgeFarms = SurgeFarmsData;
const SurgeTokensCache = {};
const SurgeFarmsCache = {};

const abiObj = {
	SUSDJSON: SUSDJSON,
	SETHJSON: SETHJSON,
	SBTCJSON: SBTCJSON,
	SADAJSON: SADAJSON,
	SUSLSJSON: SUSLSJSON,
	XUSDJSON: XUSDJSON,
	BNBxUSDFARM: BNBXUSDFARM,
	SBTCxUSDFARM: SBTCXUSDFARM,
	SADAxUSDFARM: SADAXUSDFARM,
	SUSELESSxUSDFARM: SUSELESSXUSDFARM,
	BNBxUSDLP: BNBXUSDLP,
	SBTCxUSDLP: SBTCXUSDLP,
	SADAxUSDLP: SADAXUSDLP,
	SUSELESSxUSDLP: SUSELESSXUSDLP,
	
}

export function getSurgeTokensData() {
	for (const token in SurgeTokens) {
		SurgeTokens[token]['abi'] = abiObj[SurgeTokens[token]['abi_name']];
		SurgeTokensCache[SurgeTokens[token]['name']] = SurgeTokens[token];
	}

	return SurgeTokens;
}

export function getSurgeTokenData(token) {
	if (Object.keys(SurgeTokensCache).length == 0) {
		getSurgeTokensData();
	}

	if (token in SurgeTokensCache) {
		return SurgeTokensCache[token];
	}

	return {};
}

export function getSurgeFarmsData() {
	for (const farm in SurgeFarms) {		
		SurgeFarms[farm]['abi'] = abiObj[SurgeFarms[farm]['abi_name']];
		SurgeFarms[farm]['lp_abi'] = abiObj[SurgeFarms[farm]['lp_abi_name']];
		SurgeFarmsCache[SurgeFarms[farm]['name']] = SurgeFarms[farm];
	}

	return SurgeFarms;
}

export function getSurgeFarmData(farm) {
	if (Object.keys(SurgeFarmsCache).length == 0) {
		getSurgeFarmsData();
	}

	if (farm in SurgeFarmsCache) {
		return SurgeFarmsCache[farm];
	}

	return {};
}