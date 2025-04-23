import Loader from "../../components/loader";
import Shell from "../../components/shell";
import { TemplateCard } from "../../components/template-course-card";
import { useGetTemplates } from "../../hooks/useTemplate";

export default function TemplatesPage() {
  const { data, isLoading } = useGetTemplates();

  const templates = (!isLoading && data?.responseObject?.data) || [];

  return (
    <div>
      <Shell pageHeader="All Templates" pageTitle="Template">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {templates.map((template) => {
              return (
                <TemplateCard
                  templateId={template._id}
                  key={template?._id}
                  Img={template?.courseData?.image}
                  title={template.courseData.title}
                  desc={template.courseData.description}
                />
              );
            })}
          </div>
        )}
      </Shell>
    </div>
  );
}
