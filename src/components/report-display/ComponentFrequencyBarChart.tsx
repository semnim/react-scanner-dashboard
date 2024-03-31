import {BarList} from "@tremor/react"
import {ProcessorTypeMap} from "components/report-upload/schemas"
import {ProcessorType} from "components/report-upload/ReportUpload.tsx";
import {
  ActionIcon,
  Affix,
  Button,
  ComboboxItem,
  Group,
  Select,
  Stack,
} from "@mantine/core";
import {useEffect, useRef, useState} from "react";
import {
  IconArrowDown,
  IconArrowUp,
  IconSearch,
  IconViewfinder,
  IconViewfinderOff
} from "@tabler/icons-react";
import {FrequencyRangeFilter} from "components/report-display/FrequencyRangeFilter.tsx";
import {ScrollButtons} from "./ScrollButtons";

interface ComponentFrequencyBarChartProps {
  parsedData: ProcessorTypeMap["count-components" | "count-components-and-props"];
  reportType: ProcessorType,
}

interface Bar {
  name: string,
  value: number,
  color: string,
}

export const ComponentFrequencyBarChart = ({
                                             parsedData,
                                             reportType
                                           }: ComponentFrequencyBarChartProps) => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const getComponentFrequency = (data: ProcessorTypeMap["count-components" | "count-components-and-props"]): Bar[] => {

    if (reportType === "count-components") {
      return Object.entries(data).map(([component, count]) => ({
        name: component,
        value: count,
        color: selectedComponent === component ? "red" : "blue",
      }))
    }
    return Object.entries(data).map(([component, {instances}]) => ({
      name: component,
      value: instances,
      color: selectedComponent === component ? "red" : "blue",
    }));
  }
  const findItemByItemText = (text: string) => {
    const elements = document.querySelectorAll(".tremor-BarList-bar");
    for (const element of elements) {
      if (element.textContent === text) {
        return element;
      }
    }
  }

  const handleChange = (value: string | null, _: ComboboxItem) => {
    setSelectedComponent(value);
  }

  const handleFindItem = () => {
    if (!selectedComponent) {
      return;
    }
    const element = findItemByItemText(selectedComponent);
    if (element) {
      element.scrollIntoView({behavior: "smooth", block: "center"});
    }
  }


  const data = getComponentFrequency(parsedData);


  return <Stack>
    <Group className={"justify-around mx-auto items-center"}>
      {/*<FrequencyRangeFilter/>*/}
      <Select
          placeholder="Find a component"
          data={data.map(({name}) => name)}
          searchable
          clearable
          value={selectedComponent}
          onChange={handleChange}
          color={"black"}
          classNames={{
            root: "w-80",
          }}
      />

      <ActionIcon disabled={!selectedComponent}
                  onClick={handleFindItem}>
        <IconViewfinder/>
      </ActionIcon>

    </Group>
    <BarList data={data} showAnimation className={"text-offwhite"}/>
    <ScrollButtons/>


  </Stack>
}