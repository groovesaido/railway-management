import { TriangleAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <>
      <div className="flex flex-col items-center min-h-screen justify-center">
        <div className="text-red-600">
          <TriangleAlert className="h-72 w-72" />
          <p className="text-5xl select-none font-bold">Access Denied</p>
        </div>
      </div>
    </>
  );
}
