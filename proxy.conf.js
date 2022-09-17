
let url = `https://nodebackendferm.herokuapp.com/`
const PROXY_CONFIG = [
    {
        context: "/dashboard",
        target: `${url}/db/dashboard`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/dashboard": ""
        }
    },{
        context: "/dropdown",
        target: `${url}/db/dropdown`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/dropdown": ""
        }
    },{
        context: "/loginmenu",
        target: `${url}/db/login`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/loginmenu": ""
        }
    },{
        context: "/register",
        target: `${url}/db/register`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/register": ""
        }
    },{
        context: "/PetView",
        target: `${url}/db/PetView`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/PetView": ""
        }
    },{
        context: "/PetInsert",
        target: `${url}/db/PetInsert`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/PetInsert": ""
        }
    },{
        context: "/PetUpdate",
        target: `${url}/db/PetUpdate`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/PetUpdate": ""
        }
    },{
        context: "/PetDelete",
        target: `${url}/db/PetDelete`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/PetDelete": ""
        }
    },{
        context: "/PettreatmentView",
        target: `${url}/db/PettreatmentView`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/PettreatmentView": ""
        }
    },{
        context: "/PettreatmentInsert",
        target: `${url}/db/PettreatmentInsert`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/PettreatmentInsert": ""
        }
    },{
        context: "/PettreatmentUpdate",
        target: `${url}/db/PettreatmentUpdate`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/PettreatmentUpdate": ""
        }
    },{
        context: "/PettreatmentDelete",
        target: `${url}/db/PettreatmentDelete`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/PettreatmentDelete": ""
        }
    },{
        context: "/PetappointmentView",
        target: `${url}/db/PetappointmentView`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/PetappointmentView": ""
        }
    },{
        context: "/PetappointmentInsert",
        target: `${url}/db/PetappointmentInsert`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/PetappointmentInsert": ""
        }
    },{
        context: "/PetappointmentUpdate",
        target: `${url}/db/PetappointmentUpdate`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/PetappointmentUpdate": ""
        }
    },{
        context: "/PetappointmentDelete",
        target: `${url}/db/PetappointmentDelete`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/PetappointmentDelete": ""
        }
    },{
        context: "/vaccineView",
        target: `${url}/db/vaccineView`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/vaccineView": ""
        }
    },{
        context: "/vaccineInsert",
        target: `${url}/db/vaccineInsert`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/vaccineInsert": ""
        }
    },{
        context: "/vaccineUpdate",
        target: `${url}/db/vaccineUpdate`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/vaccineUpdate": ""
        }
    },{
        context: "/vaccineDelete",
        target: `${url}/db/vaccineDelete`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/vaccineDelete": ""
        }
    },{
        context: "/menu",
        target: `${url}/db/menu`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/menu": ""
        }
    },{
        context: "/report/*",
        target: `${url}/db/report/`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/report/": ""
        }
    },
]
module.exports = PROXY_CONFIG;
