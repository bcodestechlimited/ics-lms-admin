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

const PlanPage = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const {data, isLoading} = useGetAllPlans();
  const plans = (!isLoading && data?.responseObject?.data) || [];

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
              plans={plans}
              loading={loading}
              isLoading={isLoading}
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
