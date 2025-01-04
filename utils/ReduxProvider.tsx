// "use client";

// import { Provider } from "react-redux";
// import { store } from "@/app/features/store";

// export default function ReduxProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <Provider store={store}>{children}</Provider>;
// }




// utils/ReduxProvider.tsx
"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/app/features/store";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {/* Prevent rendering until persisted state is rehydrated */}
      <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;