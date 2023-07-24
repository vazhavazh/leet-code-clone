"use strict";
exports.__esModule = true;
var Navbar_1 = require("@/components/Navbar/Navbar");
var react_1 = require("react");
var AuthPage = function () {
    return (react_1["default"].createElement("div", { className: 'bg-gradient-to-b from-gray-600 to-black h-screen relative' },
        react_1["default"].createElement("div", { className: 'max-w-7xl mx-auto' },
            react_1["default"].createElement(Navbar_1["default"], null))));
};
exports["default"] = AuthPage;
