"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 90:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(915);
/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(226);
/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_bootstrap_Spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(742);
/* harmony import */ var react_bootstrap_Spinner__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Spinner__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _SurgeAssetData_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(969);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(519);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(web3__WEBPACK_IMPORTED_MODULE_6__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([js_cookie__WEBPACK_IMPORTED_MODULE_2__]);
js_cookie__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];








const web3 = new (web3__WEBPACK_IMPORTED_MODULE_6___default())('https://bsc-dataseed1.binance.org:443');
const farms = _SurgeAssetData_js__WEBPACK_IMPORTED_MODULE_5__/* .getSurgeFarmsData */ .sp();
class FarmBalanceChecker extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    constructor(props){
        super(props);
        this.state = {
            error_message_class: "",
            farm_balance_error_message: "",
            farm_balance_container_class: "",
            check_farm_balance_button_spinner_class: "hide",
            check_farm_balance_button_text_class: "",
            selectedFarmByUser: false,
            selectedFarm: "",
            farm_balance_response: false,
            check_farm_balance_button_text: "",
            capture_farm_balance_input_placeholder: "",
            capture_farm_balance_input_value: ""
        };
    }
    farmChange = (e)=>{
        this.setState({
            farm_balance_response: false,
            error_message_class: "",
            farm_balance_container_class: "show",
            capture_farm_balance_input_value: "",
            selectedFarmByUser: true
        });
        let farmSymbol = e.target.value;
        let button_text = "";
        let balance_container_input_id = "";
        let balance_container_input_type = "";
        let input_placeholder = "";
        let token_balance_input_value = "";
        if (farmSymbol === "0") {
            this.setState({
                selectedFarmByUser: false,
                farm_balance_container_class: ""
            });
            return;
        } else {
            button_text = "Check";
            input_placeholder = "Enter BEP-20 Public Wallet Address";
            let public_wallet_address = js_cookie__WEBPACK_IMPORTED_MODULE_2__["default"].get('public_wallet_address');
            let farm_balance_input_value = "";
            if (public_wallet_address != undefined) {
                farm_balance_input_value = public_wallet_address;
            }
            this.setState({
                check_farm_balance_button_text: button_text,
                selectedFarm: farmSymbol,
                capture_farm_balance_input_placeholder: input_placeholder,
                capture_farm_balance_input_value: farm_balance_input_value
            });
        }
    };
    renderCheckFarmBalancesView = ()=>{
        if (this.state.selectedFarmByUser && this.state.selectedFarm !== "0") {
            return true;
        }
        return false;
    };
    lookupFarmBalances = (ev)=>{
        // Reset states
        this.setState({
            error_message_class: "",
            check_farm_balance_button_spinner_class: "",
            check_farm_balance_button_text_class: "hide"
        });
        let promises = [];
        let wallet_response = {
        };
        let farms_to_check = [];
        let formated_wallet_address = "";
        let wallet_address = this.state.capture_farm_balance_input_value;
        // Check to see if the supplied address is valid/invalid
        try {
            formated_wallet_address = web3.utils.toChecksumAddress(wallet_address);
            if (formated_wallet_address.length == 0) {
                throw "Supplied wallet address is invalid";
            }
        } catch (err) {
            this.setState({
                farm_balance_error_message: "Supplied wallet address is invalid",
                error_message_class: "show",
                check_farm_balance_button_spinner_class: "hide",
                check_farm_balance_button_text_class: ""
            });
            return;
        }
        if (this.state.selectedFarm == "all") {
            farms_to_check = farms;
        } else {
            for(const farm in farms){
                if (this.state.selectedFarm == farms[farm]['symbol']) {
                    farms_to_check.push(farms[farm]);
                }
            }
        }
        // Set Public Wallet Address Cookie
        js_cookie__WEBPACK_IMPORTED_MODULE_2__["default"].set('public_wallet_address', formated_wallet_address, {
            expires: 30,
            path: '/'
        });
        for(const farm in farms_to_check){
            wallet_response[farms_to_check[farm]["name"]] = {
                'symbol': farms_to_check[farm]['symbol'],
                'paired_asset': farms_to_check[farm]['paired_asset'],
                'split_rewards': farms_to_check[farm]['split_rewards'],
                'is_paired_asset_surge_token': farms_to_check[farm]['is_paired_asset_surge_token']
            };
            let contract = new web3.eth.Contract(farms_to_check[farm]["abi"], farms_to_check[farm]["address"]);
            // Get farm token balance
            let balance_of = new Promise(function(resolve, reject) {
                contract.methods.balanceOf(formated_wallet_address).call({
                }, function(error, result) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
            promises.push(balance_of);
            balance_of.then((data)=>{
                wallet_response[farms_to_check[farm]["name"]]['farm_tokens'] = web3.utils.fromWei(data, farms_to_check[farm]["wei_unit"]);
            });
            // Get farm redeemable value balance
            let redeemable_value = new Promise(function(resolve, reject) {
                contract.methods.getRedeemableValue(formated_wallet_address).call({
                }, function(error, result) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
            promises.push(redeemable_value);
            redeemable_value.then((data)=>{
                wallet_response[farms_to_check[farm]["name"]]['xusd_value'] = web3.utils.fromWei(data[0], farms_to_check[farm]["wei_unit"]);
                if (farms_to_check[farm]["is_paired_asset_surge_token"]) {
                    wallet_response[farms_to_check[farm]["name"]]['paired_asset_value'] = data[1];
                } else {
                    wallet_response[farms_to_check[farm]["name"]]['paired_asset_value'] = web3.utils.fromWei(data[1], farms_to_check[farm]["paired_asset_wei_unit"]);
                }
            });
            // Get farm time until unlock
            let time_until_unlock = new Promise(function(resolve, reject) {
                contract.methods.getTimeUntilUnlock(formated_wallet_address).call({
                }, function(error, result) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
            promises.push(time_until_unlock);
            time_until_unlock.then((data)=>{
                let formated_time_until_unlock = data * 3 / 60 / 60 / 24;
                wallet_response[farms_to_check[farm]["name"]]['time_until_unlock'] = formated_time_until_unlock;
            });
            // Get farm pending rewards
            let pending_rewards = new Promise(function(resolve, reject) {
                contract.methods.pendingRewards(formated_wallet_address).call({
                }, function(error, result) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
            promises.push(pending_rewards);
            pending_rewards.then((data)=>{
                if (!farms_to_check[farm]["split_rewards"]) {
                    wallet_response[farms_to_check[farm]["name"]]['pending_rewards_xusd'] = web3.utils.fromWei(data, farms_to_check[farm]["wei_unit"]);
                } else {
                    wallet_response[farms_to_check[farm]["name"]]['pending_rewards_xusd'] = web3.utils.fromWei(data[0], farms_to_check[farm]["wei_unit"]);
                    if (farms_to_check[farm]["is_paired_asset_surge_token"]) {
                        wallet_response[farms_to_check[farm]["name"]]['pending_rewards_paired_asset'] = data[1];
                    } else {
                        wallet_response[farms_to_check[farm]["name"]]['pending_rewards_paired_asset'] = web3.utils.fromWei(data[1], farms_to_check[farm]["paired_asset_wei_unit"]);
                    }
                }
            });
            // Get farm total rewards claimed
            let total_rewards_claimed = new Promise(function(resolve, reject) {
                contract.methods.totalRewardsClaimedForUser(formated_wallet_address).call({
                }, function(error, result) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
            promises.push(total_rewards_claimed);
            total_rewards_claimed.then((data)=>{
                console.log();
                if (!farms_to_check[farm]["split_rewards"]) {
                    wallet_response[farms_to_check[farm]["name"]]['total_rewards_claimed_xusd'] = web3.utils.fromWei(data, farms_to_check[farm]["wei_unit"]);
                } else {
                    wallet_response[farms_to_check[farm]["name"]]['total_rewards_claimed_xusd'] = web3.utils.fromWei(data[0], farms_to_check[farm]["wei_unit"]);
                    if (farms_to_check[farm]["is_paired_asset_surge_token"]) {
                        wallet_response[farms_to_check[farm]["name"]]['total_rewards_claimed_paired_asset'] = data[1];
                    } else {
                        wallet_response[farms_to_check[farm]["name"]]['total_rewards_claimed_paired_asset'] = web3.utils.fromWei(data[1], farms_to_check[farm]["paired_asset_wei_unit"]);
                    }
                }
            });
            // get xUSD contract price
            let xusd_token_data = _SurgeAssetData_js__WEBPACK_IMPORTED_MODULE_5__/* .getSurgeTokenData */ .Q9('xUSD');
            let xusd_contract = new web3.eth.Contract(xusd_token_data['abi'], xusd_token_data['address']);
            let current_xusd_price = new Promise(function(resolve, reject) {
                xusd_contract.methods.calculatePrice().call({
                }, function(error, result) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
            promises.push(current_xusd_price);
            current_xusd_price.then((data)=>{
                wallet_response[farms_to_check[farm]["name"]]['xusd_contract_price'] = web3.utils.fromWei(data, xusd_token_data["wei_unit"]);
            });
            // get paired asset prices
            let base_url = "https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses={paired_asset_bsc_address}&vs_currencies=usd";
            if (!farms_to_check[farm]["is_paired_asset_surge_token"]) {
                base_url = base_url.replace('{paired_asset_bsc_address}', farms_to_check[farm]['paired_asset_token_address']);
                let request = fetch(base_url).then((response)=>response.text()
                ).then((data)=>{
                    let data_obj = JSON.parse(data);
                    wallet_response[farms_to_check[farm]["name"]]['paired_asset_price'] = data_obj[farms_to_check[farm]["paired_asset_token_address"]]['usd'];
                });
                promises.push(request);
            } else {
                let paired_surge_token_data = _SurgeAssetData_js__WEBPACK_IMPORTED_MODULE_5__/* .getSurgeTokenData */ .Q9(farms_to_check[farm]['surge_token']);
                base_url = base_url.replace('{paired_asset_bsc_address}', paired_surge_token_data['uassetaddress']);
                let request = fetch(base_url).then((response)=>response.text()
                ).then((data)=>{
                    let data_obj = JSON.parse(data);
                    wallet_response[farms_to_check[farm]["name"]]['paired_asset_price'] = data_obj[paired_surge_token_data['uassetaddress']]['usd'];
                });
                promises.push(request);
                let surge_contract = new web3.eth.Contract(paired_surge_token_data["abi"], paired_surge_token_data["address"]);
                let surge_token_price_call = new Promise(function(resolve, reject) {
                    surge_contract.methods.calculatePrice().call({
                    }, function(error, result) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    });
                });
                promises.push(surge_token_price_call);
                surge_token_price_call.then((data)=>{
                    wallet_response[farms_to_check[farm]["name"]]['surge_token_price'] = web3.utils.fromWei(data, paired_surge_token_data['wei_unit']);
                });
            }
        }
        Promise.allSettled(promises).then((result)=>{
            console.log(wallet_response);
            let output = [];
            for(const k in wallet_response){
                if (wallet_response[k]['farm_tokens'] > 0) {
                    let farm_lp_balance_xusd = parseFloat(wallet_response[k]['xusd_value']);
                    let farm_lp_xusd_value = farm_lp_balance_xusd * parseFloat(wallet_response[k]['xusd_contract_price']);
                    let farm_lp_balance_paired_asset = parseFloat(wallet_response[k]['paired_asset_value']);
                    let farm_lp_paired_asset_value = 0;
                    if (!wallet_response[k]["is_paired_asset_surge_token"]) {
                        farm_lp_paired_asset_value = farm_lp_balance_paired_asset * parseFloat(wallet_response[k]['paired_asset_price']);
                    } else {
                        farm_lp_paired_asset_value = farm_lp_balance_paired_asset * parseFloat(wallet_response[k]['surge_token_price']) * parseFloat(wallet_response[k]['paired_asset_price']);
                    }
                    let total_lp_farm_value = farm_lp_xusd_value + farm_lp_paired_asset_value;
                    let pending_rewards_xusd = parseFloat(wallet_response[k]['pending_rewards_xusd']);
                    let pending_rewards_xusd_usd = pending_rewards_xusd * parseFloat(wallet_response[k]['xusd_contract_price']);
                    let pending_rewards_paired_asset = 0;
                    let pending_rewards_paired_asset_usd = 0;
                    if (wallet_response[k]["is_paired_asset_surge_token"]) {
                        pending_rewards_paired_asset = parseFloat(wallet_response[k]['pending_rewards_paired_asset']);
                        pending_rewards_paired_asset_usd = pending_rewards_paired_asset * parseFloat(wallet_response[k]['surge_token_price']) * parseFloat(wallet_response[k]['paired_asset_price']);
                    }
                    let rewards_view = "";
                    if (wallet_response[k]['split_rewards']) {
                        rewards_view = this.buildSplitRewardsView(pending_rewards_xusd, pending_rewards_xusd_usd, pending_rewards_paired_asset, pending_rewards_paired_asset_usd, wallet_response[k]['paired_asset'], wallet_response[k]['total_rewards_claimed_xusd'], wallet_response[k]['total_rewards_claimed_paired_asset']);
                    } else {
                        rewards_view = this.buildRewardsView(pending_rewards_xusd, pending_rewards_xusd_usd, wallet_response[k]['total_rewards_claimed_xusd']);
                    }
                    output.push({
                        'name': k,
                        'symbol': wallet_response[k]['symbol'],
                        'paired_asset': wallet_response[k]['paired_asset'],
                        'split_rewards': wallet_response[k]['split_rewards'],
                        'farm_tokens': parseFloat(wallet_response[k]['farm_tokens']).toFixed(5),
                        'farm_lp_balance_xusd': farm_lp_balance_xusd.toLocaleString(undefined, {
                            maximumFractionDigits: 5
                        }),
                        'farm_lp_balance_paired_asset': farm_lp_balance_paired_asset.toLocaleString(undefined, {
                            maximumFractionDigits: 5
                        }),
                        'farm_lp_value_usd': total_lp_farm_value.toLocaleString(undefined, {
                            style: "currency",
                            currency: "USD"
                        }),
                        'time_until_unlock': Math.round(wallet_response[k]['time_until_unlock']),
                        'rewards_view': rewards_view,
                        'pending_rewards_xusd': pending_rewards_xusd.toFixed(5),
                        'pending_rewards_paired_asset': pending_rewards_paired_asset,
                        'pending_rewards_usd': pending_rewards_xusd_usd.toLocaleString(undefined, {
                            style: "currency",
                            currency: "USD"
                        }),
                        'total_rewards_claimed': parseFloat(wallet_response[k]['total_rewards_claimed_xusd']).toFixed(5)
                    });
                }
            }
            this.setState({
                farm_balance_response: output,
                check_farm_balance_button_spinner_class: "hide",
                check_farm_balance_button_text_class: ""
            });
            console.log(output);
        });
    };
    buildSplitRewardsView = (pending_rewards_xusd, pending_rewards_xusd_usd, pending_rewards_paired_asset, pending_rewards_paired_asset_usd, paired_asset, total_rewards_claimed_xusd, total_rewards_claimed_paired_asset)=>{
        return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    class: "farm_balance_wrapper_left",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            class: "fieldset_header",
                            children: "Pending Rewards (xUSD)"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            class: "text-center",
                            children: pending_rewards_xusd.toLocaleString(undefined, {
                                maximumFractionDigits: 5
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    class: "farm_balance_wrapper_right",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            class: "fieldset_header",
                            children: [
                                "Pending Rewards (",
                                paired_asset,
                                ")"
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            class: "text-center",
                            children: pending_rewards_paired_asset.toLocaleString(undefined, {
                                maximumFractionDigits: 5
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    class: "clear"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    class: "farm_balance_spacer"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    class: "farm_balance_amount_wrapper",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            class: "fieldset_header",
                            children: "Pending Rewards (USD)"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            class: "text-center",
                            children: (pending_rewards_xusd_usd + pending_rewards_paired_asset_usd).toLocaleString(undefined, {
                                style: "currency",
                                currency: "USD"
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    class: "farm_balance_spacer"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    class: "farm_balance_wrapper_left",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            class: "fieldset_header",
                            children: "Total Claimed (xUSD)"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            class: "text-center",
                            children: parseFloat(total_rewards_claimed_xusd).toLocaleString(undefined, {
                                maximumFractionDigits: 5
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    class: "farm_balance_wrapper_right",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            class: "fieldset_header",
                            children: [
                                "Total Claimed (",
                                paired_asset,
                                ")"
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            class: "text-center",
                            children: parseFloat(total_rewards_claimed_paired_asset).toLocaleString(undefined, {
                                maximumFractionDigits: 5
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    class: "clear"
                })
            ]
        }));
    };
    buildRewardsView = (pending_rewards_xusd, pending_rewards_xusd_usd, total_rewards_claimed_xusd)=>{
        return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    class: "farm_balance_wrapper_left",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            class: "fieldset_header",
                            children: "Pending Rewards (xUSD)"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            class: "text-center",
                            children: pending_rewards_xusd.toLocaleString(undefined, {
                                maximumFractionDigits: 5
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    class: "farm_balance_wrapper_right",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            class: "fieldset_header",
                            children: "Pending Rewards (USD)"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            class: "text-center",
                            children: pending_rewards_xusd_usd.toLocaleString(undefined, {
                                maximumFractionDigits: 5
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    class: "clear"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    class: "farm_balance_spacer"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    class: "farm_balance_amount_wrapper",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            class: "fieldset_header",
                            children: "Total Claimed (xUSD)"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            class: "text-center",
                            children: parseFloat(total_rewards_claimed_xusd).toLocaleString(undefined, {
                                maximumFractionDigits: 5
                            })
                        })
                    ]
                })
            ]
        }));
    };
    handleUserInput = (e)=>{
        this.setState({
            capture_farm_balance_input_value: e.target.value
        });
    };
    render() {
        return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "widget spacerToken tokenList2",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    id: "farm_balance_checker_error_container",
                    class: this.state.error_message_class,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        id: "farm_balance_checker_error_message",
                        children: this.state.farm_balance_error_message
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_3___default().Select), {
                    className: "farmSelect",
                    onChange: (ev)=>this.farmChange(ev)
                    ,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                            value: "0",
                            defaultValue: true,
                            children: "Select a Farm"
                        }),
                        farms.map((farm)=>{
                            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                value: farm.symbol,
                                children: farm.name
                            }, farm.symbol));
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    class: this.state.farm_balance_container_class,
                    id: "farm_balance_container",
                    children: [
                        !this.renderCheckFarmBalancesView() ? "" : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            id: "capture_farm_balance_container",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    class: "capture_farm_balance_input",
                                    id: "capture_farm_wallet_address",
                                    value: this.state.capture_farm_balance_input_value,
                                    type: "text",
                                    placeholder: this.state.capture_farm_balance_input_placeholder,
                                    onChange: this.handleUserInput
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    id: "capture_farm_balance_button",
                                    onClick: (ev)=>this.lookupFarmBalances(ev)
                                    ,
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Spinner__WEBPACK_IMPORTED_MODULE_4___default()), {
                                            size: "sm",
                                            id: "balance_check_button_spinner",
                                            className: this.state.check_farm_balance_button_spinner_class,
                                            animation: "border",
                                            role: "status",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "visually-hidden",
                                                children: "Loading..."
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            id: "check_farm_balance_button_text",
                                            class: this.state.check_farm_balance_button_text_class,
                                            children: this.state.check_farm_balance_button_text
                                        })
                                    ]
                                })
                            ]
                        }),
                        !this.state.farm_balance_response ? "" : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            id: "farm_balance_display_container",
                            children: [
                                this.state.farm_balance_response.map((farm)=>{
                                    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        class: "farm_balance_wrapper",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("fieldset", {
                                            class: "farm_balance_wrapper_fieldset",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("legend", {
                                                    align: "center",
                                                    children: farm.symbol
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    class: "farm_balance_amount_wrapper",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            class: "fieldset_header",
                                                            children: "Current Balance (Farm Tokens)"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            class: "text-center",
                                                            children: farm.farm_tokens
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    class: "farm_balance_wrapper_left",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            class: "fieldset_header",
                                                            children: "LP Balance (xUSD)"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            class: "text-center",
                                                            children: farm.farm_lp_balance_xusd
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    class: "farm_balance_wrapper_right",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            class: "fieldset_header",
                                                            children: [
                                                                "LP Balance (",
                                                                farm.paired_asset,
                                                                ")"
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            class: "text-center",
                                                            children: farm.farm_lp_balance_paired_asset
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    class: "clear"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    class: "farm_balance_spacer"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    class: "farm_balance_amount_wrapper",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            class: "fieldset_header",
                                                            children: "LP Value (USD)"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            class: "text-center",
                                                            children: farm.farm_lp_value_usd
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    class: "farm_balance_amount_wrapper",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            class: "fieldset_header",
                                                            children: "Time Until Unlock"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            class: "text-center",
                                                            children: [
                                                                farm.time_until_unlock,
                                                                " days"
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                farm.rewards_view
                                            ]
                                        })
                                    }));
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    id: "farm_balance_disclaimer",
                                    children: "*Data provided by BSC and CoinGecko API's"
                                })
                            ]
                        })
                    ]
                })
            ]
        }));
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FarmBalanceChecker);

});

