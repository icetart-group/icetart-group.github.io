Vue.component('cm-wmskml', {
    template: '#cm-wmskml-template',
    data() {
        return {
            wmsNameNew: '', wmsLayerNew: '', wmsNew: '', WMSMessage: '', 
            kmlNameNew: '', kmlNew: '', KMLMessage: '',
            tipo_layer: 'wms'
        }
    },
    methods: {
        addWMS() {
            //alert("Add WMS");
            var la = new ol.layer.Image({
                source: new ol.source.ImageWMS({
                    url: this.wmsNew,
                    params: { 'LAYERS': this.wmsLayerNew, 'SRS': "EPSG:900913" },
                    serverType: 'geoserver',
                    crossOrigin: 'anonymous',
                    // Countries have transparency, so do not fade tiles:
                    transition: 0
                }),
                opacity: 0.7
            });
            map.addLayer(la);
            this.WMSMessage = "Se agrego la capa exitosamente";

            var capaN = {};
            capaN.id_capa = 0;
            capaN.tabla_capa = "";
            capaN.nomb_capa = this.wmsNameNew;
            capaN.id_grupo = -1;
            capaN.grupo = "Capas externas";
            capaN.checked = true;

            var existSGroup = false            
            controlCapaStore.data.super_grupos.forEach(element => {
                if(element.nombre == "CAPAS EXTERNAS")
                    existSGroup = true;
            });
            if(!existSGroup){
                var new_grupo = {};
                new_grupo.id = 0;
                new_grupo.nombre = "CAPAS EXTERNAS";
                controlCapaStore.data.super_grupos.push(new_grupo);
            }

            var existGroup = false
            controlCapaStore.data.grupos.forEach(element => {
                if(element.grupo == "Capas externas")
                    existGroup = true;
            });
            if(!existGroup){
                var new_grupo = {};
                new_grupo.id_grupo = -1;
                new_grupo.grupo = "Capas externas";
                new_grupo.id_super_grupo = 0;
                new_grupo.name_visible = false;
                controlCapaStore.data.grupos.push(new_grupo);
            }

            controlCapaStore.data.capas.push(capaN);
            controlCapaStore.data.capaMap.push({ 'capa': la, 'nombre': this.wmsNameNew });
            controlCapaStore.data.capaVisible.push({ 'capa': la, 'nomb_capa': this.wmsNameNew, 'visible': true });
        },
        addKML() {
            var kmlFile = $('#filekml')[0].files[0];
            var reader = new FileReader();
            //if (kmlFile.type == "kml"){
            reader.onload = function () {
                    var kml = reader.result;

                var formatkml = new ol.format.KML({
                    extractStyles: true,
                    extractAttributes: true,
                    maxDepth: 2
                });
                    var svector = new ol.source.Vector({
                        params: { 'SRS': "EPSG:3857" },
                        crossOrigin: 'anonymous',
                    });


                    svector.addFeatures(formatkml.readFeatures(kml, { "dataProjection": "EPSG:3857", "featureProjection": "EPSG:3857"}));
    
                    var vector = new ol.layer.Vector({
                        source: svector
                    });
    
                    map.addLayer(vector);
                };
                this.KMLMessage = "Se agrego la capa exitosamente";
                reader.readAsText(kmlFile);
            //}
        },
        kmlChange(){
            this.kmlNew = $('#filekml')[0].files[0].name;
        },
        addKML2(){
            var la = new ol.layer.Vector({
                source: new ol.source.Vector({
                    url: this.kmlNew,
                    format: new ol.format.KML(),
                    crossOrigin: 'anonymous'
                }),
                opacity: 0.7
            });
            map.addLayer(la);
            this.KMLMessage = "Se agrego la capa exitosamente";

            var capaN = {};
            capaN.id_capa = -controlCapaStore.data.capas.length;
            capaN.tabla_capa = "";
            capaN.nomb_capa = this.kmlNameNew;
            capaN.id_grupo = -1;
            capaN.grupo = "Capas externas";
            capaN.checked = true;

            var existSGroup = false            
            controlCapaStore.data.super_grupos.forEach(element => {
                if(element.nombre == "Capas externas")
                    existSGroup = true;
            });
            if(!existSGroup){
                var new_grupo = {};
                new_grupo.id = 0;
                new_grupo.nombre = "Capas externas";
                controlCapaStore.data.super_grupos.push(new_grupo);
            }

            var existGroup = false
            controlCapaStore.data.grupos.forEach(element => {
                if(element.grupo == "Capas externas")
                    existGroup = true;
            });
            if(!existGroup){
                var new_grupo = {};
                new_grupo.id_grupo = -1;
                new_grupo.grupo = "Capas externas";
                new_grupo.id_super_grupo = 0;
                new_grupo.name_visible = false;
                controlCapaStore.data.grupos.push(new_grupo);
            }

            controlCapaStore.data.capas.push(capaN);
            controlCapaStore.data.capaMap.push({ 'capa': la, 'nombre': this.kmlNameNew });
            controlCapaStore.data.capaVisible.push({ 'capa': la, 'nomb_capa': this.kmlNameNew, 'visible': true });
        }
    },
    created() {
        
    }
});
