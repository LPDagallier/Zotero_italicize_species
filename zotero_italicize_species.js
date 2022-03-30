// to do:
// - change the count that is wrong !!!
// - do something for the function to work with name already having a  html tag (like span no class)
// OK - do smthg for the function to be compatible with Genus species (and not only species) OK

var fieldName = "title";
var toModify = ["Uvariopsis", "vanderystii"];
var numberOfItemsFound = 0;
var numberOfItemsModified = 0;

for (let oldValue of toModify){

// define the regex patterns
var regExTotal = new RegExp("(\\b"+oldValue+"\\b)(?!<\/i>)","g");
var regExClean = new RegExp("<\/i> <i>");

var fieldID = Zotero.ItemFields.getID(fieldName);
var s = new Zotero.Search();
s.addCondition(fieldName, 'contains', oldValue);
var ids = await s.search();
if (!ids.length) {
    return "No items found";
}
numberOfItemsFound = ids.length //counts the number of items found

await Zotero.DB.executeTransaction(async function () {
	for (let id of ids) {
        let item = await Zotero.Items.getAsync(id);
        let mappedFieldID = Zotero.ItemFields.getFieldIDFromTypeAndBase(item.itemTypeID, fieldName);
		var tempTitle = item.getField('title');
		var pre = "<i>"
		var post = "</i>"
		var textConcat = pre.concat(oldValue, post)
//		regExTotal = "Caca"
if (tempTitle.match(regExTotal)){
    numberOfItemsModified++ // adds 1 for each match modified
}
		var newValue = tempTitle.replace(regExTotal, textConcat);
		newValue = newValue.replace(regExClean, " "); // cleaning step
        item.setField(mappedFieldID ? mappedFieldID : fieldID, newValue);
        await item.save();
    }
});
}
return numberOfItemsFound + " item(s) found with \"" + toModify + "\" in the " + fieldName + "; " + numberOfItemsModified + " item(s) modified. WARNING: consider dividing these numbers by 2.";
    
