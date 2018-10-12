// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

  // Given an array of URLs, build a DOM list of those URLs in the
  // browser action popup.
  function buildPopupDom(divName, data) {
    var popupDiv = document.getElementById(divName);
    var ul = document.createElement('ul');
    popupDiv.appendChild(ul);
    for (var i = 0, ie = data.length; i < ie; ++i) {
      var a = document.createElement('a');
      a.href = data[i];
      a.appendChild(document.createTextNode(data[i]));
      a.addEventListener('click', onAnchorClick);
      var li = document.createElement('li');
      li.appendChild(a);
      ul.appendChild(li);
    }
  }
  // Search history to find up to ten links that a user has typed in,
  // and show those links in a popup.
  function buildTypedUrlList(divName) {
    var numRequestsOutstanding = 0;
    chrome.history.search({
        'text': '',              // Return every history item....
      },
      function(historyItems) {
        // For each history item, get details on all visits.
        for (var i = 0; i < historyItems.length; ++i) {
          var url = historyItems[i].url;
          var processVisitsWithUrl = function(url) {
            // We need the url of the visited item to process the visit.
            // Use a closure to bind the  url into the callback's args.
            return function(visitItems) {
              
            };
          };
          chrome.history.getVisits({url: url}, processVisitsWithUrl(url));
          numRequestsOutstanding++;
        }
        if (!numRequestsOutstanding) {
          onAllVisitsProcessed();
        }
      });
    
      
    // This function is called when we have the final list of URls to display.
    var onAllVisitsProcessed = function() {
      // Get the top scorring urls.
      urlArray = [];
      for (var url in urlToCount) {
        urlArray.push(url);
      }
      
      buildPopupDom(divName, urlArray);
    };
  }
  document.addEventListener('DOMContentLoaded', function () {
    buildTypedUrlList("typedUrl_div");
  });




//Newest code to try

  function popupSearch(q) {
    if (q !== '' && q !== undefined) {
        chrome.history.search({
            text: q,
            maxResults: 30
        }, function(hi) {
            if (hi.length > 0) {
                $('popup-search-insert')
                    .set('text', '');
                for (i = 0; i <= hi.length; i++) {
                    if (hi[i] !== undefined) {
                        var title = hi[i].title;
                        var url = hi[i].url;
                        var visits = hi[i].visitCount;
                        var furl = 'chrome://favicon/' + hi[i].url;
                        if (title !== '') {
                            formatItem({
                                    type: 'rh',
                                    title: title,
                                    url: url,
                                    favicon: furl,
                                    visits: visits
                                })
                                .inject('popup-search-insert');
                        }
                    }
                }
                if (localStorage['rhs-showbg'] == 'yes') {
                    //isBookmarked('#popup-search-insert ');
                    isPinned('#popup-search-insert ');
                }
            } else {
                $('popup-search-insert')
                    .set('html', '<div class="no-results"><span>' + returnLang('noResults') + '</span></div>');
            }
        });
    }
}
