import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import TextEditor from "../../components/text-editor/text-editor";
import { formatJSON, parseJSON } from "../../utils";

export const QuestEdit = () => {
  const { formProps, saveButtonProps, formLoading, query } = useForm({});
  const quest = query?.data?.data;

  const format = (values: any) => {
    if (!values) return {};
    return {
      ...values,
      facts: formatJSON(values.facts),
      conditions: formatJSON(values.conditions),
      rewards: formatJSON(values.rewards),
    };
  };

  const onFinish = (values: any) => {
    // Convert JSON input to an object before submitting

    const formattedValues = {
      ...values,
      facts: parseJSON(values.facts),
      conditions: parseJSON(values.conditions),
      rewards: parseJSON(values.rewards),
    };
    formProps.onFinish?.(formattedValues);
  };

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form
        {...formProps}
        layout="vertical"
        onFinish={onFinish}
        initialValues={format(quest)}
      >
        <Form.Item
          label={"Title"}
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Description"}
          name="description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          label={"Season"}
          name="season"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={"Facts"} name="facts">
          <TextEditor />
        </Form.Item>

        <Form.Item label={"Conditions"} name="conditions">
          <TextEditor />
        </Form.Item>

        <Form.Item label={"Rewards"} name="rewards">
          <TextEditor />
        </Form.Item>
      </Form>
    </Edit>
  );
};
