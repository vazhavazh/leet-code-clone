import { useEffect, useState } from "react";
import { orderBy, query, collection, getDocs } from "firebase/firestore";
import { fireStore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/types/problem";

export const useGetProblems = (
	setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const [problems, setProblems] = useState<DBProblem[]>([]);

	useEffect(() => {
		const getProblems = async () => {
			//fetching data logic
			setLoadingProblems(true);
			const q = query(
				collection(fireStore, "problems"),
				orderBy("order", "asc")
			);

			const queRySnapshot = await getDocs(q);
			const temp: DBProblem[] = [];
			queRySnapshot.forEach((doc) => {
				temp.push({ id: doc.id, ...doc.data() } as DBProblem);
			});
			setProblems(temp);
			setLoadingProblems(false);
		};

		getProblems();
	}, [setLoadingProblems]);

	return problems;
};
