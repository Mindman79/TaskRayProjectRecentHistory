//Find TaskRay project history 
//testing1


chrome.history.search({
    text: '',
    maxResults: 25, 
    startTime: 5184000000 },
        function(historyItems) {
            if(historyItems.length > 0){
                for(i=0;i<=historyItems.length;i++) {


                    var title1 = historyItems[i].title;
                    var title2 = title1.replace('TaskRay Project: ', '');
                    var title3 = title2.replace(' ~ Salesforce - Unlimited Edition', '');

                    var title4 = title3.slice(0, 70);
                    var url = historyItems[i].url;
                    var favicon = 'chrome://favicon/size/16@2x/' + historyItems[i].url;
                    var visits = historyItems[i].visitCount;
                    var lastVisit = historyItems[i].lastVisitTime;
                    var date1 = new Date(lastVisit); 
                    var date2 = date1.toLocaleString(
                        'en-US', { 
                        month: '2-digit', 
                        day: '2-digit',
                        year: '2-digit', 
                        hour: '2-digit', 
                        minute: 'numeric', 
                        hour12: true }); 
                    // var year = date.getFullYear();
                    // var date1 = date.getDate();
                    // var month = date.getMonth() + 1;
                    var html = `<div class="leftListItem">${date2}</div>
                    <div class="rightListItem"><a href="${url}" target="_blank">${title4}</a></div>`;
                    
                    
                    document.getElementById("htmlList").innerHTML += html;


                }
            }
        }    
)

