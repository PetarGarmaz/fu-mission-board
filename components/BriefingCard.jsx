"use client";

import Image from "next/image";
import Link from 'next/link';
import { useState } from "react";
import { useSession} from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const BriefingCard = ({post, handleEdit, handleDelete}) => {
	const { data: session } = useSession();
	const pathName = usePathname();
	const router = useRouter();
	const [fullPost, setFullPost] = useState(false);
	const [postDropdown, setPostDropdown] = useState(false);

	const handleProfileClick = () => {
		if (post.host._id === session?.user.id) {
			return router.push("/profile");
		}

		router.push(`/profile/${post.host._id}?name=${post.host.username}`);
	};

	const getDateString = () => {
		const parsedDate = new Date(Date.parse(post.host_date));
		const newDate = parsedDate.toLocaleDateString('en-uk', { weekday:"long", month:"long", year:"numeric", day:"numeric"});

		return newDate;
	};

	return (
		<div className='gap-7'>
			<div className='bizo-feed-item-nav'>
				<Image src={post.host.image} className="rounded-full bizo-feed-item-profile-pic" alt="post-host-image" width={40} height={40} onClick={handleProfileClick}/>
				<h4 className="bizo-form-h4">{post.title}<br/>HOST: {post.host.username}</h4>
				<h4 className="bizo-form-h4-r">{getDateString()}</h4>
			</div>
			
			{
				fullPost ? (
					<div className='bizo-feed-item'>
						<p className="bizo-form-p-full">{post.briefing}</p>
						{
							post.briefing_image ? (
								<div><img src={post.briefing_image} alt="briefing-image" className="bizo-form-img"/></div>
							) : (
								<div></div>
							)
						}

						{
							session?.user.id === post.host._id && pathName === "/profile" ? (
								<div className="flex">
									<div className="bizo-feed-submit-wrapper"></div>
									<button type='submit' className="ml-auto mr-6 mb-1 bizo-feed-delete" onClick={() => handleDelete(post)}>DELETE</button>
									<button type='submit' className="ml-auto mr-3 mb-1 bizo-feed-submit" onClick={() => handleEdit(post)}>EDIT</button>
									<button type='submit' className="ml-auto mr-3 mb-1 bizo-feed-submit" onClick={() => setFullPost(false)}>▲</button>
								</div>
							) : (
								<div className="flex">
									<button type='submit' className="ml-auto mr-3 mb-1 bizo-feed-submit" onClick={() => setFullPost(false)}>▲</button>
								</div>
							)
						}
					</div>
				) : (
					<div className='flex bizo-feed-item'>
						<p className="bizo-form-p">{post.briefing}</p>
						{
							session?.user.id === post.host._id && pathName === "/profile" ? (
								<div className="flex">
									<div className="bizo-feed-submit-wrapper"></div>
									<button type='submit' className="ml-auto mr-6 mb-1 bizo-feed-delete" onClick={() => handleDelete(post)}>DELETE</button>
									<button type='submit' className="ml-auto mr-3 mb-1 bizo-feed-submit" onClick={() => handleEdit(post)}>EDIT</button>
									<button type='submit' className="ml-auto mr-3 mb-1 bizo-feed-submit" onClick={() => setFullPost(true)}>▼</button>
								</div>
							) : (
								<div className="flex">
									<button type='submit' className="ml-auto mr-3 mb-1 bizo-feed-submit" onClick={() => setFullPost(true)}>▼</button>
								</div>
							)
						}
					</div>
				)
			}

			<div className='bizo-feed-item-bottom'>
				<h4 className="bizo-form-h4">STATUS: {post.status}</h4>
			</div>		
		</div>
	);
};

export default BriefingCard;
