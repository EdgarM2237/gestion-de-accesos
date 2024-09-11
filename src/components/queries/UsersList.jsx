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
import { PencilIcon, TrashIcon, UserPlusIcon } from "lucide-react";
import EditModal from "../dashboard/EditModal";
import fetchUsers from "./Users";
import { Input } from "../ui/input";
import { CardContent } from "../ui/card";
import AddModal from "../dashboard/AddModal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentSection, setCurrentSection] = useState("");
  const [filterText, setFilterText] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);

  const fetchin = async () => {
    const data = await fetchUsers();
    setUsers(data);
    setError(null);
    setLoading(false);
  };

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

  const handleDelete = async (id) => {
    const confirmResponse = window.confirm(
      "¿Estás seguro de eliminar este usuario?"
    );
    if (confirmResponse) {
      const response = fetch("http://192.168.1.7:5000/api/users/deleteusers", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if ((await response).status === 200) {
        console.log("Usuario eliminado");
        await fetchin();
      }
    }
  };

  const editHandleSave = async (updatedItem) => {
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

  const handleAdd = (section) => {
    setCurrentSection(section);
    setAddModalOpen(true);
  };

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value.toLowerCase());
  };

  const filteredUsers = users.filter((log) =>
    log.user_name.toLowerCase().includes(filterText)
  );

  const addHandleSave = async (updatedItem) => {
    console.log("Item agregado:", updatedItem);
    await fetchin();
  };

  return (
    <CardContent>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Buscar usuarios..."
          className="max-w-sm"
          value={filterText}
          onChange={handleFilterTextChange}
        />
        <Button onClick={() => handleAdd("usuarios")}>
          <UserPlusIcon className="mr-2 h-4 w-4" /> Agregar Usuario
        </Button>
      </div>
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
            {filteredUsers.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell>{user.user_name}</TableCell>
                <TableCell>{user.genere}</TableCell>
                <TableCell>{user.user_email}</TableCell>
                <TableCell>{user.card_uid}</TableCell>
                <TableCell>{user.user_serial}</TableCell>
                <TableCell>{user.devices}</TableCell>
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
                    onClick={() => handleDelete(user.user_id, "usuarios")}
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
          onSave={editHandleSave}
        />
        <AddModal
          isOpen={addModalOpen}
          setIsOpen={setAddModalOpen}
          section={currentSection}
          onSave={addHandleSave}
        />
      </div>
    </CardContent>
  );
};

export default UserList;
