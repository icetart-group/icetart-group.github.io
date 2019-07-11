const capaMapStore = {
    data: {
        basemap: [],
        imp: "",
        mzna: {},
        sector: {},
        lote: {},
        ctrl: {},
        vector2: {},
        lindero: {},
        idmap: {},
        errors: []
    },
    methods: {
        addCapa(capa, name){
            leyendaStore.data.capas.push({
                layer: capa,
                name: name
            });
        },
        removeCapa(name){
            for (let index = 0; index < leyendaStore.data.capas.length; index++) {
                if (leyendaStore.data.capas[index].name == name)
                    leyendaStore.data.capas.splice(index, 1);
            }
        }
    }
};