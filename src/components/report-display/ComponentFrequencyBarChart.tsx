import {BarList} from "@tremor/react"
import {ProcessorTypeMap} from "components/report-upload/schemas"
import {ProcessorType} from "components/report-upload/ReportUpload.tsx";
import {
  ActionIcon,
  Affix,
  Box,
  Button,
  ComboboxItem,
  Group,
  Select,
  Stack,
  Tooltip
} from "@mantine/core";
import {useEffect, useRef, useState} from "react";
import {IconArrowDown, IconArrowUp, IconSearch} from "@tabler/icons-react";
import {FrequencyRangeFilter} from "components/report-display/FrequencyRangeFilter.tsx";

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
  const [showFloatingUpButton, setShowFloatingUpButton] = useState(false);
  const [showFloatingDownButton, setShowFloatingDownButton] = useState(true);
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

  const handleGoUp = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }
  const handleGoDown = () => {
    window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});

  }
  const data = getComponentFrequency(parsedData);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250 && window.scrollY <= document.body.scrollHeight - window.innerHeight) {
        setShowFloatingUpButton(true);
      } else {
        setShowFloatingUpButton(false);
      }
      if (window.scrollY !== document.body.scrollHeight - window.innerHeight) {
        setShowFloatingDownButton(true);
      } else {
        setShowFloatingDownButton(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return <Stack>
    <Group className={"justify-around mx-auto items-end"}>
      <FrequencyRangeFilter/>
      <Select
          label="Find a component"
          placeholder="Select a component from the list"
          data={data.map(({name}) => name)}
          searchable
          value={selectedComponent}
          onChange={handleChange}
          className={"w-80"}
      />

      <Button disabled={!selectedComponent} rightSection={<IconSearch/>} onClick={handleFindItem}
              variant={"transparent"}
              color={"black"} className={"pb-2"}>Find</Button>
    </Group>
    <BarList data={data} showAnimation/>
    {showFloatingDownButton && <Affix position={{bottom: 20, left: 40}}>
      <Button onClick={handleGoDown} leftSection={<IconArrowDown/>} variant={"transparent"}
              color={"black"}>Go to end</Button>
    </Affix>}
    {showFloatingUpButton && <Affix position={{top: 20, left: 40}}>
      <Button onClick={handleGoUp} leftSection={<IconArrowUp/>} variant={"transparent"}
              color={"black"}>Go to start</Button>
    </Affix>}


  </Stack>
}