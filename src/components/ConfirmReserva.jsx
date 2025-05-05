import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
    Typography,
  } from "@mui/material";
  
  function ConfirmReserva({ open, onClose, onConfirm, nomeSala }) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirmar reserva</DialogTitle>
        <DialogContent>
          <Typography>
            Deseja reservar a sala: <strong>{nomeSala}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button color="primary" onClick={onConfirm}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  export default ConfirmReserva;
  