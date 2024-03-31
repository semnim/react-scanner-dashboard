import {ReactNode} from "react";
import {Box} from "@mantine/core";

export const GlowContainer = ({children, withPulse}: {
  children: ReactNode,
  withPulse?: boolean
}) => {
  return <Box className="max-w-7xl mx-auto group">
    <Box className="relative group">
      <Box
          className={`absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 ${withPulse ? "animate-pulse-slow" : ""}`}/>
      <Box
          className={"relative ring-1 ring-gray-900/5 rounded-xl leading-none flex items-top justify-start space-x-6"}>
        {children}
      </Box>
    </Box>
  </Box>
}

