(function () {
	const submitInput = document.getElementById('search-submit');
	const keywordsInput = document.getElementById('search-keywords');
	const searchResults = document.getElementById('modal-search-results');
	const searchModal = document.getElementById('modal-search');
	const searchX = document.getElementById('modal-search-x');
	function keywordsInString(kws, str) {
		str = str.toLowerCase();
		for (let i in kws) {
			if (kws[i] && str.includes(kws[i]))
				return true;
		}
		return false;
	}
	function resultElement(post) {
		let postText = post.text;
		let splitted = postText.split('\n');
		let title = splitted[0];
		let date = splitted[1];
		let content = postText.replace(title, '').replace(date, '').trim().substring(0, 100);
		let resEl = document.createElement('div');
		resEl.innerHTML = `
			<h2><a class="result-link" href="${location.origin}#${post.hash}">${title}</a></h2>
			<h3>${date}</h3>
			<p>${content}...</p>
		`;
		return resEl;
	}
	//hide results
	searchX.addEventListener('click', function () {
		searchModal.style.display = 'none';
	});
	function submitSearch() {
		//clear search
		searchResults.innerHTML = "Keresés folyamatban...";
		searchModal.style.display = "block";
		let keywords = keywordsInput.value.toLowerCase().split(' ');
		keywordsInput.placeholder="Keresett kifejezés: "+keywordsInput.value;
		keywordsInput.value="";
		//filter out ignorable words
		let ignore = ['az', 'és'];
		keywords = keywords.filter(kw => !ignore.includes(kw)).map(item => item.trim());

		let resultPosts = [];
		//get postlist
		fetch(location.pathname+'postList.txt').then(function (res) {
			return res.text()
		}).then(function (postListTxt) {
			//search in every post content
			let postList = postListTxt.split('\n').map(item => item.trim()) //split by line-breaks
				.filter(item => item.length > 1) //filter empty lines
				.map(item => location.pathname+'posts/' + item + '.txt'); //append ful path to filenames

			//for each all post content
			Promise.all(postList.map(u => fetch(u))).then(responses =>
				Promise.all(responses.map(async function (res) {
						let text = await res.text();
						return {
							text: text,
							hash: res.url.substring(res.url.lastIndexOf("/") + 1, res.url.lastIndexOf(".txt"))
						}
					}))).then(posts => {
				posts.forEach(function (post) {
					if (keywordsInString(keywords, post.text))
						resultPosts.push(post);
				});
				
				if (resultPosts.length==0){
					searchResults.innerHTML = "Nincs találat.";
				}else{
					searchResults.innerHTML = "";
					resultPosts.forEach(function (post) {
						searchResults.appendChild(resultElement(post));
					});
				}
				
			});

		});
	}
	//submit on click search
	submitInput.addEventListener('click', submitSearch);
	//submit on enter
	keywordsInput.addEventListener('keyup', function onEvent(e) {
		//search
		if (e.keyCode === 13) {
			submitSearch();
		}else{
			if (keywordsInput.value.length>=1)
				submitInput.style.display="inline-block";
			else
				submitInput.style.display="none";
		}
		
	});
	//click result
	document.body.addEventListener('click',function(e){
		if (e.target.classList.contains('result-link')){
			console.log(e.target.href);
			window.location.replace(e.target.href);
			location.reload();
		}
		
	})
	//remove this few lines
	//keywordsInput.value="lorem ipsum"
	//submitInput.click();
}
	());
