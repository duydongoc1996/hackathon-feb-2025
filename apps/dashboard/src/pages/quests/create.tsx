import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

export const QuestCreate = () => {
  const { formProps, saveButtonProps } = useForm({});
  const [facts, setFacts] = useState(`{
    user: {
      wallets: {
        blockchain: true
      },
      user_quest: {
        quest: {
          quest_group: {
            season: true
          }
        }
      },
    },
    wallet: () => {}
}`);
  const [conditions, setConditions] = useState(`{
  "all": [
    {
      "fact": "user",
      "path": "$.active"
      "operator": "equal",
      "value": "true",
    },
    {
      "fact": "wallet",
      "path": "$.blockchain"
      "operator": "in",
      "value": ["RONIN", "RONINSAIGON"],
    },
    {
      "fact": "user_quest",
      "path": "$.quest_group.season"
      "operator": "equal",
      "value": "8", 
    },
    {
      "fact": "user_quest",
      "path": "$.status"
      "operator": "in",
      "value": ["COMPLETED", "REWARDED"], 
    }
  ]
}`);

  const [rewards, setRewards] = useState(`{}`);

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
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

        <Form.Item label={"Facts"} name="facts" initialValue={facts}>
          <TextArea rows={10} autoSize />
        </Form.Item>

        <Form.Item
          label={"Conditions"}
          name="conditions"
          initialValue={conditions}
        >
          <TextArea rows={10} autoSize />
        </Form.Item>

        <Form.Item label={"Rewards"} name="rewards" initialValue={rewards}>
          <TextArea rows={10} autoSize />
        </Form.Item>
      </Form>
    </Create>
  );
};
