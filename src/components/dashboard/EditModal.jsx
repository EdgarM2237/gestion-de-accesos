import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";

const EditModal = ({ open, onClose, currentItem, currentSection, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (currentItem) {
      setFormData(currentItem);
    }
  }, [currentItem]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://192.168.1.7:5000/api/users/editusers",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: currentItem.user_id,
            username: formData.user_name,
            email: formData.user_email,
            card_uid: formData.card_uid,
            gender: formData.genere,
            permisos: formData.devices,
            rol: formData.rol,
            zona: formData.zona,
            numeroSerial: formData.user_serial,
          }),
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Usuario actualizado exitosamente");
        onSave(formData.username);
      } else {
        console.log("Error al actualizar el usuario");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar {formData.user_name || "Item"}</DialogTitle>
          <DialogDescription>
            Realiza los cambios necesarios y guarda.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSave}>
          <div>
            <Label htmlFor="username">Nombre</Label>
            <Input
              id="username"
              value={formData.user_name || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="email">Correo</Label>
            <Input
              id="email"
              value={formData.user_email || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="card_uid">Tarjeta</Label>
            <Input
              id="card_uid"
              value={formData.card_uid || ""}
              onChange={handleChange}
            />
          </div>
          {currentSection === "usuarios" && (
            <>
              <div>
                <Label htmlFor="gender">Género</Label>
                <Select
                  value={formData.genere || ""}
                  onValueChange={(value) =>
                    setFormData((prevData) => ({ ...prevData, gender: value }))
                  }
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
                  value={formData.devices || ""}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {currentSection === "administradores" && (
            <>
              <div>
                <Label htmlFor="rol">Rol</Label>
                <Input
                  id="rol"
                  value={formData.rol || ""}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {currentSection === "dispositivos" && (
            <>
              <div>
                <Label htmlFor="zona">Zona</Label>
                <Input
                  id="zona"
                  value={formData.zona || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="numeroSerial">Número Serial</Label>
                <Input
                  id="numeroSerial"
                  value={formData.numeroSerial || ""}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <Button type="submit">Guardar Cambios</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
