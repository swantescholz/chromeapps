
function getView() {
	return getElement("taView");
}
function getPreview() {
	return getElement("taPreview");
}

function getText() {
	return getView().value
}
function setViewText(newtext) {
	getView().value = newtext;
}
function setPreviewText(newtext) {
	getPreview().value = newtext;
}

var newline = "\n";
function transformLines(transformFunction) {
	var lines = getText().split(newline);
	for (var i = 0; i < lines.length; i++) {
		lines[i] = transformFunction(lines[i]);
	}
	return lines.join(newline);
}

function getElement(id) {
	return document.getElementById(id);
}
function getInt(id) {
	return parseInt(getElement(id).value);
}
function getChecked(id) {
	return getElement(id).checked;
}

function wrapIndexForLine(index, line) {
	if (index < 0) {
		return line.length + index + 1
	}
	return index;
}

function disableTab(tabName) {
	getTab(tabName).setAttribute("class", "");
}

function disablePane(tabName) {
	getPane(tabName).style.display = 'none';
}

function getTab(tabName) {
	return document.getElementById('tab' + tabName);
}
function getPane(tabName) {
	return document.getElementById('pane' + tabName);
}

function enableTab(tabName) {
	getPane(tabName).style.display = 'block';
	getTab(tabName).setAttribute("class", "active");
}

var tabNames = ["InsertDelete", "Whitespace"];
var actionIds = ["InsertDeleteInsert", "InsertDeleteDelete", "WhitespaceTrim"];

function getActiveActionId() {
	for (i = 0; i < actionIds.length; ++i) {
		var id = "rb" + actionIds[i];
		if (getElement(id).checked) {
			return actionIds[i];
		}
	}
	return "<error>";
}

function disableAllPanesAndTabs() {
	for (i = 0; i < tabNames.length; ++i) {
		var name = tabNames[i];
		disablePane(name);
		disableTab(name);
	}
}

function tab(tab) {
	disableAllPanesAndTabs();
	enableTab(tab);
}