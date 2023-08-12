import { useEffect, useState } from "react";
import { DBProblem } from "@/utils/types/problem";
import { doc, getDoc } from "firebase/firestore";
import { fireStore } from "@/firebase/firebase";

export const useGetSingleProblem = (problemId: string) => {
	const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
	const [loading, setLoading] = useState(true);
	const [problemDifficultyClass, setProblemDifficultyClass] =
		useState<string>("");
	useEffect(() => {
		const getProblemFromDB = async () => {
			setLoading(true);
			const docRef = doc(fireStore, "problems", problemId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const problem = docSnap.data();
				setCurrentProblem({ id: docSnap.id, ...problem } as DBProblem);
				setProblemDifficultyClass(
					problem.difficulty === "Easy"
						? "bg-olive text-olive"
						: problem.difficulty === "Medium"
						? "bg-dark-yellow text-dark-yellow"
						: "bg-dark-pink text-dark-pink"
				);
			}
			setLoading(false);
		};
		getProblemFromDB();
	}, [problemId]);

	return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
};
