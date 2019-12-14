//缓存映射，每加载一个list，将里面order对象转为map存入
//规定，新建订单将以key “temp” 表示
var tempOrderMap = new Map();

window.onload = function () {
    var historyList = queryOrder({ sourceid: getCookie("id") });//TODO 获取门店id
    loadOrderList(historyList);
    for (var i = 0; i < historyList.length; i++) {
        tempWareOrderMap.set(historyList[i].id, object2map(historyList[i]));
    }
}

//刷新订单列表，传入请求的list对象
function loadOrderList(ol) {
    var editTable = document.getElementById("order-tbody");
    for (var i = 0; i < ol.length; i++) {
        //增加表格
        var tr = document.createElement("tr");
        tr.setAttribute("id", ol[i].id);
        var td0 = document.createElement("td");
        td0.innerHTML = ol[i].id;
        var td1 = document.createElement("td");
        td1.innerHTML = ol[i].type;
        var td2 = document.createElement("td");
        td2.innerHTML = ol[i].clientname;
        var td3 = document.createElement("td");
        td3.innerHTML = ol[i].sumprice;
        var td4 = document.createElement("td");
        td4.innerHTML = ol[i].status;
        var td5 = document.createElement("td");
        td5.innerHTML = ol[i].status;
        var td6 = document.createElement("td");
        td6.innerHTML = ol[i].margin;
        var td7 = document.createElement("td");
        td7.innerHTML = ol[i].principalname;
        var td8 = document.createElement("td");
        td8.innerHTML = ol[i].warehoursename;
        var td9 = document.createElement("td");
        td9.innerHTML = ol[i].createtime;
        var td10 = document.createElement("td");
        //草稿
        //添加审核按钮,编辑按钮,删除按钮
        if (ol[i].status == "1") {
            var editButton = document.createElement("button");
            editButton.type = "button";
            editButton.id = "check-btn";
            editButton.setAttribute("value", ol[i].id); //将货品id封装在value中
            editButton.className = "btn btn-sm btn-primary";
            editButton.innerHTML = "审核";
            td10.appendChild(editButton);

            var applyButton = document.createElement("button");
            applyButton.type = "button";
            applyButton.id = "edit-btn";
            applyButton.setAttribute("value", ol[i].id); //将货品id封装在value中
            applyButton.className = "btn btn-sm btn-primary";
            applyButton.innerHTML = "编辑";
            td10.appendChild(applyButton);

            var deleButton = document.createElement("button");
            deleButton.type = "button";
            deleButton.id = "delete-btn";
            deleButton.setAttribute("value", ol[i].id); //将货品id封装在value中
            deleButton.className = "btn btn-sm btn-danger";
            deleButton.innerHTML = "删除";
            td10.appendChild(deleButton);
        }
        //已审核，未付款
        //添加详情按钮，付款按钮，退货按钮
        else if (ol[i].status == "") {
            var editButton = document.createElement("button");
            editButton.type = "button";
            editButton.id = "detail-btn";
            editButton.setAttribute("value", ol[i].id); //将货品id封装在value中
            editButton.className = "btn btn-sm btn-primary";
            editButton.innerHTML = "详情";
            td10.appendChild(editButton);

            var applyButton = document.createElement("button");
            applyButton.type = "button";
            applyButton.id = "pay-btn";
            applyButton.setAttribute("value", ol[i].id); //将货品id封装在value中
            applyButton.className = "btn btn-sm btn-primary";
            applyButton.innerHTML = "付款";
            td10.appendChild(applyButton);

            var deleButton = document.createElement("button");
            deleButton.type = "button";
            deleButton.id = "return-btn";
            deleButton.setAttribute("value", ol[i].id); //将货品id封装在value中
            deleButton.className = "btn btn-sm btn-danger";
            deleButton.innerHTML = "退货";
            td10.appendChild(deleButton);
        }
        //已审核，已付款
        //添加详情按钮，退货按钮
        else if (ol[i].status == "") {
            var editButton = document.createElement("button");
            editButton.type = "button";
            editButton.id = "detail-btn";
            editButton.setAttribute("value", ol[i].id); //将货品id封装在value中
            editButton.className = "btn btn-sm btn-primary";
            editButton.innerHTML = "详情";
            td10.appendChild(editButton);

            var deleButton = document.createElement("button");
            deleButton.type = "button";
            deleButton.id = "return-btn";
            deleButton.setAttribute("value", ol[i].id); //将货品id封装在value中
            deleButton.className = "btn btn-sm btn-danger";
            deleButton.innerHTML = "退货";
            td10.appendChild(deleButton);
        }
        //已退货
        //添加详情按钮
        else if (ol[i].status == "") {
            var editButton = document.createElement("button");
            editButton.type = "button";
            editButton.id = "detail-btn";
            editButton.setAttribute("value", ol[i].id); //将货品id封装在value中
            editButton.className = "btn btn-sm btn-primary";
            editButton.innerHTML = "详情";
            td10.appendChild(editButton);
        }
        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);
        tr.appendChild(td9);
        tr.appendChild(td10);
        editTable.appendChild(tr);
    }
}

