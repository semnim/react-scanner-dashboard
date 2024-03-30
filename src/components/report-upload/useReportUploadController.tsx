import {
  ProcessorType,
  ReportUploadHandlers,
  ReportUploadViewModel
} from "components/report-upload/ReportUpload.tsx";
import {useState} from "react";
import {processSchemas} from "components/report-upload/schemas.ts";
import {readUploadedFile} from "lib/fileUtils";
import {processors} from "components/report-upload/processors.ts";
import {useNavigate} from "react-router-dom";

export const useReportUploadController = (): ReportUploadViewModel & ReportUploadHandlers => {
  const [report, setReport] = useState<File | null>(null);
  const [reportType, setReportType] = useState<ProcessorType | null>(null);
  const [reportValidationErrors, setReportValidationErrors] = useState<Record<ProcessorType, string[]> | null>(null);

  const navigate = useNavigate();

  const onReportChange = (newReport: File) => {
    setReport(newReport)
  }

  const onUploadDifferentReport = () => {
    setReport(null);
  }

  const onVisualizeReport = () => {
    navigate("/report", {state: {report, reportType}});
  }

  const onValidateReport = async (report: File) => {
    const reportContents = await readUploadedFile(report);


    const errors: Record<ProcessorType, string[]> = {
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