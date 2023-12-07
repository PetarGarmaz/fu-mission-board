"use client";

import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';
import { useRouter } from "next/navigation";

const Nav = () => {
	const router = useRouter();
	const {data: session} = useSession();
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false)

	useEffect(() => {
		const setupProviders = async () => {
			const res = await getProviders();
			setProviders(res);
		};
		
		setupProviders();
	}, []);

	return (
		<nav className='flex-between bizo-navbar'>
			<Link href='/' className='flex gap-2 flex-center'>
				<Image src="/assets/images/fu_logo.png" alt="Logo" width={100} height={100} className="object-contain bizo-navbar-image"/>
				<p className='bizo-navbar-text'>FU - MISSION BOARD</p>
			</Link>

			<div className='flex relative'>
				{session?.user ? (
					<div className='flex bizo-profile-image'>
						<Image src={session?.user.image} className="rounded-full bizo-profile-image" alt="asdf" width={50} height={50} onClick={() => setToggleDropdown((prev) => !prev)}/>
						{toggleDropdown && (
							<div className='dropdown bizo-form-bg'>
								<Link href="/profile" className='dropdown_link bizo-dropdown-text' onClick={() => setToggleDropdown(false)}>My Briefings</Link>
								<Link href="/create-prompt" className='dropdown_link bizo-dropdown-text' onClick={() => setToggleDropdown(false)}>Create Briefing</Link>
								<button type='button' onClick={() => {router.push("/"); setToggleDropdown(false); signOut();}} className="bizo-navbar-signin">Sign Out</button>
							</div>
						)}
					</div>
				): (
					<>
						{providers && Object.values(providers).map(
							(provider) => (
								<button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="mr-5 ml-auto bizo-navbar-signin">Sign In</button>
							)
						)}
					</>
				)}
			</div>
		</nav>
	)
}

export default Nav