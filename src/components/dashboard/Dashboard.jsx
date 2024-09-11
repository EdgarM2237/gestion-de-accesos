import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
  ShieldIcon,
  SmartphoneIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import UserLogs from "../queries/UserLogs";
import UserList from "../queries/UsersList";
import AddModal from "./AddModal";
import fetchUsers from "../queries/Users";

export default function Dashboard() {
  const { theme, setTheme } = useTheme();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("");

  const administradores = [
    {
      id: 1,
      nombre: "Admin1",
      rol: "Super Admin",
      permisos: "Todos",
      fecha: "2023-01-01",
      uidTarjeta: "ADM001",
      correo: "admin1@example.com",
    },
    {
      id: 2,
      nombre: "Admin2",
      rol: "Editor",
      permisos: "Edición",
      fecha: "2023-02-01",
      uidTarjeta: "ADM002",
      correo: "admin2@example.com",
    },
  ];

  const dispositivos = [
    {
      id: 1,
      uidDispositivo: "DEV001",
      zona: "Zona 1",
      numeroSerial: "SN001",
      fechaRegistro: "2023-03-01",
    },
    {
      id: 2,
      uidDispositivo: "DEV002",
      zona: "Zona 2",
      numeroSerial: "SN002",
      fechaRegistro: "2023-03-15",
    },
  ];

  const roles = [
    { id: 1, nombre: "Super Admin", descripcion: "Acceso total al sistema" },
    { id: 2, nombre: "Editor", descripcion: "Puede editar pero no eliminar" },
  ];

  const permisos = [
    { id: 1, nombre: "Acceso Total", descripcion: "Acceso a todas las zonas" },
    {
      id: 2,
      nombre: "Acceso Limitado",
      descripcion: "Acceso solo a zonas específicas",
    },
  ];

  const handleDelete = (id, section) => {

  };

  const handleSave = async (updatedItem) => {
    console.log("Item agregado:", updatedItem);
    await fetchUsers();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Sistema de Control de Acceso</h1>
        <div className="flex space-x-4 justify-between">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              document.cookie =
                "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
              document.location.href = "/login";
            }}
          >
            Cerrar Sesión
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <SunIcon className="h-4 w-4" />
            ) : (
              <MoonIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="usuarios" className="space-y-4">
        <TabsList>
          <TabsTrigger value="usuarios">Gestión de Usuarios</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permisos">Permisos</TabsTrigger>
          <TabsTrigger value="administradores">Administradores</TabsTrigger>
          <TabsTrigger value="dispositivos">Dispositivos</TabsTrigger>
          <TabsTrigger value="historial">Historial de Accesos</TabsTrigger>
        </TabsList>

        <TabsContent value="usuarios">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>
                Administra los usuarios y sus permisos de acceso
              </CardDescription>
            </CardHeader>
            <UserList/>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Roles</CardTitle>
              <CardDescription>Gestiona los roles del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Input placeholder="Buscar roles..." className="max-w-sm" />
                <Button onClick={() => handleAdd("roles")}>
                  <ShieldIcon className="mr-2 h-4 w-4" /> Agregar Rol
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((rol) => (
                    <TableRow key={rol.id}>
                      <TableCell>{rol.nombre}</TableCell>
                      <TableCell>{rol.descripcion}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(rol, "roles")}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(rol.id, "roles")}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permisos">
          <Card>
            <CardHeader>
              <CardTitle>Permisos</CardTitle>
              <CardDescription>
                Gestiona los permisos del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Input placeholder="Buscar permisos..." className="max-w-sm" />
                <Button onClick={() => handleAdd("permisos")}>
                  <ShieldIcon className="mr-2 h-4 w-4" /> Agregar Permiso
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permisos.map((permiso) => (
                    <TableRow key={permiso.id}>
                      <TableCell>{permiso.nombre}</TableCell>
                      <TableCell>{permiso.descripcion}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(permiso, "permisos")}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(permiso.id, "permisos")}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="administradores">
          <Card>
            <CardHeader>
              <CardTitle>Administradores</CardTitle>
              <CardDescription>
                Gestiona los administradores del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Input
                  placeholder="Buscar administradores..."
                  className="max-w-sm"
                />
                <Button onClick={() => handleAdd("administradores")}>
                  <UserPlusIcon className="mr-2 h-4 w-4" /> Agregar
                  Administrador
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Permisos</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>UID Tarjeta</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {administradores.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell>{admin.nombre}</TableCell>
                      <TableCell>{admin.rol}</TableCell>
                      <TableCell>{admin.permisos}</TableCell>
                      <TableCell>{admin.fecha}</TableCell>
                      <TableCell>{admin.uidTarjeta}</TableCell>
                      <TableCell>{admin.correo}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(admin, "administradores")}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleDelete(admin.id, "administradores")
                          }
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dispositivos">
          <Card>
            <CardHeader>
              <CardTitle>Dispositivos</CardTitle>
              <CardDescription>
                Gestiona los dispositivos de control de acceso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Input
                  placeholder="Buscar dispositivos..."
                  className="max-w-sm"
                />
                <Button onClick={() => handleAdd("dispositivos")}>
                  <SmartphoneIcon className="mr-2 h-4 w-4" /> Agregar
                  Dispositivo
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>UID Dispositivo</TableHead>
                    <TableHead>Zona</TableHead>
                    <TableHead>Número Serial</TableHead>
                    <TableHead>Fecha de Registro</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dispositivos.map((dispositivo) => (
                    <TableRow key={dispositivo.id}>
                      <TableCell>{dispositivo.uidDispositivo}</TableCell>
                      <TableCell>{dispositivo.zona}</TableCell>
                      <TableCell>{dispositivo.numeroSerial}</TableCell>
                      <TableCell>{dispositivo.fechaRegistro}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleEdit(dispositivo, "dispositivos")
                          }
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleDelete(dispositivo.id, "dispositivos")
                          }
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historial">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Accesos</CardTitle>
              <CardDescription>
                Registro de todos los accesos a las zonas
              </CardDescription>
            </CardHeader>
            <UserLogs />
          </Card>
        </TabsContent>
      </Tabs>
      <AddModal
        isOpen={addModalOpen}
        setIsOpen={setAddModalOpen}
        section={currentSection}
        onSave={handleSave}
      />
    </div>
  );
}
