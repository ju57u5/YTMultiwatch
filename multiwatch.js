var videos = [
'W7WRJRme8wg',
'P-Iho8dE5jE',
'di5wiSXoFew',
'FnfCSwLk0XY',
'zvwjGiPVoeQ',
'lJ5CWrAkseo'];
var $_GET = getQueryParams(document.location.search); 

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

function pauseAll() {
	$('video[id^=vid]').each(function () {
		$(this).get(0).pause();
	})
}

function setTime(time) {
	$('video[id^=vid]').off("seeked");
	$('video[id^=vid]').one("seeked", function () {
		$(this).on("seeked", function () {
			setTime($(this).prop('currentTime'));
		});
	});
	pauseAll();
	$('video[id^=vid]').prop('currentTime',time);
	$(document).one("vidsReady", function () {
		startAll();
	});
}

function videosReady() {
	$('video[id^=vid]').each(function () {
		if ($(this).prop("readyState")<3) {
			return false;
		}
		$.event.trigger({
			type: "vidsReady"
		});
		return true;
	});
}

function addSeekListener() {
	$('video[id^=vid]').on("seeked", function () {
		setTime($(this).prop('currentTime'));
	});
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

function startUp() {
	$('video[id^=vid]').on("pause", pauseAll);
	$('video[id^=vid]').on("play", startAll);
	$('video[id^=vid]').on("canplay", videosReady);
	addSeekListener();

	$("#precache").remove();
	activate(0);
	var index = 0;

	$( window ).keydown(function() {
		index++;
		index = index % videos.length;
		activate(index);
	});
}

$( document ).ready(function () {
	if ($_GET["vids"]) {
		videos = $_GET["vids"].split("|"); 
	}

	var players = new Array();
	$.each(videos, function (index, value) {
		YoutubeVideo(value, function(video){
			var vsrc =  video.getSource("video/mp4", "medium");
			$('#main').append("<div class='hidden embed-responsive embed-responsive-16by9' id='parent"+index+"'><video controls preload'auto' src='"+ vsrc.url +"' id='vid"+index+"'></video></div>");	
		});
	});
	setTimeout(function () {
		startUp();
	}, 5000);
	
});
