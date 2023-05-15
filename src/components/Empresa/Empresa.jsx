import { Divider, Table } from "antd"
import { empresas } from "./empresaData"

export function Empresa () {

    const columns = [
        {
            title: "Razon social",
            dataIndex: "RazónSocial",
            key: "Razon social"
        },
        {
            title: "RUT",
            dataIndex: "RUT",
            key: "RUT"
        },
        {
            title: "GIRO",
            dataIndex: "GIRO",
            key: "GIRO"
        },
        {
            title: "DIRECCIÓN",
            dataIndex: "DIRECCIÓN",
            key: "DIRECCIÓN"
        },
        {
            title: "Representate Legal",
            dataIndex: "RepresentateLegal",
            key: "RepresentateLegal"
        },
        {
            title: "Rut",
            dataIndex: "Rut",
            key: "Rut"
        },
        {
            title: "Admin. De Contrato",
            dataIndex: "Admin.DeContrato",
            key: "Admin.DeContrato"
        },
        {
            title: "Rut1",
            dataIndex: "Rut1",
            key: "Rut1"
        },
        {
            title: "Mail representante legal",
            dataIndex: "Mailrepresentantelegal",
            key: "Mailrepresentantelegal"
        },
        {
            title: "Telefono Empresa",
            dataIndex: "TelefonoEmpresa",
            key: "TelefonoEmpresa"
        },
    ]



    return (
        <>
        <Divider orientation="left"  >
            <h2>Empresas</h2>
        </Divider>
        <Table dataSource={empresas} columns={columns}/>
        </>

    )
}