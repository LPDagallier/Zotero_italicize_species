TO DO:
- add more explanations (?)
- add comments in the script

# Italicize genus and species names in Zotero
This repository present a procedure to automatically italicize the species names in the titles of your documents in the Zotero library.

## Introduction
[Zotero](https://www.zotero.org/) is a very useful and powerful tool for managing bibliography.
However, when the titles of the documents contain a genus or a species name, many of us struggle because:
- the nomenclature standards require that genus and species to be written in italic
- depending on how the document is imported, the genus or species name is rarely in italic

The way Zotero manages the [rich text formating](https://www.zotero.org/support/kb/rich_text_bibliography) is with HTML tags. So to italicize a part of the title, it needs to be enclosed by the following HTML tags: **\<i>** Genus species  **\<i/>**. So one solution is to go across all the references items in our database and add manually theses tags in the titles, but this is long and tedious.

But lucky for us, since the release of [Zotero 5.0.73](https://www.zotero.org/support/5.0_changelog), it is possible to directly script into Zotero.
So here is a script for automatically add the \<i> html tags around a list of user define genera and species names. 

## The step-by-step procedure

- Backup your Zotero data (just in case; it's pretty simple, see [here](https://www.zotero.org/support/zotero_data#backing_up_your_zotero_data) how to do that)
- Open the [zotero_italicize_species.js](./zotero_italicize_species.js) script in any text or script editor (Gedit, Notepad).  
- In the `toModify` variable, insert the list of text strings you want to have in italic. Each string is enclosed by quotation marks ("), seprarated by a comma (,).  
**Important**: in the text strings, you have to separate the genus and the species strings, e.g. `var toModify = ["Quercus", "pubescens", "Homo", "sapiens"];` and **not**  `var toModify = ["Quercus pubescens", "Homo sapiens"];` (see the explanation below).
- Select all the script and copy it.
- Open Zotero, in the menu, go to Tools > Developper > Run JavaScript.
- Paste the script into the code box of the Run JavaScript window, and tick the 'Run as async function' box.
- Click Run or press Ctrl + R.

That's it! Enjoy the time you saved from manually editing all the titles ;)

## Explanations
The script will go through every string in the `toModify` variable with regular expression to add HTML tags around the string.

The `toModify` variable has to contain every single text string separated from each other.  
Depending on the documents you have in your database, genus and species names can occur in different ways. In some titles you will have only the genus name, e.g. _Quercus_, and in other titles you will have both genus and specific epithet, e.g. _Quercus pubescens_. If your `toModify` variable only contains genus names (`var toModify = ["Quercus"];`), the specific epithet will not be italicized (ending up with "_Quercus_ pubescens"); if it only contains the genus + species name (`var toModify = ["Quercus pubescens"];`), then all the occurrences of "Quercus pubescens" will be italicized, but not the occurrences of "Quercus" alone; and if it contains both (`var toModify = ["Quercus pubescens", "Quercus"];`), then all the "Quercus" in the occurrences of "Quercus pubescens" will be de italicized 2 times (2 HTML tags: \<i>\<i>Quercus\<i/> pubescens\<i/>), which will "cancel" the italic formatting around the genus name (ending up with "Quercus _pubescens_"). That is why the `toModify` variable has to contain genus and species names separated (`var toModify = ["Quercus", "pubescens"];`). Note that this will add a HTML tag around each string (\<i>Quercus\<i/> \<i>pubescens\<i/>), which might seem a bit messed up. That is why the script contains an extra step of cleaning (see line 36) that removes all the "\<i/> \<i>" patterns (thus transforming  \<i>Quercus\<i/> \<i>pubescens\<i/> into \<i>Quercus pubescens\<i/>, that is _Quercus pubescens_).

## PDF file renaming

If you use the function _Rename File from Parent Metadata_ (default Zotero renaming function), Zotero will automatically not include the HTML tag in the .pdf file names.

However, if you are using the [Zotfile](http://zotfile.com/) extension for renaming, it will include the HTML tags in the file name.  

To get rid of the tags in the filename with Zotfile, there is a trick. You first have to add a [user defined wildcard](http://zotfile.com/index.html#user-defined-wildcards) for the title:
- Go to Edit > Preferences > Advanced > General
- Go to Config Editor > I accept the risk!
- Change the `extensions.zotfile.wildcards.user` value to `{"1": {"field": "title", "operations":[{"function":"replace","regex": "(\\<.*\\>\\b)|(\\b\\<.*\\>)", "replacement": ""}]}}`  
You have now defined the new wildcard `%1` for Zotfile file renaming.
- Now go to Tools > ZotFile Preferences > Renaming Rules
- Use `%1` wildcard instead of `%t` wildcard for renaming the title, e.g. `{%a} - {%y} - {%1}` will rename the files like "Author - YEAR - Title" with the title removed from any HTML tag.


## Ressources
- https://www.zotero.org/support/dev/client_coding/javascript_api#batch_editing
- Note that this could also be probably achieved in R using Zotero API (https://github.com/mbojan/zoterro, https://github.com/giocomai/zoteror)
- See also [Mazospega](https://github.com/IdoBar/Mazospega) that also intends to italicize species names in Zotero, but in a different way (with Python and interface).
