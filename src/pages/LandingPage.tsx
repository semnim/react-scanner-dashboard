import {Container, Group, Stack, Text, Title} from "@mantine/core";
import {Link} from "react-router-dom";
import {ReportUpload} from "components/report-upload/ReportUpload.tsx";

export const LandingPage = () => {
  return <Stack gap={"md"} className={"items-center"}>
    <Group>
      <Title order={1}>Your</Title>
      <Title order={1}
             fw={900}
             className={"bg-gradient-to-b from-black to-react-blue text-transparent bg-clip-text"}
      >React</Title>
      <Title order={1}>Project At a Glance</Title>
    </Group>

    <Group gap={"xs"}>
      <Text size="md" className={"flex items-center"}>
        Visualize your
      </Text>
      <Link to={"http://react.dev"}>
        <img
            className={"w-8 h-8"}
            src={"react_icon.svg"} alt={"react icon"}/>
      </Link>
      <Text size="md" className={"flex items-center"}>
        repository with
        Charts and
      </Text>
      <Link className={"flex items-center gap-1"}
            target={"_blank"}
            to={"https://github.com/moroshko/react-scanner"}>
        <Text>react-scanner</Text>
        <img
            src={"github_icon.svg"} alt={"react icon"} className={"w-4 h-4 mr-2"}/>
      </Link>
    </Group>
    <Container mt={50}>
      <ReportUpload/>
    </Container>
  </Stack>
}