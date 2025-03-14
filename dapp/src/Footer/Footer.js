import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function Footer() {
	return(
		<footer className='fixed-bottom'> 
	
			<div className=''>
				<div className="d-flex justify-content-center py-1">
					<a className="footer_link" href='#'>Main</a>
					<a className="footer_link" href='#'>YES or NO?</a>
					<a className="footer_link" href='#'>About</a>
					<a className="footer_link" href='http://127.0.0.1:8000/howwas/'>Statistics</a>
				</div>
			</div>


			<div className='d-flex justify-content-center'>
				<a href="https://x.com/yes_no_quest"><img class='social_icon' src='/icons/x-50.png'/></a>
				<a href="https://t.me/yes_no_quest"><img class='social_icon' src=' /icons/tg-50.png'/></a>
			</div>

			<center>
				<p className='copyright pt-4'>© 2024, YES or NO </p>
			</center>
		</footer>
	)
}

export default Footer;