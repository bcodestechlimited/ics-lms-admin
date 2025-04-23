import React, { useState } from "react";
import MainContainer from "../../components/maincontainer";
import MainHeader from "../../components/mainheader";
import { SearchInput } from "../../components/inputs";
import { MainBtn } from "../../components/button";
import CreateGroupModal from "../../components/modals/creategroupmodal";

const Groups = () => {
  const [modal, setModal] = useState("");
  return (
    <div>
      <MainContainer>
        <MainHeader text={"All Groups"} small={"334 Groups"} />
        <div className="bg-white mt-8 rounded-xl noScroll p-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-6 items-center">
              <h5 className="text-xl font-bold text-secondary">All Groups</h5>
              <SearchInput />
            </div>
            <MainBtn onClick={() => setModal("create")} text={"Create Group"} />
          </div>
          <div className="mt-8"></div>
        </div>
      </MainContainer>
      {modal === "create" && (
        <CreateGroupModal handleClose={() => setModal("")} />
      )}
    </div>
  );
};

export default Groups;
