import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { has } from 'lodash';
import L from 'leaflet';
import 'leaflet-fullscreen/dist/fullscreen.png';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.min.js';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'Leaflet.Control.Opacity/dist/L.Control.Opacity.css';
import 'Leaflet.Control.Opacity/dist/L.Control.Opacity.js';
import 'leaflet.smooth_marker_bouncing/leaflet.smoothmarkerbouncing.js';

import markerShadowIcon from '../../img/markers/marker-shadow.png';
import markerIconViolet from '../../img/markers/marker-icon-violet.png';
import markerIconYellow from '../../img/markers/marker-icon-yellow.png';
import markerIconGrey from '../../img/markers/marker-icon-grey.png';
import markerIconBlue from '../../img/markers/marker-icon-blue.png';

const style = {
  width: '100%',
  height: '100%'
};

const styles = () => ({
  leafletContainer: {
    height: 'calc(100% - 72px)'
  },
  spinner: {
    height: 40,
    width: 40,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: 500
  },
});

const kotusLayers = {
  'kotus:pitajat': 'Finnish parishes in 1938',
  // https://www.kotus.fi/en/on_language/dialects/finnish_dialects_7541
  'kotus:rajat-sms-alueet': 'Dialectical regions in Finland',
  'kotus:rajat-sms-alueosat': 'Dialectical subregions in Finland',
  'kotus:rajat-lansi-ita': 'Border between western and eastern dialects in Finland'
};

// https://github.com/pointhi/leaflet-color-markers
const ColorIcon = L.Icon.extend({
  options: {
    shadowUrl: markerShadowIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }
});

class LeafletMap extends React.Component {

