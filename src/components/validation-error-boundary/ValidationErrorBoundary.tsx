import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";
import {Accordion, ActionIcon, Button, Group, Modal, Stack, Text} from "@mantine/core";
import {IconCloudStorm, IconInfoCircle} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {ProcessorType} from "components/report-upload/ReportUpload.tsx";

interface ValidationErrorBoundaryProps {
  errors: Record<ProcessorType, string[]>;
}

export const ValidationErrorBoundary = ({errors}: ValidationErrorBoundaryProps) => {
  const [opened, {open, close}] = useDisclosure(false);

  const [chosenProcessor, setChosenProcessor] = useState<ProcessorType | null>(null);
  return (
      <>
        <Text size={"md"} fw={600}>
          Could not associate a processor with the uploaded report.
        </Text>

        <Stack p={10} mt={10} align={"flex-start"} w={"100%"}
               className={"rounded-md border border-solid border-error"}>
          <Stack align={"center"} className={"w-full"}>
            <IconCloudStorm size={50} className={"text-error"}/>
            <Text fw={600} className={"text-dimmed max-w-[75%] text-sm"}>
              Click the info icon to see the validation errors for each processor.
            </Text>
          </Stack>
          <Stack className={"whitespace-nowrap overflow-x-auto rounded-md items-start"}>
            {Object.keys(errors).map((processor, index) => (
                <Group key={processor} className={"items-start"}>
                  <ActionIcon onClick={() => {
                    open()
                    setChosenProcessor(processor as ProcessorType);
                  }}>
                    <IconInfoCircle size={20} color={"red"} className={"text-error mt-2"}/>
                  </ActionIcon>
                  <Text key={index} className={"text-red-500"}>
                    {processor}
                  </Text>
                </Group>
            ))}
          </Stack>
        </Stack>
        {chosenProcessor &&
            <Modal opened={opened} centered size="xl" onClose={close} withCloseButton={false}
                   className={"flex-col overflow-auto"}>
              <Stack gap={10} className={"flex-1 overflow-hidden"}>
                <Group>
                  <Text size={"md"} fw={600}>Validation for Processor:</Text>
                  <Text size={"md"}
                        c={"red"}>{chosenProcessor}</Text>
                </Group>
                <Accordion defaultValue={`${chosenProcessor}_1`} className={"min-h-[600px]"}>
                  {
                    errors[chosenProcessor].map((error, index) => (
                        <Accordion.Item value={`${chosenProcessor}_${String(index + 1)}`}
                                        key={index}>
                          <Accordion.Control>#{index + 1}</Accordion.Control>
                          <Accordion.Panel>
                            <Text component={"pre"} key={error} c={"red"}
                                  className={"whitespace-pre break-words"}>
                              {JSON.stringify(JSON.parse(error), null, 2)}
                            </Text>
                          </Accordion.Panel>
                        </Accordion.Item>
                    ))}
                </Accordion>
                <Stack className={"mx-auto"}>
                  <Text size={"sm"}>Found a mistake?</Text>
                  <Link to={"https://github.com/semnim/react-scanner-dashboard/issues"}
                        target={"_blank"}
                        className={"text-center"}>
                    <Button variant={"outline"}
                            className={"border-dimmed text-dimmed hover:text-offwhite hover:border-offwhite"}>Let
                      me
                      know</Button>
                  </Link>
                </Stack>

              </Stack>
            </Modal>}
      </>
  );
};