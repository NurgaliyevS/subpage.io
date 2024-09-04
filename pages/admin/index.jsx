import React, { useState } from "react";
import HeaderAdmin from "./components/HeaderAdmin";
import Constructor from "./components/Constructor";
import PhoneMockup from "./components/PhoneMockup";
import { useSession } from "next-auth/react";

function Admin() {
  const { data: session } = useSession();

  const [pageContent, setPageContent] = useState({
    ctaButtonText: "Subscribe",
    mainHeadline: "Join our Waitlist!",
    mainDescription:
      "Our new project is launching soon. Join our waitlist to be the first to know when we launch. Stay tuned!",
  });

  const handleUpdate = (updates) => {
    setPageContent((prevContent) => ({ ...prevContent, ...updates }));
  };

  return (
    <div className="min-h-screen bg-neutral">
      <HeaderAdmin />
      <main className="container mx-auto p-4 lg:p-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 max-w-full">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6 text-gray-300">Page Constructor</h1>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <Constructor onUpdate={handleUpdate} session={session} />
              </div>
            </div>
          </div>
          <div className="flex-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-gray-300">Preview</h2>
            <PhoneMockup content={pageContent} session={session} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Admin;