/***/ }),

/***/ 869:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ VSF)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(226);
/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(166);
/* harmony import */ var react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(290);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _SurgeAssetData_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(969);







const farms = (0,_SurgeAssetData_js__WEBPACK_IMPORTED_MODULE_5__/* .getSurgeFarmsData */ .sp)();
function VSF() {
    const { 0: selectedFarm , 1: setSelectedFarm  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(farms[0]);
    const { 0: selectedFarmByUSer , 1: setSelectedFarmByUser  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const farmChange = (e)=>{
        setSelectedFarmByUser(true);
        let farmSymbol = e.target.value;
        if (farmSymbol === "0") {
            setSelectedFarmByUser(false);
            return;
        }
        const farmData = farms.filter((farm)=>farm.symbol === farmSymbol
        )[0];
        setSelectedFarm(farmData);
    };
    const addressCopy = function(address) {
        // Copy to clipboard
        navigator.clipboard.writeText(address);
        // "Copied" animation
        let icon1 = document.querySelector("#copy-icon-faddress");
        let icon2 = document.querySelector("#copy-icon-okay-faddress");
        icon1.classList.add("hidden");
        icon2.classList.remove("hidden");
        setTimeout(()=>{
            icon2.classList.add("hidden");
            icon1.classList.remove("hidden");
        }, 2000);
    };
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "widget spacerToken tokenList2",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_2___default().Select), {
                className: "farmSelect",
                onChange: (ev)=>farmChange(ev)
                ,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                        value: "0",
                        defaultValue: true,
                        children: "Select a Farm"
                    }),
                    farms.map((farm)=>{
                        return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                            value: farm.symbol,
                            children: farm.name
                        }, farm.symbol));
                    })
                ]
            }),
            !selectedFarmByUSer ? "" : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "tokenData farm",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "cValueSpacer",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_3___default()), {
                                src: "assets/img/dot.png",
                                className: "dot",
                                fluid: true
                            }),
                            " ",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "cValueTxt",
                                children: [
                                    "Current ",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "herospan",
                                        children: " stats:"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("table", {
                        className: "table table-borderless farmStatsTable",
                        cellSpacing: "0",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tbody", {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tr", {
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                        colSpan: "5",
                                        className: "coloredTD",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "tdLabel",
                                                children: "Contract Address"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "tdData",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__.FaRegCopy, {
                                                        id: "copy-icon-faddress",
                                                        onClick: ()=>addressCopy(selectedFarm.address)
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__.FaCheck, {
                                                        id: "copy-icon-okay-faddress",
                                                        className: "hidden"
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tr", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                        className: "cAddressData",
                                        children: selectedFarm.address
                                    })
                                })
                            ]
                        })
                    })
                ]
            })
        ]
    }));
};


