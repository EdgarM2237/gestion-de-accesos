import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AddModal = ({ isOpen, setIsOpen, section, onSave }) => {
  const dataRequere = {
    username: "",
    email: "",
    card_uid: "",
    gender: "",
    permisos: "",
    rol: "",
    zona: "",
    numeroSerial: "",
  };
  const [formData, setFormData] = useState(dataRequere);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSelectChange = (value, field) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let endpoint = "";

    switch (section) {
      case "usuarios":
        endpoint = "http://192.168.1.7:5000/api/users/addusers";
        break;
      case "administradores":
        endpoint = "http://192.168.1.7:5000/api/admins/addadmins";
        break;
      case "dispositivos":
        endpoint = "http://192.168.1.7:5000/api/devices/adddevices";
        break;
      default:
        return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setIsOpen(false);
      onSave(formData.username);
      setFormData(dataRequere);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Nuevo {section.slice(0, -1)}</DialogTitle>
          <DialogDescription>
            Ingresa los detalles del nuevo {section.slice(0, -1)}.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {section === "usuarios" && (
            <>
              <div>
                <Label htmlFor="username">Nombre</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="email">Correo</Label>
                <Input
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="card_uid">Tarjeta</Label>
                <Input
                  id="card_uid"
                  value={formData.card_uid}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="gender">Género</Label>
                <Select
                  onValueChange={(value) => handleSelectChange(value, "gender")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el género" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Femenino">Femenino</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="permisos">Permisos</Label>
                <Input
                  id="permisos"
                  value={formData.permisos}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}

          {section === "administradores" && (
            <>
              <div>
                <Label htmlFor="rol">Rol</Label>
                <Input
                  id="rol"
                  value={formData.rol}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}

          {section === "dispositivos" && (
            <>
              <div>
                <Label htmlFor="zona">Zona</Label>
                <Input
                  id="zona"
                  value={formData.zona}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="numeroSerial">Número Serial</Label>
                <Input
                  id="numeroSerial"
                  value={formData.numeroSerial}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}

          <Button type="submit">Agregar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;
