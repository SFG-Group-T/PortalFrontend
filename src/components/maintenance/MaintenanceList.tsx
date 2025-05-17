import React, { useState } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography, 
  Chip,
  IconButton,
  TablePagination,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MaintenanceRequest } from '../../services/maintenanceService';

interface MaintenanceListProps {
  maintenanceRequests: MaintenanceRequest[];
  onStatusChange: (id: string, status: MaintenanceRequest['status']) => void;
  onDelete: (id: string) => void;
}

const MaintenanceList: React.FC<MaintenanceListProps> = ({ 
  maintenanceRequests, 
  onStatusChange,
  onDelete
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<MaintenanceRequest['status']>('pending');

  // Handle pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // View details of a request
  const handleViewDetails = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setDetailsOpen(true);
  };

  // Handle status change
  const handleOpenStatusDialog = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setNewStatus(request.status);
    setStatusDialogOpen(true);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setNewStatus(event.target.value as MaintenanceRequest['status']);
  };

  const handleSubmitStatusChange = () => {
    if (selectedRequest && newStatus) {
      onStatusChange(selectedRequest.id, newStatus);
      setStatusDialogOpen(false);
    }
  };

  // Handle delete
  const handleOpenDeleteDialog = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedRequest) {
      onDelete(selectedRequest.id);
      setDeleteDialogOpen(false);
    }
  };

  // Status chip colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'in-progress': return 'info';
      case 'completed': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  // Priority chip colors
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'success';
      case 'medium': return 'info';
      case 'high': return 'warning';
      case 'urgent': return 'error';
      default: return 'default';
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="maintenance requests table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Reported By</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? maintenanceRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : maintenanceRequests
            ).map((request) => (
              <TableRow key={request.id}>
                <TableCell component="th" scope="row">
                  {request.title}
                </TableCell>
                <TableCell>{request.location}</TableCell>
                <TableCell>{request.category}</TableCell>
                <TableCell>
                  <Chip
                    label={request.status}
                    color={getStatusColor(request.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={request.priority}
                    color={getPriorityColor(request.priority)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{request.createdBy.username} ({request.createdBy.role})</TableCell>
                <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <IconButton 
                    size="small" 
                    onClick={() => handleViewDetails(request)}
                    title="View Details"
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleOpenStatusDialog(request)}
                    title="Change Status"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleOpenDeleteDialog(request)}
                    title="Delete Request"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={maintenanceRequests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Request Details Dialog */}
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="md">
        {selectedRequest && (
          <>
            <DialogTitle>{selectedRequest.title}</DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Description</Typography>
                <Typography variant="body1" paragraph>
                  {selectedRequest.description}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 2 }}>
                <Box>
                  <Typography variant="subtitle2">Location</Typography>
                  <Typography variant="body2">{selectedRequest.location}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">Category</Typography>
                  <Typography variant="body2">{selectedRequest.category}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">Status</Typography>
                  <Chip
                    label={selectedRequest.status}
                    color={getStatusColor(selectedRequest.status)}
                    size="small"
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2">Priority</Typography>
                  <Chip
                    label={selectedRequest.priority}
                    color={getPriorityColor(selectedRequest.priority)}
                    size="small"
                  />
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 2 }}>
                <Box>
                  <Typography variant="subtitle2">Reported By</Typography>
                  <Typography variant="body2">
                    {selectedRequest.createdBy.username} ({selectedRequest.createdBy.role})
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">Reported On</Typography>
                  <Typography variant="body2">
                    {new Date(selectedRequest.createdAt).toLocaleString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">Last Updated</Typography>
                  <Typography variant="body2">
                    {new Date(selectedRequest.updatedAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsOpen(false)}>Close</Button>
              <Button onClick={() => {
                setDetailsOpen(false);
                handleOpenStatusDialog(selectedRequest);
              }}>Update Status</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Status Change Dialog */}
      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
        <DialogTitle>Update Maintenance Request Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change the status of the maintenance request: {selectedRequest?.title}
          </DialogContentText>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              value={newStatus}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmitStatusChange} variant="contained">Update Status</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Maintenance Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this maintenance request? This action cannot be undone.
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Title: {selectedRequest?.title}</Typography>
            <Typography variant="subtitle2">Reported by: {selectedRequest?.createdBy.username}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MaintenanceList; 