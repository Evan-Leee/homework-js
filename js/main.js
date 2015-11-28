function timeFormat(time) {
    var milliSeconds = parseInt(time);
    var date = new Date(milliSeconds);

    var year = date.getFullYear().toString();
    var month = date.getMonth() + 1 > 10 ?
        (date.getMonth() + 1).toString() :
    '0' + (date.getMonth() + 1);
    var day = date.getDate() > 10 ?
        date.getDate().toString() :
    '0' + date.getDate();

    return year + '-' + month + '-' + day;
}

function listBookmarks(key,bookmarks) {
    $("div.result").remove();
    var reg = new RegExp(key, "gim");

    bookmarks.forEach(function(bookmark){
        var div,divStart,divMiddle,divEnd;
        divStart = "<div class=\"result\"><span class=\"title\">";
        divEnd = "</span><span class=\"created\">Created @ " +
        timeFormat(bookmark.created) +
        "</span>" +
        "<hr>" +
        "</div>";

        if(key !== ''){
            if(bookmark.title.search(reg) > 0)
            divMiddle = bookmark.title.replace(reg,"<em class='high-light'>$&</em>");
        } else {
            divMiddle = bookmark.title;
        }

        if(divMiddle){
            div = divStart + divMiddle + divEnd;
            $(".search-area").after(div);
        }
    });
}

var result;

$(document).ready(function () {
    $.getJSON("seed/bookmarks.json", function (temp) {
        result = temp;
        listBookmarks('',temp);
    });

    $(".search").bind("input propertychange", function () {
        var key = $(this).val();
        listBookmarks(key,result);
    })
});

