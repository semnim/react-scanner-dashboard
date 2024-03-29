import {z} from "zod";

const countComponentsSchema = z.record(z.number());
const countComponentsAndPropsSchema = z.record(
    z.object({
      instances: z.number(),
      props: z.record(z.number()),
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

export const processSchemas = [countComponentsSchema, countComponentsAndPropsSchema, rawReportSchema];

