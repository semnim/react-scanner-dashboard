import {Button, Group, Stack, Text} from "@mantine/core";
import {IconChecklist} from "@tabler/icons-react";
import {ReportDropzone} from "components/report-drop-zone/ReportDropzone.tsx";
import {useReportUploadController} from "./useReportUploadController";
import {Link} from "react-router-dom";

export interface ReportUploadViewModel {
  report: File | null;
}

export interface ReportUploadHandlers {
  onReportChange: (newReport: File) => void;
  onUploadDifferentReport: () => void;
  onVisualizeReport: () => void;
}

export const ReportUpload = () => {
  const {
    report,
    onReportChange,
    onUploadDifferentReport,
    onVisualizeReport
  } = useReportUploadController();

  if (!report) {
    return <Stack align={"center"} gap={"md"}>
      <Text size={"md"} fw={600}>
        Upload your <Link target={"_blank"}
                          to={"https://github.com/moroshko/react-scanner"}>react-scanner</Link> report
        to get started
      </Text>
      <ReportDropzone onReportChange={onReportChange}/>
    </Stack>
  }

  return <Stack>
    <Text mt={5} c={"green"}>
      <IconChecklist size={14} style={{marginRight: 5}}/>
      «{report.name}» uploaded successfully.
    </Text>
    <Group>
      <Button color="blue" onClick={onUploadDifferentReport}>Upload another report</Button>
      <Button color="blue" onClick={onVisualizeReport}>Visualize report</Button>
    </Group>
  </Stack>
}