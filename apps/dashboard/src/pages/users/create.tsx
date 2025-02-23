import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const UserCreate = () => {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Email"}
          name="email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Name"}
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Age"}
          name="age"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Status"}
          name={["status"]}
          initialValue={"active"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            <Select.Option value="draft">active</Select.Option>
            <Select.Option value="published">inactive</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Create>
  );
};
