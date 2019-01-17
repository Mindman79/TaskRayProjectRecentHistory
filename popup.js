/* eslint-disable no-mixed-spaces-and-tabs */
// Global vars
var SFInstance;
var urlFromList;
var loopCount = 0;
const errorMsg = '<div class="error">No TaskRay projects found from within the past 60 days. Go browse some TaskRay projects and try again!</div>';
const targets = ['TaskRay'];
const SFSearchUrl = '.salesforce.com/_ui/search/ui/UnifiedSearchResults?searchType=2&sen=001&sen=a0o&sen=00T&sen=a2V&sen=500&sen=00U&sen=005&sen=006&sen=ka&sen=a0n&str='; 
const popupTitle = 'Recent TaskRay Projects';


//Check if running dev. version or live version
if(chrome.runtime.id == 'mdkoadabhbefakdgfcfacompaandpeie') {
	document.getElementById('TRProjHist').innerHTML = popupTitle;

} else {
	document.getElementById('TRProjHist').innerHTML = popupTitle + ' (Dev. Version)';
}

//Loop through results to find TaskRay projects
chrome.history.search({
	text: 'TaskRay Project',
	maxResults: 25,
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

			if (results == false) {
				document.getElementById('htmlList').innerHTML += html;
				loopCount++;
				searchForm();
				getSFInstanceURL();
				captureInput();
					

			}

		}
	

	}
}


);

//Determine user's SF instance		
function getSFInstanceURL() {
	chrome.history.search({
		text: 'TaskRay Project',
		maxResults: 10,
		startTime: 5184000000,
	},
	(historyItems) => {
		if (historyItems.length > 0) {

			for (var i = 0; i <= historyItems.length; i++) {
				var urlFromList = historyItems[i].url;
				var searchTerm = 'salesforce.com';
				var indexOfFirst = urlFromList.search(searchTerm);
				if (indexOfFirst !== -1) {
					SFInstance = urlFromList.substr(8, indexOfFirst - 9);
					return SFInstance;
				}
			}

		}
	}
	);
}

//Display the SF search box
function searchForm() {
	document.getElementById('form').innerHTML = 
	`<form id="my-form">
	  <input type="text" name="in" placeholder="Search salesforce..." />
	  <button type="submit" class="submit">Go</button>
	 </form>`;
	
}

//Function to capture input
function captureInput(){

	document.getElementById('my-form').onsubmit=function() {
	
		var searchTerm = document.getElementById('my-form').elements[0].value;
			
		var finalUrl = 'https://' + SFInstance + SFSearchUrl + searchTerm;
		window.open(finalUrl);
			
		return false;
			
	};
}