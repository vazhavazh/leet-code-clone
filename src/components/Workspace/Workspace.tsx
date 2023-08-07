import React from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import PlayGround from "./PlayGround/PlayGround";
import { Problem } from "@/utils/types/problem";
type WorkspaceProps = {
	problem: Problem;
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
	return (
		<Split
			className='split'
			minSize={0}>
			<ProblemDescription problem={problem} />
			<div className="bg-dark-fill-2">
				{" "}
				<PlayGround problem={problem} />
			</div>
		</Split>
	);
};
export default Workspace;
