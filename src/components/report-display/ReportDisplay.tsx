import {ProcessorType} from "components/report-upload/ReportUpload";
import {ProcessorTypeMap} from "components/report-upload/schemas.ts";
import {ComponentFrequencyBarChart} from "./ComponentFrequencyBarChart";
import {PropFrequencyBarChart} from "components/report-display/PropFrequencyBarChart.tsx";
import {ActionIcon, Group, Stack, Tooltip} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {Button} from "@tremor/react";
import {IconDeviceFloppy, IconHome} from "@tabler/icons-react";

export interface ReportDisplayViewModel {
  data: Record<string, number | string | null>[]
}

export interface ReportDisplayHandlers {
}

interface ReportDisplayProps {
  parsedReport: ProcessorTypeMap[ProcessorType];
  reportType: ProcessorType;
}

export const ReportDisplay = ({parsedReport, reportType}: ReportDisplayProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  }
  const renderStatistic = () => {
    switch (reportType) {
      case "count-components":
        return <ComponentFrequencyBarChart parsedData={parsedReport} reportType={reportType}/>
      case "count-components-and-props":
        return <Stack className={"items-center w-full"}>
          <ComponentFrequencyBarChart parsedData={parsedReport} reportType={reportType}/>
          <Group className={"max-w-4xl justify-center"}>
            <PropFrequencyBarChart parsedData={parsedReport} reportType={reportType}/>
          </Group>
        </Stack>
      case "raw-report":
        return null;
    }
  }

  return <Stack className={"items-stretch"}>
    <Group className={"justify-center"}>
      <Tooltip label={"Home"}><ActionIcon variant="transparent" color="black"
                                          onClick={handleClick}><IconHome/></ActionIcon></Tooltip>
      <Tooltip label={"Save as PDF"}><ActionIcon variant="transparent" color="black" disabled
                                                 onClick={handleClick}><IconDeviceFloppy/></ActionIcon></Tooltip>
    </Group>
    {renderStatistic()}
  </Stack>
}