/***/ }),

/***/ 740:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ VST)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(226);
/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(290);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(166);
/* harmony import */ var react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _json_surge_tokens_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(348);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(519);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(web3__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _SurgeAssetData_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(969);









const web3 = new (web3__WEBPACK_IMPORTED_MODULE_6___default())('https://bsc-dataseed1.binance.org:443');
const tokens = (0,_SurgeAssetData_js__WEBPACK_IMPORTED_MODULE_7__/* .getSurgeTokensData */ .yh)();
function VST() {
    /*get token info*/ const { 0: selectedToken , 1: setSelectedToken  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(tokens[0]);
    const { 0: selectedTokenByUser , 1: setSelectedTokenByUser  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const tokenChange = (e)=>{
        setSelectedTokenByUser(true);
        let tokenSymbol = e.target.value;
        if (tokenSymbol === "0") {
            setSelectedTokenByUser(false);
            return;
        } else {
            const tokenData = tokens.filter((token)=>token.symbol === tokenSymbol
            )[0];
            setSelectedToken(tokenData);
        }
    };
    const getTokenPrice = async (tokenABI, tokenAddress, weiUnit)=>{
        const contract = new web3.eth.Contract(tokenABI, tokenAddress);
        const priceRaw = await contract.methods.calculatePrice().call();
        const price = web3.utils.fromWei(priceRaw, weiUnit);
        return price;
    };
    const getTokenStats = (tokenConfig)=>{
        const promiseArray = tokenConfig.map(async (token)=>{
            const tokenPrice = await getTokenPrice(token.abi, token.address, token.wei_unit);
            const tokenStats = {
                name: token.name,
                symbol: token.symbol,
                address: token.address,
                bsc: token.bsc,
                price: tokenPrice
            };
            return tokenStats;
        });
        Promise.all(promiseArray).then((results)=>{
            // setTokenComponents(results);
            results.forEach((result)=>{
                tokens.forEach((token)=>{
                    if (result.symbol === token.symbol) {
                        token.price = result.price;
                    }
                });
                if (result.symbol === selectedToken.symbol) {
                    selectedToken.price = result.price;
                    setSelectedToken(result);
                }
            });
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getTokenStats(tokens);
    }, [
        tokens
    ]);
    const addressCopy = function(address) {
        // Copy to clipboard
        navigator.clipboard.writeText(address);
        // "Copied" animation
        let icon1 = document.querySelector("#copy-icon-address");
        let icon2 = document.querySelector("#copy-icon-okay-address");
        icon1.classList.add("hidden");
        icon2.classList.remove("hidden");
        setTimeout(()=>{
            icon2.classList.add("hidden");
            icon1.classList.remove("hidden");
        }, 2000);
    };
    const uaddressCopy = function(address) {
        // Copy to clipboard
        navigator.clipboard.writeText(address);
        // "Copied" animation
        let icon1 = document.querySelector("#copy-icon-uaddress");
        let icon2 = document.querySelector("#copy-icon-okay-uaddress");
        icon1.classList.add("hidden");
        icon2.classList.remove("hidden");
        setTimeout(()=>{
            icon2.classList.add("hidden");
            icon1.classList.remove("hidden");
        }, 2000);
    };
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "widget spacerToken tokenList2",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_2___default().Select), {
                className: "tokenSelect",
                onChange: (ev)=>tokenChange(ev)
                ,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                        value: "0",
                        defaultValue: true,
                        children: "Select a Token"
                    }),
                    tokens.map((token)=>{
                        return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                            value: token.symbol,
                            children: token.name
                        }, token.symbol));
                    })
                ]
            }),
            !selectedTokenByUser ? "" : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "tokenData",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "cValueSpacer",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_4___default()), {
                                src: "assets/img/dot.png",
                                className: "dot",
                                fluid: true
                            }),
                            " ",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "cValueTxt",
                                children: [
                                    "Current ",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "herospan",
                                        children: " value:"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("table", {
                        className: "table table-borderless tokenStatsTable",
                        cellSpacing: "0",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tbody", {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tr", {
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                        colSpan: "3",
                                        className: "coloredTD",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "tdLabel tdPrice",
                                                children: "Price"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "tdData tdPriceData",
                                                children: selectedToken.price
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tr", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                        colSpan: "3",
                                        children: "\xa0"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tr", {
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                        colSpan: "3",
                                        className: "coloredTD",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "tdLabel",
                                                children: "Contract Address"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "tooltip",
                                                children: "Copied"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "tdData",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__.FaRegCopy, {
                                                        id: "copy-icon-address",
                                                        onClick: ()=>addressCopy(selectedToken.address)
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__.FaCheck, {
                                                        id: "copy-icon-okay-address",
                                                        className: "hidden"
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tr", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                        colSpan: "3",
                                        className: "cAddressData",
                                        children: selectedToken.address
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tr", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                        colSpan: "3",
                                        children: "\xa0"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tr", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                        colSpan: "3",
                                        className: "",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "uLabel",
                                            children: "Fees"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                            className: "tdFee tdFeeFirst",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "coloredTD tdFeeContainer",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "tdLabel tdFeeLabel",
                                                        children: [
                                                            "Buy ",
                                                            selectedToken.fees['stake'] ? '/ Stake' : ''
                                                        ]
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "tdData tdFeeData",
                                                    children: [
                                                        selectedToken.fees['buy'],
                                                        "% ",
                                                        selectedToken.fees['stake'] ? ' / ' + selectedToken.fees['stake'] + '%' : ''
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                            className: "tdFee",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "coloredTD tdFeeContainer",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "tdLabel tdFeeLabel",
                                                        children: "Sell"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "tdData tdFeeData",
                                                    children: [
                                                        selectedToken.fees['sell'],
                                                        "%"
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                            className: "tdFee tdFeeLast",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "coloredTD tdFeeContainer",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "tdLabel tdFeeLabel",
                                                        children: "Transfer"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "tdData tdFeeData",
                                                    children: [
                                                        selectedToken.fees['transfer'],
                                                        "%"
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tr", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                        colSpan: "3",
                                        children: "\xa0"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tr", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                        colSpan: "3",
                                        className: "",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "uLabel",
                                            children: "Underlying Asset"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tr", {
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                        colSpan: "3",
                                        className: "coloredTD",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "tdLabel tdUnderlyingAsset",
                                                children: [
                                                    selectedToken.uassetname,
                                                    " (",
                                                    selectedToken.uassetsymbol,
                                                    ")"
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "tdData",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__.FaRegCopy, {
                                                        id: "copy-icon-uaddress",
                                                        onClick: ()=>uaddressCopy(selectedToken.uassetaddress)
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__.FaCheck, {
                                                        id: "copy-icon-okay-uaddress",
                                                        className: "hidden"
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tr", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                        colSpan: "3",
                                        className: "cAddressData",
                                        children: selectedToken.uassetaddress
                                    })
                                })
                            ]
                        })
                    })
                ]
            })
        ]
    }));
};


