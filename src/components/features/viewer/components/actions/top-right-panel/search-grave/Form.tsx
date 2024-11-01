import { Button, Form, Input, Select, SelectProps } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import { SearchGraveParams } from "./SearchGrave";

type SearchFormType = {
  rowOptions: SelectProps["options"];
  colOptions: SelectProps["options"];
  areaOptions: SelectProps["options"];
  onSubmit?: (data: SearchGraveParams) => void;
};

export type SearchFormForwardRef = {
  reset: () => void;
};

const SearchForm = forwardRef<SearchFormForwardRef, SearchFormType>(
  ({ rowOptions, colOptions, areaOptions, onSubmit }, ref) => {
    const [form] = Form.useForm<SearchGraveParams>();

    const handleSubmit = () => {
      form.validateFields().then(onSubmit);
    };

    useImperativeHandle(ref, () => ({
      reset: () => form.resetFields(),
    }));

    return (
      <div className="px-4 pt-3">
        <Form form={form} layout="vertical">
          <Form.Item name="keyword" label="Từ khoá" className="mb-2">
            <Input placeholder="Ví dụ: Nguyễn Văn A" />
          </Form.Item>
          <div className="flex gap-2">
            <Form.Item name="area" label="Khu" className="flex-1">
              <Select allowClear placeholder="Chọn" options={areaOptions} />
            </Form.Item>
            <Form.Item name="row" label="Hàng" className="flex-1">
              <Select allowClear placeholder="Chọn" options={rowOptions} />
            </Form.Item>
            <Form.Item name="col" label="Cột" className="flex-1">
              <Select allowClear placeholder="Chọn" options={colOptions} />
            </Form.Item>
          </div>
        </Form>
        <div className="flex justify-end gap-2">
          <Button>Huỷ</Button>
          <Button type="primary" onClick={handleSubmit}>
            Tìm kiếm
          </Button>
        </div>
      </div>
    );
  }
);

export { SearchForm };
