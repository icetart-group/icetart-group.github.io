const controlCapaStore = {
	data: {
		capas: [],
		capaExternal : [],
		capaVisible: [],
		capaMap: [],
		grupos: [],
		errors: [],
		layersFilter: [],
		capasPop:{},
		filtered: {
			sp_entrega: [],
			sp_track: [],
			sp_pedidos_infm: []
		}
	},
	methods: {
		showList(rol) {
			controlCapaStore.data.capas = []; controlCapaStore.data.grupos = []; controlCapaStore.data.capaVisible= [];

			axios.get(host_base+`/capas.json`)
			//axios.get(host+`/capasuser/cargar?id=` + rol)
				.then(response => {

					response.data.data.forEach(element => {
						element.checked = true;

						var capa = {};
						capa.id_capa = element.id_capa;
						capa.tabla_capa = element.tabla_capa;
						capa.nomb_capa = element.nomb_capa;
						capa.id_grupo = element.tg_config_grupo.id_grupo;
						capa.grupo = element.tg_config_grupo.grupo;
						capa.checked = true;
						capa.trans = 0.7;
						capa.trans_show = false;
						controlCapaStore.data.capas.push(capa);
						controlCapaStore.data.capaVisible.push({ 'nomb_capa': element.nomb_capa, 'tabla_capa': element.tabla_capa, 'visible': true});

						var limiteExist = false;
						controlCapaStore.data.grupos.forEach(limit => {
							if (limit.id_grupo == element.tg_config_grupo.id_grupo)
								limiteExist = true;
						});
						if(!limiteExist){
							var new_grupo = {};
							new_grupo.id_grupo = element.tg_config_grupo.id_grupo;
							new_grupo.grupo = element.tg_config_grupo.grupo;
							new_grupo.id_super_grupo = element.tg_config_grupo.id_super_grupo;
							new_grupo.name_visible = element.tg_config_grupo.name_visible;
							controlCapaStore.data.grupos.push(new_grupo);
						}

					});

					var format = 'image/png8';
					var mSRS = "EPSG:900913";                    

					controlCapaStore.data.capas.forEach((element, index) => {
						var la = new ol.layer.Image({
							source: new ol.source.ImageWMS({
								url: geoserver+'/' + workSpace + '/wms',
								params: { 'LAYERS': workSpace + ':' + element.tabla_capa, 'SRS': mSRS, 'format': format },								
								ratio: 1, serverType: 'geoserver', crossOrigin: 'anonymous',
								// Countries have transparency, so do not fade tiles:
								// { 'LAYERS': 'uefmr:provincias', 'SRS': "EPSG:900913" }
								transition: 0
							}),
							opacity: 0.8
						});
						
						capaMapStore.data.imp += workSpace + ":"+element.tabla_capa+",";

						/*
							&viewparams=low:2000000;high:5000000
							var filterParams = [];
							filterParams["CQL_FILTER"] = "nombdpto IN ('LIMA', 'JUNIN') AND codigo_uefsa = 'Lim'"
							controlCapaStore.data.capaMap[0].capa.getSource().updateParams(filterParams);
						*/

						switch(element.tabla_capa){
							case "sp_entrega":
							case "sp_track_infm":
							case "sp_pedidos_infm":
							case "sp_pdv_cal":
							case "sp_zonas_pdv":
							case "mzna_nse_region":
								controlCapaStore.methods.visibleFalse(la, element.nomb_capa, index);
								break;
						}

						switch(element.tabla_capa){
							case "sp_entrega":
									controlCapaStore.data.filtered.sp_entrega = [la, element.nomb_capa, index];
									break;
							case "sp_track_infm":
									controlCapaStore.data.filtered.sp_track = [la, element.nomb_capa, index];
									break;
							case "sp_pedidos_infm":
									controlCapaStore.data.filtered.sp_pedidos_infm = [la, element.nomb_capa, index];
									break;
						}

						map.addLayer(la);						

						controlCapaStore.data.capaMap.push({'capa':la, 'nombre':element.nomb_capa});

						if(index+1 == controlCapaStore.data.capas.length){
							map.on('singleclick', function(evt) {
						        controlCapaStore.methods.displayInfo(evt);
						    });
						}

					});

					//capaMapStore.data.imp += capaMapStore.data.imp.substr(0, capaMapStore.data.imp.length-1);

					$('.externalLayerLoad').hide();
					map.updateSize();
				})
				.catch(e => {
					controlCapaStore.data.errors.push(e);
				})
			
		},
		legendShow(nomb_capa, visible){
			for (let i = 0; i < controlCapaStore.data.capaVisible.length; i++) {
				if (controlCapaStore.data.capaVisible[i].nomb_capa == nomb_capa){
					controlCapaStore.data.capaVisible[i].visible = visible;
					//var capaVisible_new = controlCapaStore.data.capaVisible;
					//controlCapaStore.data.capaVisible = capaVisible_new;
				}
			}
		},
		visibleFalse(layer, el, i){
			layer.setVisible(false);
			controlCapaStore.methods.legendShow(el, false);
			controlCapaStore.data.capas[i].checked = false;
		},
		visibleTrue(layer, el, i){
			layer.setVisible(true);
			controlCapaStore.methods.legendShow(el, true);
			controlCapaStore.data.capas[i].checked = true;
		},
		displayInfo(evt){
			$('#popup, #popup-content>div').hide();
			var view = map.getView();
			var viewResolution = view.getResolution();

			var features = [];
			map.forEachLayerAtPixel(evt.pixel, function (feature, layer) {							
				features.push(feature);
			});

			let layerFound = false;
			features.forEach( (el) => {
				if(el.getType() == "IMAGE" && !layerFound){

					let capa = el.getSource().getParams().LAYERS.substr(workSpace.length+1);

					var source = new ol.source.ImageWMS({
						url: geoserver+'/' + workSpace + '/wms',
						params: { 'LAYERS': workSpace + ':' + capa, 'SRS': "EPSG:900913" },
						serverType: 'geoserver',
						ratio: 1,
						// Countries have transparency, so do not fade tiles:
						transition: 0
					});
					switch(capa){
						case "sp_pedidos_infm" : 
							controlCapaStore.methods.popPedidos(evt, viewResolution, source, capa);
							layerFound = true;
							break;
						case "sp_entrega" : 
							controlCapaStore.methods.popEntrega(evt, viewResolution, source, capa);
							layerFound = true;
							break;
						case "sp_track_infm" : 
							controlCapaStore.methods.popTrack(evt, viewResolution, source, capa);
							layerFound = true;
							break;
						case "sp_pdv" : 
							controlCapaStore.methods.popPdv(evt, viewResolution, source, capa);
							layerFound = true;
							break;
						case "sp_POI" : 
							controlCapaStore.methods.popPoi(evt, viewResolution, source, capa);
							layerFound = true;
							break;
					}
				}
			})
		},
		popSpan(xmlDoc, nomb_campo, id){
			if (xmlDoc.getElementsByTagName(workSpace + ":" + nomb_campo)[0] != undefined){
				let campo = xmlDoc.getElementsByTagName(workSpace + ":" + nomb_campo)[0].textContent;
				$('#popup-'+id).text(campo);
				$('#popup-'+id).parent('li').show();
			}
			else $('#popup-'+id).parent('li').hide();
		},
		popPedidos(evt, viewResolution, source, capa){
			var url = source.getGetFeatureInfoUrl(
				evt.coordinate, viewResolution, 'EPSG:900913',
				{ 'INFO_FORMAT': 'application/vnd.ogc.gml', 'LAYERS': workSpace + ':sp_pedidos_infm', 'FEATURE_COUNT': 10 }
			);
			if (url) {
				var id_lote = "";
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function () {
					if (this.readyState == 4 && this.status == 200) {
						var parser = new DOMParser();
						var xmlDoc = parser.parseFromString(this.response, "text/xml");
						
						if (xmlDoc.getElementsByTagName(workSpace + ":sp_pedidos_infm")[0] != undefined){
							
							controlCapaStore.methods.popSpan(xmlDoc, 'ped_numpedido', 'nPed');
							controlCapaStore.methods.popSpan(xmlDoc, 'ped_fechapedido', 'fechaPed');
							controlCapaStore.methods.popSpan(xmlDoc, 'ped_vendedor', 'vendedorPed');
							controlCapaStore.methods.popSpan(xmlDoc, 'ped_cliente', 'clientePed');
							controlCapaStore.methods.popSpan(xmlDoc, 'ped_fechaentrega', 'fechaentPed');
							controlCapaStore.methods.popSpan(xmlDoc, 'ped_ordencompra', 'ordenPed');
							controlCapaStore.methods.popSpan(xmlDoc, 'ped_monto', 'montoPed');
							
							dateParse();
							$('#popup, #popup-entrega').hide();
							$('#popup, #popup-pedido').show();
						}
					}
				};
				xhttp.open("GET", url, true);
				xhttp.send();
				
				var coordinate = evt.coordinate;
				popup.setPosition(coordinate);
			}
		},
		popEntrega(evt, viewResolution, source, capa){
			var url = source.getGetFeatureInfoUrl(
				evt.coordinate, viewResolution, 'EPSG:900913',
				{ 'INFO_FORMAT': 'application/vnd.ogc.gml', 'LAYERS': workSpace + ':sp_entrega', 'FEATURE_COUNT': 10 }
			);
			if (url) {
				var id_lote = "";
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function () {
					if (this.readyState == 4 && this.status == 200) {
						var parser = new DOMParser();
						var xmlDoc = parser.parseFromString(this.response, "text/xml");
						
						if (xmlDoc.getElementsByTagName(workSpace + ":sp_entrega")[0] != undefined){
							
							controlCapaStore.methods.popSpan(xmlDoc, 'n_documento', 'nPed');
							controlCapaStore.methods.popSpan(xmlDoc, 'fecha_entrega', 'fechaEnt');
							controlCapaStore.methods.popSpan(xmlDoc, 'documento', 'docEnt');
							//controlCapaStore.methods.popSpan(xmlDoc, 'ped_vendedor', 'fotoEnt');							
							
							let cli_id = xmlDoc.getElementsByTagName(workSpace + ":" + 'cli_id')[0].textContent;
							axios.get(host+`/mo/movile/search/fotos?cli_id=`+cli_id)
							.then(response => {
								// JSON responses are automatically parsed.
								var img = response.data.data[0].image;
								$("#popup-fotoEnt").attr("src",'data:image/png;base64,'+img);
								//$('#popup-fotoEnt').src('')
							})
							.catch(e => {
								//capaStore.data.errors.push(e);
							})

							//dateParse();
							$('#popup, #popup-pedido').hide();
							$('#popup, #popup-entrega').show();
						}
					}
				};
				xhttp.open("GET", url, true);
				xhttp.send();
				
				var coordinate = evt.coordinate;
				popup.setPosition(coordinate);
			}
		},
		popTrack(evt, viewResolution, source, capa){
			var url = source.getGetFeatureInfoUrl(
				evt.coordinate, viewResolution, 'EPSG:900913',
				{ 'INFO_FORMAT': 'application/vnd.ogc.gml', 'LAYERS': workSpace + ':' + capa, 'FEATURE_COUNT': 10 }
			);
			if (url) {				
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function () {
					if (this.readyState == 4 && this.status == 200) {
						var parser = new DOMParser();
						var xmlDoc = parser.parseFromString(this.response, "text/xml");
						
						if (xmlDoc.getElementsByTagName(workSpace + ":" + capa)[0] != undefined){
							
							controlCapaStore.methods.popSpan(xmlDoc, 'rep_nombre', 'trackRep');
							controlCapaStore.methods.popSpan(xmlDoc, 'fecha_track', 'trackFech');
							
							$('#popup, #popup-content>div').hide();
							$('#popup, #popup-track').show();
						}
					}
				};
				xhttp.open("GET", url, true);
				xhttp.send();
				
				var coordinate = evt.coordinate;
				popup.setPosition(coordinate);
			}
		},
		popPdv(evt, viewResolution, source, capa){
			var url = source.getGetFeatureInfoUrl(
				evt.coordinate, viewResolution, 'EPSG:900913',
				{ 'INFO_FORMAT': 'application/vnd.ogc.gml', 'LAYERS': workSpace + ':' + capa, 'FEATURE_COUNT': 10 }
			);
			if (url) {				
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function () {
					if (this.readyState == 4 && this.status == 200) {
						var parser = new DOMParser();
						var xmlDoc = parser.parseFromString(this.response, "text/xml");
						
						if (xmlDoc.getElementsByTagName(workSpace + ":" + capa)[0] != undefined){
							
							controlCapaStore.methods.popSpan(xmlDoc, 'nombre', 'pdvNombre');
							controlCapaStore.methods.popSpan(xmlDoc, 'razsoc', 'pdvrazsoc');
							controlCapaStore.methods.popSpan(xmlDoc, 'rubro', 'pdvrubro');
							controlCapaStore.methods.popSpan(xmlDoc, 'tipoloc', 'pdvtipoloc');
							controlCapaStore.methods.popSpan(xmlDoc, 'distrito', 'pdvdistrito');
							controlCapaStore.methods.popSpan(xmlDoc, 'direcc', 'pdvdirecc');
							
							$('#popup, #popup-content>div').hide();
							$('#popup, #popup-pdv').show();
						}
					}
				};
				xhttp.open("GET", url, true);
				xhttp.send();
				
				var coordinate = evt.coordinate;
				popup.setPosition(coordinate);
			}
		},
		popPoi(evt, viewResolution, source, capa){
			var url = source.getGetFeatureInfoUrl(
				evt.coordinate, viewResolution, 'EPSG:900913',
				{ 'INFO_FORMAT': 'application/vnd.ogc.gml', 'LAYERS': workSpace + ':' + capa, 'FEATURE_COUNT': 10 }
			);
			if (url) {
				var id_lote = "";
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function () {
					if (this.readyState == 4 && this.status == 200) {
						var parser = new DOMParser();
						var xmlDoc = parser.parseFromString(this.response, "text/xml");
						
						if (xmlDoc.getElementsByTagName(workSpace + ":" + capa)[0] != undefined){
							
							controlCapaStore.methods.popSpan(xmlDoc, 'descripcion', 'poiDescripcion');
							
							$('#popup, #popup-content>div').hide();
							$('#popup, #popup-poi').show();
						}
					}
				};
				xhttp.open("GET", url, true);
				xhttp.send();
				
				var coordinate = evt.coordinate;
				popup.setPosition(coordinate);
			}
		},
	}
};
//http://localhost:8080/GlgisSMP/catastro/capasuser/cargar?id=gl_administrador