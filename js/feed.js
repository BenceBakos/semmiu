(function () {
	
	function createPostElement(title, date, content, id) {
		let post = document.createElement('div');
		post.innerHTML = `
			<h3 class="post-title">${title}</h3>
			<p class="post-content">${content}</p>
			<p class="post-date">${date} <i class="material-icons share-icon post-share">share</i></p>
			
		`;
		post.id = id;
		post.classList.add('post');
		return post;
	}
	//fetch feed list first time
	let postList = [],
	feed = document.getElementById('feed'),
	lastPostIndex = 0;
	fetch('postList.txt').then(function (res) {
		return res.text()
	}).then(function (postListTxt) {
		postList = postListTxt.split('\n').map(item => item.trim()).filter(item => item.length > 1);
		let hash = location.hash;
		if (hash.length) {
			//show load new button
			document.getElementById('new-wrapper').style.display="block";
			
			//find hash in postList
			hash = hash.substring(1, hash.length);
			lastPostIndex = postList.findIndex(item => item == hash);
			
			//load from hash to hashIndex+20
			let actualPostList = postList.slice(lastPostIndex, lastPostIndex + 20);
			lastPostIndex+=20;
			actualPostList = actualPostList.map(item => 'posts/' + item + '.txt');
			//fetch all
			Promise.all(actualPostList.map(u => fetch(u))).then(responses =>
				Promise.all(responses.map(res => res.text()))).then(posts => {
				let hashIndex = lastPostIndex;
				posts.forEach(function (postText) {
					let splitted = postText.split('\n');
					let title = splitted[0];
					let date = splitted[1];
					let content = postText.replace(title, '').replace(date, '').trim();
					feed.appendChild(createPostElement(title, date, content, postList[hashIndex]));
					hashIndex++;
				});
			});

		} else {
			//load from first
			
			lastPostIndex = 20;
			Promise.all(postList.slice(0, 20).map(item => '/posts/' + item + '.txt')
				.map(u => fetch(u))).then(responses =>
				Promise.all(responses.map(res => res.text()))).then(posts => {
				let hashIndex = 0;
				posts.forEach(function (postText) {
					let splitted = postText.split('\n');
					let title = splitted[0];
					let date = splitted[1];
					let content = postText.replace(title, '').replace(date, '').trim();
					feed.appendChild(createPostElement(title, date, content, postList[hashIndex]));
					hashIndex++;
				});
			});
		}
	});
	//load olders
	document.getElementById('older').addEventListener('click', function () {
		Promise.all(postList.slice(lastPostIndex, lastPostIndex+20).map(item => '/posts/' + item + '.txt')
			.map(u => fetch(u))).then(responses =>
			Promise.all(responses.map(res => res.text()))).then(posts => {
			if (lastPostIndex+20>postList.length-1){
				lastPostIndex=postList.length;
			}else{
				lastPostIndex+=20;	
			}
			
			let hashIndex = 0;
			posts.forEach(function (postText) {
				let splitted = postText.split('\n');
				let title = splitted[0];
				let date = splitted[1];
				let content = postText.replace(title, '').replace(date, '').trim();
				feed.appendChild(createPostElement(title, date, content, postList[hashIndex]));
				hashIndex++;
			});
			//hide older button if no more older
			if (lastPostIndex==postList.length)
				document.getElementById('old-wrapper').style.display='none';
		});
	});
	document.getElementById('new').addEventListener('click',function(){
		document.location.href="";
	});
	
}
	());
