import assert from "assert";

export type Example = {
	id: number;
	inputText: string;
	outPutText: string;
	explanation?: string;
	img?: string;
};

export type Problem = {
	id: string;
	title: string;
	problemStatement: string;
	examples: Example[];
	constraints: string;
	order: number;
	starterCode: string;
	handlerFunction: ((fn: any) => boolean) | string;
	starterFunctionName: string;
};

export const twoSum: Problem = {
	id: "twoSum",
	title: "1. Two Sum",
	problemStatement: "",
	examples: [
		{
			id: 1,
			inputText: "nums = [2, 7, 11, 15], target = 9",
			outPutText: "[0, 1]",
			explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
		},
		{
			id: 2,
			inputText: "nums = [3, 2, 4], target = 6",
			outPutText: "[1, 2]",
			explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
		},
		{
			id: 3,
			inputText: "nums = [3, 3], target = 6",
			outPutText: "[0, 1]",
		},
	],
	constraints: "",
	handlerFunction: () => true,
	starterCode: "",
	order: 1,
	starterFunctionName: "function twoSum(",
};
