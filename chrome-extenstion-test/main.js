/*
**
*/
var domain = "";
var domains = "";
var index = 0;
chrome.windows.getCurrent(function(w){
	chrome.tabs.getSelected(w.id,function(response){
		var url = response.url;
		//这个地方应该再进行一次正则过滤，得到domain
		domain = getDomainFromUrl(url);
		//先加载已经存入的domain节点
		domains = get_domains();
		//save_domain(domain);
		document.getElementById('link').innerText = domain;
	});
});

document.getElementById('save_button').onclick = function(){
	save_domain(domain);
	//讲展示domain的HTML节点关掉，将button按钮关掉
	words = document.getElementById('link');
	button = document.getElementById('save_button');

	button.parentNode.removeChild(button);
	words.parentNode.removeChild(words);

	document.getElementById('domain_list').style.display = "";
	table = document.getElementById('domain_list');  
    table.setAttribute("cellpadding",'1');  
    table.setAttribute("cellspacing",'0');  
	for (var i = 0; i <= get_index(); i++) {
		row = table.insertRow();
		col = row.insertCell(); 
	    col.innerHTML = localStorage.getItem("'"+"domain"+i+"'"); 
	}
}
/*
** get domains from storage
*/
function get_domains(){
	res = localStorage.getItem('index');
	index = parseInt(res,10);
	if( index > 0){
		for (var i = 1; i <= index; i++) {
			domains = domains+localStorage.getItem("'"+"domain"+i+"'");
		}
	}else{
		index = 0;
		return null;
	}
	return domains;
}
/*
** save the domain use chrome api 考虑去重，考虑无法载入domain的情况
*/

function save_domain(domain){
	//计数器加1 domain存入
	if(domain_isExisted(domain)){
		return ;
	}
	index = get_index()+1;
	localStorage.setItem('index', index);
	localStorage.setItem("'"+"domain"+index+"'", domain);
}
/*
** remove the domain by key
*/
function remove_domain(index){
	if(null == index || index == "" || index ==0){
		return ;
	}
		localStorage.removeItem("'"+"domain"+index+"'");
}
/*
**get index
*/
function get_index(){
	res = localStorage.getItem('index');
	if(null == res || res == ""){
		res = 0;
	}
	index = parseInt(res,10);
	return index;
}
/*
** domain check is existed
*/
function domain_isExisted(domain){
	index = get_index();
	for (var i = 1; i <= index; i++) {
		res = localStorage.getItem("'"+"domain"+i+"'");
		if(domain == res){
			return true;
		}	
	}
	return false;
}
/*
** get domain form url 
*/
function getDomainFromUrl(url){
    var host = "null";
    if(typeof url == "undefined" || null == url)
		return host; 
    var regex = /.*\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if(typeof match != "undefined" && null != match)
        host = match[1];
    return host;
}


      