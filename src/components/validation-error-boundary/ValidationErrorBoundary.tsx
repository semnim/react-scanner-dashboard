import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";
import {Accordion, ActionIcon, Button, Group, Modal, Stack, Text} from "@mantine/core";
import {IconCloudStorm, IconInfoCircle} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {Processor} from "components/report-upload/ReportUpload.tsx";

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

        <Stack bg={"#f8d7da"} color={"error"} p={10} mt={10} align={"flex-start"} w={"100%"}
               className={"rounded-md border border-dashed border-red-500"}>
          <Stack align={"center"} className={"w-full"}>
            <IconCloudStorm size={50}/>
          </Stack>
          <Stack className={"whitespace-nowrap overflow-x-auto rounded-md items-start"}>
            {Object.keys(errors).map((processor, index) => (
                <Group key={processor} className={"items-start"}>
                  <ActionIcon variant={"transparent"} onClick={() => {
                    open()
                    setChosenProcessor(processor as Processor);
                  }}>
                    <IconInfoCircle size={20} color={"red"}/>
                  </ActionIcon>
                  <Text key={index} className={"text-red-500"}>
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
                    <Button variant={"default"}>Let me know</Button>
                  </Link>
                </Stack>

              </Stack>
            </Modal>}
      </>
  );
};