/***/ }),

/***/ 439:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_NavBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(325);
/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(278);
/* harmony import */ var react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(907);
/* harmony import */ var react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(511);
/* harmony import */ var react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(166);
/* harmony import */ var react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(937);
/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_router_hash_link__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(627);
/* harmony import */ var react_router_hash_link__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_router_hash_link__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_router_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(65);
/* harmony import */ var react_router_bootstrap__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_router_bootstrap__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_bootstrap_Nav__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(540);
/* harmony import */ var react_bootstrap_Nav__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Nav__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_VST__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(740);
/* harmony import */ var _components_VSF__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(869);
/* harmony import */ var _components_TokenBalanceChecker__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(613);
/* harmony import */ var _components_FarmBalanceChecker__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(90);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_FarmBalanceChecker__WEBPACK_IMPORTED_MODULE_14__, _components_TokenBalanceChecker__WEBPACK_IMPORTED_MODULE_13__]);
([_components_FarmBalanceChecker__WEBPACK_IMPORTED_MODULE_14__, _components_TokenBalanceChecker__WEBPACK_IMPORTED_MODULE_13__] = __webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__);















/* Functionals for scrolling */ function checkWantToScrollToHowToBuy() {
    return window.location.hash.indexOf("how-to-buy") !== -1; // True means want to scroll
}
function scrollToHowToBuy() {
    let elHowToBuy = document.getElementById('how-to-buy');
    if (elHowToBuy) elHowToBuy.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
    });
}
/* React app likes to change link to /#/ then useLayoutEffect and useEffect no longer runs
   if you visit http://localhost:3000/#/#how-to-buy if already on the page
   or if you visit http://localhost:3000/#/how-to-buy if already on the page
    Solution: Check popstate
*/ window.addEventListener('popstate', ()=>{
    console.log("popstate");
    if (checkWantToScrollToHowToBuy()) scrollToHowToBuy();
});
/* React app will not check hash properly for scrolling
   if you visit directly http://localhost:3000/#/#how-to-buy on a fresh tab
   or if you visit directly http://localhost:3000/#/how-to-buy on a fresh tab
    Solution: Check onload, and wait for render to complete outside of React
*/ window.addEventListener('load', ()=>{
    console.log("load");
    if (checkWantToScrollToHowToBuy()) {
        var pollCheckLimit = 9;
        var pollCurrent = 0;
        var poller = setInterval(()=>{
            var hasLoadedHowToBuy = document.getElementById("how-to-buy");
            if (hasLoadedHowToBuy) {
                scrollToHowToBuy();
            }
            if (pollCurrent > pollCheckLimit) clearInterval(poller);
            pollCurrent++;
        }, 300);
    }
});
//Functional Component 
class MainPage extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
    useLayoutEffect() {
        console.log("HELLO");
        /* Check if #how-to-buy is in URL; If yes, scroll to section with id "how-to-buy"
        if you visit http://localhost:3000/#how-to-buy from a fresh tab */ if (checkWantToScrollToHowToBuy()) scrollToHowToBuy();
    }
    render() {
        return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_NavBar__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default()), {
                    className: "spacer1",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default()), {
                            xs: 12,
                            sm: 12,
                            md: 4,
                            lg: 4,
                            xl: 4,
                            className: "mx-auto",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                id: "intro_container",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "intro_hero_wrapper",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                class: "intro_hero_header",
                                                children: "• Compounded Earnings"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                class: "intro_hero_header",
                                                children: "• Internal LP Market Maker"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                class: "intro_hero_header",
                                                children: "• Over 100% Backed MC"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                class: "intro_hero_header",
                                                children: "• No Developer Tokens"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                alt: "",
                                                src: "assets/img/surge_slim.png",
                                                className: "intro_hero_img"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "special bottom intro_hero_header",
                                                children: [
                                                    "\"never goes down",
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        class: "hero_copyright",
                                                        children: "\xa9"
                                                    }),
                                                    "\""
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_7___default()), {
                                        className: "dApp btnDApp",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                alt: "",
                                                src: "assets/img/appicon.png",
                                                className: "d-inline-block align-middle appicon"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                target: "_blank",
                                                rel: "noreferrer",
                                                href: "https://app.xsurge.net/",
                                                children: "Go to dApp"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_7___default()), {
                                        className: "dApp btnDApp learn_more",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            href: "#/education",
                                            children: "Learn More"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_7___default()), {
                                        className: "dApp btnDApp how_to_buy_hero",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            href: "#",
                                            onClick: (ev)=>{
                                                ev.preventDefault();
                                                scrollToHowToBuy();
                                            },
                                            className: "nav-link",
                                            children: "How To Buy"
                                        })
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default()), {
                            xs: 12,
                            sm: 12,
                            md: 8,
                            lg: 8,
                            xl: 8,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_6___default()), {
                                src: "assets/img/shapehero.png",
                                className: "heroImage",
                                fluid: true
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default()), {
                    className: "spacer1 text-center",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default()), {
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "hiw",
                            children: [
                                "Each transaction triggers a fee that raises the price of Surge relative to",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {
                                }),
                                "its underlying asset. That means Buys, Transfers, and Sells raise the",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {
                                }),
                                "price.  ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "herospan",
                                    children: "That's the Surge protocol."
                                })
                            ]
                        })
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default()), {
                    className: "spacer1 text-center",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default()), {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_6___default()), {
                            src: "assets/img/atom.png",
                            className: "atomImg",
                            fluid: true
                        })
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default()), {
                    className: "spacer5 text-center",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default()), {
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            id: "cta_fees_container",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "fees",
                                    children: [
                                        "Surge is the first of it's kind that only",
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "herospan",
                                            children: "allows for growth"
                                        }),
                                        ". The tokens use very low fees",
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {
                                        }),
                                        "to raise the price floor with every transaction, whether",
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {
                                        }),
                                        "it be buys, sells, or wallet-to-wallet transfers."
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "feeBtns",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_7___default()), {
                                            className: "dApp3 btnDApp2",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                    alt: "",
                                                    src: "assets/img/appicon.png",
                                                    className: "d-inline-block align-middle appicon"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                    target: "_blank",
                                                    rel: "noreferrer",
                                                    href: "https://app.xsurge.net/",
                                                    children: "Go to dApp"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_7___default()), {
                                            className: "dApp2",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                    alt: "",
                                                    src: "assets/img/paper.png",
                                                    className: "d-inline-block align-middle papericon"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                    target: "_blank",
                                                    rel: "noreferrer",
                                                    href: "assets/xsurge-whitepaper.pdf",
                                                    children: "Whitepaper"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default()), {
                    className: "spacer2 text-center",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default()), {
                            xs: 12,
                            sm: 12,
                            md: 5,
                            lg: 5,
                            xl: 5,
                            className: "app1",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h6", {
                                    className: "heroh6",
                                    children: "Core Features"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
                                    className: "heroH1",
                                    children: [
                                        "Six tokens for you to",
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {
                                        }),
                                        "invest and start",
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {
                                        }),
                                        "earning."
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default()), {
                            xs: 12,
                            sm: 12,
                            md: 7,
                            lg: 7,
                            xl: 7,
                            className: "app1_image app1_image_right",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_6___default()), {
                                src: "assets/img/surge_tokens_horizontal.png",
                                className: "app1Img",
                                fluid: true
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default()), {
                    className: "spacer3 text-center",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default()), {
                            xs: 12,
                            sm: 12,
                            md: 7,
                            lg: 7,
                            xl: 7,
                            className: "app1_image",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_6___default()), {
                                src: "assets/img/App 2.png",
                                className: "app2Img",
                                fluid: true
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default()), {
                            xs: 12,
                            sm: 12,
                            md: 5,
                            lg: 5,
                            xl: 5,
                            className: "app1 app1_right",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h6", {
                                    className: "heroh6 heroh6_right",
                                    children: "Core Features"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                    className: "heroH1 heroH1_right",
                                    children: "Internal Liquidity Pool & Market Maker."
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default()), {
                    className: "spacer4 text-center",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default()), {
                            xs: 12,
                            sm: 12,
                            md: 5,
                            lg: 5,
                            xl: 5,
                            className: "app1",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h6", {
                                    className: "heroh6",
                                    children: "Certified"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
                                    className: "heroH1",
                                    children: [
                                        "Certified",
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {
                                        }),
                                        "by Certik."
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_7___default()), {
                                    className: "certikAudtitBtn certikAudtitBtnFirst",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: "https://www.certik.com/projects/surgeeth",
                                        target: "_blank",
                                        children: "SurgeETH"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_7___default()), {
                                    className: "certikAudtitBtn",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: "https://www.certik.com/projects/surgebtc",
                                        target: "_blank",
                                        children: "SurgeBTC"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_7___default()), {
                                    className: "certikAudtitBtn",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: "https://www.certik.com/projects/xusd",
                                        target: "_blank",
                                        children: "xUSD - Onboarding"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_7___default()), {
                                    className: "certikAudtitBtn",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: "https://www.certik.com/projects/surgeuseless",
                                        target: "_blank",
                                        children: "SurgeUseless - Onboarding"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default()), {
                            xs: 12,
                            sm: 12,
                            md: 7,
                            lg: 7,
                            xl: 7,
                            className: "app1_image app1_image_right",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_6___default()), {
                                src: "assets/img/certik.svg",
                                className: "certikImg",
                                fluid: true
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default()), {
                    className: "spacervs",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default()), {
                        xs: 12,
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                className: "heroH1 text-center",
                                id: "how-to-buy",
                                children: "How To Buy"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                class: "how_to_buy",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "herospan",
                                    children: [
                                        "XUSD and all Surge Tokens/Farms",
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {
                                        }),
                                        "can be purchased through our dApp"
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                class: "how_to_buy_dApp dApp btnDApp btn btn-primary",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        alt: "",
                                        src: "assets/img/appicon.png",
                                        class: "d-inline-block align-middle appicon"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        target: "_blank",
                                        rel: "noreferrer",
                                        href: "https://app.xsurge.net/",
                                        children: "Go to dApp"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                class: "how_to_buy",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "herospan",
                                    children: "or by following these steps:"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ol", {
                                id: "how_to_buy_list_container",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                        children: [
                                            "Select a Surge Token/Farm ",
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {
                                            }),
                                            " from the dropdowns below"
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                        children: "Copy the contract address"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                        children: [
                                            "Send SmartChain BNB to ",
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {
                                            }),
                                            " the contract address"
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                        children: "Add contract to your wallet"
                                    })
                                ]
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default()), {
                    id: "surge_assets_row",
                    className: "spacervs",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default()), {
                        xs: 12,
                        sm: 12,
                        md: 12,
                        lg: 12,
                        xl: 12,
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                className: "heroH1 text-center",
                                id: "surge-assets",
                                children: "Surge Assets"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_6___default()), {
                                src: "assets/img/shape2.png",
                                className: "shape2",
                                fluid: true
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default()), {
                    className: "spacerToken",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default()), {
                            xs: 12,
                            sm: 12,
                            md: 12,
                            lg: 6,
                            xl: 6,
                            className: "assetsLeftPanel ",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_VST__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default()), {
                            xs: 12,
                            sm: 12,
                            md: 12,
                            lg: 6,
                            xl: 6,
                            className: "assetsRightPanel ",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_VSF__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, {
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default()), {
                    className: "spacervs",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default()), {
                        xs: 12,
                        sm: 12,
                        md: 12,
                        lg: 12,
                        xl: 12,
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                className: "heroH1 text-center",
                                id: "surge-balance-checker",
                                children: "Balance Checker"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_6___default()), {
                                src: "assets/img/shape2.png",
                                className: "shape2",
                                fluid: true
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default()), {
                    className: "spacerToken",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default()), {
                            xs: 12,
                            sm: 12,
                            md: 12,
                            lg: 6,
                            xl: 6,
                            className: "assetsLeftPanel ",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_TokenBalanceChecker__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default()), {
                            xs: 12,
                            sm: 12,
                            md: 12,
                            lg: 6,
                            xl: 6,
                            className: "assetsRightPanel ",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_FarmBalanceChecker__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z, {
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Footer__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                })
            ]
        }));
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MainPage);

});

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 937:
/***/ ((module) => {

module.exports = require("react-bootstrap/Button");

/***/ }),

