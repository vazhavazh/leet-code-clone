"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var react_1 = require("react");
var Navbar = function () {
	return react_1["default"].createElement(
		"div",
		{ className: "flex items-center justify-between sm:px-12 px-2 md:px-24" },
		react_1["default"].createElement(
			link_1["default"],
			{ href: "./", className: "flex items-center justify-center h-20" },
			react_1["default"].createElement("img", {
				src: "./logo.png",
				alt: "Leet-clone",
				className: "h-full",
			})
		),
		react_1["default"].createElement(
			"div",
			{ className: "flex items-center" },
			react_1["default"].createElement(
				"button",
				{
					className:
						"bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium\r\n                 hover:text-brand-orange hover:bg-white hover:border-2\r\n                  hover:border-brand-orange border-2 border-transparent",
				},
				"Sign in"
			)
		)
	);
};
exports["default"] = Navbar;
