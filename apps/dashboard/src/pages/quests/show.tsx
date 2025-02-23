import { DateField, Show, TextField } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

export const QuestShow = () => {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id} />
      <Title level={5}>{"Title"}</Title>
      <TextField value={record?.title} />
      <Title level={5}>{"Description"}</Title>
      <TextField value={record?.description} />
      <Title level={5}>{"Season"}</Title>
      <TextField value={record?.season} />

      <Title level={5}>{"CreatedAt"}</Title>
      <DateField value={record?.createdAt} />
    </Show>
  );
};
