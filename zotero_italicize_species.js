var fieldName = "title";
var toModify = ["Annona", "Uva", "Uvaria", "Uvariodendron", "Uvariopsis", "Mischogyne", "Asteranthe", "Uvariastrum", "Hexalobus", "Isolona", "Monodora", "Lukea", "Greenwayodendron", "Monanthotaxis", "Guatteria", "Dennettia", "Hydrocharis", "vanderystii", "Meriania", "Melastoma", "Salpinga", "Macrocentrum", "Graffenrieda", "Axinea", "Adelobotrys", "Memecylon", "Huberantha", "Polyalthiopsis", "H. floribunda", "H. luensis", "Winitia", "Stelechocarpus", "Sageraea", "Diclinanona", "Anthyllis", "apennina", "dicaprio", "Cremastosperma", "Diabelia", "submontana", "aequatorialis", "Phytelephas", "angustifolium", "Croton", "menyharthii", "Pan", "troglodytes", "schweinfurthii", "Cryptocercus", "Hedyosmum", "Gladiolus", "Lapeirousia", "Ophrys", "Pseuduvariana", "mulgravea", "Coccinia", "Criniger", "Acridocarpus", "Brachylophon", "Guibourtia", "Atheris", "Lupangus", "Loxodonta", "cyclotis", "anisatum", "africana cyclotis", "Gorilla gorilla gorilla", "Mandrillus sphinx", "Crocidura", "poensis", "Hylomyscus", "Chiromantis", "rufescens", "Rhampholeon", "platyceps", "Dasymaschalon", "Friesodielsia", "Grammomys", "Silene", "Distemonanthus", "benthamianus", "Memecylon", "Pogostemon", "Anaxagorea", "Polyalthia", "Monoon", "Microlicia", "Amborella", "Sanrafaelia", "rufonammari", "Goniothalamus", "Schisandra", "Azolla", "Rhizosperma", "Schisandra", "Sphaerostema", "cherimola", "Pilosocereus", "Raphia", "Friesodielsia", "Salvia", "Lachemilla", "Nicotiana", "Xylopia", "Cedrela", "odorata", "Desmopsis", "Stenanona", "Berlinia", "Solanum", "Storthocalyx", "Afrothismia", "Parkia", "Costus", "Artabotrys", "biglobosa", "Afzelia", "africana", "quanzensis", "Pilea", "nguruensis", "Polyceratocarpus", "Meiogyne", "Fitzalania", "Encephalartos", "Annickia", "Toussaintia", "Mwasumbia", "Ceiba", "pentandra", "mirabile", "Praomys", "jacksoni", "Terminalia", "superba", "Laccosperma", "Goniothalamus", "Bleda", "Tetrastemma", "Hypericum", "dioica", "Brieya", "Piptostigma", "Sabal", "Saintpaulia", "Sirdavidia", "Andropadus", "Begonia", "Tibouchina", "Galium", "odoratum", "Helianthemum", "Keraunea", "Pseuduvaria", "Cola cheringoma", "Turraea", "Alchemilla", "Parthenocissus", "tripetala", "Arabidopsis", "Behuria", "Bertolonia", "Cambessedesia", "Huberia", "Mouriri", "Salpinga", "paleacea", "maguirei", "cilliata", "Escallonia", "asterias", "lutea", "tripetala", "bussei", "crispiflorus", "monopetalus", "mossambicensis", "salicifolius", "campanulata", "capuronii", "cauliflora", "congolana", "cooperi", "deightonii", "dewevrei", "ghesquierei", "heinsenii", "hexaloba", "humbertiana", "lebrunii", "le-testui", "linearis", "madagascariensis", "perrieri", "pilosa", "pleurocarpa", "thonneri", "zenkeri", "quentinii", "triciae", "congensis", "elliotiana", "gabonensis", "iddii", "michelioides", "vignei", "angolensis", "carolinae", "crispata", "globiflora", "grandidieri", "hastipetala", "junodii", "laurentii", "minor", "myristica", "stenopetala", "tenuifolia", "undulata", "zenkeri", "germainii", "hexaloboides", "insculptum", "pierreanum", "zenkeri", "angustifolium", "anisatum", "calophyllum", "citriodorum", "connivens", "dzomboense", "fuscum", "gorgonis", "kimbozaense", "kirkii", "mbagoi", "molundense", "mossambicense", "occidentalis", "pilosicarpum", "pycnophyllum", "schmidtii", "usambarense", "bakeriana", "bisexualis", "citrata", "congensis", "congolana", "dicaprio", "dioica", "etugeana", "guineensis", "korupensis", "lovettiana", "noldeae", "oligocarpa", "pedunculosa", "solheidii", "submontana", "zenkeri", "Rhododendron", "Schefflera", "Oxalis", "Lachemilla", "Pinguicula", "rosmarieae", "Papaver", "alpinum", "Anthyllis", "apennina"];
var numberOfItemsFound = 0;
var numberOfMatchesModified = 0;
var listNotFound = "";

for (let oldValue of toModify){

// define the regex patterns
var regExTotal = new RegExp("(\\b"+oldValue+"\\b)(?!<)","g");
var regExClean = new RegExp("<\/i> <i>");

var fieldID = Zotero.ItemFields.getID(fieldName);
var s = new Zotero.Search();
s.addCondition(fieldName, 'contains', oldValue);
var ids = await s.search();
if (!ids.length) {
    listNotFound = listNotFound.concat(oldValue, ", ")
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
return numberOfItemsFound + " item(s) found with at least one of the elements in the list provided in the " + fieldName + " (some items might be counted several times); " + numberOfMatchesModified + " match(es) modified. \n" + "No items found for " + listNotFound;
