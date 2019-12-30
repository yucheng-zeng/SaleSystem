﻿//客户对象操作

var defaultSetting = 
{
    id : "",
    name : "",
    gender : "",
    phone : "",
    email : "",
    type : "",
    note : "",
    label : "",
    authority : "",
    remain : "",  //余额
    debt : "",   //欠款
    point : "",  //积分
    pricetopoint : "",
    pointtoprice : ""
}

function sendClientJsonAjax(url, param) {
    var tempdata;
    $.ajax({
        url: url,
        data: param,
        type: "post",
        dataType: "JSON",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if (data != null) {
                console.log("ClientJson : ", data);
                tempdata = data;
            }
        },
        error: function () {
        }
    });
    return tempdata;
 }

//通过id查找客户
function queryClientById(tid) {
    if (tid == "") {
        return;
    }
    client = {
        id : tid
    }
    //param = buildClientParam(client);
    param = 
    	'{'
        + '"id":"' + tid + '",'
        + '"name":"",'
        + '"gender":"",'
        + '"phone":"",'
        + '"email":"",'
        + '"type":"",'
        + '"label":"",'
        + '"note":""}';
    url = "/client/queryById";
    console.log("QueryClientById : ", param);
    $.ajaxSettings.async = false;
    return sendClientJsonAjax(url, param);
}

//通过条件筛选客户
function queryClient(client) {
    if (client == null) {
        return null;
    }

    param = buildClientParam(client);
    console.log("QueryClient : ", param);
    url = "/client/query";
    $.ajaxSettings.async = false;
    return sendClientJsonAjax(url, param);
}

//增加客户
function insertClient(client) {
    if (client == null) {
        return null;
    }

    param = buildClientParam(client);
    url = "/client/insert";
    console.log("InsertClient : ", param);
    $.ajaxSettings.async = false;
    return sendClientJsonAjax(url, param);
}

//删除客户
function deleteClient(client) {
    if (client.id == "") {
        return null;
    }
    param = buildClientParam(client);
    url = "/client/delete";
    console.log("DeleteClient : ", param);
    $.ajaxSettings.async = false;
    return sendClientJsonAjax(url, param);
}

//更新客户
function updateClient(client) {
    if (client == null) {
        return null;
    }
    param = buildClientParam(client);
    url = "/client/update";
    console.log("UpdataClient : ", param);
    $.ajaxSettings.async = false;
    return sendClientJsonAjax(url, param);
}

function insertMember(client) {
    param = buildClientParam(client);
    url="";
    console.log("InsertMember : ", param);
    $.ajaxSettings.async = false;
    return sendClientJsonAjax(url, param);
}

function updateMember(client) {
    param = buildClientParam(client);
    url="";
    console.log("UpdateMember : ", param);
    $.ajaxSettings.async = false;
    return sendClientJsonAjax(url, param);
}

function queryMember(client) {
    param = buildClientParam(client);
    url="";
    console.log("QueryMember : ", param);
    $.ajaxSettings.async = false;
    return sendClientJsonAjax(url, param);
}

function deleteMember(client) {
    param = buildClientParam(client);
    url="";
    console.log("DeleteMember : ", param);
    $.ajaxSettings.async = false;
    return sendClientJsonAjax(url, param);
}

function updateMemberRatio(ratio) {
    param = 
        '{"id":"' + ratio.id + '",'
        + '"pointtoprice":"' + ratio.pointtoprice + '",'
        + '"pricetopoint":"' + ratio.pricetopoint + '"}';
    url="";
    console.log("UpdateMemberRatio : ", param);
    $.ajaxSettings.async = false;
    return sendClientJsonAjax(url, param);
}

function queryRationMenu() {
    url = "";
	param = "";
    console.log("QueryMenu Ratio : ", param);
    $.ajaxSettings.async = false;
    var map = new Map();
    var obj = sendClientJsonAjax(url, param);
    var keys = Object.keys(obj);
    for(var i in keys) {
    	map.set(keys[i].toString(), obj[keys[i]]);
    }
    return map;
}

function buildRMenuOptionHTML() {
    var html;
    var map = queryRationMenu();
    map.forEach(function(value, key) {
        html += '<option value="' + key + '">' + value + '</option>';
    })
    return html;
}

function buildClientParam(client) {
    combineClient = $.extend({},defaultSetting, client);
    param = 
       '{'
        + '"id":"' + combineClient.id + '",'
        + '"name":"' + combineClient.name + '",'
        + '"gender":"' + combineClient.gender + '",'
        + '"phone":"' + combineClient.phone + '",'
        + '"email":"' + combineClient.email + '",'
        + '"type":"' + combineClient.type + '",'
        + '"label":"' + combineClient.label + '",'
        + '"note":"' + combineClient.note + '",'
        + '"authority":"' + combineClient.authority + '",'
        + '"remain":"' + combineClient.remain + '",'
        + '"debt":"' + combineClient.debt + '",'
        + '"point":"' + combineClient.point + '",'
        + '"pricetopoint":"' + combineClient.pricetopoint + '",'
        + '"pointtoprice":"' + combineClient.pointtoprice + '"}'
    return param;
}
