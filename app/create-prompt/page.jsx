"use client";

import "react-datepicker/dist/react-datepicker.css";

import {useState, useEffect} from 'react'
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {

	const router = useRouter();
	const {data: session} = useSession();
	const [allPosts, setAllPosts] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState ({
		title: "",
		host_date: "",
		briefing: "",
		briefing_image: "",
		status: ""
	});
	const [startDate, setStartDate] = useState(new Date());

	const fetchPosts = async () => {
		const res = await fetch("/api/prompt");
		const data = await res.json();

		setAllPosts(data);

		return data;
	};

	const createPrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const res = await fetch("api/prompt/new", {
				method: "POST", 
				body: JSON.stringify({
					userId: session?.user.id,
					title: post.title, 
					host_date: startDate, 
					briefing: post.briefing, 
					briefing_image: post.briefing_image,
					status: post.status
				})
			})

			if(res.ok) {
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	}

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<Form type="Create" post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt} startDate={startDate} setStartDate={setStartDate} allPosts={allPosts}/>
	)
}

export default CreatePrompt