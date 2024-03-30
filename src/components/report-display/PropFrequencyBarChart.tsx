import {BarChart, DonutChart} from "@tremor/react"
import {ProcessorTypeMap} from "components/report-upload/schemas"
import {ProcessorType} from "components/report-upload/ReportUpload.tsx";
import {Stack, Text} from "@mantine/core";

interface PropFrequencyBarChartProps {
  parsedData: ProcessorTypeMap["count-components" | "count-components-and-props"];
  reportType: ProcessorType,
}

// TODO: Implement for type 3
export const PropFrequencyBarChart = ({parsedData, reportType}: PropFrequencyBarChartProps) => {

  // Render numeric data
  return Object.entries(parsedData).map(([component, {props}]) => {

    // Dont render empty pie charts
    const hasNoIntegerValue = !Object.values(props).some((v) => typeof v === "number");
    if (hasNoIntegerValue) {
      return null;
    }
    console.log({component, ...props}, Object.keys(props).filter(key => typeof props[key] === "number" && key !== "count"))
    return <Stack key={component} className={"w-48"}>
      <BarChart
          data={{component, ...props}}
          index="component"
          categories={Object.keys(props).filter(key => typeof props[key] === "number" && key !== "count")}
          yAxisWidth={45}
          className="mt-6 h-72 sm:block max-w-3xl"
          // colors={['blue', 'teal', 'amber', 'rose', 'indigo', 'emerald'].slice(0, keys.length)}
      />

      {/*<Text>{component}</Text>*/}
      {/*<DonutChart*/}
      {/*    data={Object.entries(props).map(([prop, count]) => ({name: prop, value: count}))}*/}
      {/*    variant="pie"*/}
      {/*    onValueChange={(v) => console.log(v)}*/}
      {/*/>*/}
    </Stack>

  });

}