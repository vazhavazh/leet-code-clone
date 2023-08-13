import React, { useState, useEffect } from "react";
import PreferenceNavBar from "./PreferenceNavBar/PreferenceNavBar";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, fireStore } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { problems } from "@/utils/problems";
import { useRouter } from "next/router";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

type PlayGroundProps = {
	problem: Problem;
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
	fontSize: string;
	settingsModalIsOpen: boolean;
	dropdownIsOpen: boolean;
}

const PlayGround: React.FC<PlayGroundProps> = ({
	problem,
	setSuccess,
	setSolved,
}) => {
	const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
	const [settings, setSettings] = useState<ISettings>({
		fontSize: "16px",
		settingsModalIsOpen: false,
		dropdownIsOpen: false,
	});
	let [userCode, setUserCode] = useState<string>(problem.starterCode);
	const [user] = useAuthState(auth);

	const {
		query: { pid },
	} = useRouter();

	const handleSubmit = async () => {
		if (!user) {
			toast.error("please log in  to submit your code", {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});
			return;
		}
		try {
			userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
			const cb = new Function(`return ${userCode}`)();
			const handler = problems[pid as string].handlerFunction;

			if (typeof handler === "function") {
				const success = handler(cb);

				if (success) {
					toast.success("Congrats! All tests passed!", {
						position: "top-center",
						autoClose: 3000,
						theme: "dark",
					});
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 4000);

					const userRef = doc(fireStore, "users", user.uid);
					await updateDoc(userRef, {
						solvedProblems: arrayUnion(pid),
					});
					setSolved(true);
				}
			}
		} catch (error: any) {
			if (
				error.message.startsWith(
					"AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:"
				)
			) {
				toast.error("Oops! One or more test cases failed", {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			} else {
				toast.error("Oops! Something went wrong", {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			}
		}
	};

	useEffect(() => {
		const code = localStorage.getItem(`code-${pid}`);
		if (user) {
			setUserCode(code ? JSON.parse(code) : problem.starterCode);
		} else {
			setUserCode(problem.starterCode);
		}
	}, [pid, user, problem.starterCode]);

	const onChange = (value: string) => {
		setUserCode(value);
		localStorage.setItem(`code-${pid}`, JSON.stringify(value));
	};

	return (
		<div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
			<PreferenceNavBar
				settings={settings}
				setSettings={setSettings}
			/>

			<Split
				className='h-[calc(100vh-94px)]'
				direction='vertical'
				sizes={[60, 40]}
				minSize={60}>
				<div className='w-full overflow-auto'>
					<CodeMirror
						onChange={onChange}
						value={userCode}
						theme={vscodeDark}
						extensions={[javascript()]}
						style={{ fontSize: settings.fontSize }}
					/>
				</div>
				<div className='w-full px-5 overflow-auto'>
					{/* test case heading */}
					<div className=' flex h-10 items-center space-x-6'>
						<div
							className='relative flex h-full flex-col justify-center 
						cursor-pointer'>
							<div className='text-sm font-medium leading-5 text-white'>
								Testcases
							</div>
							<hr
								className='absolute bottom-0 h-0.5 w-full rounded-full 
							border-none bg-white'
							/>
						</div>
					</div>

					<div className='flex'>
						{problem.examples.map((example, index) => (
							<div
								onClick={() => setActiveTestCaseId(index)}
								className='mr-2 items-start mt-2  text-gray-500'
								key={example.id}>
								<div className='flex flex-wrap items-center gap-y-4'>
									<div
										className={`font-medium items-center 
								transition-all focus-within:outline-none inline-flex bg-dark-fill-3
								hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer
								whitespace-nowrap
								${activeTestCaseId === index ? "text-white" : ""}
								`}>
										Case {index + 1}
									</div>
								</div>
							</div>
						))}
					</div>

					<div className='font-semibold my-4'>
						<p className='text-sm font-medium mt-4 text-white'>Input:</p>
						<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
							{problem.examples[activeTestCaseId].inputText}
						</div>
						<p className='text-sm font-medium mt-4 text-white'>Output:</p>
						<div
							className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 
							border-transparent text-white mt-2'>
							{problem.examples[activeTestCaseId].outPutText}
						</div>
					</div>
				</div>
			</Split>
			<EditorFooter handleSubmit={handleSubmit} />
		</div>
	);
};
export default PlayGround;
