import {ReportUploadHandlers, ReportUploadViewModel} from "./ReportUpload";
import {useState} from "react";

export const useReportUploadController = (): ReportUploadViewModel & ReportUploadHandlers => {
  const [report, setReport] = useState<File | null>(null);

  const onReportChange = (newReport: File) => {
    setReport(newReport)
  }

  const onUploadDifferentReport = () => {
    setReport(null);
  }

  const onVisualizeReport = () => {
    console.log('Visualizing report', report);
  }

  return {report, onReportChange, onUploadDifferentReport, onVisualizeReport};
}