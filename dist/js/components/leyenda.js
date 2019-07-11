var draw;

Vue.component('cm-leyenda', {
    template: '#cm-leyenda-template',
    data() {
        return { 
            imgUrl: geoserver+'/' + workSpace + '/wms?TRANSPARENT=TRUE&SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&LAYER=',
            controlCapaStore: controlCapaStore.data
        }
    },
    methods: {
        aqui() { 
            
        }
    }
});

function addInteraction() {
    draw = new ol.interaction.Draw({
        source: source,
        type: 'Polygon'
    });
    map.addInteraction(draw);
}