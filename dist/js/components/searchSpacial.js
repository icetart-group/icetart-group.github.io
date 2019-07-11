Vue.component('cm-searchspacial', {
    template: '#cm-searchspacial-template',
    data() {
        return {
            spacialStore: busquedaStore.data,
            selDep: '',
            selProv: '',
            selDist: '',
            selProy: ''
        }
    },
    methods: {
        changeDepartamentos(){
            busquedaStore.methods.loadProvincias(this.selDep);
            var table = 'sp_departamentos';
            var featureXML = '<wfs:GetFeature xmlns:wfs="http://www.opengis.net/wfs" service="WFS" version="1.1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"><wfs:Query typeName="'+workSpace+':'+table+'" srsName="EPSG:900913"> <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc"> <ogc:FeatureId fid="'+table+'.' + this.selDep + '"/></ogc:Filter></wfs:Query></wfs:GetFeature>';
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var parser = new DOMParser();
                    var xmlDoc = parser.parseFromString(this.response, "text/xml");
                    var postlist = xmlDoc.getElementsByTagName("gml:posList");
                    var x = postlist[postlist.length-1].textContent;
                    var extent = x.split(" ");
                    var coordenadasPol = [];
                    for (let i = 0; i < extent.length; i += 2) {
                        coordenadasPol.push([
                            parseFloat(extent[i]),
                            parseFloat(extent[i + 1])
                        ])
                    }

                    var poligon = new ol.geom.MultiPoint(coordenadasPol);

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
        },
        changeProvincias(){
            busquedaStore.methods.loadDistritos(this.selProv);
            var table = 'sp_provincias';
            var featureXML = '<wfs:GetFeature xmlns:wfs="http://www.opengis.net/wfs" service="WFS" version="1.1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"><wfs:Query typeName="'+workSpace+':'+table+'" srsName="EPSG:900913"> <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc"> <ogc:FeatureId fid="'+table+'.' + this.selProv + '"/></ogc:Filter></wfs:Query></wfs:GetFeature>';
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var parser = new DOMParser();
                    var xmlDoc = parser.parseFromString(this.response, "text/xml");
                    var x = xmlDoc.getElementsByTagName("gml:posList")[0].textContent;
                    var extent = x.split(" ");
                    var coordenadasPol = [];
                    for (let i = 0; i < extent.length; i += 2) {
                        coordenadasPol.push([
                            parseFloat(extent[i]),
                            parseFloat(extent[i + 1])
                        ])
                    }

                    var poligon = new ol.geom.MultiPoint(coordenadasPol);

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
        },
        changeDistritos(){
            var table = 'sp_distritos';
            var featureXML = '<wfs:GetFeature xmlns:wfs="http://www.opengis.net/wfs" service="WFS" version="1.1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"><wfs:Query typeName="'+workSpace+':'+table+'" srsName="EPSG:900913"> <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc"> <ogc:FeatureId fid="'+table+'.' + this.selDist + '"/></ogc:Filter></wfs:Query></wfs:GetFeature>';
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var parser = new DOMParser();
                    var xmlDoc = parser.parseFromString(this.response, "text/xml");
                    var x = xmlDoc.getElementsByTagName("gml:posList")[0].textContent;
                    var extent = x.split(" ");
                    var coordenadasPol = [];
                    for (let i = 0; i < extent.length; i += 2) {
                        coordenadasPol.push([
                            parseFloat(extent[i]),
                            parseFloat(extent[i + 1])
                        ])
                    }

                    var poligon = new ol.geom.MultiPoint(coordenadasPol);

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
        },
        changeProyectos(){
            var featureXML = '<wfs:GetFeature xmlns:wfs="http://www.opengis.net/wfs" service="WFS" version="1.1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"><wfs:Query typeName="'+workSpace+':proyectos_uefmr" srsName="EPSG:900913"> <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc"> <ogc:FeatureId fid="proyectos_uefmr.' + this.selProy + '"/></ogc:Filter></wfs:Query></wfs:GetFeature>';
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
            busquedaStore.methods.loadDepartamentos();
    }

});