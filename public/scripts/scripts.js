var sum = 1;
function redirec(){
	location.href = "sign_up.html";
}

function Verify(form){
	if (form.password.value != form.Vpassword.value) {
		alert("The Password isn't Identical");
		window.stop();
		return false;
	}
}

function create(){

	var Lname = prompt("Name of the List: ");

    var div = document.createElement('div');

    div.className = 'col-sm-2';
    div.id = 'aux';
    div.innerHTML =
        '<form method="post">\
        <input type="text" name="Lname" value="'+Lname+'" /> <br>\
        <button class="btn btn-success" onclick="add()"><p>+</p></button>\
        <button class="btn btn-danger" onclick="remove()"><p>-</p></button>\
        <button class="btn btn-primary" onclick="Save()"><p>Save</p></button>';


    document.getElementById('Lists').appendChild(div);

    var disabledb = document.getElementById('create');
    disabledb.disabled=true;
}

function add(){
	var newtask = document.createElement('input');

	newtask.type = 'text';
	newtask.name = 'Task'+sum;
	newtask.id = 'Task'+sum;
	newtask.placeholder = 'Task'+sum;
	sum++;
	document.getElementById('aux').appendChild(newtask);

}

function remove(newtask){
	
	if(sum==0){
	alert("There are no more Task to Delete in this List");
	sum++;
	}else{

	if (sum >= 1) {
	sum--;
	var deletetask = document.getElementById("Task"+String(sum));
	if(deletetask==null){
		alert("There are no more Task to Delete in this List");

	}else{
	deletetask.parentNode.removeChild (deletetask);
	}
	}
	}
}

function Save(){

	var disabledb = document.getElementById('create');
    disabledb.disabled=false;
}