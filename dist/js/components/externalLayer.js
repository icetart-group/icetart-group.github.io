Vue.component('cm-externallayer', {
    template: '#cm-externallayer-template',
    data() {
        return {
            controlCapaStore: controlCapaStore.data,
            geoserver: geoserver+"/"+workSpace,
            workSpace: workSpace,
            transparency: []
        }
    },
    methods: {
        changeLayer(nomb_capa){
            this.controlCapaStore.capaMap.forEach((element, i) => {
                if (element.nombre == nomb_capa) {
                    var visible = !element.capa.getVisible();
                    element.capa.setVisible(visible);
                    controlCapaStore.data.capas[i].checked = visible;
                    controlCapaStore.methods.legendShow(nomb_capa, element.capa.getVisible());
                }
            });
        },
        changeTrans(i, opacity){
            controlCapaStore.data.capaMap[i].capa.setOpacity(parseFloat(opacity)+1);
        },
        OpenTrans(capa){
            this.controlCapaStore.capas.forEach(element => {
                if (element.nomb_capa == capa.nomb_capa)
                    element.trans_show = !capa.trans_show;
            });        
        }
    },
    created() {
        $('.externalLayerLoad').show();
        if (loginStore.data.userLogged == true)
            controlCapaStore.methods.showList(loginStore.data.user.tipo_usuario);
    }
});

Vue.component('icm-trans', {
    props: ['fill'],    
    template: '#icm-trans',
    methods: {       
    }
});