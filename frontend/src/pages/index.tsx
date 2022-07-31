import { useNavigate } from "@tanstack/react-location";
import { useEffect } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/main/meeting", replace: true });
  }, []);

  return <></>;
}
