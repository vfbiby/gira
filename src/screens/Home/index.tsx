import { IconPin } from "components/icon/icon-pin";
import { IdSelect } from "components/id-select";
import { Pin } from "components/pin";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDocumentTitle } from "utils/use-documentTitle";

const ControlledSelect = () => {
  const [state, setState] = useState("");

  return (
    <div>
      <div>what you selected is {state}</div>
      <select value={state} onChange={(e) => setState(e.target.value)}>
        <option value="">Please Select</option>
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option value="coconut">Coconut</option>
        <option value="mango">Mango</option>
      </select>
    </div>
  );
};

const ControlledIdSelect = () => {
  const [people, setPeople] = useState(0);

  return (
    <div>
      <span>choosen people id {people}</span>
      <IdSelect
        className="w-32 w-48 px-4 ml-2 text-pink-600 border border-gray-200 rounded dark:bg-gray-900"
        defaultOptionName="Please Select"
        value={people}
        options={[
          {
            id: 1,
            name: "vf",
          },
          {
            id: 2,
            name: "tt",
          },
        ]}
        onChange={(value) => {
          if (value === undefined) {
            setPeople(0);
          } else {
            setPeople(value);
          }
        }}
      />
    </div>
  );
};

const ControlledInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value || "");
  };

  return (
    <div>
      <span>what you typed is {value}</span>
      <br />
      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
};

interface IFormInputs {
  TextField: string;
  SelectField: string;
}

export const HomeScreen = () => {
  useDocumentTitle("HomeScreen");
  const { handleSubmit, control, reset, register } = useForm<IFormInputs>();
  const onSubmit = (data: IFormInputs) => console.log(data);
  const [name, setName] = useState("");
  const handleChange = (name: string) => {
    setName(name);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="dark:text-white">
      <h1>HomeScreen</h1>
      <Controller
        name="name"
        control={control}
        defaultValue="hhh"
        render={({ value, onChange }) => (
          <ControlledInput value={value} onChange={onChange} />
        )}
      />
      {/*<ControlledInput value={name} onChange={handleChange} />*/}
      <div>you name is {name}</div>
      {/*<ControlledInput name="TextField" />*/}
      {/*<ControlledSelect name="SelectField" />*/}
    </form>
  );
};
