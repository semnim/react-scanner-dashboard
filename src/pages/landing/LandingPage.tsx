import {Container, Group, Stack, Text, Title} from "@mantine/core";
import {Link} from "react-router-dom";
import {ReportUpload} from "components/report-upload/ReportUpload.tsx";

export const LandingPage = () => {
  return <Stack gap={"md"} className={"items-center"}>
    <Group>
      <Title order={1}>Your React</Title>
      <Title order={1}>Project At a Glance</Title>
    </Group>

    <Group gap={"xs"} className={"[&>*]:text-2xl"}>
      <Text>
        Visualize your
      </Text>
      <Link to={"http://react.dev"}>
        <img
            className={"w-8 h-8 hover:animate-pulse"}
            src={"react_icon.svg"} alt={"react icon"}/>
      </Link>
      <Text>
        repository with
        Charts and
      </Text>
      <Link className={"flex items-center gap-1 underline hover:text-secondary"}
            target={"_blank"}
            to={"https://github.com/moroshko/react-scanner"}>
        <Text className={"text-2xl"}>react-scanner</Text>
        <img
            src={"github-mark-white.png"} alt={"github icon"}
            className={"w-5 h-5 ml-2"}/>
      </Link>
    </Group>
    <Container mt={50}>
      <ReportUpload/>
    </Container>
  </Stack>
}