import { authModalState } from "@/atoms/authModalAtom";
import AuthModal from "@/components/Modals/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
import { auth } from "@/firebase/firebase";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

type indexProps = {};

const AuthPage: React.FC<indexProps> = () => {
	const authModal = useRecoilValue(authModalState);
	const [user, loading, error] = useAuthState(auth);
	const router = useRouter();
	const [pageLoading, setPageLoading] = useState(true);

	useEffect(() => {
		if (user) router.push("/");
		if (!loading && !user) setPageLoading(false);
	}, [user, router, loading]);

	if (pageLoading) return null;

	return (
		<div className='relative h-screen bg-gradient-to-b from-gray-600 to-black'>
			<div className='mx-auto max-w-7xl'>
				<Navbar />
				<div
					className='flex items-center justify-center 
				h-[calc(100vh-5rem)] pointer-events-none select-none'>
					<Image
						src='/hero.png'
						alt='Hero-img'
						width={700}
						height={800}
					/>
				</div>
				{authModal.isOpen && <AuthModal />}
			</div>
		</div>
	);
};
export default AuthPage;
