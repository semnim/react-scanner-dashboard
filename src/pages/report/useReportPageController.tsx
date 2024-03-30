import {useLocation, useNavigate} from "react-router-dom";
import {z} from "zod";
import {processors} from "components/report-upload/processors.ts";
import {readUploadedFile} from "lib/fileUtils.ts";
import {ProcessorTypeMap} from "components/report-upload/schemas.ts";
import {ReportPageHandlers, ReportPageViewModel} from "pages/report/ReportPage.tsx";
import {ProcessorType} from "components/report-upload/ReportUpload";
import {useEffect, useState} from "react";

export const useReportPageController = (): ReportPageViewModel & ReportPageHandlers => {
  const location = useLocation();
  const navigate = useNavigate();


  const [parsedReport, setParsedReport] = useState<ProcessorTypeMap[ProcessorType] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reportType, setReportType] = useState<ProcessorType | null>(null);

  useEffect(() => {
    const validateState = () => {
      const schema = z.object({
        report: z.instanceof(File),
        reportType: z.enum(processors)
      });

      const result = schema.safeParse((location.state));
      return result.success;
    }

    const parseReport = async (report: File): Promise<ProcessorTypeMap[ProcessorType]> => {
      setIsLoading(true);
      const reportContents = await readUploadedFile(report);

      return JSON.parse(reportContents) as ProcessorTypeMap[typeof reportType];
    }

    const hasValidState = validateState();
    if (!hasValidState) {
      return;
    }
    const {report, reportType} = location.state as { report: File, reportType: ProcessorType };
    parseReport(report)
    .then(r => {
      setParsedReport(r);
      setReportType(reportType);
    })
    .catch((error: unknown) => {
      console.error(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [location.state]);


  const handleClick = () => {
    navigate("/");
  }


  return {parsedReport, reportType, isLoading, handleClick};
}