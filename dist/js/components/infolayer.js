Vue.component('cm-infolayer', {
	template: '#cm-infolayer-template',
	data() {
		return {
			spacialStore: busquedaStore.data,
			infoLayerStore: infoLayerStore.data,
			loginStore: loginStore.data,
			nivel: '',
			selDep: '',
			selProv: '',
			selDist: '',
			selFormato: 5,
			cod_obra: '',
			cod_proy: '',
			url: '',
			nombre: '',
			images: [],
			distritos: [],
			provincias: [],
			stateForm: false,
			stateNivel: 'departamento',
			stateService: false,
			errorFile: false,
			errorFileTxt: ''
		}
	},
	methods: {
		changeDepartamentos(){
			$('.infoLLoad').show();
			this.provincias = [];
			var depPromise = busquedaStore.methods.loadProvinciaProm(this.selDep);
			depPromise.then( (data) => {
				$('.infoLLoad').hide();
			})
			.catch( e => { console.log(e); })
		},
		changeProvincias(){
			$('.infoLLoad').show();
			this.provincias = [];
			var provPromise = busquedaStore.methods.loadDistritosProm(this.selProv);
			provPromise.then( (data) => {
				$('.infoLLoad').hide();
			})
			.catch( e => { console.log(e); })
		},
		registerInformacion(){
			$('.infoLLoad').show();
			let indice = "";
			switch(this.nivel){
				case "1":
					indice = ('0' + this.selDep).slice(-2);
					break;
				case "2":
					indice = ('000' + this.selProv).slice(-4);
					break;
				case "3":
					indice = ('00000' + this.selDist).slice(-6);
					break;
				case "4":
					indice = this.cod_proy;
					break;
				case "5":
					indice = this.cod_obra;
					break;
			}
			let url_inf = "";
			switch(this.selFormato){
				case "video":
					url_inf = this.url;
					break;
				case "grafico":
				case "mapa":
				case "foto":
				case "documento":
				case "infografia":
					url_inf = this.images;
					break;
				default:
					return false;
			}
			var infoPromise = capaStore.methods.saveInfo(url_inf, this.selFormato, indice, this.nivel, this.nombre);
			infoPromise.then( (data) => {
				if(data.success){
					var recarga = infoLayerStore.methods.getLayersinfo();
					recarga.then( () => {
						$('.infoLLoad').hide();
					})
					this.stateForm = false;
				} else { $('.infoLLoad').hide(); }
				this.stateService = true;
			})
			.catch( e => { 
				console.log(e);
				$('.infoLLoad').hide();
				this.stateService = true;
			 })
		},
		stateClose(){
			this.stateService = false;
		},
		handleFilesUploadImg() {
			$('.infoLLoad').show();
			let uploadedFiles = this.$refs.imagen.files;
			this.images = [];
			let size = 5359236;
			this.errorFileTxt = "El tamaño maximo del archivo puede ser 5MB";
			if(this.selFormato == "mapa"){
				size = 10659236;
				this.errorFileTxt = "El tamaño maximo del archivo puede ser 10MB";
			}
			/*
			  Adds the uploaded file to the files array
			*/
			for( var i = 0; i < uploadedFiles.length; i++ ){
				if(uploadedFiles[i].size < size){
					this.images.push( uploadedFiles[i] );
					if(i==uploadedFiles.length - 1){
						$('.infoLLoad').hide();
					}
					this.errorFile = false;					
				} else {
					this.errorFile = true;
					$('.infoLLoad').hide();
				}
			}
		},
		deleteReg(id) {
			$('.infoLLoad').show();
			var eliminar = infoLayerStore.methods.deleteInfo(id);
			eliminar.then( () => {
				var recarga = infoLayerStore.methods.getLayersinfo();
				recarga.then( () => {
					$('.infoLLoad').hide();
				})
				this.stateService = true;
			})
		},
		addReg() {
			this.stateForm = !this.stateForm;
			this.stateService = false;
			this.nivel = '';
			this.selDep = '';
			this.selProv = '';
			this.selDist = '';
			this.selFormato = '';
			this.cod_obra = '';
			this.cod_proy = '';
			this.url = '';
			this.nombre = '';
			this.images = [];
		}
	},
	computed: {
		inf_dep(){
			return this.infoLayerStore.registros.filter(el =>{
				return el.id_capa == '1';
			})
		},
		inf_prov(){
			return this.infoLayerStore.registros.filter(el =>{
				return el.id_capa == '2';
			})
		},
		inf_dist(){
			return this.infoLayerStore.registros.filter(el =>{
				return el.id_capa == '3';
			})
		},
		inf_proy(){
			return this.infoLayerStore.registros.filter(el =>{
				return el.id_capa == '4';
			})
		},
		inf_obra(){
			return this.infoLayerStore.registros.filter(el =>{
				return el.id_capa == '5';
			})
		}
	},
	created() {
		$('.infoLLoad').hide();
		infoLayerStore.methods.getLayersinfo();
	}
});