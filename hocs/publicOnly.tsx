// HOC component
import Spinner from "@/components/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const publicOnly = (WrappedComponent: React.ComponentType<any>) => {
  const AuthCheck: React.FC<any> = (props) => {
    const isAuth = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (isAuth) {
        router.push("/app");
      } // eslint-disable-next-line
    }, [isAuth]);

    return !isAuth ? <WrappedComponent {...props} /> : <Spinner />;
  };
  AuthCheck.displayName = `publicOnly(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return AuthCheck;
};

export default publicOnly;
