import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function Footer() {
	return(
		<footer class='fixed-bottom'> 
	
			<div class=''>
				<div class="d-flex justify-content-center py-1">
					<a class="footer_link" href='#'>Main</a>
					<a class="footer_link" href='#'>YES or NO?</a>
					<a class="footer_link" href='#'>About</a>
					<a class="footer_link" href='#'>Statistics</a>
				</div>
			</div>

			<center>
			
				<p class='copyright pt-5'>© 2024, YES or NO </p>

			</center>
		</footer>
	)
}

export default Footer;