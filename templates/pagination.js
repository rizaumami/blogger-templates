function pagination(a) {
    var e = "";
    leftnum = parseInt(numshowpage / 2), leftnum == numshowpage - leftnum && (numshowpage = 2 * leftnum + 1), start = postnumber - leftnum, start < 1 && (start = 1), maximum = parseInt(a / postperpage) + 1, maximum - 1 == a / postperpage && (maximum -= 1), end = start + numshowpage - 1, end > maximum && (end = maximum);
    var s = parseInt(postnumber) - 1;
    postnumber > 1 && (e += 2 == postnumber ? "page" == type ? '<li><a href="' + home_page + '">' + prevpage + "</a></li>" : '<li><a href="/search/label/' + lblname1 + "?&max-results=" + postperpage + '">' + prevpage + "</a></li>" : "page" == type ? '<li><a href="#" onclick="redirectpage(' + s + ');return false">' + prevpage + "</a></li>" : '<li><a href="#" onclick="redirectlabel(' + s + ');return false">' + prevpage + "</a></li>"), start > 1 && (e += "page" == type ? '<li><a href="' + home_page + '">1</a></li>' : '<li><a href="/search/label/' + lblname1 + "?&max-results=" + postperpage + '">1</a></li>'), start > 2 && (e += "");
    for (var r = start; r <= end; r++) e += postnumber == r ? '<li class="active"><a href="">' + r + "</a></li>" : 1 == r ? "page" == type ? '<li><a href="' + home_page + '">1</a></li>' : '<li><a href="/search/label/' + lblname1 + "?&max-results=" + postperpage + '">1</a></li>' : "page" == type ? '<li><a href="#" onclick="redirectpage(' + r + ');return false">' + r + "</a></li>" : '<li><a href="#" onclick="redirectlabel(' + r + ');return false">' + r + "</a></li>";
    end < maximum - 1 && (e += ""), end < maximum && (e += "page" == type ? '<li><a href="#" onclick="redirectpage(' + maximum + ');return false">' + maximum + "</a></li>" : '<li><a href="#" onclick="redirectlabel(' + maximum + ');return false">' + maximum + "</a></li>");
    var n = parseInt(postnumber) + 1;
    postnumber < maximum && (e += "page" == type ? '<li><a href="#" onclick="redirectpage(' + n + ');return false">' + nextpage + "</a></li>" : '<li><a href="#" onclick="redirectlabel(' + n + ');return false">' + nextpage + "</a></li>");
    for (var t = document.getElementsByName("pageArea"), l = document.getElementById("blog-pager"), p = 0; p < t.length; p++) t[p].innerHTML = e;
    t && t.length > 0 && (e = ""), l && (l.innerHTML = e)
}

function paginationall(a) {
    var e = a.feed,
        s = parseInt(e.openSearch$totalResults.$t, 10);
    pagination(s)
}

function bloggerpage() {
    var a = urlactivepage; - 1 != a.indexOf("/search/label/") && (lblname1 = -1 != a.indexOf("?updated-max") ? a.substring(a.indexOf("/search/label/") + 14, a.indexOf("?updated-max")) : a.substring(a.indexOf("/search/label/") + 14, a.indexOf("?&max"))), -1 == a.indexOf("?q=") && -1 == a.indexOf(".html") && (-1 == a.indexOf("/search/label/") ? (type = "page", postnumber = -1 != urlactivepage.indexOf("#PageNo=") ? urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length) : 1, document.write('<script src="' + home_page + 'feeds/posts/summary?max-results=1&alt=json-in-script&callback=paginationall"></script>')) : (type = "label", -1 == a.indexOf("&max-results=") && (postperpage = 20), postnumber = -1 != urlactivepage.indexOf("#PageNo=") ? urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length) : 1, document.write('<script src="' + home_page + "feeds/posts/summary/-/" + lblname1 + '?alt=json-in-script&callback=paginationall&max-results=1" ></script>')))
}

function redirectpage(a) {
    jsonstart = (a - 1) * postperpage, nopage = a;
    var e = document.getElementsByTagName("head")[0],
        s = document.createElement("script");
    s.type = "text/javascript", s.setAttribute("src", home_page + "feeds/posts/summary?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost"), e.appendChild(s)
}

function redirectlabel(a) {
    jsonstart = (a - 1) * postperpage, nopage = a;
    var e = document.getElementsByTagName("head")[0],
        s = document.createElement("script");
    s.type = "text/javascript", s.setAttribute("src", home_page + "feeds/posts/summary/-/" + lblname1 + "?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost"), e.appendChild(s)
}

function finddatepost(a) {
    post = a.feed.entry[0];
    var e = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29),
        s = encodeURIComponent(e);
    if ("page" == type) var r = "/search?updated-max=" + s + "&max-results=" + postperpage + "#PageNo=" + nopage;
    else var r = "/search/label/" + lblname1 + "?updated-max=" + s + "&max-results=" + postperpage + "#PageNo=" + nopage;
    location.href = r
}
var nopage, type, postnumber, lblname1;
bloggerpage();
