import { useEffect, useState } from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHead,
} from "../ui/table";
import { Button } from "../ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import EditModal from "../dashboard/EditModal";
import fetchUsers from "./Users";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentSection, setCurrentSection] = useState("");

  const fetchin = async () => {
    const data = await fetchUsers();
    setUsers(data);
    setError(null);
    setLoading(false);
  }

  useEffect(() => {
    fetchin();
  }, []);


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleEdit = (item, section) => {
    setCurrentItem(item);
    setCurrentSection(section);
    setEditModalOpen(true);
  };

  const handleDelete = (id) => {
    const confirmResponse = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (confirmResponse) {
      const response = fetch('http://192.168.1.7:5000/api/users/deleteusers', {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(response.ok){
        console.log("Usuario eliminado");
        fetchin();
      }
    }
  };

  const handleSave = async(updatedItem) => {
    console.log("Item actualizado:", updatedItem);
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.id === updatedItem.id ? updatedItem : user
      );
      return updatedUsers;
    });
    await fetchin();
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Género</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>UID Tarjeta</TableHead>
            <TableHead>Codigo Trabajador</TableHead>
            <TableHead>Permisos Asignados</TableHead>
            <TableHead>Fecha de Registro</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.card_uid}</TableCell>
              <TableCell>{user.serialnumber}</TableCell>
              <TableCell>{user.permisos}</TableCell>
              <TableCell>{formatDate(user.user_date)}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(user, "usuarios")}
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(user.id, "usuarios")}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        currentItem={currentItem}
        currentSection={currentSection}
        onSave={handleSave}
      />
    </div>
  );
};


export default UserList
