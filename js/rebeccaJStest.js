
function nohover(x, y) {
	x.style.opacity = 1;
	document.getElementById(y).style.visibility = 'hidden';
}

function yeshover(x, y) {
	x.style.opacity = 0.5;
	document.getElementById(y).style.visibility = 'visible';
}
