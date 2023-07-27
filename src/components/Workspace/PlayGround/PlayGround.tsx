import React from "react";
import PreferenceNavBar from "./PreferenceNavBar/PreferenceNavBar";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";

type PlayGroundProps = {};

const PlayGround: React.FC<PlayGroundProps> = () => {
	return (
		<div className='flex flex-col bg-dark-layer-1 relative'>
			<PreferenceNavBar />

			<Split
				className='h-[calc(100vh-94px)]'
				direction='vertical'
				sizes={[60, 40]}
				minSize={60}>
				<div className='w-full overflow-auto'>
					<CodeMirror
						value='const a = 1;'
						theme={vscodeDark}
						extensions={[javascript()]}
						style={{ fontSize: 16 }}
					/>
				</div>
				<div>test cases will be here</div>
			</Split>
		</div>
	);
};
export default PlayGround;
