import { has } from 'lodash'
import { getTreeFromFlatData } from 'react-sortable-tree'
// import { makeObjectList } from './SparqlObjectMapper';

export const mapPlaces = sparqlBindings => {
  // console.log(sparqlBindings);
  const results = sparqlBindings.map(b => {
    return {
      id: b.id.value,
      lat: b.lat.value,
      long: b.long.value,
      instanceCount: b.instanceCount.value
    }
  })
  return results
}

export const mapCoordinates = sparqlBindings => {
  // console.log(sparqlBindings);
  const results = sparqlBindings.map(b => {
    return {
      lat: b.lat.value,
      long: b.long.value
    }
  })
  return results
}

export const mapCount = sparqlBindings => {
  return sparqlBindings[0].count.value
}

export const mapFacet = (sparqlBindings, previousSelections) => {
  // console.log(previousSelections)
  let results = []
  if (sparqlBindings.length > 0) {
    results = mapFacetValues(sparqlBindings)
  }
  return results
}

export const mapHierarchicalFacet = (sparqlBindings, previousSelections) => {
  // console.log(previousSelections)
  const results = mapFacetValues(sparqlBindings)
  let treeData = getTreeFromFlatData({
    flatData: results,
    getKey: node => node.id, // resolve a node's key
    getParentKey: node => node.parent, // resolve node's parent's key
    rootKey: '0' // The value of the parent key when there is no parent (i.e., at root level)
  })
  treeData = recursiveSort(treeData)
  treeData.forEach(node => sumUpAndSelectChildren(node))
  return ({
    treeData,
    flatData: results
  })
}

export const mapTimespanFacet = sparqlBindings => {
  const b = sparqlBindings[0]
  return {
    min: b.min.value,
    max: b.max.value
  }
}

export const mapNameSampoResults = sparqlBindings => {
  const results = sparqlBindings.map(b => {
    return {
      id: b.id.value,
      prefLabel: b.prefLabel.value.charAt(0).toUpperCase() + b.prefLabel.value.slice(1), // capitalize
      ...(Object.prototype.hasOwnProperty.call(b, 'modifier') && { modifier: b.modifier.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'basicElement') && { basicElement: b.basicElement.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'typeLabel') && { typeLabel: b.typeLabel.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'broaderTypeLabel') && { broaderTypeLabel: b.broaderTypeLabel.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'collector') && { collector: b.collector.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'broaderAreaLabel') && { broaderAreaLabel: b.broaderAreaLabel.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'collectionYear') && { collectionYear: b.collectionYear.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'source') && { source: b.source.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'markerColor') && { markerColor: b.markerColor.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'lat') && { lat: b.lat.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'long') && { long: b.long.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'namesArchiveLink') && { namesArchiveLink: b.namesArchiveLink.value })
    }
  })
  return results
}

const mapFacetValues = sparqlBindings => {
  const results = sparqlBindings.map(b => {
    try {
      return {
        id: b.id.value,
        prefLabel: b.prefLabel.value,
        selected: b.selected.value,
        parent: b.parent ? b.parent.value : null,
        instanceCount: b.instanceCount.value
      }
    } catch (err) {
      console.log(err)
    }
  })
  return results
}

const comparator = (a, b) => {
  if (Array.isArray(a.prefLabel)) {
    a.prefLabel = a.prefLabel[0]
  }
  if (Array.isArray(b.prefLabel)) {
    b.prefLabel = b.prefLabel[0]
  }
  return a.prefLabel.localeCompare(b.prefLabel)
}

const sumUpAndSelectChildren = node => {
  node.totalInstanceCount = parseInt(node.instanceCount)
  if (has(node, 'children')) {
    for (const child of node.children) {
      if (node.selected === 'true') {
        child.selected = 'true'
        child.disabled = 'true'
      }
      node.totalInstanceCount += sumUpAndSelectChildren(child)
    }
  }
  return node.totalInstanceCount
}

const recursiveSort = nodes => {
  nodes.sort(comparator)
  nodes.forEach(node => {
    if (has(node, 'children')) {
      recursiveSort(node.children)
    }
  })
  return nodes
}