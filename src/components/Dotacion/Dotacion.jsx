import { Collapse, Divider, Table } from "antd";

const {Panel} = Collapse

export function Dotacion ({employee}) {

    const columns = [
        {
            title: 'Información detallada EPP',
            dataIndex: 'EPP',
            key: 'Información detallada EPP'
        },
        {
            title: 'Estatus',
            dataIndex: 'Estatus',
            key: 'Estatus'
        },
        {
            title: 'Talla',
            dataIndex: 'Talla',
            key: 'Talla'
        },
        {
            title: 'Fecha entrega',
            dataIndex: 'Fecha entrega',
            key: 'Fecha entrega'
        },
        {
            title: 'Fecha cambio',
            dataIndex: 'Fecha cambio',
            key: 'Fecha cambio'
        },

    ]

    const data = [
        {
            EPP: 'Lentes',
            Estatus: 'Entregado',
            Talla: 'S',
            'Fecha entrega': '01-06-2023',
            'Fecha cambio': '01-05-2024'
        },
        {
            EPP: 'Guantes',
            Estatus: 'Pendiente',
            Talla: 'M',
            'Fecha entrega': '02-07-2024',
            'Fecha cambio': '01-05-2024'
        },
        {
            EPP: 'Botas',
            Estatus: 'No entregado',
            Talla: '38',
            'Fecha entrega': '02-07-2024',
            'Fecha cambio': '01-05-2024'
        },
        {
            EPP: 'Camiseta',
            Estatus: 'Pendiente',
            Talla: 'M',
            'Fecha entrega': '02-07-2024',
            'Fecha cambio': '01-05-2024'
        },
        {
            EPP: 'Pantalon',
            Estatus: 'Entregado',
            Talla: 'M',
            'Fecha entrega': '02-07-2024',
            'Fecha cambio': '01-05-2024'
        },
        {
            EPP: 'Casco',
            Estatus: 'Entregado',
            Talla: 'M',
            'Fecha entrega': '02-07-2024',
            'Fecha cambio': '01-05-2024'
        },
    ]

    return (
        <>
        <Divider orientation="left">
            <h2>Elementos y Dotacion</h2>
        </Divider>
        <Collapse style={{
            width: '60%',
            margin: 'auto auto'
        }}>
            <Panel header="Dotacion y elementos">
                <Table dataSource={data}columns={columns}/>
            </Panel>
        </Collapse>
        </>
    )
}