import React from "react";
import { problems } from "@/mockProblems/problems";
import { BsCheckCircle } from "react-icons/bs";
import Link from "next/link";
import { AiFillYoutube } from "react-icons/ai";

type ProblemsTableProps = {};

const ProblemsTable: React.FC<ProblemsTableProps> = () => {
	return (
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
							<Link
								className='hover:text-blue-600 cursor-pointer'
								href={`/problems/${el.id}`}>
								{el.title}
							</Link>
						</td>
						<td className={`px-6 py-4 ${difficultyColor}`}>{el.difficulty}</td>
						<td className={"px-6 py-4"}>{el.category}</td>
						<td className={"px-6 py-4"}>
							{el.videoId ? (
								<AiFillYoutube
									fontSize={"28"}
									className='cursor-pointer hover:text-red-600'
								/>
							) : (
								<p className='text-gray-400'>Coming Soon</p>
							)}
						</td>
					</tr>
				);
			})}
		</tbody>
	);
};
export default ProblemsTable;
