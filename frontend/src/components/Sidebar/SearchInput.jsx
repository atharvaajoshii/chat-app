import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations()
	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle search submission
		if (!search) return;
		if (search.length < 3) {
			toast.error("Search query must be at least 3 characters long")
			return;
		}
		const conversation = conversations.find((c) => c.username.toLowerCase().includes(search.toLowerCase()));
		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else {
			toast.error("No conversation found")
		}

	};
	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			<input type='text' placeholder='Search...' className='input input-bordered-full' value={search}onChange={(e) => setSearch(e.target.value)}/>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;