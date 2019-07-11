var draw;

Vue.component('cm-coordenadas', {
    template: '#cm-coordenadas-template',
    data() {
        return {
            coorLongitud: '',
            coorLatitud: '',
            coorZoom: '',
            coorSR: 'EPSG:4326'
        }
    },
    methods: {
        showCoordenada() {
            var view = map.getView();
             
            //proj4.defs('EPSG:3857');
            //proj4.defs(this.coorSR);

            var pTo = ol.proj.get("EPSG:3857");
            var pFrom = ol.proj.get(this.coorSR);
            
            var coord = [parseFloat(this.coorLongitud), parseFloat(this.coorLatitud)]; //[-75, -12]; //
            var LonLat = ol.proj.transform(coord, this.coorSR, pTo)

            view.animate({
                zoom: this.coorZoom,
                center: LonLat,
                duration: 500
            });
            //view.getProjection
        }
    },
    created() {        
        proj4.defs("EPSG:3857","+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs");
        proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");
        proj4.defs("EPSG:24877","+proj=utm +zone=17 +south +ellps=intl +towgs84=-288,175,-376,0,0,0,0 +units=m +no_defs");
        proj4.defs("EPSG:24878","+proj=utm +zone=18 +south +ellps=intl +towgs84=-288,175,-376,0,0,0,0 +units=m +no_defs");
        proj4.defs("EPSG:24879","+proj=utm +zone=19 +south +ellps=intl +towgs84=-288,175,-376,0,0,0,0 +units=m +no_defs");
        proj4.defs("EPSG:32717","+proj=utm +zone=17 +south +datum=WGS84 +units=m +no_defs");
        proj4.defs("EPSG:32718","+proj=utm +zone=18 +south +datum=WGS84 +units=m +no_defs");
        proj4.defs("EPSG:32719","+proj=utm +zone=19 +south +datum=WGS84 +units=m +no_defs");
    }
});