import { DateField, Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

export const WalletShow = () => {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id} />
      <Title level={5}>{"Address"}</Title>
      <TextField value={record?.address} />
      <Title level={5}>{"Blockchain"}</Title>
      <TextField value={record?.blockchain} />

      <Title level={5}>{"CreatedAt"}</Title>
      <DateField value={record?.createdAt} />
    </Show>
  );
};
