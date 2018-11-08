/* eslint-disable no-mixed-spaces-and-tabs */
// Global vars
var loopCount = 0;
var urlFromList;


const errorMsg = '<div class="error">No TaskRay projects found from within the past 60 days. Go browse some TaskRay projects and try again!</div>';
const targets = ['TaskRay'];
const sfUrl = 'https://na53.salesforce.com/_ui/search/ui/UnifiedSearchResults?searchType=2&sen=001&sen=a0o&sen=00T&sen=a2V&sen=500&sen=00U&sen=005&sen=006&sen=ka&sen=a0n&str='; 
const popupTitle = 'Recent TaskRay Projects';

//Check if running dev. version or live version
if(chrome.runtime.id == 'mdkoadabhbefakdgfcfacompaandpeie') {
	document.getElementById('TRProjHist').innerHTML = popupTitle;

} else {
	document.getElementById('TRProjHist').innerHTML = popupTitle + ' (Dev. Version)';
}

//Find any Taskray projects in the user's history
chrome.history.search({
	text: 'TaskRay Project:',
	maxResults: 34,
	startTime: 5184000000,
},
(historyItems) => {
	if (historyItems.length > 0) {
		
		for (var i = 0; i <= historyItems.length; i++) {	
			var title1 = historyItems[i].title;
			var title2 = title1.replace('TaskRay Project:', '');
			var title3 = title2.replace(' ~ Salesforce - Unlimited Edition', '');
			var title4 = title3.slice(0, 70);
			var results = targets.some(el => title4.includes(el)); 
			urlFromList = historyItems[i].url;

			var searchTerm = 'salesforce.com';
			var indexOfFirst = urlFromList.search(searchTerm);
			if(indexOfFirst !== -1) {
				 
				var SFInstance = urlFromList.substr(8, indexOfFirst - 9);
				console.log(SFInstance);
			
			}

			// var favicon = `chrome://favicon/size/16@2x/${historyItems[i].url}`;
			// var visits = historyItems[i].visitCount;
			var lastVisit = historyItems[i].lastVisitTime;
			var date1 = new Date(lastVisit);
			var date2 = date1.toLocaleString(
				'en-US', {
					month: '2-digit',
					day: '2-digit',
					year: '2-digit',
					hour: '2-digit',
					minute: 'numeric',
					hour12: true,
				},
			);
			var html = `<div class="leftListItem">${date2}</div>
					  <div class="rightListItem"><a href="${urlFromList}" target="_blank">${title4}</a></div>`;
			
			if(results == false) {
				document.getElementById('htmlList').innerHTML += html;
				loopCount++; 
				
			}


			else if(loopCount == 0) {
				document.getElementById('htmlList').innerHTML = errorMsg;

			
			}

		

		} 

	
	}
},);


window.onload=function() {
	document.getElementById('my-form').onsubmit=function() {

		var searchTerm = document.getElementById('my-form').elements[0].value;
		
		window.open(sfUrl + searchTerm);
		return false;
	};
};


