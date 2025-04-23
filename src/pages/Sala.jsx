import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "../components/HeaderLogo";
import Footer from "../components/Footer";

function HorariosDisponiveis() {
  const [horarios, setHorarios] = useState([]);
  const [alert, setAlert] = useState({
    open: false, 
    severity: "", 
    message: "" 
  });

  async function getHorarios(){
    // Chamada da Api
    await api.getHorarios().then(
      (response)=>{
        console.log(response.data.users)
        setHorarios(response.data.users)
      },(error)=>{
        console.log("Erro ",error)
      }
    )
  }
}
export default Sala;


// <ConfirmDelete
//       open={modalOpen}
//       userName={userToDelete.name}
//       onConfirm={deleteUser}
//       onClose={()=>setModalOpen(false)}
//       />
//       {users.length === 0 ?(<h1>Carregando usuários</h1>): (
//       <div>
//         <h5>Lista de usuários</h5>
//         <TableContainer component={Paper} style={{margin:"2px"}}>
//           <Table size="small">
//             <TableHead style={{backgroundColor: "lightskyblue", borderStyle:"solid"}}>
//               <TableRow>
//                 <TableCell align="center">
//                   Nome
//                 </TableCell>
//                 <TableCell align="center">
//                   Email
//                 </TableCell>
//                 <TableCell align="center">
//                   CPF
//                 </TableCell>
//                 <TableCell align="center">
//                   Ações
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>{listUsers}</TableBody>
//           </Table>
//         </TableContainer>