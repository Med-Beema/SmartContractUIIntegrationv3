import React from "react";
import { Route, Routes } from "react-router-dom";
import AllCovers from "../components/AllCovers/AllCovers";
import ClaimResult from "../components/Claims/ClaimResult";
import Claims from "../components/Claims/Claims";
import FileClaimForm from "../components/Claims/FileClaimForm";
import ClaimsDetails from "../components/Claims/ClaimsDetails";
import MyDetails from "../components/MyDetails/MyDetails";
import MyDetailsFront from "../components/MyDetails/MyDetailsFront";
import Stake from "../components/Stake/Stake";
import AssessmentCard from "../components/Cards/AssessmentCard";
import ClaimsPage from "../views/ClaimsPage";
import CoverPage from "../views/CoverPage";
import TokenPage from "../views/TokenPage";

function AppRoute() {
  return (
    <Routes>
      <Route exact path="/" element={<CoverPage />}>
        <Route path="" element={<MyDetailsFront />}></Route>
        <Route path="AllCovers" element={<AllCovers />} />
      </Route>
      <Route path="/MyCovers" element={<AllCovers />} />
      <Route path="/Claims" element={<Claims />} />
      <Route path="/KYC" element={<MyDetails />} />
      <Route path="/tokens" element={<TokenPage />} />
      <Route path="/claims" element={<ClaimsPage />} />
      <Route path="/claimdetails/:claimID" element={<ClaimsDetails />} />
      <Route path="/claimresults" element={<ClaimResult />} />
      <Route path="/fileclaim" element={<FileClaimForm />} />
      <Route path="/stake" element={<Stake />} />
      <Route path="/assessment/:claimID" element={<AssessmentCard />} />
    </Routes>
  );
}

export default AppRoute;
