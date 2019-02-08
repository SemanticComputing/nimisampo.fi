module.exports = {
  'warsa_karelian_places': {
    'title': 'Karelian map names',
    'shortTitle': 'KK',
    'timePeriod': '1922-1944',
    'endpoint': 'http://ldf.fi/warsa/sparql',
    // 'suggestionQuery': `
    //   PREFIX text: <http://jena.apache.org/text#>
    //   PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    //   PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    //   PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    //   PREFIX gs: <http://www.opengis.net/ont/geosparql#>
    //   SELECT DISTINCT ?label (COUNT(?s) AS ?count)
    //   WHERE {
    //     GRAPH <http://ldf.fi/warsa/places/karelian_places> {
    //       (?s ?score) text:query (skos:prefLabel '<QUERYTERM>*') .
    //     }
    //     ?s skos:prefLabel ?lbl .
    //     BIND(STR(?lbl) AS ?label)
    //   }
    //   GROUP BY ?label
    //   ORDER BY DESC(MAX(?score)) ?label
    //   LIMIT 50
    //   `,
    'simpleSuggestionQuery': `
        PREFIX text: <http://jena.apache.org/text#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX gs: <http://www.opengis.net/ont/geosparql#>
        SELECT DISTINCT ?label
        WHERE {
          GRAPH <http://ldf.fi/warsa/places/karelian_places> {
            ?s text:query (skos:prefLabel '<QUERYTERM>*' 50) .
          }
          ?s skos:prefLabel ?lbl .
          FILTER(STRSTARTS(LCASE(?lbl), '<QUERYTERM>'))
          BIND(STR(?lbl) AS ?label)
        }
        `,
    'resultQuery': `
      PREFIX text: <http://jena.apache.org/text#>
      PREFIX spatial: <http://jena.apache.org/spatial#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
      PREFIX gs: <http://www.opengis.net/ont/geosparql#>
      PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
      SELECT ?s ?prefLabel ?broaderTypeLabel ?broaderAreaLabel ?source ?lat ?long ?markerColor
      WHERE {
        {
          SELECT DISTINCT ?s {
            GRAPH <http://ldf.fi/warsa/places/karelian_places> {
              <QUERY>
            }
          }
        }
        ?s skos:prefLabel ?prefLabel .
        ?s a/skos:prefLabel ?broaderTypeLabel .
        ?s gs:sfWithin/skos:prefLabel ?broaderAreaLabel .
        BIND("KK" AS ?source)
        BIND("blue" AS ?markerColor)
        OPTIONAL {
          ?s wgs84:lat ?lat .
          ?s wgs84:long ?long .
        }
        #FILTER(LCASE(STR(?prefLabel))='<QUERYTERM>')
        FILTER(LANGMATCHES(LANG(?prefLabel), 'fi'))
        FILTER(LANGMATCHES(LANG(?broaderTypeLabel), 'fi'))
        FILTER(LANGMATCHES(LANG(?broaderAreaLabel), 'fi'))
      }
      `,
  },
  'pnr': {
    'title': 'Finnish Geographic Names Registry (contemporary)',
    'shortTitle': 'FGN',
    'timePeriod': 'contemporary',
    'endpoint': 'http://ldf.fi/pnr-keyword-index/sparql',
    'simpleSuggestionQuery': `
      PREFIX text: <http://jena.apache.org/text#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
      PREFIX gs: <http://www.opengis.net/ont/geosparql#>
      PREFIX sf: <http://ldf.fi/functions#>
      SELECT DISTINCT ?label
      WHERE {
        ?s text:query (skos:prefLabel '<QUERYTERM>*' 50) .
        ?s sf:preferredLanguageLiteral (skos:prefLabel 'fi' '' ?lbl) .
        FILTER(STRSTARTS(LCASE(?lbl), '<QUERYTERM>'))
        BIND(STR(?lbl) AS ?label)
      }
        `,
    'resultQuery': `
      PREFIX text: <http://jena.apache.org/text#>
      PREFIX spatial: <http://jena.apache.org/spatial#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
      PREFIX gs: <http://www.opengis.net/ont/geosparql#>
      PREFIX sf: <http://ldf.fi/functions#>
      PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
      PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
      SELECT ?s ?prefLabel ?broaderTypeLabel ?broaderAreaLabel ?source ?lat ?long ?markerColor
      WHERE {
        <QUERY>
        ?s sf:preferredLanguageLiteral (skos:prefLabel 'fi' '' ?prefLabel) .
        ?s a ?type .
        ?type sf:preferredLanguageLiteral (skos:prefLabel 'fi' '' ?broaderTypeLabel) .
        ?s wgs84:lat ?lat .
        ?s wgs84:long ?long .
        OPTIONAL {
          ?s crm:P89_falls_within ?municipality .
          ?municipality a ?munType .
          ?municipality sf:preferredLanguageLiteral (skos:prefLabel 'fi' '' ?broaderAreaLabel_) .
          FILTER (?munType != <http://ldf.fi/pnr-schema#SubRegion>)
        }
        BIND(COALESCE(?broaderAreaLabel_, ?missingValue) as ?broaderAreaLabel)
        BIND("PNR" AS ?source)
        BIND("yellow" AS ?markerColor)
        BIND("-" AS ?missingValue)
      }
      `,
  },
  'tgn': {
    // Getty LOD documentation:
    // http://vocab.getty.edu/queries#Places_by_Type
    // https://groups.google.com/forum/#!topic/gettyvocablod/r4wsSJyne84
    // https://confluence.ontotext.com/display/OWLIMv54/OWLIM-SE+Full-text+Search
    // http://vocab.getty.edu/queries#Combination_Full-Text_and_Exact_String_Match
    // http://vocab.getty.edu/doc/#TGN_Place_Types
    'title': 'The Getty Thesaurus of Geographic Names',
    'shortTitle': 'TGN',
    'timePeriod': '',
    'endpoint': 'http://vocab.getty.edu/sparql.json',
    'simpleSuggestionQuery':
      'SELECT+DISTINCT+?label+' +
      'WHERE+{' +
      '?s+a+skos:Concept;+' +
      'luc:term+"<QUERYTERM>*";+' +
      'skos:inScheme+tgn:;' +
      'gvp:prefLabelGVP/xl:literalForm+?lbl+.' +
      '+BIND(STR(?lbl)+AS+?label)' +
      'FILTER+(STRSTARTS(LCASE(?lbl),+"<QUERYTERM>"))' +
      '}' +
      'LIMIT+20',
    'resultQuery':
      'SELECT+?s+(COALESCE(?labelEn,?labelGVP)+AS+?prefLabel)+?typeLabel+?broaderAreaLabel+?source+?lat+?long+?markerColor' +
      'WHERE+{' +
      '?s+luc:term+"<QUERYTERM>";+' +
      'skos:inScheme+tgn:;+' +
      'gvp:placeTypePreferred+[gvp:prefLabelGVP+[xl:literalForm+?typeLabel;dct:language+gvp_lang:en]];+' +
      'gvp:parentStringAbbrev+?broaderAreaLabel+.+' +
      'OPTIONAL+{?s+xl:prefLabel+[xl:literalForm+?labelEn;+dct:language+gvp_lang:en]}+' +
      'OPTIONAL{?s+gvp:prefLabelGVP+[xl:literalForm?labelGVP]}+' +
      'OPTIONAL{?s+foaf:focus+?place+.+?place+wgs:lat+?lat;+wgs:long+?long}+' +
      'FILTER+EXISTS+{?s+xl:prefLabel/gvp:term+?term+.+FILTER+(LCASE(STR(?term))="<QUERYTERM>")}' +
      'BIND("TGN"+AS+?source)+' +
      'BIND("orange"+AS+?markerColor)+' +
      '}',
  },
  'kotus': {
    'title': 'Institute for the Languages of Finland (Kotus) Digital Names archive',
    'shortTitle': 'DNA',
    'timePeriod': '',
    'endpoint': 'http://ldf.fi/kotus-names-archive/sparql',
    // 'endpoint': 'http://localhost:3037/ds/sparql',
    // 'suggestionQuery': `
    //   PREFIX text: <http://jena.apache.org/text#>
    //   PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    //   PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    //   PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    //   PREFIX gs: <http://www.opengis.net/ont/geosparql#>
    //   PREFIX hipla: <http://ldf.fi/schema/hipla/>
    //   SELECT DISTINCT ?label (COUNT(?s) AS ?count)
    //   WHERE {
    //     (?s ?score) text:query (skos:prefLabel '<QUERYTERM>*') .
    //     ?s hipla:type [] .
    //     ?s skos:prefLabel ?lbl .
    //     BIND(STR(?lbl) AS ?label)
    //   }
    //   ORDER BY DESC(MAX(?score)) ?label
    //   LIMIT 20
    //   `,
    'simpleSuggestionQuery': `
      PREFIX text: <http://jena.apache.org/text#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
      PREFIX gs: <http://www.opengis.net/ont/geosparql#>
      PREFIX hipla: <http://ldf.fi/schema/hipla/>
      SELECT DISTINCT ?label
      WHERE {
        ?s text:query (skos:prefLabel '<QUERYTERM>*' 50) .
        ?s hipla:type [] .
        ?s skos:prefLabel ?lbl .
        FILTER(STRSTARTS(LCASE(?lbl), '<QUERYTERM>'))
        BIND(STR(?lbl) AS ?label)
      }
      `,
    'resultQuery': `
      PREFIX text: <http://jena.apache.org/text#>
      PREFIX spatial: <http://jena.apache.org/spatial#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
      PREFIX gs: <http://www.opengis.net/ont/geosparql#>
      PREFIX hipla-schema: <http://ldf.fi/schema/hipla/>
      PREFIX na-schema: <http://ldf.fi/schema/kotus-names-archive/>
      PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
      SELECT ?s ?prefLabel ?typeLabel ?broaderTypeLabel ?broaderAreaLabel ?source ?lat ?long ?modifier ?basicElement ?collector ?collectionYear ?markerColor
      WHERE {
        <QUERY>
        ?s skos:prefLabel ?prefLabel .
        ?s na-schema:municipality ?broaderAreaLabel .
        BIND("NA" AS ?source)
        BIND("violet" AS ?markerColor)
        BIND("-" AS ?missingValue)
        OPTIONAL {
          ?s a ?type .
          OPTIONAL {
            ?type skos:prefLabel ?typeLabel_ .
            ?type rdfs:subClassOf/skos:prefLabel ?broaderTypeLabel_ .
          }
        }
        BIND(COALESCE(?typeLabel_, ?missingValue) as ?typeLabel)
        BIND(COALESCE(?broaderTypeLabel_, ?missingValue) as ?broaderTypeLabel)
        OPTIONAL {
          ?s wgs84:lat ?lat .
          ?s wgs84:long ?long .
        }
        OPTIONAL {
          ?s na-schema:place_name_modifier ?modifier ;
             na-schema:place_name_basic_element ?basicElement .
        }
        OPTIONAL { ?s na-schema:collector ?collector }
        OPTIONAL { ?s na-schema:collection_year ?collectionYear }
        #FILTER(LANGMATCHES(LANG(?label), 'fi'))
        #FILTER(LANGMATCHES(LANG(?typeLabel), 'fi'))
        #FILTER(LANGMATCHES(LANG(?broaderAreaLabel), 'fi'))
      }
    `,
  },
};
