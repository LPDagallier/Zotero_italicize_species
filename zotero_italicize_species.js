var fieldName = "title";
var toModify = ["Uvariopsis", "vanderystii"];
var numberOfItemsFound = 0;
var numberOfMatchesModified = 0;

for (let oldValue of toModify){

// define the regex patterns
var regExTotal = new RegExp("(\\b"+oldValue+"\\b)(?!<)","g");
var regExClean = new RegExp("<\/i> <i>");

var fieldID = Zotero.ItemFields.getID(fieldName);
var s = new Zotero.Search();
s.addCondition(fieldName, 'contains', oldValue);
var ids = await s.search();
if (!ids.length) {
    return "No items found";
}
numberOfItemsFound = ids.length+numberOfItemsFound //counts the number of items found (some are counted more than once)

await Zotero.DB.executeTransaction(async function () {
	for (let id of ids) {
        let item = await Zotero.Items.getAsync(id);
        let mappedFieldID = Zotero.ItemFields.getFieldIDFromTypeAndBase(item.itemTypeID, fieldName);
		var tempTitle = item.getField('title');
		var pre = "<i>"
		var post = "</i>"
		var textConcat = pre.concat(oldValue, post)
		
		var regExMatches = tempTitle.match(regExTotal)
				if (regExMatches !== null){
		   numberOfMatchesModified = numberOfMatchesModified + regExMatches.length // counts the number of matches that will be modified
		}
		
		var newValue = tempTitle.replace(regExTotal, textConcat);
		newValue = newValue.replace(regExClean, " "); // cleaning step
        item.setField(mappedFieldID ? mappedFieldID : fieldID, newValue);
        await item.save();
    }
});	
}
return numberOfItemsFound + " item(s) found with at least one of the elements \"" + toModify + "\" in the " + fieldName + " (some items might be counted several times); " + numberOfMatchesModified + " match(es) modified."
