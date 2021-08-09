
import {makeStyles} from "@material-ui/core" 

export default makeStyles(()=>({
     root:{
         maxWidth:'100%',
        //  border:"1px solid black",
     },
     media:{
         height:'240px',
        //  width:"220px",
         paddingTop:'56%',
         
     },
     CardContent:{
         display:'flex',
         justifyContent:'space-between'

     },
     CardActions:{
         display:"flex",
         justifyContent:'flex-end'
     }

}))