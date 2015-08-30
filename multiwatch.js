function activate(id) {
	$('video[id^=vid]').prop('muted', true);
	$("#vid"+id).prop('muted', false);
	$('div[id^=parent]').addClass("hidden");
	$("#parent"+id).removeClass("hidden");
}

function startAll() {
	$('video[id^=vid]').each(function () {
		$(this).get(0).play();
	})
}

function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}

$( document ).ready(function () {
	var $_GET = getQueryParams(document.location.search);
	console.log($_GET["vids"]); 
	var videos = $_GET["vids"].split("|"); 
	/*videos = [
	'W7WRJRme8wg',
	'P-Iho8dE5jE',
	'di5wiSXoFew',
	'FnfCSwLk0XY',
	'zvwjGiPVoeQ',
	'lJ5CWrAkseo'
	W7WRJRme8wg|P-Iho8dE5jE|di5wiSXoFew|FnfCSwLk0XY|zvwjGiPVoeQ|lJ5CWrAkseo
	];*/
	var players = new Array();
	$.each(videos, function (index, value) {
		YoutubeVideo(value, function(video){
			var vsrc =  video.getSource("video/mp4", "hd720");
			console.log(vsrc);
			$('#main').append("<div class='hidden embed-responsive embed-responsive-16by9' id='parent"+index+"'><video src='"+ vsrc.url +"' id='vid"+index+"'></video></div>");	
		});
		
	});
	setTimeout(function(){
		$("#precache").remove();
		$("#parent0").removeClass("hidden");
		activate(1);
		var index = 0;
		
		$( window ).keydown(function() {
			index++;
			index = index % videos.length;
			activate(index);
		});
		startAll();
	}, 5000);
});
