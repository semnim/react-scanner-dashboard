import {
  ReportDisplayHandlers,
  ReportDisplayViewModel
} from "components/report-display/ReportDisplay.tsx";
import {ProcessorTypeMap} from "components/report-upload/schemas.ts";
import {ProcessorType} from "components/report-upload/ReportUpload.tsx";

export const useReportDisplayController = (parsedReport: ProcessorTypeMap[ProcessorType], reportType: ProcessorType): ReportDisplayViewModel & ReportDisplayHandlers => {

  // Simple component usage bar chart
  const getComponentFrequency = (data: ProcessorTypeMap["count-components" | "count-components-and-props"]) => {

    if (reportType === "count-components") {
      return Object.entries(data).map(([component, count]) => ({
        component,
        count
      }))
    }
    return Object.entries(data).map(([component, {instances}]) => ({component, instances}));
  }

  const getPropsFrequencyForComponent = (data: ProcessorTypeMap["count-components-and-props"]) => {
    return Object.entries(data).map(([component, {props}]) => {
      const propsWithCount = Object.entries(props).map(([prop, count]) => ({[prop]: count}));
      const merged = Object.assign({}, ...propsWithCount, {component});
      return merged;
    })
  }
  const extractBarChartData = () => {
    switch (reportType) {
      case "count-components":
        return getComponentFrequency(parsedReport)
      case "count-components-and-props":
        return getPropsFrequencyForComponent(parsedReport);
      case "raw-report":
        return []
    }
  }

  const data = extractBarChartData();
  return {data};
}