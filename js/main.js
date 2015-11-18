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

$(document).ready(function () {
    $(".search").bind("input propertychange", function () {
        var key = $(this).val();
        $.getJSON("seed/bookmarks.json", {key: key}, function (result) {
            $("div.result").remove();

            if(key !== ''){
                $("div.start").css("display","none");
                var reg = new RegExp(key, "gim");
                result.forEach(function (item) {
                    if (item.title.search(reg) > 0) {
                        var div = "<div class=\"result\">" +
                            "<span class=\"title\">" +
                            item.title.replace(reg,"<em class='high-light'>$&</em>") +
                            "</span>" +
                            "<span class=\"created\">Created @ " +
                            timeFormat(item.created) +
                            "</span>" +
                            "<hr>" +
                            "</div>";
                        $(".search-area").after(div);
                    }
                });
            }else {
                $("div.start").css("display","block");
            }

        })
    })
});

