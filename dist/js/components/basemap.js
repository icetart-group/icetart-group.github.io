Vue.component('cm-basemap', {
    template: '#cm-basemap-template',
    data() {
        return {
            basemapStore: [
                { id: 1, name: "OpenStreet Map", img: "m-osm.jpg"},
                { id: 2, name: "Bing Maps", img: "m-bing-road.png"},
                { id: 3, name: "Bing Aerial", img: "m-bing-sat.jpg"},
                { id: 6, name: "Topográfico", img: "m-topo.jpg"},
                { id: 7, name: "National Geographic", img: "m-natgeo.jpg"},
                { id: 8, name: "Imágenes", img: "m-imagery.jpg"},
                { id: 10, name: "Océanos", img: "m-ocean.jpg"},
                { id: 11, name: "Lona gris oscuro", img: "m-dark-grey.png"},
                { id: 12, name: "Lona gris claro", img: "m-light-gray.jpg"},
                { id: 13, name: "Terreno con etiquetas", img: "m-terrain.png"},
                { id: 14, name: "Calles", img: "m-street.jpg"},
                { id: 15, name: "Google Maps", img: "m-google-road.png"},
                { id: 16, name: "Google Satelite", img: "m-google-sat.png"}
            ], 
            selectBase: 1
        }
    },
    methods: {
        changeBase() {
            layerVisible();
            switch (this.selectBase) {
                case 1:
                    osm.setVisible(true);
                    break;
                case 2:
                    bing.setVisible(true);
                    break;
                case 3:
                    bingAerial.setVisible(true);
                    break;                
                case 6:
                    topografico.setVisible(true);
                    break;
                case 7: 
                    natgeo.setVisible(true);
                    break;
                case 8: 
                    imagery.setVisible(true);
                    break;                
                case 10: 
                    oceanos.setVisible(true);
                    break;
                case 11: 
                    darkgrey.setVisible(true);
                    break;
                case 12: 
                    lightgray.setVisible(true);
                    break;
                case 13: 
                    terrenoLabels.setVisible(true);
                    break;
                case 14: 
                    calles.setVisible(true);
                    break;
                case 15: 
                    google2.setVisible(true);
                    break;
                case 16: 
                    googles2.setVisible(true);
                    break;
                default:
                    osm.setVisible(true);
                    break;
            }
        }
    },
    created() {
        $('.baseMapLoad').hide();
    }
});

function layerVisible() {
    listLayers.forEach(el => {
        el.setVisible(false);
    })    
}