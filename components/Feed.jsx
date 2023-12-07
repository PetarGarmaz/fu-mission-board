"use client";

import {useState, useEffect} from "react";
import BriefingCard from "./BriefingCard";

const BriefingCardList = ({data}) => {
	return (
		<div className="mt-10 prompt_layout">{
			data.map((post) => (
				<BriefingCard key={post._id} post={post}/>
			))
		}</div>
	);
};

const Feed = () => {
	const [posts, setPosts] = useState([]);
	const [previousPosts, setPreviousPosts] = useState([]);
	const [showPrevious, setShowPrevious] = useState(false);
	const [showCurrent, setShowCurrent] = useState(true);

	const [searchText, setSearchText] = useState("");
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchedResults, setSearchedResults] = useState([]);

	const filterPrompts = (searchtext) => {
		const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
		return posts.filter(
			(item) =>
			regex.test(item.host.username) ||
			regex.test(item.title) ||
			regex.test(item.briefing)
		);
	};

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		// debounce method
		setSearchTimeout(
		setTimeout(() => {
			const searchResult = filterPrompts(e.target.value);
			setSearchedResults(searchResult);
		}, 500)
		);
	}

	const fetchPosts = async () => {
		const res = await fetch("/api/prompt",{next: { revalidate: 10, cache: "no-store" },});
		const data = await res.json();
		const currentDate = Date.parse(new Date());

		var sortedData = data;
		var previousSortedDate = [];
		var plannedSortedDate = [];

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

		for (let i = 0; i < sortedData.length; i++) {
			let parsedDate = Date.parse(sortedData[i].host_date);

			if(parsedDate < currentDate) {
				previousSortedDate.push(sortedData[i]);
			} else {
				plannedSortedDate.push(sortedData[i]);
			}
		}

		setPreviousPosts(previousSortedDate);
		setPosts(plannedSortedDate);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<section className="mt-10 w-full">
			<h2 className='head_text text-center bizo-form-h2'>MISSION BOARD - Feed</h2>
			<hr className='mt-5 mb-5 bizo-line'/>
			<h4 className="text-center bizo-form-h4">View and search past and future mission briefings.</h4>

			<form className="mt-20 mb-20 relative w-full flex-center">
				<input type="text" placeholder="Search for missions" value={searchText} onChange={handleSearchChange} required className="search_input"/>
			</form>

			{
				searchText ? (
					<BriefingCardList data={searchedResults}/>
				) : (
					<div>
						{
							showPrevious ? (
								<div>
									<div className="flex"> 
										<h3 className='head_text m-auto pb-5 bizo-form-h3'>Completed Missions:</h3>
										<button type='submit' className="mr-0 mt-auto mb-auto bizo-show-submit" onClick={() => setShowPrevious(false)}>▲</button>
									</div>
									<hr className='mb-10 bizo-line'/>

									<BriefingCardList data={previousPosts}/>
								</div>
							) : (
								<div>
									<div className="flex"> 
										<h3 className='head_text m-auto pb-5 bizo-form-h3'>Completed Missions:</h3>
										<button type='submit' className="mr-0 mt-auto mb-auto bizo-show-submit" onClick={() => setShowPrevious(true)}>▼</button>
									</div>
									<hr className='mb-10 bizo-line'/>
								</div>
							)
						}

						{
							showCurrent ? (
								<div>
									<div className="flex mt-10"> 
										<h3 className='head_text m-auto pb-5 bizo-form-h3'>Upcoming Missions:</h3>
										<button type='submit' className="mr-0 mt-auto mb-auto bizo-show-submit" onClick={() => setShowCurrent(false)}>▲</button>
									</div>
									<hr className='mb-10 bizo-line'/>

									<BriefingCardList data={posts}/>
								</div>
							) : (
								<div>
									<div className="flex mt-10"> 
										<h3 className='head_text m-auto pb-5 bizo-form-h3'>Upcoming Missions:</h3>
										<button type='submit' className="mr-0 mt-auto mb-auto bizo-show-submit" onClick={() => setShowCurrent(true)}>▼</button>
									</div>
									<hr className='mb-10 bizo-line'/>
								</div>
							)
						}
					</div>
				)
			}
		</section>
	)
}

export default Feed