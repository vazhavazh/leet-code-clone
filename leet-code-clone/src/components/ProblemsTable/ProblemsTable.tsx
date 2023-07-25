import React from "react";

type ProblemsTableProps = {};

const ProblemsTable: React.FC<ProblemsTableProps> = () => {
	return (
		<tbody className='text-white'>
			{problems.map((el, idx) => {
				return (
					<tr
						className={`${idx % 2 === 1 ? "bg-dark-layer-1" : ""}`}
						key={el.id}>
						<th
							className='px-2 py-4 font-medium whitespace-nowrap
                            text-dark-green-s
                            '>
							<BsCheckCircle />
						</th>
					</tr>
				);
			})}
		</tbody>
	);
};
export default ProblemsTable;
