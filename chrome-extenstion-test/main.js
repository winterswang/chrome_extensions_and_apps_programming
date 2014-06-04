/*
**
*/
var domains = "";
chrome.windows.getCurrent(function(w){
	chrome.tabs.getSelected(w.id,function(response){
		url = response.url;
		//这个地方应该再进行一次正则过滤，得到domain
		var domain = getDomainFromUrl(url);
	    //domains = get_domains();
		//将domain存储到禁止网站列表文件中
		save_domain(domain);
		//写一个check函数，检查当前url是否在禁止domain列表内
		//如果在，则提醒，并且倒计时关闭 
		document.getElementById('link').innerText = get_domains();
	});
});
/*
** get domains from storage
*/
function get_domains(){
	var res; 
	return localStorage.getItem('domain');
	// chrome.storage.local.get("domain", function(result){
	// 	if (result) {
	// 		domains =  result.domain;
	// 		document.getElementById('link').innerText = domains			
	// 	};
	// });
}
/*
** save the domain use chrome api
*/

function save_domain(domain){
	//var result = get_domains();
	if (domains != "") {
		domains = domains +"|"+domain ;
	}else{
		domains = domain;
	}
	localStorage.setItem('domain', domains);
	//chrome.storage.local.set({"domain":domains});
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



      