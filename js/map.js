/* List of layer's */
var osm = new ol.layer.Tile({
    preload: Infinity,
    source: new ol.source.OSM()
})
var bingKey = "ApTJzdkyN1DdFKkRAE6QIDtzihNaf6IWJsT-nQ_2eMoO4PN__0Tzhl2-WgJtXFSp";
var bing = new ol.layer.Tile({
    preload: Infinity,
    source: new ol.source.BingMaps({
        key: bingKey,
        imagerySet: "Road"
    }),
    visible: false
});
var bingAerial = new ol.layer.Tile({
    preload: Infinity,
    source: new ol.source.BingMaps({
        key: bingKey,
        imagerySet: "AerialWithLabels"
    }),
    visible: false
});

var topografico = new ol.layer.Tile({
    source: new ol.source.XYZ({
        attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
    }),
    visible: false
});
var natgeo = new ol.layer.Tile({
    source: new ol.source.XYZ({
        attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/NatGeo_World_Map/MapServer">ArcGIS</a>',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}'
    }),
    visible: false
});
var imagery = new ol.layer.Tile({
    source: new ol.source.XYZ({
        attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/NatGeo_World_Map/MapServer">ArcGIS</a>',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Imagery/MapServer/tile/{z}/{y}/{x}'
    }),
    visible: false
});
var imageryLabels = new ol.layer.Tile({
    source: new ol.source.XYZ({
        attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/NatGeo_World_Map/MapServer">ArcGIS</a>',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'
    }),
    visible: false
});
var oceanos = new ol.layer.Tile({
    source: new ol.source.XYZ({
        attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/NatGeo_World_Map/MapServer">ArcGIS</a>',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}'
    }),
    visible: false
});
var darkgrey = new ol.layer.Tile({
    source: new ol.source.XYZ({
        attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/NatGeo_World_Map/MapServer">ArcGIS</a>',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
    }),
    visible: false
});
var lightgray = new ol.layer.Tile({
    source: new ol.source.XYZ({
        attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/NatGeo_World_Map/MapServer">ArcGIS</a>',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
    }),
    visible: false
});
var terrenoLabels = new ol.layer.Tile({
    source: new ol.source.XYZ({
        attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/NatGeo_World_Map/MapServer">ArcGIS</a>',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Terrain_Base/MapServer/tile/{z}/{y}/{x}'
    }),
    visible: false
});
var calles = new ol.layer.Tile({
    source: new ol.source.XYZ({
        attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Street_Map/MapServer">ArcGIS</a>',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Street_Map/MapServer/tile/{z}/{y}/{x}'
    }),
    visible: false
});
var google2 = new ol.layer.Tile({
    source: new ol.source.XYZ({
        attributions: 'Tiles © <a href="https://www.google.com">Google, 2015</a>',
        url: 'http://mt1.google.com/vt/lyrs=m&hl=es&gl=es&x={x}&y={y}&z={z}&s=png'
    }),
    visible: false
});
var googles2 = new ol.layer.Tile({
    source: new ol.source.XYZ({
        attributions: 'Tiles © <a href="https://www.google.com">Google, 2015</a>',
        url: 'http://mt1.google.com/vt/lyrs=s&hl=es&gl=es&x={x}&y={y}&z={z}&s=png'
    }),
    visible: false
});
/* 
http://mt${subDomain}.google.com/vt/lyrs=m&hl=en&gl=en&x=${col}&y=${row}&z=${level}&s=png",
https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/6/33/16 
*/
var scaleLineControl = new ol.control.ScaleLine({
    units: 'metric',
    minWidth: 100
});

var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: 'EPSG:4326',    
    className: 'custom-mouse-position',
    target: document.getElementById('lblCoordinate'),
    undefinedHTML: '&nbsp;'
});
var projectionSelect = document.getElementById('spatialReference');
    projectionSelect.addEventListener('change', function(event) {
        mousePositionControl.setProjection(event.target.value);
});

var overviewMap = new ol.control.OverviewMap({
    collapsed: true,
    label: "«",
    collapseLabel: "»",
    layers: [
        osm, bing, topografico, 
        natgeo, imagery, oceanos, 
        darkgrey, lightgray, terrenoLabels, calles, google2, googles2],
    view: new ol.View({
        center: ol.proj.transform([-74.41177369, -9.65914919], "EPSG:4326", "EPSG:3857"),
        zoom: 6
    })
});

