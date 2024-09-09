import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHead,
} from "../ui/table";
import { Pagination } from "../ui/pagination";
import { CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { HistoryIcon } from "lucide-react";
import { useState, useEffect } from "react";

const UserLogs = () => {
  const [logs, setLogs] = useState([]);
  const [logsPerPeage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = [];
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("");

  for (let i = 1; i <= Math.ceil(logs.length / logsPerPeage); i++) {
    totalPages.push(i);
  }

  useEffect(() => {
    const fetchUserLogs = async () => {
      try {
        const response = await fetch("http://192.168.1.7:5000/api/user_logs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLogs(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserLogs();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const lastIndex = currentPage * logsPerPeage;
  const firstIndex = lastIndex - logsPerPeage;

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value.toLowerCase());
  };

  const filteredLogs = logs.filter((log) =>
    log.username.toLowerCase().includes(filterText)
  );

  return (
    <CardContent>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Buscar en el historial..."
          className="max-w-sm"
          value={filterText}
          onChange={handleFilterTextChange}
        />
        <Button variant="outline">
          <HistoryIcon className="mr-2 h-4 w-4" /> Exportar Historial
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Tarjeta</TableHead>
            <TableHead>Dispositivo</TableHead>
            <TableHead>Fecha y Hora</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLogs.slice(firstIndex, lastIndex).map((logs) => (
            <TableRow key={logs.id}>
              <TableCell> {logs.username}</TableCell>
              <TableCell> {logs.card_uid}</TableCell>
              <TableCell> {logs.device_dep}</TableCell>
              <TableCell> {formatDate(logs.checkindate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </CardContent>
  );
};

export default UserLogs;