//刷新模态框，传入list对象,这里对象是转化后的map
function loadMadal(ol, type) {
    var common = ol[0];
    $('#order-id').val(common.get("viceid"));
    $('#client-id').val(common.get("clientid"));
    $('#client-name').val(common.get("clientname"));
    $('#order-type').val(common.get("type"));
    $('#order-position').val(common.get("warehoursename"));
    $('#principal-name').val(common.get("principalname"));

    var editTable = document.getElementById("temp-cargo-tbody");
    for (cargo in ol) {
        var tr = document.createElement("tr");
        tr.setAttribute("id", "temp-tr");
        tr.setAttribute("cid", ol[i].get("itemid"));
        var td0 = document.createElement("td");
        td0.innerHTML = ol[i].get("itemname");
        var td1 = document.createElement("td");
        td1.innerHTML = ol[i].get("itemid");
        var td2 = document.createElement("td");
        td2.innerHTML = ol[i].get("itemnum");
        var td3 = document.createElement("td");
        td3.innerHTML = ol[i].get("perprice");
        var td4 = document.createElement("td");
        td4.innerHTML = ol[i].get("sumprice");
        var td5 = document.createElement("td");
        var deleButton = document.createElement("button");
        deleButton.type = "button";
        deleButton.id = "temp-delete-btn";
        deleButton.setAttribute("value", ol[i].get("itemid")); //将货品id封装在value中
        deleButton.className = "btn btn-sm btn-danger";
        deleButton.innerHTML = "删除";
        td5.appendChild(deleButton);
        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        editTable.appendChild(tr);
    }

    //是否显示退货备注
    if(common.get("status") == "6") {
        $('.return-note')[0].style.display = "";
        $('#order-note').val(common.get("note"));
    } else {
        $('.return-note')[0].style.display = "none";
    }
}

//条件搜索
$('#search-btn').click(function () {
    var order = {
        id: $('#search-order-id').val(),
        clientid: $('#search-client-id').val(),
        type: $('#search-cargo-type').val(),
        paystatus: $('#search-pay').val(),
        checkstatus: $('#search-status').val(),
    }
    var queryList = queryOrder(order);
    for (var i = 0; i < queryList.length; i++) {
        tempWareOrderMap.set(queryList[i].id, object2map(queryList[i]));
    }
    loadOrderList(queryList);
});

//弹出添加订单
$('#add-order-btn').click(function () {
    $('#orderModifyModal').modal('show');
    $('#principal-name').val(getCookie("name"));
    $('#order-postion').val(getCookie("warehourseid")); //获得仓库
});


//审核订单
$('#check_btn').click(function () {
    var r = confirm("是否审核通过？");
    if (r == true) {
        var id = $(this).val();
        checkOrder(id);
        alert("审核通过");
    }
});

//订单付款
//Map<orderid : List<Map<key:value>>>
$('#ac-pay-btn').click(function () {
    var gather = $('#pay-actual-charge').val();
    var change = $('#pay-change').val();
    order = {
        viceid: $('#pay-order-id').val(),
        change: change,
        gather: gather
    }
    payOrder(order);
});

//实时更新找回价格
$('#pay-actual-charge').blur(function () {
    var actual = parseFloat($('#pay-actual-charge').val());
    var total = parseFloat($('#pay-total-price').val());
    if (actual < total) {
        $('#pay-change').val("实付不足");
        return;
    }
    $('#pay-change').val(actual - total);
});

//订单删除
$('#delete_btn').click(function () {
    var r = confirm("是否删除？");
    if (r == true) {
        var orderid = $(this).val();
        deleteOrder(orderid);
        alert("删除成功");
    }
});

