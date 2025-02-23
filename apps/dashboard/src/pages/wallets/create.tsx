import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const WalletCreate = () => {
  const { formProps, saveButtonProps } = useForm({});
  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionLabel: "email",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"User"}
          name={["userId"]}
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
          name="address"
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
    </Create>
  );
};
