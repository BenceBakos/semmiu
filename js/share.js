(function () {
	const shareModal = document.getElementById('modal-share');
	const shareLink = document.getElementById('modal-share-link');
	const shareCopy = document.getElementById('modal-share-copy');
	//on click share
	document.body.addEventListener('click', function (e) {
		if (e.target.classList.contains('post-share')) {
			let post = e.target.parentElement.parentElement;
			shareLink.value = location.origin + "#" + post.id;
			console.log(e.target)
		}
	});
	//on click copy
	shareCopy.addEventListener('click' ,function () {
		shareLink.select();
		document.execCommand("copy");
	});
}
	());
