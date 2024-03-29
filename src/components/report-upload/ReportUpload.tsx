import {Accordion, ActionIcon, Button, Chip, Group, Modal, Stack, Text} from "@mantine/core";
import {
  IconChecklist,
  IconCloudStorm,
  IconInfoCircle,
} from "@tabler/icons-react";
import {ReportDropzone} from "components/report-drop-zone/ReportDropzone.tsx";
import {useReportUploadController} from "./useReportUploadController";
import {Link} from "react-router-dom";
import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";

export const processors = ["count-components", "count-components-and-props", "raw-report"] as const;
export type Processor = typeof processors[number];

interface ValidationErrorBoundaryProps {
  errors: Record<Processor, string[]>;
}

export const ValidationErrorBoundary = ({errors}: ValidationErrorBoundaryProps) => {
  const [opened, {open, close}] = useDisclosure(false);

  const [chosenProcessor, setChosenProcessor] = useState<Processor | null>(null);
  return (
      <>
        <Text size={"md"} fw={600}>
          Could not associate a processor with the uploaded report.
        </Text>

        <Stack bg={"#f8d7da"} color={"#721c24"} p={10} mt={10} align={"flex-start"}
               style={{width: "100%", border: "1px dashed red", borderRadius: "4px"}}>
          <Stack align={"center"} style={{width: "100%"}}>
            <IconCloudStorm size={50}/>
          </Stack>
          <Stack style={{whiteSpace: 'nowrap', overflowX: 'auto', borderRadius: "5px"}}
                 align={"flex-start"}>
            {Object.keys(errors).map((processor, index) => (
                <Group key={processor} align={"flex-start"}>
                  <ActionIcon variant={"transparent"} onClick={() => {
                    open()
                    setChosenProcessor(processor as Processor);
                  }}>
                    <IconInfoCircle size={20} color={"red"}/>
                  </ActionIcon>
                  <Text key={index} style={{color: 'red'}}>
                    {processor}
                  </Text>
                </Group>
            ))}
          </Stack>
        </Stack>
        {chosenProcessor &&
            <Modal opened={opened} centered size="xl" onClose={close} withCloseButton={false}>
              <Stack gap={10}>
                <Group>
                  <Text size={"md"} fw={600}>Validation for Processor:</Text>
                  <Text size={"md"}
                        c={"red"}>{chosenProcessor}</Text>
                </Group>
                <Accordion defaultValue={`${chosenProcessor}_1`} style={{minHeight: "600px"}}>
                  {
                    errors[chosenProcessor].map((error, index) => (
                        <Accordion.Item value={`${chosenProcessor}_${String(index + 1)}`}
                                        key={index}>
                          <Accordion.Control>#{index + 1}</Accordion.Control>
                          <Accordion.Panel>
                            <Text component={"pre"} key={error} c={"red"}
                                  style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}>
                              {JSON.stringify(JSON.parse(error), null, 2)}
                            </Text>
                          </Accordion.Panel>
                        </Accordion.Item>
                    ))}
                </Accordion>
                <Stack style={{marginInline: "auto"}}>
                  <Text size={"sm"}>Found a mistake?</Text>
                  <Link to={"https://github.com/semnim/react-scanner-dashboard/issues"}
                        target={"_blank"}
                        style={{textAlign: "center"}}><Button variant={"default"}>Let me
                    know</Button></Link>
                </Stack>

              </Stack>
            </Modal>}
      </>
  );
};

export interface ReportUploadViewModel {
  report: File | null;
  reportValidationErrors: Record<Processor, string[]> | null;
  reportType: Processor | null;
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


  const hasErrors = reportValidationErrors !== null && Object.entries(reportValidationErrors).some(([_, errors]) => errors.length > 0);
  const isValidReport = reportValidationErrors === null || !hasErrors;

  const getUserFeedback = (report: File | null) => {

    if (!report) {
      return <Text size={"md"} fw={600}>
        Upload your
        react-scanner report
        to get started.
      </Text>
    }
    if (!isValidReport) {
      return <ValidationErrorBoundary errors={reportValidationErrors}/>
    }

    return <Stack>
      <Text size={"md"} fw={600}>
        Success!
      </Text>
      <Text mt={5} c={"green"}>
        <IconChecklist size={14} style={{marginRight: 5}}/>
        «{report.name}» uploaded successfully.
      </Text>
      <Text size={"md"} fw={600}>
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
            <Button color="blue" onClick={onUploadDifferentReport}>Choose a different
              report</Button>
            <Button disabled={!isValidReport} color={isValidReport ? "green" : "red"}
                    onClick={onVisualizeReport}>Visualize report</Button>
          </Group>
      )
    }
  </Stack>
}