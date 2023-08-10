import React from 'react';
import { fireStore } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

type adminFormForAddingProblemsProps = {
    
};

const AdminFormForAddingProblems:React.FC<adminFormForAddingProblemsProps> = () => {
    const [inputs, setInputs] = useState({
			id: "",
			title: "",
			difficulty: "",
			category: "",
			videoId: "",
			link: "",
			order: 0,
			likes: 0,
			dislikes: 0,
		});

		const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			setInputs({ ...inputs, [event.target.name]: event.target.value });
		};

		const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			const newProblem = {
				...inputs,
				order: Number(inputs.order),
			};

			await setDoc(doc(fireStore, "problems", inputs.id), newProblem);
			alert("save to DB");
		};
    return (			
				<form
					className='p-6 flex flex-col max-w-sm gap-3'
					onSubmit={handleSubmit}>
					<input
						onChange={handleInputChange}
						type='text'
						placeholder='problem id'
						name='id'
					/>
					<input
						onChange={handleInputChange}
						type='text'
						placeholder='title'
						name='title'
					/>
					<input
						onChange={handleInputChange}
						type='text'
						placeholder='difficulty'
						name='difficulty'
					/>
					<input
						onChange={handleInputChange}
						type='text'
						placeholder='category'
						name='category'
					/>
					<input
						onChange={handleInputChange}
						type='text'
						placeholder='order'
						name='order'
					/>
					<input
						onChange={handleInputChange}
						type='text'
						placeholder='videoId?'
						name='videoId'
					/>
					<input
						onChange={handleInputChange}
						type='text'
						placeholder='link?'
						name='link'
					/>
					<button className='bg-white'>Save to FireStore</button>
				</form>)
}
export default AdminFormForAddingProblems;