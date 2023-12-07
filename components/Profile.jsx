import BriefingCard from "./BriefingCard";

const Profile = ({ name, data, handleEdit, handleDelete }) => {
	return (
		<div className="mt-10 prompt_layout">
			<h2 className='head_text text-center bizo-form-h2'>MISSION BOARD - {name}'s Profile</h2>
			<hr className='bizo-line'/>
			<h4 className="text-center bizo-form-h4">View and search all of {name}'s posted briefings. </h4>

			{
				data.map((post) => (<BriefingCard key={post._id} post={post} handleEdit={handleEdit} handleDelete={handleDelete}/>))
			}
		</div>
	);
};

export default Profile;