import '@mantine/dropzone/styles.css';
import {Dropzone, DropzoneProps, FileRejection} from "@mantine/dropzone";
import {
  IconX,
  IconReport,
  IconReportOff,
  IconChecklist
} from '@tabler/icons-react';
import {Group, Text, rem, Stack} from '@mantine/core';
import {
  useReportDropzoneController
} from "components/report-drop-zone/useReportDropzoneController.tsx";

type OmitDropzoneProps = 'onDrop' | 'onReject';

interface CustomDropzoneProps {
  onReportChange: (newReport: File) => void
}

type ReportDropzoneProps = Omit<DropzoneProps, OmitDropzoneProps> & CustomDropzoneProps;

export interface ReportDropZoneHandlers {
  handleDrop: (acceptedFiles: File[]) => void;
  handleReject: (rejectedFiles: FileRejection[]) => void;
}

export interface ReportDropZoneViewModel {
  errors: string[] | null;
}

export const ReportDropzone = ({onReportChange, ...props}: ReportDropzoneProps) => {
  const {errors, handleDrop, handleReject} = useReportDropzoneController(onReportChange);

  const renderErrors = () => {
    if (!errors || errors.length == 0) {
      return null;
    }
    return (
        <Stack gap={5}>
          {
            errors.map(err => {
              return <Text key={err} mt={5} c={"red"}>
                <IconX size={14} style={{marginRight: 5}}/>
                {err}
              </Text>;
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
          style={{width: '100%'}}
          {...props}
      >
        <Stack>
          <Group justify="center" gap="xl" mih={220} style={{pointerEvents: 'none'}}>
            <Dropzone.Accept>
              <IconChecklist
                  style={{width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)'}}
                  stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconReportOff
                  style={{width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)'}}
                  stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconReport
                  style={{width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)'}}
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