import { useState, useRef, useEffect } from "react";

const ProfileDropdown = ({ items, label }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative" ref={dropdownRef}>
			<button onClick={() => setIsOpen(!isOpen)} className="hover:text-blue-600 cursor-pointer flex items-center gap-1">
				{label}
			</button>

			{isOpen && (
				<ul className="absolute right-0 mt-2 w-40 gap-[1px] flex flex-col  shadow-lg rounded-md bg-gray-300  z-10">
					{items.map((x, i) => (
						<button key={i} className="px-4 py-2 hover:bg-gray-100 bg-white cursor-pointer" onClick={x.onClick}>
							{x.label}
						</button>
					))}
				</ul>
			)}
		</div>
	);
};

export default ProfileDropdown;
