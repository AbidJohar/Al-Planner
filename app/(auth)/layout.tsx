import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-screen h-screen items-center justify-center ">
      {/* <Image
        src={"/assets/img/auth-bg-pattern.png"}
        alt="Auth BG"
        fill
        priority
        className="w-full h-full object-fit opacity-20"
      /> */}
      {children}
    </div>
  );
};

export default AuthLayout;
