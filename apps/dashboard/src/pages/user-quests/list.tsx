import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { useMany, type BaseRecord } from "@refinedev/core";
import { Space, Table } from "antd";

export const UserQuestList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: userData, isLoading: userIsLoading } = useMany({
    resource: "users",
    ids:
      tableProps?.dataSource?.map((item) => item?.userId).filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const { data: questData, isLoading: questIsLoading } = useMany({
    resource: "quests",
    ids:
      tableProps?.dataSource?.map((item) => item?.questId).filter(Boolean) ??
      [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column
          dataIndex={"userId"}
          title={"User"}
          render={(value) =>
            userIsLoading ? (
              <>Loading...</>
            ) : (
              userData?.data?.find((item) => item.id === value)?.email
            )
          }
        />
        <Table.Column
          dataIndex={"questId"}
          title={"Quest"}
          render={(value) =>
            questIsLoading ? (
              <>Loading...</>
            ) : (
              questData?.data?.find((item) => item.id === value)?.title
            )
          }
        />
        <Table.Column dataIndex={["status"]} title={"Status"} />

        {/* <Table.Column
          dataIndex={["createdAt"]}
          title={"Created at"}
          render={(value: any) => <DateField value={value} />}
        /> */}
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
