import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Select } from "antd";

export const UserQuestCreate = () => {
  const { formProps, saveButtonProps } = useForm({});
  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionLabel: "email",
  });
  const { selectProps: questSelectProps } = useSelect({
    resource: "quests",
    optionLabel: "title",
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
          label={"Quest"}
          name={["questId"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...questSelectProps} />
        </Form.Item>

        <Form.Item
          label={"Status"}
          name={["status"]}
          initialValue={"enrolled"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            defaultValue={"enrolled"}
            options={[
              { value: "enrolled", label: "Enrolled" },
              { value: "completed", label: "Completed" },
              { value: "rewarded", label: "Rewarded" },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
