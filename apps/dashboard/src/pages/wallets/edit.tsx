import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const WalletEdit = () => {
  const { formProps, saveButtonProps, formLoading, query } = useForm({});

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    defaultValue: query?.data?.data?.userId,
    queryOptions: {
      enabled: !!query?.data?.data?.userId,
    },
    optionLabel: "email",
  });

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"User"}
          name={["userId"]}
          initialValue={formProps?.initialValues?.userId}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...userSelectProps} />
        </Form.Item>

        <Form.Item
          label={"Address"}
          name={["address"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Blockchain"}
          name={["blockchain"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
