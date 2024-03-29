import {Container, Stack, Text, Title} from "@mantine/core";
import {Link} from "react-router-dom";
import {ReportUpload} from "components/report-upload/ReportUpload.tsx";

export const LandingPage = () => {
  return <Stack align={"center"} gap={"md"}>
    <Title order={1}>Your React Project At a Glance</Title>
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