"use strict";
(() => {
var exports = {};
exports.id = 389;
exports.ids = [389];
exports.modules = {

/***/ 104:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ updates)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: external "react-router-dom"
const external_react_router_dom_namespaceObject = require("react-router-dom");
;// CONCATENATED MODULE: external "react-bootstrap"
const external_react_bootstrap_namespaceObject = require("react-bootstrap");
;// CONCATENATED MODULE: ./src/components/UpdateCard.js





class UpdateCard extends external_react_.Component {
    render() {
        return(/*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_namespaceObject.Card, {
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_namespaceObject.Card.Body, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "version-tag",
                        children: this.props.version
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_namespaceObject.Card.Title, {
                        children: this.props.title
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_namespaceObject.Card.Text, {
                        className: "truncate",
                        children: this.props.desc
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: this.props.filepath,
                        target: "_blank",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_namespaceObject.Button, {
                            variant: "primary",
                            children: "Read"
                        })
                    })
                ]
            })
        }));
    }
}
/* harmony default export */ const components_UpdateCard = (UpdateCard);

;// CONCATENATED MODULE: ./src/pages/updates.jsx


//import Card from "../components/Card"
//import WidgetData from "../components/WidgetData";



// Mock
// const readUpdates = {
//   getUpdates: ()=>{
//     return [
//       {
//         title: "Title1",
//         desc: "Desc1",
//         version: "1.0"
//       },
//       {
//         title: "Title2",
//         desc: "Desc2",
//         version: "1.1"
//       },
//     ]
//   }
// }
const Updates = ()=>{
    const { 0: loadedUpdates , 1: setUpdates  } = (0,external_react_.useState)([]);
    (0,external_react_.useEffect)(()=>{
        (async function() {
            const updates = await fetch('http://localhost:3001/json/updates', {
                method: 'GET'
            }).then((res)=>res.json()
            ).then((data)=>{
                return data;
            }).catch((err)=>{
                throw new Error(err);
            });
            setUpdates(updates);
        })(); // IIFE
    }, []); // useEffect
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "fullscreen-bg",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("video", {
                        loop: true,
                        muted: true,
                        autoPlay: true,
                        className: "fullscreen-bg__video",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("source", {
                            src: "assets/vid/video4.mp4",
                            type: "video/mp4"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "hero-text",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "piece",
                            children: "Updates"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "container-wrapper",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "container",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "updates-container",
                            children: loadedUpdates.map((update)=>{
                                let { title , desc , version  } = update;
                                let filepath = "/updates/" + update.filename;
                                return(/*#__PURE__*/ jsx_runtime_.jsx(components_UpdateCard, {
                                    title: title,
                                    desc: desc,
                                    version: version,
                                    filepath: filepath
                                }));
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                            className: "btn-back",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_router_dom_namespaceObject.Link, {
                                to: "/",
                                children: "Back"
                            })
                        })
                    ]
                })
            })
        ]
    }));
};
/* harmony default export */ const updates = (Updates);


/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(104));
module.exports = __webpack_exports__;

})();