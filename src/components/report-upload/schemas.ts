import {z} from "zod";
import {ProcessorType} from "./ReportUpload";

const countComponentsSchema = z.record(z.number());
const countComponentsAndPropsSchema = z.record(
    z.object({
      instances: z.number(),
      props: z.record(z.union([z.number(), z.string(), z.boolean()])),
    })
);
const rawReportSchema = z.record(
    z.object({
      instances: z.array(
          z.object({
            props: z.record(z.union([z.string(), z.null()])),
            propsSpread: z.boolean(),
            location: z.object({
              file: z.string(),
              start: z.object({
                line: z.number(),
                column: z.number(),
              }),
            }),
          })
      ),
    })
);

const processSchemas = [countComponentsSchema, countComponentsAndPropsSchema, rawReportSchema];

type Processor = typeof processSchemas[number];
type ProcessorTypeMap = Record<ProcessorType, z.infer<Processor>>

export {processSchemas};
export type {ProcessorTypeMap};

