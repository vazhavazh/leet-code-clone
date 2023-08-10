import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import Link from "next/link";
import { AiFillYoutube } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import YouTube from "react-youtube";
import { useGetProblems } from "@/hooks/useGetProblems";

type ProblemsTableProps = {
	setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProblemsTable: React.FC<ProblemsTableProps> = ({
	setLoadingProblems,
}) => {
	const [youtubePlayer, setYoutubePlayer] = useState({
		isOpen: false,
		videoId: "",
	});

	const problems = useGetProblems(setLoadingProblems);

	const closeModal = () => {
		setYoutubePlayer({
			isOpen: false,
			videoId: "",
		});
	};

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, []);
	return (
		<>
			<tbody className='text-white'>
				{problems.map((el, idx) => {
					const difficultyColor =
						el.difficulty === "Easy"
							? "text-dark-green-s"
							: el.difficulty === "Medium"
							? "text-dark-yellow"
							: "text-dark-pink";
					return (
						<tr
							className={`${idx % 2 === 1 ? "bg-dark-layer-1" : ""}`}
							key={el.id}>
							<th
								className='px-2 py-4 font-medium whitespace-nowrap
	                            text-dark-green-s
	                            '>
								<BsCheckCircle
									fontSize={"18"}
									width={"18"}
								/>
							</th>
							<td className='px-6 py-4'>
								{el.link ? (
									<Link
										href={el.link}
										className='hover:text-blue-600 cursor-pointer'
										target='_blank'>
										{el.title}
									</Link>
								) : (
									<Link
										className='hover:text-blue-600 cursor-pointer'
										href={`/problems/${el.id}`}>
										{el.title}
									</Link>
								)}
							</td>
							<td className={`px-6 py-4 ${difficultyColor}`}>
								{el.difficulty}
							</td>
							<td className={"px-6 py-4"}>{el.category}</td>
							<td className={"px-6 py-4"}>
								{el.videoId ? (
									<AiFillYoutube
										fontSize={"28"}
										className='cursor-pointer hover:text-red-600'
										onClick={() =>
											setYoutubePlayer({
												isOpen: true,
												videoId: el.videoId as string,
											})
										}
									/>
								) : (
									<p className='text-gray-400'>Coming Soon</p>
								)}
							</td>
						</tr>
					);
				})}
			</tbody>
			{youtubePlayer.isOpen && (
				<tfoot
					className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'
					onClick={closeModal}>
					<tr className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute'></tr>
					<tr className='w-full z-50 h-full px-6 relative max-w-4xl'>
						<td className='w-full h-full flex items-center justify-center relative'>
							<div className='w-full relative'>
								<IoClose
									fontSize={"35"}
									className='cursor-pointer absolute -top-16 right-0'
									onClick={closeModal}
								/>
								<YouTube
									videoId={youtubePlayer.videoId}
									loading='lazy'
									iframeClassName='w-full min-h-[500px]'
								/>
							</div>
						</td>
					</tr>
				</tfoot>
			)}
		</>
	);
};
export default ProblemsTable;


