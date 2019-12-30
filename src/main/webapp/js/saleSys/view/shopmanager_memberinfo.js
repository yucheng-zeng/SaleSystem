var tempClientMap = new Map();

window.onload = function () {
    this.document.getElementById("set-member-rank").innerHTML = this.buildRMenuOptionHTML();
    this.document.getElementById("member-rank").innerHTML = this.buildRMenuOptionHTML();
    this.refreshClientList();
}

function cleanList() {
	var editTable = document.getElementById("member-tbody");
	editTable.innerHTML = "";
}

function cleanModal() {
	 $('#modal-title').innerHTML = "注册会员";
	 $('#client-id').val('');
	    $('#client-name').val('');
	    $('#client-gender').val('');
	    $('#client-phone').val('');
	    $('#client-email').val('');
	    $('#client-point').val('');
}

//刷新页面
function refreshClientList() {
    cleanList();
    cleanModal();
    client = {
        id: $('#search-client-id').val(),
        name: $('#search-client-name').val(),
        phone: $('#search-phone').val(),
        email: $('#search-email').val(),
        type: $('#search-type').val()
    }
    var clientList = this.queryMember(client);
    console.log("refresh clientlist : ", clientList);
    console.log("refresh clientType : ", typeof(clientList));
    for (var i = 0; i < clientList.length; i++) {
        this.tempClientMap.set(clientList[i].id.toString(), clientList[i]);
    }
    loadClientList(clientList);
}

//加载列表
function loadClientList(cl) {
    var editTable = document.getElementById("client-tbody");
    for (var i = 0; i < cl.length; i++) {
        var tr = document.createElement("tr");
        tr.setAttribute("id", cl[i].id);
        var td0 = document.createElement("td");
        td0.innerHTML = cl[i].id;
        var td1 = document.createElement("td");
        td1.innerHTML = cl[i].name;
        var td2 = document.createElement("td");
        td2.innerHTML = cl[i].authority;
        var td3 = document.createElement("td");
        td3.innerHTML = cl[i].point;
        var td4 = document.createElement("td");
        td4.innerHTML = cl[i].phone;
        var td5 = document.createElement("td");
        td5.innerHTML = cl[i].email;
        var td6 = document.createElement("td");
        td6.innerHTML = cl[i].type;
        var td7 = document.createElement("td");
        var editButton = document.createElement("button");
        editButton.type = "button";
        editButton.id = "edit-btn";
        editButton.setAttribute("value", cl[i].id); //将货品id封装在value中
        editButton.className = "btn btn-sm btn-primary";
        editButton.innerHTML = "编辑";
        td7.appendChild(editButton);
        var deleButton = document.createElement("button");
        deleButton.type = "button";
        deleButton.id = "delete-btn";
        deleButton.setAttribute("value", cl[i].id); //将货品id封装在value中
        deleButton.className = "btn btn-sm btn-danger";
        deleButton.innerHTML = "删除";
        td7.appendChild(deleButton);

        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        editTable.appendChild(tr);
    }
}

//搜索
$('#search-btn').click(function () {
    refreshClientList();
});

$('#rule-save-btn').click(function() {
    cleanModal();
    $('#ruleModal').modal('show'); //show modal
});

//添加
$(document).on('click', '#add-btn', function() {
	console.log("client add-btn");
	cleanModal();
    $('#clientModal').modal('show'); //show modal
    $('#modal-title').innerHTML = "注册会员";
    $('#client-id').removeAttr("readonly");
    $('#client-name').removeAttr("readonly");
    $('#client-gender').removeAttr("readonly");
    $('#client-phone').removeAttr("readonly");
    $('#client-email').removeAttr("readonly");
});

//编辑填充信息
$(document).on('click', '#edit-btn', function() {
    $('#clientModal').modal('show'); //show modal
    $('#modal-title').innerHTML = "会员编辑";
    var client = tempClientMap.get($(this).val());
    $('#client-id').val(client.id);
    $('#client-name').val(client.name);
    $('#client-gender').val(client.gender);
    $('#client-phone').val(client.phone);
    $('#client-email').val(client.email);
    $('#client-rank').val(client.authority);
    $('#client-point').val(client.point);
    $('#client-id').attr("readonly","readonly");
    $('#client-name').attr("readonly","readonly");
    $('#client-gender').attr("readonly","readonly");
    $('#client-phone').attr("readonly","readonly");
    $('#client-email').attr("readonly","readonly");
});


//保存模态框内容
$(document).on('click', '#save-btn', function() {
    client = {
        id : $('#client-id').val(),
        authority : $('#member-rank').val(),
        point  : $('#client-point').val()
    }
    if($('#client-id').val() == "") {
        insertMember(client);
    } else {
        updateMember(client);
    }
    refreshClientList();
});

$('#client-id').blur(function() {
    var client = queryClientById(this.val());
    if(client == null) {
        alert("客户不存在");
        return;
    }
    $('#client-id').val(client.id);
    $('#client-name').val(client.name);
    $('#client-gender').val(client.gender);
    $('#client-phone').val(client.phone);
    $('#client-email').val(client.email);
});

//保存兑换比例
$('#rule-save-btn').click(function() {
    var pointtoprice = parseFloat($('#point-price').val()) / 100;
    var pricetopoint = parseFloat($('#price-point').val()) / 100;
    var ratio = {
        id : $('#set-member-rank').val(),
        pointtoprice : pointtoprice,
        pricetopoint : pricetopoint
    }
    updateMemberRatio(ratio);
});

//删除
$(document).on('click', '#delete-btn' , function() {
    var r = confirm("是否删除？");
    if (r == true) {
        //实现
        alert(deleteMember({id : $(this).val()}).info);
        alert("删除成功");
        refreshClientList();
    }
});



//清除模态框内容
$('body').on('hidden.bs.modal', '.modal', function () {
    document.getElementById('member-form').reset();
});