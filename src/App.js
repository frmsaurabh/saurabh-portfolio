import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import BlogPost from "./components/Blog/BlogPost";        // UPDATED
import BlogDashboard from "./components/Blog/BlogDashboard"; // NEW
import NewPostForm from "./components/Blog/NewPostForm";     // NEW
import Login from "./components/Auth/Login";                 // MOVED
import Credentials from "./components/Credentials";
import ModularInsurance from "./components/ModularInsurance";
import ModularInsuranceEntry from "./components/ModularInsuranceEntry";
import ModularBuilderSingle from "./components/ModularBuilderSingle";
import ModularBuilderMulti from "./components/ModularBuilderMulti";
import TechInAction from "./components/TechInAction";
import PrebuiltPlans from "./components/PrebuiltPlans";
import PaymentPage from "./components/PaymentPage";
import PlanSummaryPage from "./components/PlanSummaryPage";
import ModularReview from "./components/ModularReview";
import CorporateModularEntry from "./components/CorporateModularEntry";
import CorporateSelectModel from "./components/CorporateSelectModel";
import CorporateLogin from "./components/CorporateLogin";
import ModularBuilderCorporateSingle from "./components/ModularBuilderCorporateSingle";
import CorporateUserDetails from "./components/CorporateUserDetails";
import ModularBuilderCorporateMulti from "./components/ModularBuilderCorporateMulti";
import CorporatePlanSummary from "./components/CorporatePlanSummary";
import CorporatePaymentPage from "./components/CorporatePaymentPage";
import CorporatePlanDownload from "./components/CorporatePlanDownload";
import ModularConfirmation from "./components/ModularConfirmation";






function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/credentials" element={<Credentials />} />
          {/* <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/modular-insurance" element={<ModularInsurance />} />
          <Route path="/modular" element={<ModularInsuranceEntry />} />
          <Route path="/builder-single" element={<ModularBuilderSingle />} />
          <Route path="/builder-multi" element={<ModularBuilderMulti />} />
          <Route path="/tech-in-action" element={<TechInAction />} />
          <Route path="/prebuilt" element={<PrebuiltPlans />} />
          <Route path="/corporate-modular" element={<CorporateModularEntry />} />
          <Route path="/corporate-modular/select-model" element={<CorporateSelectModel />} />
          <Route path="/corporate-login" element={<CorporateLogin />} />
          <Route path="/corporate-modular/builder-single" element={<ModularBuilderCorporateSingle />} />
          <Route path="/corporate-user-details" element={<CorporateUserDetails />} />
          <Route path="/corporate-plan-selection" element={<CorporateSelectModel />} />
          <Route path="/summary" element={<PlanSummaryPage />} />
          <Route path="/review" element={<ModularReview />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/corporate-modular/builder-multi" element={<ModularBuilderCorporateMulti />} />          
          <Route path="/corporate-plan-summary" element={<CorporatePlanSummary />} />
          <Route path="/corporate-payment" element={<CorporatePaymentPage />} />
          <Route path="/corporate-plan-download" element={<CorporatePlanDownload />} />
          <Route path="/confirmation" element={<ModularConfirmation />} />


        </Route>

        {/* <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<BlogDashboard />} />
        <Route path="/new-post" element={<NewPostForm />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
