# Zotero_italicize_species
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

- Backup your Zotero database: https://www.zotero.org/support/zotero_data

- Open the [zotero_italicize_species.js](./zotero_italicize_species.js) script in any text or script editor.
- Insert in the `toModify` variable the list of text strings you want to put in italic. Each string is between 2 qutation marks ("), seprarated by a comma (,). **Important**: in the text strings, you should separate the genus and the species, e.g. `var toModify = ["Quercus", "pubescens"];` and **not**  `var toModify = ["Quercus pubescens"];` (see the explanation below).
- Select all the script and copy it.
- Open Zotero, in the menu, go to Tools > Developper > Run JavaScript.
- Paste the script into the code box of the Run JavaScript window, and tick the 'Run as async function' box.
- Click Run or press Ctrl + R.

That's it! Enjoy the time you saved from manually editing all the titles ;)

## Explanations

In the [zotero_italicize_species.js](./zotero_italicize_species.js) script, all the text strings to put in italic are contained in the `toModify` variable. Insert here all the 

## Note for Zotfile users
wildcard for renaming the files

## See also:
