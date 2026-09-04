import { useLocation } from "react-router-dom";
import ConfigurationForm from "../../features/human-configuration/components/ConfigurationForm";

export default function HumanConfiguration() {
  const location = useLocation();
  const initialMode = location.state?.mode || "essential";

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-10 px-4">
      <ConfigurationForm initialMode={initialMode} />
    </div>
  );
}