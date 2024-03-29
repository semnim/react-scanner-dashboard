import {useLocation} from "react-router-dom";

interface ReportViewModel {
  report: File | undefined;
}

export const ReportPage = () => {
  const location = useLocation();
  const {report} = (location.state ?? {}) as ReportViewModel;

  return null;
}