/*
nf number field
tf text field
ta text area
pb push button
rb radio button
cb check box

*/

// all init stuff, linking button events properly here,
// not in the html file with onclick.
onload = function() {
	function ftab(tabName) {
		return function() {tab(tabName);};
	}
	linkEvent("tabInsertDelete", ftab("InsertDelete"));
	linkEvent("tabWhitespace", ftab("Whitespace"));
	linkEvent("pbApply", applyClicked);
	linkEvent("pbPreview", previewClicked);
}

function linkEvent(elementName, onclickFunction) {
	getElement(elementName).onclick = onclickFunction;
}

function getActionFunction(id) {
	if (id == "InsertDeleteInsert") return insertAction;
	if (id == "InsertDeleteDelete") return deleteAction;
	if (id == "WhitespaceTrim") return trimAction;
	alert(id);
	return trimAction;
}

function getTransformedText() {
	var actionId = getActiveActionId();
	var actionFunction = getActionFunction(actionId);
	return actionFunction();
}

function applyClicked() {
	setViewText(getTransformedText());
}
function previewClicked() {
	setPreviewText(getTransformedText());
}

function insertAction() {
	var what = getElement("tfInsertDeleteInsertWhat").value;
	var at = parseInt(getElement("nfInsertDeleteInsertAt").value);
	return transformLines(function (line) {
		var index = wrapIndexForLine(at, line);
		return line.slice(0,index) + what + line.slice(index,line.length);
	});
}


function deleteAction() {
	var from = getInt("nfInsertDeleteDeleteFrom");
	var to = getInt("nfInsertDeleteDeleteTo");
	return transformLines(function (line) {
		var indexa = wrapIndexForLine(from, line);
		var indexb = wrapIndexForLine(to, line);
		if (indexb > indexa) {
			return line.slice(0,indexa) + line.slice(indexb,line.length);
		}
		return line;
	});
}

function trimFront(str) {
	return str.replace(/^\s\s*/, '');
}
function trimBack(str) {
	return str.replace(/\s\s*$/, '');
}
function trimMiddle(str) {
	return str.replace(/\s\s\s*/, ' ');
}


function trimAction() {
	var front = getChecked("cbWhitespaceFront");
	var middle = getChecked("cbWhitespaceMiddle");
	var back = getChecked("cbWhitespaceBack");
	return transformLines(function (line) {
		if (front) line = trimFront(line);
		if (back) line = trimBack(line);
		if (middle) line = trimMiddle(line);
		return line;
	});
}

