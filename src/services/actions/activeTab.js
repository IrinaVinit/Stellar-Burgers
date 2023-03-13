export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";

export const setActiveTab = (activeTab) => {
  return { type: SET_ACTIVE_TAB, currentTab: activeTab };
};
