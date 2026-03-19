import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-screen h-full items-center justify-center ">
     
      {children}
    </div>
  );
};

export default AuthLayout;