/***/ 511:
/***/ ((module) => {

module.exports = require("react-bootstrap/Col");

/***/ }),

/***/ 226:
/***/ ((module) => {

module.exports = require("react-bootstrap/Form");

/***/ }),

/***/ 166:
/***/ ((module) => {

module.exports = require("react-bootstrap/Image");

/***/ }),

/***/ 540:
/***/ ((module) => {

module.exports = require("react-bootstrap/Nav");

/***/ }),

/***/ 70:
/***/ ((module) => {

module.exports = require("react-bootstrap/NavDropdown");

/***/ }),

/***/ 934:
/***/ ((module) => {

module.exports = require("react-bootstrap/Navbar");

/***/ }),

/***/ 907:
/***/ ((module) => {

module.exports = require("react-bootstrap/Row");

/***/ }),

/***/ 742:
/***/ ((module) => {

module.exports = require("react-bootstrap/Spinner");

/***/ }),

/***/ 405:
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ 290:
/***/ ((module) => {

module.exports = require("react-icons/fa");

/***/ }),

/***/ 65:
/***/ ((module) => {

module.exports = require("react-router-bootstrap");

/***/ }),

/***/ 627:
/***/ ((module) => {

module.exports = require("react-router-hash-link");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 519:
/***/ ((module) => {

module.exports = require("web3");

/***/ }),

/***/ 915:
/***/ ((module) => {

module.exports = import("js-cookie");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [286,613], () => (__webpack_exec__(439)));
module.exports = __webpack_exports__;

})();