var listLayers = [
        osm, bing, bingAerial, topografico, 
        natgeo, imagery, oceanos, 
        darkgrey, lightgray, terrenoLabels, calles, google2, googles2
    ];
var map = new ol.Map({    
    layers: listLayers,
    target: 'map',
    controls: ol.control.defaults({
        zoom: false,
        rotate: false,
        attribution: false,
        attributionOptions: {
            collapsible: false
        }
    }).extend([
        scaleLineControl, overviewMap, mousePositionControl
    ]),
    view: new ol.View({
        center: ol.proj.transform([-74.41177369, -9.65914919], "EPSG:4326", "EPSG:3857"),
        zoom: 6
    })
});
overviewMap.render();

//var olGM = new olgm.OLGoogleMaps({map: map}); // map is the ol.Map instance
//olGM.activate();

var dragZoom = new ol.interaction.DragZoom();

var el_popup = document.getElementById('popup');
var popup = new ol.Overlay({
    element: el_popup,
    autoPan: true
});
map.addOverlay(popup);

$('#zoom-out').click(function () {
    var view = map.getView();
    var zoom = view.getZoom();
    view.animate({
        zoom: zoom - 1,
        duration: 500
    });
});

$('#zoom-in').click(function () {
    var view = map.getView();
    var zoom = view.getZoom();
    view.animate({
        zoom: zoom + 1,
        duration: 500
    });
});

$('#zoomMax').click(function () {
    var view = map.getView();
    var p900913 = ol.proj.get("EPSG:3857");
    var p4326 = ol.proj.get("EPSG:4326");
    var LonLat = ol.proj.transform([-74.41177369, -9.65914919], p4326, p900913)

    view.animate({
        zoom: 5,
        center: LonLat,
        duration: 500
    });
});

$('#geolocMap').click(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var view = map.getView();
            var p900913 = ol.proj.get("EPSG:3857");
            var p4326 = ol.proj.get("EPSG:4326");
            var LonLat = ol.proj.transform([position.coords.longitude, position.coords.latitude], p4326, p900913)

            view.animate({
                zoom: 17,
                center: LonLat,
                duration: 500
            });
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
});

$('#zoomBox, #measure, #draw').click(function () {
    $(this).find('.map-option-list').slideToggle();
});

var draw, snapDraw, modifyDraw;
var drawSource = new ol.source.Vector({ wrapX: false, crossOrigin: 'anonymous' });
var vectorDraw = new ol.layer.Vector({ source: drawSource });
map.addLayer(vectorDraw);
var modifyDraw = new ol.interaction.Modify({ source: drawSource });
map.addInteraction(modifyDraw);

function drawMap(select) {
    draw = new ol.interaction.Draw({
        source: drawSource,
        type: select
    });
    map.addInteraction(draw);
    snapDraw = new ol.interaction.Snap({ source: drawSource });
    map.addInteraction(snapDraw);
}
$('#draw li').on("click", function () {
    removeInteractions();
    drawMap($(this).data('draw-type'));
})

//Export to Image
$('#mapImg').click(function () {
    removeInteractions();
    map.once('postcompose', function (event) {
        var canvas = event.context.canvas;
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
        } else {
            canvas.toBlob(function (blob) {
                saveAs(blob, 'map.png');
            });
        }
    });
    map.renderSync();
});

var loading = 0;
var loaded = 0;

//PDF
$('#mapPdf').click(function () {
    document.body.style.cursor = 'progress';
    removeInteractions();

    //var format = document.getElementById('format').value;
    var resolution = 150;
    //var dim = dims[format];
    var dim = [297, 210]
    var width = Math.round(dim[0] * resolution / 25.4);
    var height = Math.round(dim[1] * resolution / 25.4);
    var size = /** @type {ol.Size} */ (map.getSize());
    var extent = map.getView().calculateExtent(size);

    if(osm.getVisible())
        var source = osm.getSource();
    else if(bing.getVisible())
        var source = bing.getSource();
    else if(bingAerial.getVisible())
        var source = bingAerial.getSource();    
    else var source = vectorDraw.getSource();


    var tileLoadStart = function () {
        ++loading;
    };

    var tileLoadEnd = function () {
        ++loaded;
        if (loading === loaded) {
            var canvas = this;
            window.setTimeout(function () {
                loading = 0;
                loaded = 0;
                var data = canvas.toDataURL('image/png');
                var pdf = new jsPDF('landscape', undefined, "a4");
                pdf.addImage(data, 'JPEG', 0, 0, dim[0], dim[1]);
                pdf.save('map.pdf');
                source.un('tileloadstart', tileLoadStart);
                source.un('tileloadend', tileLoadEnd, canvas);
                source.un('tileloaderror', tileLoadEnd, canvas);
                map.setSize(size);
                map.getView().fit(extent);
                map.renderSync();
                document.body.style.cursor = 'auto';
            }, 100);
        }
    };

    map.once('postcompose', function (event) {
        source.on('tileloadstart', tileLoadStart);
        source.on('tileloadend', tileLoadEnd, event.context.canvas);
        source.on('tileloaderror', tileLoadEnd, event.context.canvas);
    });

    map.setSize([width, height]);
    map.getView().fit(extent);
    map.renderSync();
});

