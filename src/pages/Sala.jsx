//  import React from "react";
//  import Typography from "@mui/material/Typography";
//  import Box from "@mui/material/Box";
//  import Header from "../components/HeaderLogo";
//  import Footer from "../components/Footer";

//  function listHorarios() {
//    const [data, setData] = useState([]);
//    const [alert, setAlert] = useState({
//      open: false, 
//      severity: "", 
//      message: "" 
//    });

//    async function viewReservaSala(){
//      // Chamada da Api
//      await api.viewReservaSala().then(
//        (response)=>{
//          console.log(response.data.users)
//          setHorarios(response.data.users)
//        },(error)=>{
//          console.log("Erro ",error)
//        }
//      )
//    }

//    function logout() {
//      localStorage.removeItem("authenticated");
//      navigate("/");
//    }
  
//    const [userToDelete, setUsertoDelete] = useState("");
//    const [modalOpen, setModalOpen] = useState(false);

//    //Função para exibir o alerta 
//    const showAlert = (severity, message) => {
//      setAlert({open: true, severity, message})
//    };

//    //fechar o alerta
//    const handleCloseAlert = () => {
//      setAlert({...alert, open:false})
//    };

//    const openDeleteModal = (id, name)=>{
//      setUsertoDelete({id : id, name : name});
//      setModalOpen(true);
//    };

//  }
//  export default viewReservaSala;

 

// import React from 'react';

function Sala() {
  return (
    <div>
      <h1>Página da Sala</h1>
    </div>
  );
}

export default Sala;
