import {useCallback, useState} from "react";
import {FileRejection} from "@mantine/dropzone";
import {
  ReportDropZoneHandlers,
  ReportDropZoneViewModel
} from "components/report-drop-zone/ReportDropzone.tsx";


export const useReportDropzoneController = (onReportChange: (newReport: File) => void): ReportDropZoneViewModel & ReportDropZoneHandlers => {

  const [errors, setErrors] = useState<string[] | null>(null);

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const [file] = acceptedFiles;
    onReportChange(file);
    setErrors(null);
  }, []);

  const handleReject = useCallback((rejectedFiles: FileRejection[]) => {
    const allErrors = rejectedFiles.map((file) => file.errors.map((error) => error.message));
    const withoutDuplicates = [...new Set(allErrors.flat())];
    setErrors(withoutDuplicates);
  }, []);

  return {errors, handleDrop, handleReject};
}