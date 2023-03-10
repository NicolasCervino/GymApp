import { AuthProvider } from "@/context/auth/AuthProvider";
import { RoutineProvider } from "@/context/routine/RoutineProvider";
import { WorkoutProvider } from "@/context/workout/WorkoutProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ego-Lifting</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthProvider>
        <RoutineProvider>
          <WorkoutProvider>
            <Component {...pageProps} />
          </WorkoutProvider>
        </RoutineProvider>
      </AuthProvider>
    </>
  );
}
