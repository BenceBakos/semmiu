(function () {
	/*****************FEED********************/
	const feed = document.getElementById('feed');
	function postElement(title, date, content, hash) {}
	function lastPost() {
		return feed.children[[...feed.children].length - 1];
	}
	function firstPost() {
		return feed.children[0];
	}
	//on Load
	fetch('postList.txt').then(function (res) {
		//error handling
		if (res.status !== 200) {
			console.log('ERROR:' + res.status);
			return;
		}
		console.log(res.body());
	})

	//on click new

	//on click olders

}
	());
