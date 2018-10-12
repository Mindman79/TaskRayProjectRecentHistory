// Find TaskRay project history
// testing 1

chrome.history.search({
	text: '',
	maxResults: 25,
	startTime: 5184000000,
},
(historyItems) => {
	if (historyItems.length > 0) {
		for (i = 0; i <= historyItems.length; i++) {
			const title1 = historyItems[i].title;
			const title2 = title1.replace('', '');
			const title3 = title2.replace(' ~ Salesforce - Unlimited Edition', '');

			const title4 = title3.slice(0, 70);
			const url = historyItems[i].url;
			const favicon = `chrome://favicon/size/16@2x/${historyItems[i].url}`;
			const visits = historyItems[i].visitCount;
			const lastVisit = historyItems[i].lastVisitTime;
			const date1 = new Date(lastVisit);
			const date2 = date1.toLocaleString(
				'en-US', {
					month: '2-digit',
					day: '2-digit',
					year: '2-digit',
					hour: '2-digit',
					minute: 'numeric',
					hour12: true,
				},
			);
			// var year = date.getFullYear();
			// var date1 = date.getDate();
			// var month = date.getMonth() + 1;
			const html = `<div class="leftListItem">${date2}</div>
                      <div class="rightListItem"><a href="${url}" target="_blank">${title4}</a></div>`;


			document.getElementById('htmlList').innerHTML += html;
		}
	}
},);

