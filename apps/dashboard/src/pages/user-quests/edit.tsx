import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Select } from "antd";

export const UserQuestEdit = () => {
  const { formProps, saveButtonProps, formLoading, query } = useForm({});

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    defaultValue: query?.data?.data?.userId,
    queryOptions: {
      enabled: !!query?.data?.data?.userId,
    },
    optionLabel: "email",
  });

  const { selectProps: questSelectProps } = useSelect({
    resource: "quests",
    defaultValue: query?.data?.data?.questId,
    queryOptions: {
      enabled: !!query?.data?.data?.questId,
    },
    optionLabel: "title",
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
          label={"Quest"}
          name={["questId"]}
          initialValue={formProps?.initialValues?.questId}
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
    </Edit>
  );
};
