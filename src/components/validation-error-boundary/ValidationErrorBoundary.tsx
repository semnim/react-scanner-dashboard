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
               style={{border: "1px dashed red", borderRadius: "4px"}}>
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