import {Container, Group, Stack, Text, Title} from "@mantine/core";
import {Link} from "react-router-dom";
import {ReportUpload} from "components/report-upload/ReportUpload.tsx";

export const LandingPage = () => {
  return <Stack align={"center"} gap={"md"}>
    <Group>
      <Title order={1}>Your</Title>
      <Title order={1} fw={900} style={{
        background: "linear-gradient(180deg, black, #61DBFB)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      >React</Title>
      <Title order={1}>Project At a Glance</Title>
    </Group>

    <Text size="md" display={"flex"} style={{alignItems: "center"}}>
      Visualize your <Link to={"http://react.dev"}><img
        style={{width: "2rem", height: "2rem", marginInline: ".5rem"}}
        src={"public/react_icon.svg"} alt={"react icon"}/></Link> repository with
      Charts.
    </Text>
    <Container mt={50}>
      <ReportUpload/>
    </Container>
  </Stack>
}