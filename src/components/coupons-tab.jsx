import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useSearchParams } from "react-router-dom";
import ActiveCouponTab from "./active-coupons-tab";
import InActiveCouponTab from "./inactive-coupons-tab";
import useCouponStore from "../data/stores/coupon.store";

const categories = [
  {
    name: "Active Coupons",
    tabBody: <ActiveCouponTab />,
  },
  {
    name: "Deactivated Coupons",
    tabBody: <InActiveCouponTab />,
  },
];

export default function CouponTabs() {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  // const activeTab = searchParams.get("tab") || "active";
  const { setQueryOptions } = useCouponStore();

  const handleTabChange = (index) => {
    const tab = index === 0 ? "active" : "in-active";
    setSearchParams({ tab });

    // Update the status in the queryOptions based on the selected tab
    if (tab === "active") {
      setQueryOptions({ filters: { status: "active" } });
    } else {
      setQueryOptions({ filters: { status: "in-active" } });
    }
  };
  return (
    <div className="h-screen w-full">
      <div className="w-full">
        <TabGroup onChange={handleTabChange}>
          <TabList className="flex gap-4">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className="rounded-full py-1 h-[40px] px-3 text-sm/6 font-semibold text-myblue focus:outline-none data-[selected]:bg-[#D9ECFF] data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-3">
            {categories.map(({ name, tabBody }) => (
              <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
                {tabBody}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
