Vue.component('cm-searchintervtable', {
    template: '#cm-searchintervtable-template',
    data() {
        return {
            intervtStore: busquedaStore.data,
            proyectoSearch: '',
            selAcc: '',
            intervencionSearch: '',
            searchOn: true
        }
    },
    methods: {
        buscarProyecto() {
            this.searchOn = false;
            $('.searchIntervLoad').show();
            busquedaStore.methods.loadIntervenciones(this.proyectoSearch, this.selAcc, this.intervencionSearch);
        },
        regresarBuscar(){
            this.searchOn = true;
        },
        mapInterv(id_intervencion){
            var featureXML = '<wfs:GetFeature xmlns:wfs="http://www.opengis.net/wfs" service="WFS" version="1.1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"><wfs:Query typeName="'+workSpace+':sp_intervencion" srsName="EPSG:900913"> <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc"> <ogc:FeatureId fid="sp_intervencion.' + id_intervencion + '"/></ogc:Filter></wfs:Query></wfs:GetFeature>';
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var parser = new DOMParser();
                    var xmlDoc = parser.parseFromString(this.response, "text/xml");
                    var x = xmlDoc.getElementsByTagName("gml:pos")[0].textContent;
                    var extent = x.split(" ");
                    var coordenadasPol = [];
                    for (let i = 0; i < extent.length; i += 2) {
                        coordenadasPol.push([
                            parseFloat(extent[i]),
                            parseFloat(extent[i + 1])
                        ])
                    }

                    var poligon = new ol.geom.Point(coordenadasPol[0],coordenadasPol[1]);

                    map.getView().fit(poligon, map.getSize());
                    //var features = new ol.format.WFS().readFeatures(this.response);
                    console.log(extent);
                } else {
                    console.log("Error");
                }
            };
            xhttp.open("POST", geoserver+"/wfs", true);
            xhttp.setRequestHeader("Content-Type", "text/xml");
            xhttp.send(featureXML);
        }
    },
    created() {
        if (loginStore.data.userLogged == true)
            $('.searchIntervLoad').hide();
    }
});