import {makeStyles} from "@material-ui/core"


export default makeStyles ((theme)=>({
    Appbar:{
        boxShadow:'none',
        borderBottom:'1px solid rgba(0, 0, 0, 0.12)'
    },
    title:{
        display:'flex',
        flexGrow:1,
        alignItems:'center',
        textDecoration:'none'
    },
    image:{
        marginRight:'10px'
    },
    grow:{
      flexGrow:1
    }

}))