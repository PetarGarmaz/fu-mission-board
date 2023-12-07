"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [myPosts, setMyPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await response.json();

			var sortedData = data;

			for (let i = 0; i < sortedData.length; i++) {
				for (let j = 0; j < sortedData.length; j++) {
					let parsedDateI = Date.parse(sortedData[i].host_date);
					let parsedDateJ = Date.parse(sortedData[j].host_date);

					if(parsedDateI < parsedDateJ) {
						var tempObj = sortedData[i];
						sortedData[i] = sortedData[j];
						sortedData[j] = tempObj;
					};
				};
			};

			setMyPosts(sortedData);
		};

		if (session?.user.id) fetchPosts();
	}, [session?.user.id]);

	const handleEdit = (post) => {
		router.push(`/edit-prompt?id=${post._id}`);
	};

	const handleDelete = async (post) => {
		const hasConfirmed = confirm(
			"Are you sure you want to delete this prompt?"
		);

		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post._id.toString()}`, {method: "DELETE",});

				const filteredPosts = myPosts.filter((item) => item._id != post._id);

				setMyPosts(filteredPosts);
			} catch (error) {
				console.log("New error in handleEdit" + error);
			}
		}
	};

	return (
		<Profile name={session?.user.name} data={myPosts} handleEdit={handleEdit} handleDelete={handleDelete} />
	);
};

export default MyProfile;