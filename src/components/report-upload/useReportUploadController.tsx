import {Processor, processors, ReportUploadHandlers, ReportUploadViewModel} from "./ReportUpload";
import {useState} from "react";
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

const processSchemas = [countComponentsSchema, countComponentsAndPropsSchema, rawReportSchema];
const readUploadedFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };

    reader.onerror = (error) => {
      reject(new Error(`File read failed: ${error.target?.error?.message ?? "Unknown error"}`));
    };

    reader.readAsText(file);
  });
};

export const useReportUploadController = (): ReportUploadViewModel & ReportUploadHandlers => {
  const [report, setReport] = useState<File | null>(null);
  const [reportType, setReportType] = useState<Processor | null>(null);
  const [reportValidationErrors, setReportValidationErrors] = useState<Record<Processor, string[]> | null>(null);

  const onReportChange = (newReport: File) => {
    setReport(newReport)
  }

  const onUploadDifferentReport = () => {
    setReport(null);
  }

  const onVisualizeReport = () => {
    // TODO
  }

  const onValidateReport = async (report: File) => {
    const reportContents = await readUploadedFile(report);



    const errors: Record<Processor, string[]> = {
      "count-components": [],
      "count-components-and-props": [],
      "raw-report": [],
    }

    for (let i = 0; i < processSchemas.length; i++) {
      const schema = processSchemas[i];

      const result = schema.safeParse(JSON.parse(reportContents));

      if (!result.success) {
        for (const processor of processors) {
          result.error.errors.forEach((error) => {
            errors[processor].push(JSON.stringify(error));
          });
        }
      } else {
        setReportType(processors[i]);
        setReportValidationErrors({
          "count-components": [],
          "count-components-and-props": [],
          "raw-report": [],
        });
        return;
      }
    }

    setReportValidationErrors(errors);
  }
  return {
    report,
    reportType,
    reportValidationErrors,
    onValidateReport,
    onReportChange,
    onUploadDifferentReport,
    onVisualizeReport
  };
}