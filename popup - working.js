//Find TaskRay project history 

chrome.history.search({
    text: 'Microsoft Store',
    maxResults: 25 },
        function(historyItems) {
            if(historyItems.length > 0){
                for(i=0;i<=historyItems.length;i++) {


                    var title = historyItems[i].title;
                    var url = historyItems[i].url;
                    var favicon = 'chrome://favicon/size/16@2x/' + historyItems[i].url;
                    var html = `<div class="listItem"><a href="${url}" target="_blank">${title}</a></div>`;
                    
                    document.getElementById("htmlList").innerHTML += html;

                }
            }
        }    
)

