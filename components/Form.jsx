'use client';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React from 'react'

//import {Tooltip} from "@nextui-org/react";

const Form = ({type, post, setPost, submitting, handleSubmit, startDate, setStartDate, allPosts}) => {
	const useTextareaAutoHeight = (e) => {
		e.target.style.height = 'inherit';
		e.target.style.height = `${e.target.scrollHeight}px`;
	};

	const getDisabledDates = (date) => {
		var dateIsAvailable = true;

		const day = date.getDay();
		const dayInMonth = date.getDate();
		const month = date.getMonth();
		const year = date.getYear();

		for (let i = 0; i < allPosts.length; i++) {
			var postDate = new Date(Date.parse(allPosts[i].host_date));

			var postDay = postDate.getDay();
			var postDayInMonth = postDate.getDate();
			var postMonth = postDate.getMonth();
			var postYear = postDate.getYear();

			if(postDay == day && postDayInMonth == dayInMonth && postMonth == month && postYear == year) {
				console.log([postDay, postMonth, postYear]);
				dateIsAvailable = false;
			}
		};
		
		return day == 5 && dateIsAvailable;
	}
	
	return (
		<section className='mt-10 w-full max-w-full flext-start flex-col'>
			<h2 className='head_text text-center bizo-form-h2'>MISSION BOARD - {type} Briefing</h2>
			<hr className='mt-5 mb-5 bizo-line'/>
			<h4 className="text-center bizo-form-h4">{type} mission briefings.</h4>

			<form onSubmit={handleSubmit} className="mt-10 flex-col gap-7 bizo-form-bg">
				<label>
					<span className="ml-5 bizo-form-h3">Title:</span>
					<textarea value={post.title} onChange={(e) => setPost ({...post, title: e.target.value})} placeholder="Desert Storm, Thunder, Sword, etc..." required className='bizo-form-sm'></textarea>
				</label>

				<label>
					<span className="ml-5 bizo-form-h3">Date:</span>
					<div>
						<DatePicker selected={startDate} filterDate={(date) => getDisabledDates(date)} minDate={new Date()} onChange={(date) => setStartDate(date)} className="bizo-form-date"/> 		
					</div>
				</label>

				<label>
					<span className="ml-5 bizo-form-h3">Briefing:</span>
					<textarea value={post.briefing} onChange={(e) => setPost ({...post, briefing: e.target.value})} onKeyDown={useTextareaAutoHeight} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id mi sit amet lacus malesuada tempor ut ac odio. Vestibulum ornare lobortis dolor. Maecenas lobortis nunc massa, sit amet pharetra felis efficitur quis. Fusce ut quam eget odio orci..." required className='bizo-form-lg'></textarea>
				</label>

				<label>
					<span className="ml-5 bizo-form-h3">Image (Optional):</span>
					<textarea value={post.briefing_image} onChange={(e) => setPost ({...post, briefing_image: e.target.value})} placeholder="https://i.imgur.com/ACEBH5o.jpg" className='bizo-form-sm'></textarea>
					{
						post.briefing_image ? (
							<div><img src={post.briefing_image} alt="briefing-image" className="bizo-form-img"/></div>
						) : (
							<div></div>
						)
					}
				</label>

				<label>
					<span className="ml-5 bizo-form-h3">Status:</span>
					<textarea value={post.status} onChange={(e) => setPost ({...post, status: e.target.value})} placeholder="Unknown, Completed, Failed, etc..." required className='bizo-form-sm'></textarea>
				</label>

				<button type='submit' disabled={submitting} className="bizo-form-submit">
					{submitting ? `${type}ing...` : type}
				</button>
			</form>
		</section>
	)
}

export default Form
