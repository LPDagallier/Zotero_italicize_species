TO DO:
- add more explanations (?)
- 'note for zotfile users'section
- 'see also' section
- clean the script
- add comments in the script
- add warning about the numbers returned

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
- In the `toModify` variable, insert the list of text strings you want to have in italic. Each string is enclosed by quotation marks ("), seprarated by a comma (,). **Important**: in the text strings, you have to separate the genus and the species strings, e.g. `var toModify = ["Quercus", "pubescens", "Homo", "sapiens"];` and **not**  `var toModify = ["Quercus pubescens", "Homo sapiens"];` (see the explanation below).
- Select all the script and copy it.
- Open Zotero, in the menu, go to Tools > Developper > Run JavaScript.
- Paste the script into the code box of the Run JavaScript window, and tick the 'Run as async function' box.
- Click Run or press Ctrl + R.

That's it! Enjoy the time you saved from manually editing all the titles ;)

## Explanations

The `toModify` variable has to contain the text strings separated. Indeed, if you keep the genus and species names attached, it will possibly add many times to the same string the italic HTML tag. Consider the case where we put `var toModify = ["Quercus pubescens", "Quercus"];`, because we have one document specifically about *Quercus pubescens* and a 2nd document which is a taxonomic revision of the whole genus. In the first document, the title will end up with: \<i>\<i>Quercus\<i/> pubescens\<i/>, displayed as Quercus *pubescens*. Whereas if we have `var toModify = ["Quercus", "pubescens"];`, the title of first document will be \<i>Quercus\<i/> \<i>pubescens\<i/>. An extra step of cleaning in the script removes all the "\<i/> \<i>" patterns (line 39), which ends up like that: \<i>Quercus pubescens\<i/>, that is *Quercus pubescens*.
 

## Note for Zotfile users
wildcard for renaming the files

## See also:
List of scripts that inspired/ other script that would do the same but differently.
