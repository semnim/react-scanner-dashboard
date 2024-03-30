import {Button, Stack, Text} from "@mantine/core";
import {ProcessorType} from "components/report-upload/ReportUpload.tsx";
import {useReportPageController} from "pages/report/useReportPageController.tsx";
import {ProcessorTypeMap} from "components/report-upload/schemas.ts";
import {ReportDisplay} from "components/report-display/ReportDisplay.tsx";

export interface ReportPageViewModel {
  parsedReport: ProcessorTypeMap[ProcessorType] | null;
  reportType: ProcessorType | null;
  isLoading: boolean;
}

export interface ReportPageHandlers {
  handleClick: () => void,
}

export const ReportPage = () => {

  const {parsedReport, reportType, isLoading, handleClick} = useReportPageController();


  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (!parsedReport || !reportType) {
    return <Stack className={"items-center"}>
      <Text size={"md"} fw={600}>
        No report found. Upload your report to get started.
      </Text>
      <Button onClick={handleClick} color={"blue"} className={"w-64"}>Take me back</Button>
    </Stack>
  }

  return <ReportDisplay parsedReport={parsedReport} reportType={reportType}/>
}
