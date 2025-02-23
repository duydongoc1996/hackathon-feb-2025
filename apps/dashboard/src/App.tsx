import { GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { QuestCreate, QuestEdit, QuestList, QuestShow } from "./pages/quests";
import {
  UserQuestCreate,
  UserQuestEdit,
  UserQuestList,
  UserQuestShow,
} from "./pages/user-quests";
import { UserCreate, UserEdit, UserList, UserShow } from "./pages/users";
import {
  WalletCreate,
  WalletEdit,
  WalletList,
  WalletShow,
} from "./pages/wallets";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider("http://localhost:4000")}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                resources={[
                  {
                    name: "users",
                    list: "/users",
                    create: "/users/create",
                    edit: "/users/edit/:id",
                    show: "/users/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "wallets",
                    list: "/wallets",
                    create: "/wallets/create",
                    edit: "/wallets/edit/:id",
                    show: "/wallets/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "quests",
                    list: "/quests",
                    create: "/quests/create",
                    edit: "/quests/edit/:id",
                    show: "/quests/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "user-quests",
                    list: "/user-quests",
                    create: "/user-quests/create",
                    edit: "/user-quests/edit/:id",
                    show: "/user-quests/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "6fJwIf-HO94an-4Db477",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <ThemedLayoutV2
                        Header={() => <Header sticky />}
                        Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="users" />}
                    />

                    <Route path="/users">
                      <Route index element={<UserList />} />
                      <Route path="create" element={<UserCreate />} />
                      <Route path="edit/:id" element={<UserEdit />} />
                      <Route path="show/:id" element={<UserShow />} />
                    </Route>
                    <Route path="wallets">
                      <Route index element={<WalletList />} />
                      <Route path="create" element={<WalletCreate />} />
                      <Route path="edit/:id" element={<WalletEdit />} />
                      <Route path="show/:id" element={<WalletShow />} />
                    </Route>
                    <Route path="/quests">
                      <Route index element={<QuestList />} />
                      <Route path="create" element={<QuestCreate />} />
                      <Route path="edit/:id" element={<QuestEdit />} />
                      <Route path="show/:id" element={<QuestShow />} />
                    </Route>
                    <Route path="user-quests">
                      <Route index element={<UserQuestList />} />
                      <Route path="create" element={<UserQuestCreate />} />
                      <Route path="edit/:id" element={<UserQuestEdit />} />
                      <Route path="show/:id" element={<UserQuestShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