//货品删除
$('#temp-delete-btn').click(function () {
    var cl;
    if ($('#order-id').val() == "") {
        cl = tempOrderMap.get("temp");
    } else {
        cl = tempOrderMap.get($('#order-id').val());
    }
    var itemid = $(this).val();
    for (var i = 0; i < cl.length; i++) {
        if (cl[i].get("itemid") == itemid) {
            cl.splice(i, 1);
        }
    }
    loadMadal(cl, 0); ///设置type
});


//订单退货
$('#ack-return-btn').click(function () {
    var id = $('#pay-order-id').val();
    var note = $('#return-note').val();
    var reply = returnOrder(id, getCookie("id"), "", note);
});

//弹出订单详情
$('#detail-btn').click(function () {
    console.log('aaa');
    $('#orderModifyModal').modal('show');
    var orderid = $(this).val();
    loadMadal(tempOrderMap.get(orderid), 1);
});

//弹出编辑订单
$('#edit-btn').click(function () {
    $('#orderModifyModal').modal('show');
    var orderid = $(this).val();
    loadMadal(tempOrderMap.get(orderid), 1);
});

//弹出订单付款
$('#pay-btn').click(function () {
    $('#orderPayModal').modal('show');
    var orderid = $(this).val();
    var order = tempOrderMap.get(orderid);
    $('#pay-order-id').val(orderid);
    $('#pay-client-name').val(order[0].get("clientname"));
    $('#pay-pricinpal-name').val(order[0].get("pricinpalname"));
    $('#pay-total-price').val(order[0].get("sumprice"));
    var editTable = document.getElementById("temp-cargo-tbody");
    for (cargo in order) {
        var tr = document.createElement("tr");
        tr.setAttribute("id", ol[i].get("id"));
        var td0 = document.createElement("td");
        td0.innerHTML = ol[i].get("itemname");
        var td1 = document.createElement("td");
        td1.innerHTML = ol[i].get("itemid");
        var td2 = document.createElement("td");
        td2.innerHTML = ol[i].get("itemnum");
        var td3 = document.createElement("td");
        td3.innerHTML = ol[i].get("perprice");
        var td4 = document.createElement("td");
        td4.innerHTML = ol[i].get("sumprice");
        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        editTable.appendChild(tr);
    }
});

//弹出订单退货
$('#return-btn').click(function () {
    var orderid = $(this).val();
    $('#saleReturnModal').modal('show');
    $('#return-order-id').val(tempOrderMap.get(orderid)[0].get("viceid"));
    $('#return-client-name').val(tempOrderMap.get(orderid)[0].get("clientname"));
    $('#return-pricipal-name').val(tempOrderMap.get(orderid)[0].get("principalname"));
    //判断是否付款
    if (tempOrderMap.get(orderid)[0].get("status") == '3') {
        $('#payed-state').val("0");
    } else if (tempOrderMap.get(orderid)[0].get("status") == '4') {
        $('#payed-state').val("1");
    }
    $('#return-total-price').val(tempOrderMap.get(orderid)[0].get("totalprice"));
});

$('#cargo-num').blur(function() {
    var perprice = parseFloat($('#cargo-wholesale-price').val());
    var itemnum = parseInt($('#cargo-num').val());
    $('#cargo-total-price').val(perprice * itemnum);
});

//保存订单货品修改
$('#temp-add-btn').click(function() {
    var orderid = $('#order-id').val();
    var cargoid = $('#cargo-id').val();
    var ol;
    //新增订单
    if(orderid == "") {
        ol = tempOrderMap.get("temp");
        //新增订单，添加list
        if(ol == null) {
            l = [];
            tempOrderMap.set("temp", l);
            ol = l;
        }
    //编辑订单
    } else {
        ol = tempOrderMap.get(orderid);
    }
    //查找是否存在货品，存在修改，不存在添加
    var torder;
    for(itemorder in ol) {
        if(itemorder.get("itemid") == cargoid) {
            torder = itemorder;
            break;
        }
    }
    //插入记录
    if(torder == null) {
        var cid = $('#cargo-id').val();
        var cargo = queryCargoById(cid);
        var m = new Map();
        m.set("warehourseid", getCookie("warehourseid"));
        m.set("warehoursename", getCookie("warehoursename"));
        m.set("itemid", cargo.id);
        m.set("itemname", cargo.name);
        m.set("itemnum", $('#cargo-num').val());
        m.set("perprice", cargo.purchaseprice);
        m.set("sumprice", $('#cargo-total-price').val());
        ol.push(m);
    }
    //修改记录，只能修改数量
    else {
        torder.set("itemnum", $('#cargo-num').val());
        torder.set("sumprice", $('#cargo-total-price').val());
        ol.push(torder);
    }
});

