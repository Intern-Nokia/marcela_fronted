import { Card, Modal } from "antd";
import Meta from "antd/es/card/Meta";

const CardInfo = ({ open, onCancel, employee }) => {
  return (
    <Modal open={open} okText="Ok" onCancel={onCancel}>
      <Card title={"Detalles" + employee?.name}>
        <Card.Grid
          style={{
            width: 240,
          }}
        >
          <Card cover={<img alt="Imagen de perfil" src={employee?.image} />}>
            <Meta title={employee?.legajo} description={employee?.RUT} />
          </Card>
        </Card.Grid>
      </Card>
    </Modal>
  );
};

export default CardInfo;
