var fieldName = "title";
var toModify = ["Sebastiscus", "marmoratus", "Scorpaenopsis", "Homo", "sapiens", "Oryza", "sativa",
	"Annona", "Uva", "Uvaria", "Uvariodendron", "Uvariopsis", "Mischogyne", "Asteranthe", "Uvariastrum", "Hexalobus", "Isolona", "Monodora", "Lukea", "Greenwayodendron", "Monanthotaxis", "Guatteria", "Dennettia", "Hydrocharis", "vanderystii", "Meriania", "Melastoma", "Salpinga", "Macrocentrum", "Graffenrieda", "Axinea", "Adelobotrys", "Memecylon", "Huberantha", "Polyalthiopsis", "H. floribunda", "H. luensis", "Winitia", "Stelechocarpus", "Sageraea", "Diclinanona", "Anthyllis", "apennina", "dicaprio", "Cremastosperma", "Diabelia", "submontana", "aequatorialis", "Phytelephas", "angustifolium", "Croton", "menyharthii", "Pan", "troglodytes", "schweinfurthii", "Cryptocercus", "Hedyosmum", "Gladiolus", "Lapeirousia", "Ophrys", "Pseuduvariana", "mulgravea", "Coccinia", "Criniger", "Acridocarpus", "Brachylophon", "Guibourtia", "Atheris", "Lupangus", "Loxodonta", "cyclotis", "anisatum", "africana cyclotis", "Gorilla gorilla gorilla", "Mandrillus sphinx", "Crocidura", "poensis", "Hylomyscus", "Chiromantis", "rufescens", "Rhampholeon", "platyceps", "Dasymaschalon", "Friesodielsia", "Grammomys", "Silene", "Distemonanthus", "benthamianus", "Memecylon", "Pogostemon", "Anaxagorea", "Polyalthia", "Monoon", "Microlicia", "Amborella", "Sanrafaelia", "rufonammari", "Goniothalamus", "Schisandra", "Azolla", "Rhizosperma", "Schisandra", "Sphaerostema", "cherimola", "Pilosocereus", "Raphia", "Friesodielsia", "Salvia", "Lachemilla", "Nicotiana", "Xylopia", "Cedrela", "odorata", "Desmopsis", "Stenanona", "Berlinia", "Solanum", "Storthocalyx", "Afrothismia", "Parkia", "Costus", "Artabotrys", "biglobosa", "Afzelia", "africana", "quanzensis", "Pilea", "nguruensis", "Polyceratocarpus", "Meiogyne", "Fitzalania", "Encephalartos", "Annickia", "Toussaintia", "Mwasumbia", "Ceiba", "pentandra", "mirabile", "Praomys", "jacksoni", "Terminalia", "superba", "Laccosperma", "Goniothalamus", "Bleda", "Tetrastemma", "Hypericum", "dioica", "Brieya", "Piptostigma", "Sabal", "Saintpaulia", "Sirdavidia", "Andropadus", "Begonia", "Tibouchina", "Galium", "odoratum", "Helianthemum", "Keraunea", "Pseuduvaria", "Cola cheringoma", "Turraea", "Alchemilla", "Parthenocissus", "tripetala", "Arabidopsis", "Behuria", "Bertolonia", "Cambessedesia", "Huberia", "Mouriri", "Salpinga", "paleacea", "maguirei", "cilliata", "Escallonia", "asterias", "lutea", "tripetala", "bussei", "crispiflorus", "monopetalus", "mossambicensis", "salicifolius", "campanulata", "capuronii", "cauliflora", "congolana", "cooperi", "deightonii", "dewevrei", "ghesquierei", "heinsenii", "hexaloba", "humbertiana", "lebrunii", "le-testui", "linearis", "madagascariensis", "perrieri", "pilosa", "pleurocarpa", "thonneri", "zenkeri", "quentinii", "triciae", "congensis", "elliotiana", "gabonensis", "iddii", "michelioides", "vignei", "angolensis", "carolinae", "crispata", "globiflora", "grandidieri", "hastipetala", "junodii", "laurentii", "minor", "myristica", "stenopetala", "tenuifolia", "undulata", "zenkeri", "germainii", "hexaloboides", "insculptum", "pierreanum", "zenkeri", "angustifolium", "anisatum", "calophyllum", "citriodorum", "connivens", "dzomboense", "fuscum", "gorgonis", "kimbozaense", "kirkii", "mbagoi", "molundense", "mossambicense", "occidentalis", "pilosicarpum", "pycnophyllum", "schmidtii", "usambarense", "bakeriana", "bisexualis", "citrata", "congensis", "congolana", "dicaprio", "dioica", "etugeana", "guineensis", "korupensis", "lovettiana", "noldeae", "oligocarpa", "pedunculosa", "solheidii", "submontana", "zenkeri", "Rhododendron", "Schefflera", "Oxalis", "Lachemilla", "Pinguicula", "rosmarieae", "Papaver", "alpinum", "Anthyllis", "apennina"];
