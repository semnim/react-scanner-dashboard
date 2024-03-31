import '@mantine/dropzone/styles.css';
import {Dropzone, DropzoneProps, FileRejection} from "@mantine/dropzone";
import {
  IconX,
  IconReport,
  IconReportOff,
  IconChecklist
} from '@tabler/icons-react';
import {Group, Text, Stack} from '@mantine/core';
import {
  useReportDropzoneController
} from "components/report-drop-zone/useReportDropzoneController.tsx";
import {GlowContainer} from "components/glow-container/GlowContainer.tsx";

type OmitDropzoneProps = 'onDrop' | 'onReject';

interface CustomDropzoneProps {
  onReportChange: (newReport: File) => void
  onValidateReport: (report: File) => Promise<void>;
}

type ReportDropzoneProps = Omit<DropzoneProps, OmitDropzoneProps> & CustomDropzoneProps;

export interface ReportDropZoneHandlers {
  handleDrop: (acceptedFiles: File[]) => void;
  handleReject: (rejectedFiles: FileRejection[]) => void;
}

export interface ReportDropZoneViewModel {
  errors: string[] | null;
}

export const ReportDropzone = ({
                                 onReportChange,
                                 onValidateReport,
                                 ...props
                               }: ReportDropzoneProps) => {
  const {
    errors,
    handleDrop,
    handleReject
  } = useReportDropzoneController(onReportChange, onValidateReport);

  const renderErrors = () => {
    if (!errors || errors.length == 0) {
      return null;
    }
    return (
        <Stack gap={5}>
          {
            errors.map(err => {
              return <Group key={err} gap={"xs"} className={"items-baseline justify-start mr-auto"}>
                <IconX size={14} className={"mr-1 relative top-0.5 text-error"}/>
                <Text key={err} mt={5} className={"text-sm text-error"}>
                  {err}
                </Text>
              </Group>
            })
          }
        </Stack>
    )
  }


  return (
      <GlowContainer withPulse>
        <Dropzone
            onDrop={handleDrop}
            onReject={handleReject}
            maxSize={5 * 1024 ** 2}
            maxFiles={1}
            accept={{'application/json': ['json']}}
            className={"h-full w-full bg-primary rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100 group-hover:bg-opacity-90 px-8 border-1 border-solid thin-border border-0 group-hover:text-secondary group-hover:bg-primary"}
            {...props}
        >
          <Stack>
            <Group justify="center" gap="xl" mih={220} className={"pointer-events-none"}>
              <Dropzone.Accept>
                <IconChecklist
                    className="w-[3rem] h-[3rem] text-success"
                    stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconReportOff
                    className="w-[3rem] h-[3rem] text-error"
                    stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconReport
                    className="w-[3rem] h-[3rem] text-secondary opacity-50"
                    stroke={1.5}
                />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag or click to upload your report
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  The report should not exceed 5mb
                </Text>
              </div>
            </Group>
            {renderErrors()}
          </Stack>
        </Dropzone>
      </GlowContainer>
  );
}