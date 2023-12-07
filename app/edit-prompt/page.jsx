"use client";

import "react-datepicker/dist/react-datepicker.css";

import {useState, useEffect} from 'react'
import {useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
	const searchParams = useSearchParams();
	const briefingId = searchParams.get("id");
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

	const editPrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (!briefingId) return alert("Missing briefing id!");

		try {
			const response = await fetch(`/api/prompt/${briefingId}`, {
				method: "PATCH",
				body: JSON.stringify({
					userId: session?.user.id,
					title: post.title, 
					host_date: startDate, 
					briefing: post.briefing, 
					briefing_image: post.briefing_image,
					status: post.status
				})
			});

			if (response.ok) {
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	useEffect(() => {
		const getBriefingDetails = async () => {
			const res = await fetch(`/api/prompt/${briefingId}`);
			const data = await res.json();

			setStartDate(Date.parse(data.host_date));

			setPost({
				title: data.title, 
				briefing: data.briefing, 
				briefing_image: data.briefing_image,
				status: data.status
			})
		}

		if (briefingId) {
			getBriefingDetails()
		};
	}, [briefingId]);

	return (
		<Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={editPrompt} startDate={startDate} setStartDate={setStartDate} allPosts={allPosts}/>
	)
}

export default EditPrompt