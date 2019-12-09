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
    //   SELECT DISTINCT ?label (COUNT(?id) AS ?count)
    //   WHERE {
    //     GRAPH <http://ldf.fi/warsa/places/karelian_places> {
    //       (?id ?idcore) text:query (skos:prefLabel '<QUERYTERM>*') .
    //     }
    //     ?id skos:prefLabel ?lbl .
    //     BIND(STR(?lbl) AS ?label)
    //   }
    //   GROUP BY ?label
    //   ORDER BY DESC(MAX(?idcore)) ?label
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
            ?id text:query (skos:prefLabel '<QUERYTERM>*' 50) .
          }
          ?id skos:prefLabel ?lbl .
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
      SELECT ?id ?prefLabel ?broaderTypeLabel ?broaderAreaLabel ?source ?lat ?long ?markerColor
      WHERE {
        {
          SELECT DISTINCT ?id {
            GRAPH <http://ldf.fi/warsa/places/karelian_places> {
              <QUERY>
            }
          }
        }
        ?id skos:prefLabel ?prefLabel .
        ?id a/skos:prefLabel ?broaderTypeLabel .
        ?id gs:sfWithin/skos:prefLabel ?broaderAreaLabel .
        BIND("KK" AS ?source)
        BIND("blue" AS ?markerColor)
        OPTIONAL {
          ?id wgs84:lat ?lat .
          ?id wgs84:long ?long .
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
        ?id text:query (skos:prefLabel '<QUERYTERM>*' 50) .
        ?id sf:preferredLanguageLiteral (skos:prefLabel 'fi' '' ?lbl) .
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
      SELECT ?id ?prefLabel ?broaderTypeLabel ?broaderAreaLabel ?source ?lat ?long ?markerColor
      WHERE {
        <QUERY>
        ?id sf:preferredLanguageLiteral (skos:prefLabel 'fi' '' ?prefLabel) .
        ?id a ?type .
        ?type sf:preferredLanguageLiteral (skos:prefLabel 'fi' '' ?broaderTypeLabel) .
        ?id wgs84:lat ?lat .
        ?id wgs84:long ?long .
        OPTIONAL {
          ?id crm:P89_falls_within ?municipality .
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
    //'simpleSuggestionQuery':
    //  'SELECT+DISTINCT+?label+' +
    //  'WHERE+{' +
    //  '?id+a+skos:Concept;+' +
    //  'luc:term+"<QUERYTERM>*";+' +
    //  'skos:inScheme+tgn:;' +
    //  'gvp:prefLabelGVP/xl:literalForm+?lbl+.' +
    //  '+BIND(STR(?lbl)+AS+?label)' +
    //  'FILTER+(STRSTARTS(LCASE(?lbl),+"<QUERYTERM>"))' +
    //  '}' +
    //  'LIMIT+20',
    'resultQuery': `
      SELECT ?id (COALESCE(?labelEn,?labelGVP) AS ?prefLabel) ?broaderTypeLabel
        ?broaderAreaLabel ?source ?lat ?long ?markerColor
      WHERE {
          ?id luc:term "<QUERYTERM>" ;
          skos:inScheme tgn: ;
          gvp:placeTypePreferred [
            gvp:prefLabelGVP [
              xl:literalForm ?broaderTypeLabel;
              dct:language gvp_lang:en
            ]
          ];
          gvp:broaderPreferred/xl:prefLabel/xl:literalForm ?broaderAreaLabel .
        OPTIONAL {
          ?id xl:prefLabel [
            xl:literalForm ?labelEn ;
            dct:language gvp_lang:en
          ]
        }
        OPTIONAL {
          ?id gvp:prefLabelGVP [xl:literalForm ?labelGVP]
        }
        OPTIONAL {
          ?id foaf:focus ?place .
          ?place wgs:lat ?lat ;
                 wgs:long ?long .
        }
        FILTER EXISTS {
          ?id xl:prefLabel/gvp:term+?term .
          FILTER (LCASE(STR(?term))="<QUERYTERM>")
        }
        BIND("TGN" AS ?source)
        BIND("orange" AS ?markerColor)
      }
      `,
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
    //   SELECT DISTINCT ?label (COUNT(?id) AS ?count)
    //   WHERE {
    //     (?id ?idcore) text:query (skos:prefLabel '<QUERYTERM>*') .
    //     ?id hipla:type [] .
    //     ?id skos:prefLabel ?lbl .
    //     BIND(STR(?lbl) AS ?label)
    //   }
    //   ORDER BY DESC(MAX(?idcore)) ?label
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
        ?id text:query (skos:prefLabel '<QUERYTERM>*' 50) .
        ?id hipla:type [] .
        ?id skos:prefLabel ?lbl .
        FILTER(STRSTARTS(LCASE(?lbl), '<QUERYTERM>'))
        BIND(STR(?lbl) AS ?label)
      }
      `,
    'resultQuery': `
      PREFIX text: <http://jena.apache.org/text#>
      PREFIX spatial: <http://jena.apache.org/spatial#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
      PREFIX gs: <http://www.opengis.net/ont/geosparql#>
      PREFIX hipla-schema: <http://ldf.fi/schema/hipla/>
      PREFIX na-schema: <http://ldf.fi/schema/kotus-names-archive/>
      PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
      SELECT ?id ?prefLabel ?namesArchiveLink ?typeLabel ?broaderTypeLabel
      ?broaderAreaLabel ?source ?lat ?long ?modifier ?basicElement ?collector
      ?collectionYear ?markerColor ?positioningAccuracy
      WHERE {
        <QUERY>
        ?id skos:prefLabel ?prefLabel .
        ?id na-schema:parish ?broaderAreaLabel .
        ?id owl:sameAs ?namesArchiveLink .
        BIND("NA" AS ?source)
        BIND("violet" AS ?markerColor)
        BIND("-" AS ?missingValue)
        OPTIONAL {
          ?id a ?type .
          OPTIONAL {
            ?type skos:prefLabel ?typeLabel_ .
            ?type rdfs:subClassOf/skos:prefLabel ?broaderTypeLabel_ .
          }
        }
        BIND(COALESCE(?typeLabel_, ?missingValue) as ?typeLabel)
        BIND(COALESCE(?broaderTypeLabel_, ?missingValue) as ?broaderTypeLabel)
        OPTIONAL {
          ?id wgs84:lat ?lat .
          ?id wgs84:long ?long .
        }
        OPTIONAL { ?id na-schema:positioning_accuracy ?positioningAccuracy }
        OPTIONAL {
          ?id na-schema:place_name_modifier ?modifier ;
             na-schema:place_name_basic_element ?basicElement .
        }
        OPTIONAL { ?id na-schema:collector ?collector }
        OPTIONAL { ?id na-schema:stamp_date ?collectionYear }
      }
    `,
  },
};
