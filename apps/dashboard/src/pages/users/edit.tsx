import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const UserEdit = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Email"}
          name={["email"]}
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
          name={["age"]}
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
          <Select
            defaultValue={"active"}
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
