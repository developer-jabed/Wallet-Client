
import { LayoutDashboard, Users, Settings, Wallet, PlusCircle, ClipboardClock, UserPen, History, Target } from "lucide-react";

import User from "@/pages/Users/User";
import Analytics from "@/pages/admin/Analytics";
import adminUsers from "@/pages/admin/Users";
import AdminSettings from "@/pages/admin/Settings";
import UpdateProfile from "@/pages/admin/UpdateProfile";
import ViewAllTransactions from "@/pages/admin/ViewAllTransactions";
import AgentManagement from "@/pages/admin/AgentManagment";
import AgentDashboard from "@/pages/Agent/Agent";
import AgentCashIn from "@/pages/Agent/CashInPage";
import AgentTransaction from "@/pages/Agent/AgentTransaction";
import UpdateAgent from "@/pages/Agent/AgentUpdateProfile";
import AgentCashOutHistory from "@/pages/Agent/AgentCashoutHistory";
import WalletOverview from "@/pages/Users/Overview";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import CashInHistory from "@/pages/Users/cashIn";
import Cashout from "@/pages/Users/Cashout";
import TransactionHistory from "@/pages/Users/TransactionHistory";
import ProfileSetting from "@/pages/Users/ProfileSetting";


interface MenuItem {
  label: string;
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: React.ComponentType<any>;
  children?: MenuItem[]; // 👈 added dropdown support
}

export const dashboardMenu: Record<string, MenuItem[]> = {
  user: [
    { label: "Home", path: "user", icon: LayoutDashboard, component: User },
    { label: "Overview", path: "user/overview", icon: Target, component: WalletOverview },
    { label: "Cashin", path: "user/cashIn", icon: FiPlusCircle, component: CashInHistory },
    { label: "Cashout", path: "user/cashout", icon: FiMinusCircle, component: Cashout },
    { label: "History", path: "user/history", icon: History, component: TransactionHistory },
    { label: "Update Profile", path: "user/update", icon: UserPen, component: ProfileSetting },


  ],
  agent: [
    { label: "Agent Home", path: "agent", icon: LayoutDashboard, component: AgentDashboard },
    { label: "Cash In", path: "agent/cashIn", icon: PlusCircle, component: AgentCashIn },
    { label: "History", path: "agent/transaction", icon: ClipboardClock, component: AgentTransaction },
    { label: "CashoutHistory", path: "agent/cashout-transaction", icon: History, component: AgentCashOutHistory },
    { label: "Update", path: "agent/update-profile", icon: UserPen, component: UpdateAgent },
  ],
  admin: [
    { label: "Admin Home", path: "admin", icon: LayoutDashboard, component: Analytics },
    { label: "All Users", path: "admin/users", icon: Users, component: adminUsers },
    {
      label: "System Settings",
      path: "admin/settings",
      icon: Settings,
      component: AdminSettings,
      children: [
        {
          label: "Agent-Managment",
          path: "role-change",
          component: AgentManagement,
          icon: Users, // any lucide-react icon
        },
        {
          label: "Update Profile",
          path: "update-profile",
          component: UpdateProfile,
          icon: UserPen,
        },
        {
          label: "View All Transactions",
          path: "transactions",
          component: ViewAllTransactions,
          icon: Wallet,
        }
      ],

    },
  ],
};
