import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted">
      {children}
    </div>
  );
};

export default AuthLayout;
