// HOC component
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthCheck: React.FC<any> = (props) => {
    const isAuth = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuth) {
        router.push("/");
      }
    }, [isAuth, router]);

    return isAuth ? <WrappedComponent {...props} /> : null;
  };
  AuthCheck.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;
  return AuthCheck;
};

function getDisplayName(WrappedComponent: React.ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAuth;
