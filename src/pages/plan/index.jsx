import React, { useState } from "react";
import { toast } from "sonner";
import Loader from "../../components/loader";
import PlanModal from "../../components/modals/plan-modal";
import Shell from "../../components/shell";
import { PlanTable } from "../../components/tables/plan-table";
import {
  useCreatePlan,
  useDeleteAPlan,
  useEditAPlan,
  useGetAllPlans,
} from "../../hooks/usePlan";
import {useSearchParams} from "react-router-dom";
import {DEFAULT_LIMIT} from "../../helpers/service.helpers";

const PlanPage = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page") || 1);
  const limitFromUrl = Number(searchParams.get("limit") || DEFAULT_LIMIT);
  const searchFromUrl = searchParams.get("search") || "";
  const {data, isLoading} = useGetAllPlans({
    page: pageFromUrl,
    limit: limitFromUrl,
    search: searchFromUrl,
  });
  const plans = data?.plans || [];
  const pagination = data?.pagination || {
    totalCount: 0,
    filteredCount: 0,
    totalPages: 1,
    page: pageFromUrl,
    limit: limitFromUrl,
  };

  const deletePlanMutation = useDeleteAPlan();
  const editPlanMutation = useEditAPlan();
  const createPlanMutation = useCreatePlan();

  const handleCreatePlan = () => {
    setSelectedPlan(null);
    setIsModalOpen(true);
  };

  // Opens modal for editing an existing plan
  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  // Deletes a plan from the dummy data
  const handleDeletePlan = async (planId) => {
    try {
      setLoading(true);
      await deletePlanMutation.mutateAsync(planId);
      toast.success("Plan removed successfully");
    } catch (err) {
      toast.error("Failed to delete plan");
    } finally {
      setLoading(false);
    }
  };

  // Handles saving of a plan (create or update)
  const handleSavePlan = async (planData) => {
    try {
      setLoading(true);
      if (selectedPlan) {
        // Update existing plan
        await editPlanMutation.mutateAsync({
          id: selectedPlan._id,
          payload: planData,
        });
        toast.success("Plan updated successfully");
      } else {
        // Create new plan
        await createPlanMutation.mutateAsync({
          ...planData,
          planType: planData.planType.toUpperCase(),
        });
        toast.success("Plan created successfully");
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to save plan");
    } finally {
      setLoading(false);
    }
  };

  const setUrl = (updates = {}) => {
    const p = new URLSearchParams(searchParams);
    if (updates.page != null) p.set("page", String(updates.page));
    if (updates.limit != null) p.set("limit", String(updates.limit));
    if (updates.search != null) {
      if (updates.search) p.set("search", updates.search);
      else p.delete("search");
    }
    setSearchParams(p, {replace: true});
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const handlePageChange = (nextPage) => {
    const safe = Math.max(1, Math.min(nextPage, pagination.totalPages || 1));
    setUrl({page: safe, limit: pagination.limit});
  };

  const handleLimitChange = (nextLimit) => {
    const limit = Number(nextLimit) > 0 ? Number(nextLimit) : DEFAULT_LIMIT;
    setUrl({page: 1, limit});
  };

  return (
    <Shell pageHeader={"Create and View Plans"} pageTitle={"Plans"}>
      <div>
        <div className="">
          <button
            onClick={handleCreatePlan}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
          >
            Create New Plan
          </button>

          {isLoading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <PlanTable
              handleEditPlan={handleEditPlan}
              handleDeletePlan={handleDeletePlan}
              data={plans}
              totalPages={pagination.totalPages}
              totalCount={pagination.totalCount}
              filteredCount={pagination.filteredCount}
              onPageChange={handlePageChange}
              onLimitChange={handleLimitChange}
              initialSearch={searchFromUrl}
            />
          )}

          {isModalOpen && (
            <PlanModal
              plan={selectedPlan}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSavePlan}
              loading={loading}
            />
          )}
        </div>
      </div>
    </Shell>
  );
};

export default PlanPage;
