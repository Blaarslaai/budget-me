type props = {
  subscription: any;
  activeTab: number;
};

export default function TabBar({ subscription, activeTab }: props) {
  return (
    <>
      {subscription && (
        <div className="flex justify-center">
          <div role="tablist" className="tabs tabs-bordered text-white w-52">
            <a
              href="/pages/accounts"
              role="tab"
              className={`tab ${activeTab === 1 ? "tab-active" : null}`}
            >
              Accounts
            </a>
            <a
              role="tab"
              className={`tab ${activeTab === 2 ? "tab-active" : null}`}
            >
              Tab 2
            </a>
            <a
              role="tab"
              className={`tab ${activeTab === 3 ? "tab-active" : null}`}
            >
              Tab 3
            </a>
          </div>
        </div>
      )}
    </>
  );
}