//保存订单
$('#save-btn').click(function() {
    var order;
    if ($('#order-id').val() == "") {
        var client = queryClientById($('#client-id').val());
        order = tempOrderMap.get("temp");
        var totalprice = 0;
        for(suborder in order) {
            totalprice += parseFloat(suborder.get("sumprice"));
        }
        for(suborder in order) {
            suborder.set("warehourseid", getCookie("warehourseid"));
            suborder.set("warehoursename", getCookie("warehoursename"));
            suborder.set("clientid", client.id);
            suborder.set("clientname", client.name),
            suborder.set("principalid", getCookie("id"));
            suborder.set("principalname", getCookie("name"));
            suborder.set("status", 1);
            suborder.set("totalprice", totalprice);
            suborder.set("type", 2);
        }
    } else {
        order = tempOrderMap.get($('#order-id').val());
        //修改总价 totalprice
        var totalprice = 0;
        for(suborder in order) {
            totalprice += parseFloat(suborder.get("sumprice"));
        }
        for(suborder in order) {
            suborder.set("total-price", totalprice);
        }
    }
    l = [];
    for(var i = 0; i < order.length; i++){
        suborder = {
            viceid : order[i].get("viceid"),
            warehourseid : order[i].get("warehourseid"),
            earehoursename : order[i].get("warehoursename"),
            clientid : order[i].get("clientid"),
            clientname : order[i].get("clientname"),
            principalid : order[i].get("principalid"),
            principalname : order[i].get("principalname"),
            createtime : order[i].get("createtime"),
            status : order[i].get("status"),
            totalprice : order[i].get("totalprice"),
            type : order[i].get("type", order.type),
            margin : order[i].get("margin"),
            note : order[i].get("note"),
            exception : order[i].get("exception"),
            itemid : order[i].get("itemid"),
            itemname : order[i].get("itemname"),
            itemnum : order[i].get("itemnum"),
            perprice : order[i].get("perprice"),
            sumprice : order[i].get("sumprice")
        }
        l.push(suborder);
    }
    if ($('#order-id').val() == "") {
        insertOrder(l);
    } else {
        updateOrder(l);
    }
});

//获取模态框内点选单元格的值,更新货品信息栏
$(document).on('click', '#temp-tr', function () {
    var td = event.srcElement; // 通过event.srcElement 获取激活事件的对象 td
    console.log("行号：" + (td.parentElement.rowIndex) + "，列号：" + td.cellIndex);
    //填充订单参数
    var itemid = $(this).attr("cid");
    var order;
    if($('#order-id').val() == "") {
        order = tempOrderMap.get("temp");
    } else {
        order = tempOrderMap.get($('#order-id').val());
    }
    for(so in order) {
        if(so.get("itemid") == itemid) {
            showCargo(so);
            break;
        }
    }
});

function showCargo(suborder) {
    $('#cargo-name').val(suborder.get("itemname"));
    $('#cargo-id').val(suborder.get("itemid"));
    $('#cargo-num').val(suborder.get("itemnum"));
    $('#cargo-purchase-price').val(suborder.get("perprice"));
    $('#cargo-total-price').val(suborder.get("sumprice"));
}

//数据转换，将接收数据转换为list<map>，每一个map是一个子列表
//将单个对象转换
/**
 * 
 * @param {Object} order 接收到的sendorder对象
 */
function object2map(order) {
    var l = [];
    for (var i = 0; i < order.items.length; i++) {
        var m = new Map();
        m.set("viceid", order.id);
        m.set("warehourseid", order.warehourseid);
        m.set("warehoursename", order.warehoursename);
        m.set("clientid", order.clientid);
        m.set("clientname", order.clientname);
        m.set("principalid", order.principalid);
        m.set("principalname", order.principalname);
        m.set("createtime", order.createtime);
        m.set("status", order.status.toString());
        m.set("totalprice", order.sumprice.toString());
        m.set("type", order.type);
        m.set("margin", order.margin.toString());
        m.set("note", order.note);
        m.set("exception",order.exception);
        m.set("itemid", order.items[i].itemid);
        m.set("itemname", order.items[i].itemname);
        m.set("itemnum", order,items[i].itemnum);
        m.set("perprice", order,items[i].perprice);
        m.set("sumprice", order,items[i].sumprice);
        l.push(m);
    }
    return l;
}