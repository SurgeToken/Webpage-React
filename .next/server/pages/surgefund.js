"use strict";
(() => {
var exports = {};
exports.id = 312;
exports.ids = [312];
exports.modules = {

/***/ 649:
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
/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(937);
/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(907);
/* harmony import */ var react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(511);
/* harmony import */ var react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(166);
/* harmony import */ var react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_TokenBalanceChecker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(613);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(519);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(web3__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(915);
/* harmony import */ var react_bootstrap_Spinner__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(742);
/* harmony import */ var react_bootstrap_Spinner__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Spinner__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _components_json_token_abis_surge_fund_abi_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(414);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([js_cookie__WEBPACK_IMPORTED_MODULE_10__, _components_TokenBalanceChecker__WEBPACK_IMPORTED_MODULE_8__]);
([js_cookie__WEBPACK_IMPORTED_MODULE_10__, _components_TokenBalanceChecker__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__);














const surgeFundContractAddress = "0x8078380508c16C9F122D62771714701612Eb3fa8";
const surgeFundABI = _components_json_token_abis_surge_fund_abi_json__WEBPACK_IMPORTED_MODULE_12__;
const web3 = new (web3__WEBPACK_IMPORTED_MODULE_9___default())('https://bsc-dataseed1.binance.org:443');
const SurgeFund = ()=>{
    const { 0: captureSurgeFundWalletAddressvalue , 1: setCaptureSurgeFundWalletAddressvalue  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(js_cookie__WEBPACK_IMPORTED_MODULE_10__["default"].get('public_surge_fund_wallet_address'));
    const { 0: checkSurgeFundBalanceButtonSpinnerClass , 1: setCheckSurgeFundBalanceButtonSpinnerClass  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("hide");
    const { 0: checkSurgeFundBalanceButtonTextClass , 1: setCheckSurgeFundBalanceButtonTextClass  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: surgeFundResponse , 1: setSurgeFundResponse  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: surgeFundErrorMessage , 1: setSurgeFundErrorMessage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: errorMessageClass , 1: setErrorMessageClass  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const handleUserInput = (e)=>{
        setCaptureSurgeFundWalletAddressvalue(e.target.value);
    };
    const lookupSurgeFundBalances = (ev)=>{
        let formated_wallet_address = "";
        setCheckSurgeFundBalanceButtonSpinnerClass("");
        setCheckSurgeFundBalanceButtonTextClass("hide");
        let wallet_address = captureSurgeFundWalletAddressvalue;
        // Check to see if the supplied address is valid/invalid
        try {
            formated_wallet_address = web3.utils.toChecksumAddress(wallet_address);
        } catch (err) {
            setSurgeFundErrorMessage("Supplied wallet address is invalid");
            setErrorMessageClass("show");
            setCheckSurgeFundBalanceButtonSpinnerClass("hide");
            setCheckSurgeFundBalanceButtonTextClass("");
            return;
        }
        // Set Public Wallet Address Cookie
        js_cookie__WEBPACK_IMPORTED_MODULE_10__["default"].set('public_surge_fund_wallet_address', formated_wallet_address, {
            expires: 30,
            path: '/'
        });
        let promises = [];
        let surge_fund_response = [];
        let contract = new web3.eth.Contract(surgeFundABI, surgeFundContractAddress);
        let get_balance_of = new Promise(function(resolve, reject) {
            contract.methods.balanceOf(formated_wallet_address).call({
            }, function(error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
        promises.push(get_balance_of);
        get_balance_of.then((data)=>{
            surge_fund_response['balance'] = web3.utils.fromWei(data, 'ether');
        });
        let bnb_to_claim = new Promise(function(resolve, reject) {
            contract.methods.bnbToClaimForVictim(formated_wallet_address).call({
            }, function(error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
        promises.push(bnb_to_claim);
        bnb_to_claim.then((data)=>{
            surge_fund_response['bnb_to_claim'] = web3.utils.fromWei(data, 'ether');
        });
        Promise.allSettled(promises).then((result)=>{
            let can_make_claim = "No (Your current claim < 0.002 BNB)";
            if (parseFloat(surge_fund_response['balance']) >= 0.002) {
                can_make_claim = "Yes";
            }
            let output = [
                {
                    'balance': surge_fund_response['balance'],
                    'bnb_to_claim': surge_fund_response['bnb_to_claim'],
                    'can_make_claim': can_make_claim
                }
            ];
            console.log(output);
            setSurgeFundResponse(output);
            setCheckSurgeFundBalanceButtonSpinnerClass("hide");
            setCheckSurgeFundBalanceButtonTextClass("");
        });
    };
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_NavBar__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_5___default()), {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_6___default()), {
                    xs: 12,
                    sm: 12,
                    md: 12,
                    lg: 12,
                    xl: 12,
                    className: "edLogo",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_7___default()), {
                        src: "assets/img/surge_fund_title.png",
                        className: "surgeFundTitle"
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_5___default()), {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_6___default()), {
                        xs: 12,
                        sm: 12,
                        md: 12,
                        lg: 6,
                        xl: 6,
                        className: "",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "widget tokenList2",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    children: "To check your current Surge Fund details, please enter your BEP-20 Public Wallet Address below"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    id: "token_balance_checker_error_container",
                                    class: errorMessageClass,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        id: "token_balance_checker_error_message",
                                        children: surgeFundErrorMessage
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    id: "capture_surge_fund_address_container",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                            class: "capture_surge_fund_address_input",
                                            id: "surge_fund_address_input",
                                            value: captureSurgeFundWalletAddressvalue,
                                            type: "text",
                                            placeholder: "Enter BEP-20 Public Wallet Address",
                                            onChange: handleUserInput
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            id: "capture_token_balance_button",
                                            onClick: (ev)=>lookupSurgeFundBalances(ev)
                                            ,
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Spinner__WEBPACK_IMPORTED_MODULE_11___default()), {
                                                    size: "sm",
                                                    id: "balance_check_button_spinner",
                                                    className: checkSurgeFundBalanceButtonSpinnerClass,
                                                    animation: "border",
                                                    role: "status",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "visually-hidden",
                                                        children: "Loading..."
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    id: "check_balance_button_text",
                                                    class: checkSurgeFundBalanceButtonTextClass,
                                                    children: "Check"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                !surgeFundResponse ? "" : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    id: "token_balance_display_container",
                                    children: [
                                        surgeFundResponse.map((data)=>{
                                            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                class: "token_balance_wrapper",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("fieldset", {
                                                    class: "token_balance_wrapper_fieldset",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("legend", {
                                                            align: "center",
                                                            children: "SurgeFund Details"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            class: "token_balance_amount_wrapper",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                    class: "token_balance_header",
                                                                    children: "Your current SurgeFund BNB balance"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                    class: "token_balance_amount",
                                                                    children: data.balance
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            class: "token_balance_amount_wrapper",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                    class: "token_balance_header",
                                                                    children: "BNB you have left to claim"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                    class: "token_balance_amount",
                                                                    children: data.bnb_to_claim
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            class: "token_balance_amount_wrapper",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                    class: "token_balance_header",
                                                                    children: "Can Make A Claim?"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                    class: "token_balance_amount",
                                                                    children: data.can_make_claim
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            }));
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            id: "token_balance_disclaimer",
                                            children: "*Data provided by BSC"
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_6___default()), {
                        xs: 12,
                        sm: 12,
                        md: 12,
                        lg: 6,
                        xl: 6,
                        className: "edText surge_fund_text",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                children: "The SurgeFund is XSurge's attempt to pay back the money that was lost in the SurgeBNB hack occurring on August 16th, 2021. Shortly after notifying the community to pull out of the contract due to a security vulnerability, SurgeBNB was exploited for $5M in BNB. The leadership team and Mark conducted a thorough investigation to determine the culprit and follow the money trail. Authorities were notified by a legal representative of the XSurge team and outside agencies were were hired to help. Unfortunately, the money could not be tracked and recovered. Mark and the team put together a Charitable Donation Fund for everyone who lost the money known as the SurgeFund shortly after."
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                children: "To learn more about the SurgeBNB hack, The SurgeFund and how to claim, please visit our Surge Education Page"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
                                className: "dApp btnDApp learn_more surge_fund_learn_more_button",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    href: "#/education",
                                    children: "Surge Education"
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Footer__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SurgeFund);

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

/***/ }),

/***/ 414:
/***/ ((module) => {

module.exports = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"claimer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountBNB","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"migratedBNB","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"}],"name":"FundMigration","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"LockedContract","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"generousUser","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewardGivenUp","type":"uint256"}],"name":"OptOut","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newSurgeBNB","type":"address"}],"name":"SetSurgeBNBAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"TransferOwnership","type":"event"},{"inputs":[],"name":"LockTheContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"underlying","type":"address"}],"name":"addSurgeToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"victim","type":"address"},{"internalType":"uint256","name":"newClaim","type":"uint256"}],"name":"adjustVictim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"victim","type":"address"}],"name":"bnbToClaimForVictim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimWaitPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"initialPaybackAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isLocked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"isVictim","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"migrateBNB","type":"bool"},{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"recipient","type":"address"}],"name":"migrateToNewFundIfUnlocked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"old","type":"address"},{"internalType":"address","name":"newVictim","type":"address"}],"name":"migrateVictim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minimumClaim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"percent","type":"uint256"}],"name":"optOut","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_victims","type":"address[]"}],"name":"pullVictims","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellAllSurgesForBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"sellAllTokenForBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"sellAllTokenForBNBSupportingFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellSurgeBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"surgetoken","type":"address"},{"internalType":"address","name":"underlying","type":"address"}],"name":"sellSurgeTokenForBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"surgetoken","type":"address"}],"name":"sellSurgeTokenForBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"surgeToken","type":"address"}],"name":"sellSurgeTokenForUnderlyingAsset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"tokenBalance","type":"uint256"}],"name":"sellTokenForBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"tokenBalance","type":"uint256"}],"name":"sellTokenForBNBSupportingFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bool","name":"isCaller","type":"bool"}],"name":"setFunctionCaller","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"minClaim","type":"uint256"}],"name":"setMinimumClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_sbnb","type":"address"}],"name":"setSurgeBNBAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalBNBPaidBack","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]');

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [286,613], () => (__webpack_exec__(649)));
module.exports = __webpack_exports__;

})();