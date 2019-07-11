Vue.component('cm-searchintervencion', {
    template: '#cm-searchintervencion-template',
    data() {
        return {
            intervStore: busquedaStore.data,
            selDep: '',
            selProv: '',
            selDist: '',
            selProy: '',
            selInt: '',
            selEst: '',
            codInv: '',
            codObra: '',
            qocha: {
                longitud_s: '=',
                longitud: '',
                ancho_s: '=',
                ancho: '',
                altura_s: '=',
                altura: '',
                corona_s: '=',
                corona: '',
                area_cd_s: '=',
                area_cd: '',
                area_sd_s: '=',
                area_sd: '',
                volumen_s: '=',
                volumen: ''
            },
            amuna: {
                ancho_s: '=',
                ancho: '',
                longitud_s: '=',
                longitud: ''
            },
            zanja: {
                longitud_s: '=',
                longitud: '',
                area_s: '=',
                area: ''
            },
            reforestacion: {
                area_s: '=',
                area: '',
                distancia_s: '=',
                distancia: ''
            },
            revegetacion: {
                area_s: '=',
                area: '',
                n_plantas_s: '=',
                n_plantas: ''
            },
            bofedal: {
                area_i_s: '=',
                area_i: '',
                area_f_s: '=',
                area_f: ''
            }
        }
    },
    methods: {
        changeDepartamentos(){
            busquedaStore.methods.loadProvincias(this.selDep);

            var featureXML = '<wfs:GetFeature xmlns:wfs="http://www.opengis.net/wfs" service="WFS" version="1.1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"><wfs:Query typeName="'+workSpace+':departamentos" srsName="EPSG:900913"> <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc"> <ogc:FeatureId fid="departamentos.' + this.selDep + '"/></ogc:Filter></wfs:Query></wfs:GetFeature>';
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

            var featureXML = '<wfs:GetFeature xmlns:wfs="http://www.opengis.net/wfs" service="WFS" version="1.1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"><wfs:Query typeName="'+workSpace+':provincias" srsName="EPSG:900913"> <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc"> <ogc:FeatureId fid="provincias.' + this.selProv + '"/></ogc:Filter></wfs:Query></wfs:GetFeature>';
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
            busquedaStore.methods.loadProyectosSa(this.selDist);

            var featureXML = '<wfs:GetFeature xmlns:wfs="http://www.opengis.net/wfs" service="WFS" version="1.1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"><wfs:Query typeName="'+workSpace+':distritos" srsName="EPSG:900913"> <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc"> <ogc:FeatureId fid="distritos.' + this.selDist + '"/></ogc:Filter></wfs:Query></wfs:GetFeature>';
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
            busquedaStore.methods.loadAcciones(this.selInt);

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
        },
        changeAccion(){
            var featureXML = '<wfs:GetFeature xmlns:wfs="http://www.opengis.net/wfs" service="WFS" version="1.1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"><wfs:Query typeName="'+workSpace+':sp_intervencion" srsName="EPSG:900913"> <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc"> <ogc:FeatureId fid="sp_intervencion.' + this.selInt + '"/></ogc:Filter></wfs:Query></wfs:GetFeature>';
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
        },
        filtrarMap(){
            var filterParams = [];
            let f_checkdpd = "";

            let f_checkdt = "";
            var checkeadosDep = $('.placeDep input[type="checkbox"]:checked');
            $.each( checkeadosDep, (i, el) => {
                f_checkdt += "'" + el.dataset.coddept + "'";
                if(i != checkeadosDep.length-1)
                    f_checkdt += ", "
            })
            if(checkeadosDep.length > 0)
                f_checkdt = "nomb_departamento IN ("+f_checkdt+")";
            f_checkdpd = f_checkdt;

            let f_checkp = "";
            var checkeadosProv = $('.placeDep input[type="checkbox"]:not(:checked)').parent().siblings('.row').find('.placeProv input[type="checkbox"]:checked');
            $.each( checkeadosProv, (i, el) => {
                f_checkp += "'" + el.dataset.codprov + "'";
                if(i != checkeadosProv.length-1)
                    f_checkp += ", "
            })
            if(checkeadosProv.length > 0)
                f_checkp = "cod_provincia IN ("+f_checkp+")";
            if(f_checkdpd != "" && f_checkp!= ""){ f_checkdpd += " OR " }
            f_checkdpd += f_checkp;


            let f_checkd = "";
            var checkeadosDist = $('.placeProv input[type="checkbox"]:not(:checked)').parent().siblings('.row').find('input[type="checkbox"]:checked');
            $.each( checkeadosDist, (i, el) => {
                f_checkd += "'" + el.dataset.coddist + "'";
                if(i != checkeadosDist.length-1)
                    f_checkd += ", "
            })
            if(checkeadosDist.length > 0)
                f_checkd = "cod_distrito IN ("+f_checkd+")";
            if(f_checkdpd != "" && f_checkd!= ""){ f_checkdpd += " OR " }
            f_checkdpd += f_checkd;

            let f_obra = "";
            if(this.codObra != "")
                f_obra = " AND cod_obra = '" + this.codObra + "'";

            let f_inv = "";
            if(this.codInv != "")
                f_inv = " AND cod_inversion = '" + this.codInv + "'";

            let accion = "";
            if(this.selInt != 0){
                accion = " AND id_tipo_accion = '" + this.selInt + "'";
                if(this.selInt == 1)
                    accion += this.getQocha();
                if(this.selInt == 2)
                    accion += this.getAmuna();
                if(this.selInt == 3)
                    accion += this.getZanja();
                if(this.selInt == 4)
                    accion += this.getReforestacion();
                if(this.selInt == 5)
                    accion += this.getRevegetacion();
                if(this.selInt == 6)
                    accion += this.getBofedal();
            }

            let estado = "";
            if(this.selEst != 0)
                estado = " AND id_est_obra = '" + this.selEst + "'";

            //debugger;

            filterParams["CQL_FILTER"] = "(" + f_checkdpd + ")" + f_obra + f_inv + accion + estado;
            controlCapaStore.data.layersFilter.forEach(el => {
                el.getSource().updateParams(filterParams);
            })
        },
        getQocha(){
            var qocha_str = "";
            var params = [this.qocha.longitud, this.qocha.ancho, this.qocha.altura, this.qocha.corona, this.qocha.area_cd, this.qocha.area_sd, this.qocha.volumen];
            var params_s = [this.qocha.longitud_s, this.qocha.ancho_s, this.qocha.altura_s, this.qocha.corona_s, this.qocha.area_cd_s, this.qocha.area_sd_s, this.qocha.volumen_s];
            
            if(params[0] != ""){
                if(qocha_str == "")
                    qocha_str += " AND "
                qocha_str += "longitud "+params_s[0]+" '" + params[0] + "'";
            }
            if(params[1] != ""){
                if(qocha_str == "")
                    qocha_str += " AND "
                qocha_str += "ancho "+params_s[1]+" '" + params[1] + "'";
            }
            if(params[2] != ""){
                if(qocha_str == "")
                    qocha_str += " AND "
                qocha_str += "altura "+params_s[2]+" '" + params[2] + "'";
            }
            if(params[3] != ""){
                if(qocha_str == "")
                    qocha_str += " AND "
                qocha_str += "corona "+params_s[3]+" '" + params[3] + "'";
            }
            if(params[4] != ""){
                if(qocha_str == "")
                    qocha_str += " AND "
                qocha_str += "area_cd "+params_s[4]+" '" + params[4] + "'";
            }
            if(params[5] != ""){
                if(qocha_str == "")
                    qocha_str += " AND "
                qocha_str += "area_sd "+params_s[5]+" '" + params[5] + "'";
            }
            if(params[6] != ""){
                if(qocha_str == "")
                    qocha_str += " AND "
                qocha_str += "volumen "+params_s[6]+" '" + params[6] + "'";
            }
            
            return qocha_str;
        },        
        getAmuna(){
            var accion_str = "";
            var params = [this.amuna.longitud, this.amuna.ancho];
            var params_s = [this.amuna.longitud_s, this.amuna.ancho_s];
            
            if(params[0] != ""){
                if(accion_str == "")
                    accion_str += " AND "
                accion_str += "longitud "+params_s[0]+" '" + params[0] + "'";
            }
            if(params[1] != ""){
                if(accion_str == "")
                    accion_str += " AND "
                accion_str += "ancho "+params_s[1]+" '" + params[1] + "'";
            }
            return accion_str;
        },
        getZanja(){
            var accion_str = "";
            var params = [this.zanja.longitud, this.zanja.area];
            var params_s = [this.zanja.longitud_s, this.zanja.area_s];
            
            if(params[0] != ""){
                if(accion_str == "")
                    accion_str += " AND "
                accion_str += "longitud "+params_s[0]+" '" + params[0] + "'";
            }
            if(params[1] != ""){
                if(accion_str == "")
                    accion_str += " AND "
                accion_str += "area "+params_s[1]+" '" + params[1] + "'";
            }
            return accion_str;
        },
        getReforestacion(){
            var accion_str = "";
            var params = [this.reforestacion.area, this.reforestacion.distancia];
            var params_s = [this.reforestacion.area_s, this.reforestacion.distancia_s];
            
            if(params[0] != ""){
                if(accion_str == "")
                    accion_str += " AND "
                accion_str += "area "+params_s[0]+" '" + params[0] + "'";
            }
            if(params[1] != ""){
                if(accion_str == "")
                    accion_str += " AND "
                accion_str += "distancia "+params_s[1]+" '" + params[1] + "'";
            }
            return accion_str;
        },
        getRevegetacion(){
            var accion_str = "";
            var params = [this.revegetacion.area, this.revegetacion.n_plantas];
            var params_s = [this.revegetacion.area_s, this.revegetacion.n_plantas_s];
            
            if(params[0] != ""){
                if(accion_str == "")
                    accion_str += " AND "
                accion_str += "area "+params_s[0]+" '" + params[0] + "'";
            }
            if(params[1] != ""){
                if(accion_str == "")
                    accion_str += " AND "
                accion_str += "nro_planta "+params_s[1]+" '" + params[1] + "'";
            }
            return accion_str;
        },
        getBofedal(){
            var accion_str = "";
            var params = [this.bofedal.area_i, this.bofedal.area_f];
            var params_s = [this.bofedal.area_i_s, this.bofedal.area_f_s];
            
            if(params[0] != ""){
                if(accion_str == "")
                    accion_str += " AND "
                accion_str += "area_ini "+params_s[0]+" '" + params[0] + "'";
            }
            if(params[1] != ""){
                if(accion_str == "")
                    accion_str += " AND "
                accion_str += "area_fin "+params_s[1]+" '" + params[1] + "'";
            }
            return accion_str;
        },

    },
    created() {
        if (loginStore.data.userLogged == true)
            busquedaStore.methods.loadDepartamentos();
        busquedaStore.methods.loadDepCheck();
        busquedaStore.methods.loadAcciones();
    }

});