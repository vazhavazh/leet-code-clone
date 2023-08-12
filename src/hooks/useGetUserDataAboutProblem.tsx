import { auth, fireStore } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const useGetUserDataAboutProblem = (problemId: string) => {
	const [data, setUserDataAboutProblem] = useState({
		liked: false,
		disliked: false,
		starred: false,
		solved: false,
	});
	const [user] = useAuthState(auth);

	useEffect(() => {
		const getUserData = async () => {
			const userRef = doc(fireStore, "users", user!.uid);
			const userSnap = await getDoc(userRef);
			if (userSnap.exists()) {
				const data = userSnap.data();
				const {
					solvedProblems,
					likedProblems,
					starredProblems,
					dislikedProblems,
				} = data;
				setUserDataAboutProblem({
					liked: likedProblems.includes(problemId),
					disliked: dislikedProblems.includes(problemId),
					starred: starredProblems.includes(problemId),
					solved: solvedProblems.includes(problemId),
				});
			}
		};
		if (user) getUserData();
		return () =>
			setUserDataAboutProblem({
				liked: false,
				disliked: false,
				starred: false,
				solved: false,
			});
	}, [problemId, user]);
	return { ...data, setUserDataAboutProblem };
};
