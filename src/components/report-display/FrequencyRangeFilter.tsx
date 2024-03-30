import {Group, Select} from "@mantine/core"
import {NumberInput} from "@tremor/react"
import {useState} from "react";

export const FrequencyRangeFilter = () => {
  const [mode, setMode] = useState<"≤" | "≥" | "range" | null>("≤");

  const handleSelectChange = (value: string | null) => {
    if (value === null || (value !== "≤" && value !== "≥" && value !== "range")) {
      return;
    }
    setMode(value);
  }
  return <Group className={"items-end"}>
    <Select className={"w-36"}
            label="Mode"
            value={mode}
            onChange={handleSelectChange}
            placeholder="≤, ≥, range"
            data={['≤', '≥', 'range']}
    />
    {mode === "range" ? (
        <Group>
          <NumberInput className={"w-48"}
                       min={0}
                       placeholder="Enter a lower bound"
          />
          <NumberInput className={"w-48"}
                       min={0}
                       placeholder="Enter a upper bound"
          />
        </Group>
    ) : (
        <NumberInput className={"w-48"}
                     min={0}
                     placeholder={`${mode === "≤" ? "upper" : "lower"} bound`}
        />
    )}
  </Group>
}