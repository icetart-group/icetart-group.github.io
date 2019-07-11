//import axios from 'axios';

const rolStore = {
    data: {
        rols: [],
        errors: []
    },
    methods: {
        saveRol(rol){
            axios.post(host+`/roles/create`, {
                    rolname: rol.rolname,
                    rolpass: rol.rolpass
                })
                .then(response => {
                    // JSON responses are automatically parsed.
                    if (response.data.Result == "OK") {
                        console.log("Rol guardado con exito");
                        
                        newRol = { "rolname": rol.rolname, "rolsuper": false };
                        rolStore.data.rols.push(newRol);
                        $('.rolLoad').hide();
                    }
                })
                .catch(e => {
                    rolStore.data.errors.push(e);
                    console.log("Error: "+e);
                })

        },
        deleteRol(rol){
            axios.get(host+`/roles/drop?rolname=`+rol.rolname)
                .then(response => {
                    // JSON responses are automatically parsed.
                    if (response.data.Result == "OK") {
                        console.log("Rol guardado con exito");

                        rolStore.data.rols.splice(rol.index, 1);
                        $('.rolLoad').hide();
                    }
                })
                .catch(e => {
                    rolStore.data.errors.push(e)
                })
        },
        created() {
            axios.get(host+`/roles`)
                .then(response => {
                    // JSON responses are automatically parsed.
                    response.data.data.forEach(element => {
                        rolStore.data.rols.push(element);
                    });
                    $('.rolLoad').hide();
                    //rolStore.data.rols.push(response.data.data);
                })
                .catch(e => {
                    rolStore.data.errors.push(e)
                })
        }
    }
};

//export default rolStore;