import React, { useEffect, useState } from 'react'

export default function Header() {
	const [parallaxTop, setParallaxTop] = useState(0);

	useEffect(() => {
		window.addEventListener('scroll', () => setParallaxTop(window.scrollY));
	}, []);

	return (
		
		<header className="app-header">
			{/* <div className="billboard" style={{
				backgroundImage: `url("./pexels-fwstudio-33348-129731.jpg")`,
				transform: `translate3d(0px, -${parallaxTop / 5}px, 0px)`
			}}></div> */}

			<h1 className="app-title" style={{
				left: "50%",
				transform: `translate3d(-50%, ${parallaxTop / 2.5}px, 0px)`
			}}>Corporate<span>Cringe</span> <div className="app-subtitle">Sentence Generator</div></h1>
		</header>

	)
}
