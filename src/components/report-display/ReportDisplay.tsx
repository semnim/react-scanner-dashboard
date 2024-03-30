import {ProcessorType} from "components/report-upload/ReportUpload";
import {BarChart} from "@tremor/react";
import {ProcessorTypeMap} from "components/report-upload/schemas.ts";
import {useReportDisplayController} from "components/report-display/useReportDisplayController.tsx";
import {useNavigate} from "react-router-dom";
import {Button} from "@mantine/core";

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
  const {data} = useReportDisplayController(parsedReport, reportType);
  const keys: string[] = [];
  for (const item of data) {
    for (const key in item) {
      console.log(key);
      if (!keys.includes(key) && key !== 'component') {
        keys.push(key);
      }
    }
  }
  const filledData = data.map((item) => {
    for (const key of keys) {
      if (!item[key]) {
        item[key] = null;
      }
    }
    return item;
  });

  console.log(parsedReport, reportType)
  return <>
    {/*<BarChart*/}
    {/*    data={data}*/}
    {/*    index="component"*/}
    {/*    categories={["count"]}*/}
    {/*    yAxisWidth={45}*/}
    {/*    className="mt-6 h-72 sm:block max-w-3xl"*/}
    {/*    colors={['black']}*/}
    {/*/>*/}
    <BarChart
        data={filledData}
        index="component"
        categories={keys.slice(0, 6)}
        yAxisWidth={45}
        className="mt-6 h-72 sm:block max-w-3xl"
        colors={['blue', 'teal', 'amber', 'rose', 'indigo', 'emerald'].slice(0, keys.length)}
    />
    <Button onClick={() => {
      navigate("/")
    }}>Go back</Button>
  </>
}

