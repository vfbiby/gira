import {IconPin} from "components/icon/icon-pin";
import IconStar from "components/iconfont/IconStar";
import { IdSelect } from "components/id-select";
import React, { useState } from "react";
import { useDocumentTitle } from "utils/use-documentTitle";

export const HomeScreen = () => {
  useDocumentTitle("HomeScreen");
  const [people, setPeople] = useState(0);

  return (
    <div className="dark:text-white">
      <h1>HomeScreen</h1>
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
      <IconStar className="text-pink-500 fill-current" color="gray" size={40} />
      <IconPin className="w-12 h-12 text-pink-300 fill-current dark:text-gray-600" />
    </div>
  );
};
