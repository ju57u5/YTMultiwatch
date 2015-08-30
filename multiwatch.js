function powerVideos() {
	videos = document.querySelectorAll("video");
	for (var i = 0, l = videos.length; i < l; i++) {
		var video = videos[i];
		var src = video.src || (function () {
			var sources = video.querySelectorAll("source");
			for (var j = 0, sl = sources.length; j < sl; j++) {
				var source = sources[j];
				var type = source.type;
				var isMp4 = type.indexOf("mp4") != -1;
				if (isMp4) return source.src;
			}
			return null;
		})();
		if (src) {
			var isYoutube = src && src.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i);
			if (isYoutube) {
				var id = isYoutube[1].match(/watch\?v=|[\w\W]+/gi);
				id = (id.length > 1) ? id.splice(1) : id;
				id = id.toString();
				var mp4url = "http://www.youtubeinmp4.com/redirect.php?video=";
				video.src = mp4url + id;
			}
		}
	}
}
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

$( document ).ready(function () {
	var videos = [
	'W7WRJRme8wg',
	'P-Iho8dE5jE',
	'di5wiSXoFew',
	'FnfCSwLk0XY',
	'zvwjGiPVoeQ',
	'lJ5CWrAkseo'
	];
	var players = new Array();
	$.each(videos, function (index, value) {
		YoutubeVideo(value, function(video){
			var vsrc =  video.getSource("video/mp4", "medium").url;
			$('#main').append("<div class='hidden embed-responsive embed-responsive-16by9' id='parent"+index+"'><video src='"+ vsrc +"' id='vid"+index+"'></video></div>");	
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