  componentDidMount() {
    // https://avaa.tdata.fi/web/kotus/rajapinta
    // Ilmiöt:
    //    kotus:paikkatieto_view
    // Taustakartan rajat:
    //   kotus:pitajat
    //   kotus:rajat-sms-alueosat  murrealueenosat
    //   kotus:rajat-lansi-ita
    //   kotus:rajat-sms-alueet    murrealueet
    this.props.getGeoJSON(Object.keys(kotusLayers));

    // Base layers
    const OSMBaseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });

    const topographicalMapNLS = L.tileLayer(this.createNLSUrl('maastokartta'), {
      attribution: 'National Land Survey of Finland'
    });

    //https://www.maanmittauslaitos.fi/kartat-ja-paikkatieto/asiantuntevalle-kayttajalle/kartta-ja-paikkatietojen-rajapintapalvelut-19
    const backgroundMapNLS = L.tileLayer(this.createNLSUrl('taustakartta'), {
      attribution: 'National Land Survey of Finland'
    });

    // const accessibleMapNLS  = L.tileLayer(this.createNLSUrl('selkokartta'), {
    //   attribution: 'National Land Survey of Finland'
    // });
    //
    // const aerialPhotoMapNLS = L.tileLayer(this.createNLSUrl('ortokuva'), {
    //   attribution: 'National Land Survey of Finland'
    // });

    //console.log(this.createNLSUrl('kiinteistojaotus'));

    // Overlays
    // const realEstateMapNLS = L.tileLayer(this.createNLSUrl('kiinteistojaotus'), {
    //   attribution: 'National Land Survey of Finland'
    // });
    //
    // const realEstateIdMapNLS = L.tileLayer(this.createNLSUrl('kiinteistotunnukset'), {
    //   attribution: 'National Land Survey of Finland'
    // });

    const karelianMaps = L.tileLayer('http:///mapwarper.onki.fi/mosaics/tile/4/{z}/{x}/{y}.png', {
      attribution: 'SeCo'
    });

    const senateAtlas = L.tileLayer('http:///mapwarper.onki.fi/mosaics/tile/5/{z}/{x}/{y}.png', {
      attribution: 'SeCo'
    });

    // const westernFront = L.tileLayer('http://mapwarper.net/mosaics/tile/844/{z}/{x}/{y}.png', {
    //   attribution: 'SeCo'
    // });

    // Marker layers
    this.resultMarkerLayer = L.layerGroup();

    this.bouncingMarkerObj = null;
    this.popupMarkerObj = null;

    if (this.props.mapMode === 'cluster') {
      this.updateMarkersAndCluster(this.props.results);
    } else {
      this.updateMarkers(this.props.results);
    }

    // create map
    this.leafletMap = L.map('map', {
      center: [65.184809, 27.314050],
      zoom: 4,
      layers: [
        OSMBaseLayer,
        this.resultMarkerLayer,
      ],
      fullscreenControl: true,
    });

    // layer controls
    const baseMaps = {
      'OpenStreetMap': OSMBaseLayer,
      'Topographical map (National Land Survey of Finland)': topographicalMapNLS,
      'Background map (National Land Survey of Finland)': backgroundMapNLS,
    };
    const overlayMaps = {
      //'Search results': this.resultMarkerLayer,
      //'Real estate boundaries (National Land Survey of Finland)': realEstateMapNLS,
      //'Real estate ids (National Land Survey of Finland)': realEstateIdMapNLS,
      'Karelian maps (MapWarper)': karelianMaps,
      'Senate atlas (MapWarper)': senateAtlas,
      //'Western Front July 1917 (MapWarper)': westernFront
    };

    this.layerControl = L.control.layers(
      baseMaps,
      overlayMaps,
    ).addTo(this.leafletMap);

    L.control.opacity(
      overlayMaps, {
        collapsed: true,
        position: 'topright'
      }).addTo(this.leafletMap);

    L.Marker.setBouncingOptions({ exclusive: true });

  //     map.on('fullscreenchange', function () {
  //     if (map.isFullscreen()) {
  //         console.log('entered fullscreen');
  //     } else {
  //         console.log('exited fullscreen');
  //     }
  // });

  }

  componentDidUpdate({ results, mapMode, geoJSONKey, bouncingMarkerKey, openPopupMarkerKey }) {
    if (this.props.bouncingMarker === '' && this.bouncingMarkerObj !== null) {
      this.leafletMap.removeLayer(this.bouncingMarkerObj);
    }

    if (this.props.bouncingMarkerKey !== bouncingMarkerKey) {
      if (this.props.mapMode === 'cluster') {
        const m = this.markers[this.props.bouncingMarker];
        const latlng = m.getLatLng();
        // create a new marker so that the temporary popup can be left open
        this.bouncingMarkerObj = L.marker(latlng);
        this.bouncingMarkerObj.addTo(this.leafletMap).bounce(1);
      } else {
        this.markers[this.props.bouncingMarker].bounce(1);
      }
    }

    if (this.props.openPopupMarkerKey !== openPopupMarkerKey) {
      if (this.props.mapMode === 'cluster') {
        if (this.popupMarkerObj !== null) {
          this.leafletMap.removeLayer(this.popupMarkerObj);
        }
        this.popupMarkerObj = this.markers[this.props.popupMarker];
        this.popupMarkerObj.addTo(this.leafletMap).openPopup();
      } else {
        this.markers[this.props.popupMarker].openPopup();
      }
    }

    // check if results data or mapMode have changed
    if (this.props.results !== results || this.props.mapMode !== mapMode) {
      if (this.props.mapMode === 'cluster') {
        this.updateMarkersAndCluster(this.props.results);
      } else {
        this.updateMarkers(this.props.results);
      }
    }

    // check if geoJSON has updated
    if (this.props.geoJSONKey !== geoJSONKey) {
      this.props.geoJSON.map(obj => {
        const layer = L.geoJSON(obj.geoJSON, {
          onEachFeature: this.onEachFeature
        });
        this.layerControl.addOverlay(layer, kotusLayers[obj.layerID]);
      });
    }
  }

  renderSpinner() {
    if(this.props.fetchingPlaces) {
      return (
        <div className={this.props.classes.spinner}>
          <CircularProgress style={{ color: purple[500] }} thickness={5} />
        </div>
      );
    }
    return null;
  }

  updateMarkers(results) {
    this.resultMarkerLayer.clearLayers();
    this.markers = {};
    results.forEach(result => {
      const marker = this.createMarker(result);
      //console.log(result.s);
      this.markers[result.s] = marker;
      marker == null ? null : marker.addTo(this.resultMarkerLayer);
    });
  }

  updateMarkersAndCluster(results) {
    this.resultMarkerLayer.clearLayers();
    this.markers = {};
    const clusterer = L.markerClusterGroup();
    results.forEach(result => {
      const marker = this.createMarker(result);
      this.markers[result.s] = marker;
      marker == null ? null : clusterer.addLayer(marker);
    });
    clusterer.addTo(this.resultMarkerLayer);
  }

  createMarker(result) {
    const color = typeof result.markerColor === 'undefined' ? 'grey' : result.markerColor;
    let markerIcon = '';
    switch(color) {
      case 'violet':
        markerIcon = markerIconViolet;
        break;
      case 'yellow':
        markerIcon = markerIconYellow;
        break;
      case 'grey':
        markerIcon = markerIconGrey;
        break;
      case 'blue':
        markerIcon = markerIconBlue;
        break;
    }
    const icon = new ColorIcon({iconUrl: markerIcon });
    const { lat, long } = result;
    if (typeof lat === 'undefined' || typeof long === 'undefined') {
      return null;
    } else {
      const latLng = [+lat, +long];
      if (!has(result, 'typeLabel') || result.typeLabel == '-') {
        result.typeLabel = result.broaderTypeLabel;
      }
      const marker = L.marker(latLng, {icon: icon})
        .bindPopup(this.createPopUpContent(result));
      return marker;
    }
  }

  createPopUpContent(result) {
    const popUpTemplate = `
      <h3>{prefLabel}</h3>
      <p>Type: {typeLabel}</p>
      <p>Area: {broaderAreaLabel}</p>
      <p>Source: <a target='_blank' rel='noopener noreferrer' href={s}>{source}</a></p>
      `;
    return L.Util.template(popUpTemplate, result);
  }

  onEachFeature(feature, layer) {
    let popupContent = '';
    if (feature.id.startsWith('rajat')) {
      popupContent =  '<p>ID: ' + feature.id + '</p>';
    }
    else if (feature.id.startsWith('pitajat')) {
      if (feature.properties.NIMI) {
        popupContent +=  '<p>Nimi: ' + feature.properties.NIMI + '</p>';
      }
      popupContent +=  '<p>ID: ' + feature.id + '</p>';
    }
    layer.bindPopup(popupContent);
  }

  createNLSUrl(layerID) {
    // return 'https://avoin-karttakuva.maanmittauslaitos.fi/avoin/wmts/1.0.0/' +
    // layerID + '/default/WGS84_Pseudo-Mercator/{z}/{x}/{y}.png';

    return 'https://avoin-karttakuva.maanmittauslaitos.fi/avoin/wmts?service=WMTS' +
    '&request=GetTile&version=1.0.0&layer=' + layerID + '&style=default' +
    '&format=image/png&TileMatrixSet=WGS84_Pseudo-Mercator&TileMatrix={z}&TileRow={y}&TileCol={x}';
  }

  // createOpacitySlider() {
  //   L.Control.OpacitySlider = L.Control.extend({
  //     onAdd: function() {
  //       const slider = L.DomUtil.create('input', 'opacity-slider');
  //       slider.type = 'range';
  //       slider.min = 0;
  //       slider.max = 100;
  //       slider.value = 100;
  //       return slider;
  //     },
  //   });
  //
  //   L.control.opacitySlider = function(opts) {
  //     return new L.Control.OpacitySlider(opts);
  //   };
  //
  //   L.control.opacitySlider({ position: 'bottomleft' }).addTo(this.leafletMap);
  // }

  render() {
    return (
      <React.Fragment>
        <div className={this.props.classes.leafletContainer}>
          {/*<LeafletSidebar />*/}
          <div id="map" style={style} />
        </div>
        {this.renderSpinner()}
      </React.Fragment>
    );
  }
}

LeafletMap.propTypes = {
  classes: PropTypes.object.isRequired,
  results: PropTypes.array,
  mapMode: PropTypes.string.isRequired,
  geoJSON: PropTypes.array,
  geoJSONKey: PropTypes.number.isRequired,
  getGeoJSON: PropTypes.func.isRequired,
  bouncingMarker: PropTypes.string.isRequired,
  popupMarker: PropTypes.string.isRequired,
  bouncingMarkerKey: PropTypes.number.isRequired,
  openPopupMarkerKey: PropTypes.number.isRequired,
};

export default withStyles(styles)(LeafletMap);
