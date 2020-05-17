// Capitalze for Controller
module.exports.capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
// Lead Zero Hours
module.exports.leadZeroHours = function(dt) { 
	var date 	= new Date(dt)
	return (date.getHours() < 10 ? '0' : '') + date.getHours();
}
// Lead Zero Minute
module.exports.leadZeroMinute = function (dt) { 
	return (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
}
// Lead Zero Second
module.exports.leadZeroSecond = function (dt) { 
	return (dt.getSeconds() < 10 ? '0' : '') + dt.getSeconds();
}

// Lead Zero Month
module.exports.leadZeroMonth = function (dt) { 
	return (dt.getMonth() < 10 ? '0' : '') + dt.getMonth();
}

// Lead Zero Month
module.exports.leadZeroDate = function (dt) { 
	return (dt.getDate() < 10 ? '0' : '') + dt.getDate();
}

// ensure Terminal exist
module.exports.closeTerminal = function (terminal){
	terminal.dispose()
}

module.exports.getOs = function () {
	var userAgent = window.navigator.userAgent,
		platform = window.navigator.platform,
		macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
		windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
		iosPlatforms = ['iPhone', 'iPad', 'iPod'],
		os = null;

	if (macosPlatforms.indexOf(platform) !== -1) {
		os = 'Mac OS';
	} else if (iosPlatforms.indexOf(platform) !== -1) {
		os = 'iOS';
	} else if (windowsPlatforms.indexOf(platform) !== -1) {
		os = 'Windows';
	} else if (/Android/.test(userAgent)) {
		os = 'Android';
	} else if (!os && /Linux/.test(platform)) {
		os = 'Linux';
	}

	return os;
}