// --------------------------------------------------------------------------------------
// [New] List of words to remove italic tags from
// Add the words you incorrectly italicized to this list. E.g.: ["Marbled", "Rockfish", "ghd7"]
// --------------------------------------------------------------------------------------
var toDelete = ["Rockfish","Marbled"]; 
// --------------------------------------------------------------------------------------
var numberOfItemsFound = 0;
var numberOfMatchesModified = 0;
var listNotFound = "";
var numberOfMatchesDeleted = 0; // Changed to match count for more accuracy

// =====================================================================
// DELETION LOOP: First, remove incorrect italics
// =====================================================================
for (let toRemove of toDelete){
    if (toRemove === "delete_names" || toRemove.length === 0) continue; 

    // Search for items containing the word or its italicized form
    var fieldID = Zotero.ItemFields.getID(fieldName);
    var s = new Zotero.Search();
    s.addCondition(fieldName, 'contains', toRemove);
    var ids = await s.search();
    
    await Zotero.DB.executeTransaction(async function () {
        for (let id of ids) {
            let item = await Zotero.Items.getAsync(id);
            let mappedFieldID = Zotero.ItemFields.getFieldIDFromTypeAndBase(item.itemTypeID, fieldName);
            var tempTitle = item.getField('title');
            var originalTitle = tempTitle; // Used to compare if modified

            // 1. Match the full italic tag: <i>word</i>
            var exactItalicPattern = new RegExp("<i>" + toRemove + "</i>", "g");
            
            // 2. Match the start italic tag: <i>word
            var startItalicPattern = new RegExp("<i>" + toRemove, "g");
            
            // 3. Match the end italic tag: word</i>
            var endItalicPattern = new RegExp(toRemove + "</i>", "g");
            
            // Count matches
            let matches = 0;
            
            // Attempt to replace <i>word</i> with word
            var newValue = tempTitle.replace(exactItalicPattern, function(match) {
                matches++;
                return toRemove;
            });

            // Attempt to replace <i>word with word (Fixes the first word of split italics)
            newValue = newValue.replace(startItalicPattern, function(match) {
                matches++;
                return toRemove;
            });
            
            // Attempt to replace word</i> with word (Fixes the second word of split italics)
            newValue = newValue.replace(endItalicPattern, function(match) {
                matches++;
                return toRemove;
            });

            if (matches > 0) {
                // If actual changes occurred
                numberOfMatchesDeleted += matches;
                item.setField(mappedFieldID ? mappedFieldID : fieldID, newValue);
                await item.save();
            }
        }
    });	
}

// =====================================================================
// ADDITION LOOP: Add correct italics
// =====================================================================
for (let oldValue of toModify){

    var fieldID = Zotero.ItemFields.getID(fieldName);
    var s = new Zotero.Search();
    s.addCondition(fieldName, 'contains', oldValue);
    var ids = await s.search();
    if (!ids.length) {
        listNotFound = listNotFound.concat(oldValue, ", ")
    }
    numberOfItemsFound = ids.length + numberOfItemsFound 

    await Zotero.DB.executeTransaction(async function () {
        for (let id of ids) {
            let item = await Zotero.Items.getAsync(id);
            let mappedFieldID = Zotero.ItemFields.getFieldIDFromTypeAndBase(item.itemTypeID, fieldName);
            var tempTitle = item.getField('title');
            
            var pre = "<i>";
            var post = "</i>";
            var textConcat = pre.concat(oldValue, post);
            
            // -----------------------------------------------------
            // Core Check: Prevent nesting (Protect existing italics)
            // -----------------------------------------------------
            
            var isAlreadyItalicized = false;
            
            if (tempTitle.includes(pre + oldValue)) {
                isAlreadyItalicized = true;
            }
            if (tempTitle.includes(oldValue + post)) {
                isAlreadyItalicized = true;
            }
            if (tempTitle.includes(pre + oldValue + post)) {
                isAlreadyItalicized = true;
            }
            
            if (!isAlreadyItalicized) {
                // If not italicized, execute replacement
                
                var regExToReplace = new RegExp("(\\b" + oldValue + "\\b)", "g");
                
                var regExMatches = tempTitle.match(regExToReplace);
                if (regExMatches !== null){
                    numberOfMatchesModified = numberOfMatchesModified + regExMatches.length; 
                }
                
                var newValue = tempTitle.replace(regExToReplace, textConcat);
                
                item.setField(mappedFieldID ? mappedFieldID : fieldID, newValue);
                await item.save();
            }
        }
    });	
}

return numberOfItemsFound + " item(s) found in 'toModify' list (some items might be counted several times); " + numberOfMatchesModified + " match(es) modified. \n" + numberOfMatchesDeleted + " match(es) were cleaned (removed italic tags) from the 'toDelete' list.\n" + "No items found for " + listNotFound;
