(function () {
    'use strict'
    function initUserInfo() {
        $('.left .key.center-align').text(chrome.i18n.getMessage("follow"))
        $('.center .key.center-align').text(chrome.i18n.getMessage("follower"))
        $('.right .key.center-align').text(chrome.i18n.getMessage("dynamic"))

        var data;
        $.get("https://api.bilibili.com/x/space/myinfo",
            function (response, textStatus, xhr) {
                data = response.data;
                $('#level').text("Level " + data.level_exp.current_level);
                $('#exp').text(data.level_exp.current_exp + " / " + data.level_exp.next_exp);
                $('#expbar-fill').attr('style', 'width: ' + data.level_exp.current_exp / data.level_exp.next_exp * 100 + "%;")
                var mid = data.mid;
                $.get("https://api.bilibili.com/x/web-interface/nav/stat", data,
                    function (resp, textStatus, xhr) {
                        $('#follow').text(resp.data.following);
                        $('#follower').text(resp.data.follower);
                        $('#dynamic').text(resp.data.dynamic_count);
                    }
                );
                $('#avatar').attr('src', data.face);
                if (data.official.role == 1 || data.official.role == 2) {
                    $('#user-type').addClass('personal-auth');
                } else if (data.official.role >= 3 && data.official.role <= 6) {
                    $('#user-type').addClass('organization-auth');
                } else if (data.vip.status == 1) {
                    $('#user-type').addClass('vip-auth');
                }
                if (data.vip.status == 1) {
                    $('#username').attr('style', 'color: #fb7299;');
                    $('#vip-sign').attr('style', 'display: inline-block;');
                    $('#vip-sign').text(data.vip.label.text);
                }
                $('#username').text(data.name);
            }
        );
    }

    initUserInfo();
})()