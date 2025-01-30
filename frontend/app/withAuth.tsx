import React, { useEffect, ComponentType } from "react";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { GET_CURRENT_USER } from "./queries/user-query";
interface WithAuthProps {}

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ComponentWithAuth: React.FC<P & WithAuthProps> = (props) => {
    const navigation = useRouter();
    const { loading, error, data } = useQuery(GET_CURRENT_USER);

    useEffect(() => {
      if (!loading && !data?.currentUser) {
        navigation.replace("/(auth)/sign-in");
      }
    }, [loading, data, navigation]);

    if (loading) return null; // or a loading spinner
    if (error) return null; // or an error message

    return data?.currentUser ? <WrappedComponent {...props} /> : null;
  };

  return ComponentWithAuth;
};

export default withAuth;