//Hitory
ol.control.NavigationHistory = function (opt_options) {
    var options = opt_options || {};
    var _this = this;

    $('#prevView').on('click', function () {
        var historyArray = _this.get('history');
        var currIndex = _this.get('index');
        if (currIndex > 0) {
            currIndex -= 1;
            _this.setProperties({
                shouldSave: false,
                index: currIndex
            });
            var view = map.getView();
            view.setProperties(historyArray[currIndex]);
        }
    })
    $('#prevView').disabled = true;

    $('#nextView').on('click', function () {
        var historyArray = _this.get('history');
        var currIndex = _this.get('index');
        if (currIndex < historyArray.length - 1) {
            currIndex += 1;
            _this.setProperties({
                shouldSave: false,
                index: currIndex
            });
            var view = map.getView();
            view.setProperties(historyArray[currIndex]);
        }
    });
    $('#nextView').disabled = true;


    ol.control.Control.call(this, {
        element: $('#map-options'),
        target: options.target
    });
    this.setProperties({
        history: [],
        index: -1,
        maxSize: options.maxSize || 50,
        eventId: null,
        shouldSave: true
    });
    this.on('change:index', function () {
        if (this.get('index') === 0) {
            $('#prevView').disabled = true;
        } else {
            $('#prevView').disabled = false;
        }
        if (this.get('history').length - 1 === this.get('index')) {
            $('#nextView').disabled = true;
        } else {
            $('#nextView').disabled = false;
        }
    });

    map.on('moveend', function (evt) {
        if (_this.get('shouldSave')) {
            var view = map.getView();
            var viewStatus = {
                center: view.getCenter(),
                resolution: view.getResolution(),
                rotation: view.getRotation()
            };
            var historyArray = _this.get('history');
            var currIndex = _this.get('index');
            historyArray.splice(currIndex + 1, historyArray.length - currIndex - 1);
            if (historyArray.length === _this.get('maxSize')) {
                historyArray.splice(0, 1);
            } else {
                currIndex += 1;
            }
            historyArray.push(viewStatus);
            _this.set('index', currIndex);
        } else {
            _this.set('shouldSave', _this);
        }
    });
};
ol.inherits(ol.control.NavigationHistory, ol.control.Control);

new ol.control.NavigationHistory();

//Measure
var drawMeasure; //Global draw of measure
var sketch; // Currently drawn feature
var helpTooltipElement; //The help tooltip element.
var helpTooltip; //Overlay to show the help messages.
var measureTooltipElement; //The measure tooltip element.
var measureTooltip; //Overlay to show the measurement.
var continuePolygonMsg = 'Click para continuar dibujando el poligono'; //Message to show when the user is drawing a polygon.
var continueLineMsg = 'Click para continuar dibujando la linea'; //Message to show when the user is drawing a line.
var statusMeasure = 0;

var pointerMoveHandler = function (evt) {
    if (!statusMeasure || evt.dragging){
        return;
    }
    
    var helpMsg = 'Click para empezar a dibujar';

    if (sketch) {
        var geom = (sketch.getGeometry());
        if (geom instanceof ol.geom.Polygon) {
            helpMsg = continuePolygonMsg;
        } else if (geom instanceof ol.geom.LineString) {
            helpMsg = continueLineMsg;
        }
    }

    helpTooltipElement.innerHTML = helpMsg;
    helpTooltip.setPosition(evt.coordinate);

    helpTooltipElement.classList.remove('hide');
};
map.on('pointermove', pointerMoveHandler);

