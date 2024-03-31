import {Button, Group, Stack, Text} from "@mantine/core";
import {
  IconChecklist,
} from "@tabler/icons-react";
import {ReportDropzone} from "components/report-drop-zone/ReportDropzone.tsx";
import {useReportUploadController} from "components/report-upload/useReportUploadController.tsx";
import {
  ValidationErrorBoundary
} from "components/validation-error-boundary/ValidationErrorBoundary";
import {processors} from "components/report-upload/processors.ts";


export type ProcessorType = typeof processors[number];

export interface ReportUploadViewModel {
  report: File | null;
  reportValidationErrors: Record<ProcessorType, string[]> | null;
  reportType: ProcessorType | null;
}

export interface ReportUploadHandlers {
  onReportChange: (newReport: File) => void;
  onUploadDifferentReport: () => void;
  onVisualizeReport: () => void;
  onValidateReport: (report: File) => Promise<void>;
}

export const ReportUpload = () => {
  const {
    report,
    reportType,
    reportValidationErrors,
    onReportChange,
    onUploadDifferentReport,
    onValidateReport,
    onVisualizeReport
  } = useReportUploadController();

  const hasErrors = reportValidationErrors !== null && Object.values(reportValidationErrors).some((errors) => errors.length > 0);
  const isValidReport = reportValidationErrors === null || !hasErrors;

  const getUserFeedback = (report: File | null) => {

    if (!report) {
      return <Text fw={600}>
        Upload your
        <Text component={"span"} fw={600} className={"text-secondary"}> react-scanner
          report </Text>
        to get started.
      </Text>
    }
    if (!isValidReport) {
      return <ValidationErrorBoundary errors={reportValidationErrors}/>
    }

    return <Stack>
      <Text fw={600}>
        Success!
      </Text>
      <Group gap={"xs"} className={"items-end"}>
        <IconChecklist size={25} className={"mr-1 text-green-600"}/>
        <Text className={"mt-1 text-green-400"}>
          «{report.name}» uploaded successfully.
        </Text>
      </Group>

      <Text fw={600}>
        Report type: {reportType}
      </Text>
    </Stack>
  }

  return <Stack align={"center"} gap={"md"}>
    {getUserFeedback(report)}
    {
      !report ? (
          <ReportDropzone onReportChange={onReportChange} onValidateReport={onValidateReport}/>
      ) : (
          <Group>
            <Button variant={"outline"}
                    className={"bg-transparent text-secondary hover:text-offwhite border-secondary"}
                    onClick={onUploadDifferentReport}>
              Change report
            </Button>
            <Button disabled={!isValidReport} //color={isValidReport ? "green" : "red"}
                    variant={"filled"}
                    className={"bg-secondary text-primary hover:bg-secondary hover:text-offwhite border-secondary"}
                    onClick={onVisualizeReport}>Visualize</Button>
          </Group>
      )
    }
  </Stack>
}