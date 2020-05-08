const shell 	= require('./functions')
var terminal 	= {}
module.exports.start = function (vscode) {
	let NEXT_TERM_ID = 1;
    terminal 	= vscode.window.createTerminal(`Spark Serve ${NEXT_TERM_ID}`);
	terminal.sendText("xdg-open http://localhost:8080; php spark serve");
	vscode.window.showInformationMessage('Successfuly Run Spark Server On http://localhost:8080')
}

module.exports.stop = function (vscode) {
	shell.closeTerminal(terminal)
	vscode.window.showInformationMessage('Successfuly Stop Spark Server')
}