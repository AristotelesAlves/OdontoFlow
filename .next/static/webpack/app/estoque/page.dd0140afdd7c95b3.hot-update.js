"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/estoque/page",{

/***/ "(app-pages-browser)/./src/components/common/Header.jsx":
/*!******************************************!*\
  !*** ./src/components/common/Header.jsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Header; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _phosphor_icons_react_dist_ssr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @phosphor-icons/react/dist/ssr */ \"(app-pages-browser)/./node_modules/@phosphor-icons/react/dist/ssr/Tooth.mjs\");\n/* harmony import */ var _phosphor_icons_react_dist_ssr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @phosphor-icons/react/dist/ssr */ \"(app-pages-browser)/./node_modules/@phosphor-icons/react/dist/ssr/Gear.mjs\");\n/* harmony import */ var _phosphor_icons_react_dist_ssr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @phosphor-icons/react/dist/ssr */ \"(app-pages-browser)/./node_modules/@phosphor-icons/react/dist/ssr/Bell.mjs\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction Header() {\n    _s();\n    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)();\n    const paginaAtual = pathname.split(\"/\").pop();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n        className: \"flex w-full justify-between items-center pt-2\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex gap-4 items-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"figure\", {\n                        className: \"h-12 w-12 text-white flex items-center justify-center rounded-full bg-blue\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_phosphor_icons_react_dist_ssr__WEBPACK_IMPORTED_MODULE_3__.Tooth, {\n                            size: 32,\n                            weight: \"fill\"\n                        }, void 0, false, {\n                            fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                            lineNumber: 15,\n                            columnNumber: 21\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                        lineNumber: 14,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                            className: \"flex gap-2 items-center\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                    className: \"py-2 px-4 rounded-3xl border-2 hover:bg-blue hover:bg-opacity-65 hover:text-white \".concat(paginaAtual == \"dashboard\" ? \"bg-blue text-white border-blue border-opacity-50\" : null),\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                                        href: \"/dashboard\",\n                                        children: \"Dashboard\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                                        lineNumber: 20,\n                                        columnNumber: 29\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                                    lineNumber: 19,\n                                    columnNumber: 25\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                    className: \"py-2 px-4 rounded-3xl border-2 hover:bg-blue hover:bg-opacity-65 hover:text-white \".concat(paginaAtual == \"historico\" ? \"bg-blue text-white border-blue border-opacity-50\" : null),\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                                        href: \"/historico\",\n                                        children: \"Hist\\xf3rico\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                                        lineNumber: 25,\n                                        columnNumber: 29\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                                    lineNumber: 24,\n                                    columnNumber: 25\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                    className: \"py-2 px-4 rounded-3xl border-2 hover:bg-blue hover:bg-opacity-65 hover:text-white \".concat(paginaAtual == \"estoque\" ? \"bg-blue text-white border-blue border-opacity-50\" : null),\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                                        href: \"/estoque\",\n                                        children: \"Estoque\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                                        lineNumber: 30,\n                                        columnNumber: 29\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                                    lineNumber: 29,\n                                    columnNumber: 25\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                    className: \"py-2 px-4 rounded-3xl border-2 hover:bg-blue hover:bg-opacity-65 hover:text-white \".concat(paginaAtual == \"usuarios\" ? \"bg-blue text-white border-blue border-opacity-50\" : null),\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                                        href: \"/usuarios\",\n                                        children: \"Usu\\xe1rio\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                                        lineNumber: 35,\n                                        columnNumber: 29\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                                    lineNumber: 34,\n                                    columnNumber: 25\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                            lineNumber: 18,\n                            columnNumber: 21\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                        lineNumber: 17,\n                        columnNumber: 17\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                lineNumber: 13,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex gap-4 items-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"text\",\n                            className: \"border rounded-xl p-2 w-[300px]\",\n                            name: \"\",\n                            id: \"\"\n                        }, void 0, false, {\n                            fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                            lineNumber: 44,\n                            columnNumber: 21\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                        lineNumber: 43,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                            className: \"flex gap-2 items-center\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                    className: \"w-14 h-14 flex items-center justify-center border rounded-full p-2 relative\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_phosphor_icons_react_dist_ssr__WEBPACK_IMPORTED_MODULE_4__.Gear, {\n                                        size: true\n                                    }, void 0, false, {\n                                        fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                                        lineNumber: 49,\n                                        columnNumber: 29\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                                    lineNumber: 48,\n                                    columnNumber: 25\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                    className: \"w-14 h-14 flex items-center justify-center border rounded-full p-2 relative\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_phosphor_icons_react_dist_ssr__WEBPACK_IMPORTED_MODULE_5__.Bell, {\n                                            weight: \"fill\",\n                                            size: 25\n                                        }, void 0, false, {\n                                            fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                                            lineNumber: 52,\n                                            columnNumber: 29\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"w-5 h-5 flex items-center justify-center text-xs font-semibold text-white absolute right-0 top-0 bg-red rounded-full\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                                children: \"1\"\n                                            }, void 0, false, {\n                                                fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                                                lineNumber: 54,\n                                                columnNumber: 33\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                                            lineNumber: 53,\n                                            columnNumber: 29\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                                    lineNumber: 51,\n                                    columnNumber: 25\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                    children: \"user\"\n                                }, void 0, false, {\n                                    fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                                    lineNumber: 59,\n                                    columnNumber: 25\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                            lineNumber: 47,\n                            columnNumber: 21\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                        lineNumber: 46,\n                        columnNumber: 17\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n                lineNumber: 42,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/aristoteles/Documentos/projetos/OdontoFlow/src/components/common/Header.jsx\",\n        lineNumber: 12,\n        columnNumber: 9\n    }, this);\n}\n_s(Header, \"xbyQPtUVMO7MNj7WjJlpdWqRcTo=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname\n    ];\n});\n_c = Header;\nvar _c;\n$RefreshReg$(_c, \"Header\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9IZWFkZXIuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNtRTtBQUN0QztBQUNpQjtBQUUvQixTQUFTSzs7SUFFcEIsTUFBTUMsV0FBV0YsNERBQVdBO0lBQzVCLE1BQU1HLGNBQWNELFNBQVNFLEtBQUssQ0FBQyxLQUFLQyxHQUFHO0lBRTNDLHFCQUNJLDhEQUFDQztRQUFPQyxXQUFVOzswQkFDZCw4REFBQ0M7Z0JBQUlELFdBQVU7O2tDQUNYLDhEQUFDRTt3QkFBT0YsV0FBVTtrQ0FDZCw0RUFBQ1QsaUVBQUtBOzRCQUFDWSxNQUFNOzRCQUFJQyxRQUFPOzs7Ozs7Ozs7OztrQ0FFNUIsOERBQUNDO2tDQUNHLDRFQUFDQzs0QkFBR04sV0FBVTs7OENBQ1YsOERBQUNPO29DQUFHUCxXQUFXLHFGQUE0SyxPQUF2RkosZUFBZSxjQUFjLHFEQUFxRDs4Q0FDbEwsNEVBQUNKLGlEQUFJQTt3Q0FBQ2dCLE1BQUs7a0RBQWE7Ozs7Ozs7Ozs7OzhDQUk1Qiw4REFBQ0Q7b0NBQUdQLFdBQVcscUZBQTRLLE9BQXZGSixlQUFlLGNBQWMscURBQXFEOzhDQUNsTCw0RUFBQ0osaURBQUlBO3dDQUFDZ0IsTUFBSztrREFBYTs7Ozs7Ozs7Ozs7OENBSTVCLDhEQUFDRDtvQ0FBR1AsV0FBVyxxRkFBMEssT0FBckZKLGVBQWUsWUFBWSxxREFBcUQ7OENBQ2hMLDRFQUFDSixpREFBSUE7d0NBQUNnQixNQUFLO2tEQUFXOzs7Ozs7Ozs7Ozs4Q0FJMUIsOERBQUNEO29DQUFHUCxXQUFXLHFGQUEySyxPQUF0RkosZUFBZSxhQUFhLHFEQUFxRDs4Q0FDakwsNEVBQUNKLGlEQUFJQTt3Q0FBQ2dCLE1BQUs7a0RBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBT3ZDLDhEQUFDUDtnQkFBSUQsV0FBVTs7a0NBQ1gsOERBQUNTO2tDQUNHLDRFQUFDQzs0QkFBTUMsTUFBSzs0QkFBT1gsV0FBVTs0QkFBa0NZLE1BQUs7NEJBQUdDLElBQUc7Ozs7Ozs7Ozs7O2tDQUU5RSw4REFBQ1I7a0NBQ0csNEVBQUNDOzRCQUFHTixXQUFVOzs4Q0FDViw4REFBQ087b0NBQUdQLFdBQVU7OENBQ1YsNEVBQUNWLGdFQUFJQTt3Q0FBQ2EsSUFBSTs7Ozs7Ozs7Ozs7OENBRWQsOERBQUNJO29DQUFHUCxXQUFVOztzREFDViw4REFBQ1gsZ0VBQUlBOzRDQUFDZSxRQUFPOzRDQUFPRCxNQUFNOzs7Ozs7c0RBQzFCLDhEQUFDRjs0Q0FBSUQsV0FBVTtzREFDWCw0RUFBQ1M7MERBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhDQUtkLDhEQUFDRjs4Q0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNNUI7R0EzRHdCYjs7UUFFSEQsd0RBQVdBOzs7S0FGUkMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvY29tbW9uL0hlYWRlci5qc3g/NTM3ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIlxuaW1wb3J0IHsgQmVsbCwgR2VhciwgVG9vdGggfSBmcm9tIFwiQHBob3NwaG9yLWljb25zL3JlYWN0L2Rpc3Qvc3NyXCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgeyB1c2VQYXRobmFtZSB9IGZyb20gJ25leHQvbmF2aWdhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhlYWRlcigpe1xuXG4gICAgY29uc3QgcGF0aG5hbWUgPSB1c2VQYXRobmFtZSgpO1xuICAgIGNvbnN0IHBhZ2luYUF0dWFsID0gcGF0aG5hbWUuc3BsaXQoJy8nKS5wb3AoKVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJmbGV4IHctZnVsbCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIHB0LTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtNCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzTmFtZT1cImgtMTIgdy0xMiB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtZnVsbCBiZy1ibHVlXCIgPlxuICAgICAgICAgICAgICAgICAgICA8VG9vdGggc2l6ZT17MzJ9IHdlaWdodD1cImZpbGxcIi8+XG4gICAgICAgICAgICAgICAgPC9maWd1cmU+XG4gICAgICAgICAgICAgICAgPG5hdj5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImZsZXggZ2FwLTIgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtgcHktMiBweC00IHJvdW5kZWQtM3hsIGJvcmRlci0yIGhvdmVyOmJnLWJsdWUgaG92ZXI6Ymctb3BhY2l0eS02NSBob3Zlcjp0ZXh0LXdoaXRlICR7cGFnaW5hQXR1YWwgPT0gJ2Rhc2hib2FyZCcgPyAnYmctYmx1ZSB0ZXh0LXdoaXRlIGJvcmRlci1ibHVlIGJvcmRlci1vcGFjaXR5LTUwJyA6IG51bGx9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9kYXNoYm9hcmRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGFzaGJvYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e2BweS0yIHB4LTQgcm91bmRlZC0zeGwgYm9yZGVyLTIgaG92ZXI6YmctYmx1ZSBob3ZlcjpiZy1vcGFjaXR5LTY1IGhvdmVyOnRleHQtd2hpdGUgJHtwYWdpbmFBdHVhbCA9PSAnaGlzdG9yaWNvJyA/ICdiZy1ibHVlIHRleHQtd2hpdGUgYm9yZGVyLWJsdWUgYm9yZGVyLW9wYWNpdHktNTAnIDogbnVsbH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL2hpc3Rvcmljb1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIaXN0w7NyaWNvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e2BweS0yIHB4LTQgcm91bmRlZC0zeGwgYm9yZGVyLTIgaG92ZXI6YmctYmx1ZSBob3ZlcjpiZy1vcGFjaXR5LTY1IGhvdmVyOnRleHQtd2hpdGUgJHtwYWdpbmFBdHVhbCA9PSAnZXN0b3F1ZScgPyAnYmctYmx1ZSB0ZXh0LXdoaXRlIGJvcmRlci1ibHVlIGJvcmRlci1vcGFjaXR5LTUwJyA6IG51bGx9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9lc3RvcXVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVzdG9xdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17YHB5LTIgcHgtNCByb3VuZGVkLTN4bCBib3JkZXItMiBob3ZlcjpiZy1ibHVlIGhvdmVyOmJnLW9wYWNpdHktNjUgaG92ZXI6dGV4dC13aGl0ZSAke3BhZ2luYUF0dWFsID09ICd1c3VhcmlvcycgPyAnYmctYmx1ZSB0ZXh0LXdoaXRlIGJvcmRlci1ibHVlIGJvcmRlci1vcGFjaXR5LTUwJyA6IG51bGx9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi91c3Vhcmlvc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVc3XDoXJpb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtNCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiYm9yZGVyIHJvdW5kZWQteGwgcC0yIHctWzMwMHB4XVwiIG5hbWU9XCJcIiBpZD1cIlwiIC8+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxuYXY+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJmbGV4IGdhcC0yIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInctMTQgaC0xNCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBib3JkZXIgcm91bmRlZC1mdWxsIHAtMiByZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxHZWFyIHNpemUvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJ3LTE0IGgtMTQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYm9yZGVyIHJvdW5kZWQtZnVsbCBwLTIgcmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QmVsbCB3ZWlnaHQ9XCJmaWxsXCIgc2l6ZT17MjV9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctNSBoLTUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgYWJzb2x1dGUgcmlnaHQtMCB0b3AtMCBiZy1yZWQgcm91bmRlZC1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPnVzZXI8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvaGVhZGVyPlxuICAgIClcbn0iXSwibmFtZXMiOlsiQmVsbCIsIkdlYXIiLCJUb290aCIsIkxpbmsiLCJ1c2VQYXRobmFtZSIsIkhlYWRlciIsInBhdGhuYW1lIiwicGFnaW5hQXR1YWwiLCJzcGxpdCIsInBvcCIsImhlYWRlciIsImNsYXNzTmFtZSIsImRpdiIsImZpZ3VyZSIsInNpemUiLCJ3ZWlnaHQiLCJuYXYiLCJ1bCIsImxpIiwiaHJlZiIsInNwYW4iLCJpbnB1dCIsInR5cGUiLCJuYW1lIiwiaWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/common/Header.jsx\n"));

/***/ })

});