map.getViewport().addEventListener('mouseout', function () {
    if(statusMeasure)
        helpTooltipElement.classList.add('hide');
});

var formatLength = function (line) {
    var length = ol.Sphere.getLength(line);
    var output;
    if (length > 100) {
        output = (Math.round(length / 1000 * 100) / 100) +
            ' ' + 'km';
    } else {
        output = (Math.round(length * 100) / 100) +
            ' ' + 'm';
    }
    return output;
};

var formatArea = function (polygon) {
    var area = ol.Sphere.getArea(polygon);
    var output;
    if (area > 10000) {
        output = (Math.round(area / 1000000 * 100) / 100) +
            ' ' + 'km<sup>2</sup>';
    } else {
        output = (Math.round(area * 100) / 100) +
            ' ' + 'm<sup>2</sup>';
    }
    return output;
};

function addInteractionMeasure(type) {
    drawMeasure = new ol.interaction.Draw({
        source: drawSource,
        type: type,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 0, 0.5)',
                lineDash: [10, 10],
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.7)'
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                })
            })
        })
    });

    map.addInteraction(drawMeasure);

    createMeasureTooltip();
    createHelpTooltip();

    var listener;
    drawMeasure.on('drawstart',
        function (evt) {
            // set sketch
            sketch = evt.feature;

            /** @type {ol.Coordinate|undefined} */
            var tooltipCoord = evt.coordinate;

            listener = sketch.getGeometry().on('change', function (evt) {
                var geom = evt.target;
                var output;
                if (geom instanceof ol.geom.Polygon) {
                    output = formatArea(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof ol.geom.LineString) {
                    output = formatLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
            });
        }, this);

    drawMeasure.on('drawend',
        function () {
            measureTooltipElement.className = 'tooltip tooltip-static';
            measureTooltip.setOffset([0, -7]);
            // unset sketch
            sketch = null;
            // unset tooltip so that a new one can be created
            measureTooltipElement = null;
            createMeasureTooltip();
            ol.Observable.unByKey(listener);
        }, this);
}

function createHelpTooltip() {
    if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'tooltip hide';
    helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
    });
    map.addOverlay(helpTooltip);
}

function createMeasureTooltip() {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'tooltip tooltip-measure';
    measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
    });
    map.addOverlay(measureTooltip);
}

$("#measure li").on("click", function () {
    removeInteractions();
    statusMeasure = 1;
    addInteractionMeasure($(this).data("measure-type"));
})


//Navegar en el mapa, sin poligonos o medida
$('#navMap').click(function () {
    removeInteractions();
    if (!$(helpTooltipElement).hasClass("hide")) {
        $(helpTooltipElement).addClass("hide");
    }
    statusMeasure = 0;
    //helpTooltipElement.classList.add('hidden');
    //map.removeLayer(osm);
});

function removeInteractions(){
    map.removeInteraction(draw);
    map.removeInteraction(drawH);
    map.removeInteraction(snapDraw);
    map.removeInteraction(snapDrawH);
    map.removeInteraction(drawMeasure);
}

var sourceHouse = new ol.source.Vector({ wrapX: false, crossOrigin: 'anonymous' });
var vectorHouse = new ol.layer.Vector({ source: sourceHouse });
var drawH, snapDrawH, iconFeature, iconfeaturen, terrenoMap;

terrenoMap = false;

function drawHouse(select) {
    drawH = new ol.interaction.Draw({
        source: sourceHouse,
        type: select,
        style: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.95,
                src: 'assets/images/icon.png'
            })
        })
    });
    map.addInteraction(drawH);
    snapDrawH = new ol.interaction.Snap({ source: sourceHouse });
    map.addInteraction(snapDrawH);
}

map.addLayer(vectorHouse);
$('body').on("click", '.ubicar_lonlat', function(){
    removeInteractions();
    drawHouse('Point');
})

map.on('click', function(evt) {
    if(terrenoMap){
        var lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
        var lon = lonlat[0];
        var lat = lonlat[1];
        $('.lon-map').val(lon);
        $('.lat-map').val(lat);

        iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(evt.coordinate),
            name: 'Null Island',
            population: 4000,
            rainfall: 500
        });
        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: 'assets/images/icon.png'
            })
          });
        iconFeature.setStyle(iconStyle);
        sourceHouse.clear();
        sourceHouse.addFeature(iconFeature)
    }
});