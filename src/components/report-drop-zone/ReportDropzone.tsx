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
                <IconX size={14} color={"red"} className={"mr-1 mt-2"}/>
                <Text key={err} mt={5} c={"red"}>
                  {err}
                </Text>
              </Group>
            })
          }
        </Stack>
    )
  }


  return (
      <Dropzone
          onDrop={handleDrop}
          onReject={handleReject}
          maxSize={5 * 1024 ** 2}
          maxFiles={1}
          accept={{'application/json': ['json']}}
          className={"w-full"}
          {...props}
      >
        <Stack>
          <Group justify="center" gap="xl" mih={220} className={"pointer-events-none"}>
            <Dropzone.Accept>
              <IconChecklist
                  className="w-[3rem] h-[3rem] text-blue-600"
                  stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconReportOff
                  className="w-[3rem] h-[3rem] text-red-600"
                  stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconReport
                  className="w-[3rem] h-[3rem] text-gray-500"
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
  );
}