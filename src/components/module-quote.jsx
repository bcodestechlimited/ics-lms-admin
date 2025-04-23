import { useRef } from "react";
import ModuleTextarea from "./module-textarea";
import { TextInput } from "./inputs";
import { PenIcon, UploadIcon } from "lucide-react";
import FormatSectionImage from "../assets/format-section-center.png";
import { toast } from "sonner";

const QuoteSection = ({ section, onUpdate, editMode }) => {
  const avatarInputRef = useRef(null);

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.includes("image")) {
      toast.error("Please upload an image file");
      return;
    }

    try {
      // show local preview
      const localFile = URL.createObjectURL(file);
      onUpdate(section.id, "avatar", file);

      // onUpdate(section.id, 'avatar', uploadedUrl);
    } catch (error) {
      toast.error("Failed to upload image");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative min-h-[230px]">
        <ModuleTextarea
          label="Quote"
          value={section.content.quoteText}
          name={`${section.id}-quote`}
          setState={(newContent) => {
            onUpdate(
              section.id,
              "quoteText",
              newContent[`${section.id}-quote`]
            );
          }}
          editMode={editMode}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-base font-medium text-secondary">
          Author Name
        </label>
        <TextInput
          placeholder="Enter author's name"
          value={section.content.authorName}
          onChange={(e) => onUpdate(section.id, "authorName", e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-base font-medium text-secondary">
          Author Avatar
        </label>
        <div className="space-y-4">
          {section.content.avatar ? (
            <div className="relative w-32 h-32 mx-auto">
              <img
                src={URL.createObjectURL(section.content.avatar)}
                alt="Author avatar"
                className="w-full h-full object-cover rounded-full"
              />
              <button
                onClick={handleAvatarClick}
                className="absolute bottom-0 right-0 bg-myblue text-white p-2 rounded-full hover:bg-myblue/90 transition-colors"
              >
                <PenIcon className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={handleAvatarClick}
              className="cursor-pointer border-2 border-dashed rounded-full w-32 h-32 mx-auto flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <div className="text-center">
                <UploadIcon className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <span className="text-sm text-secondary">Upload Avatar</span>
              </div>
            </div>
          )}
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
      </div>

      {/* Quote formatting */}
      <div>Format</div>
      <div className="flex items-center gap-x-8">
        <div>
          <label htmlFor="alignCenter" className="mb-2 block">
            Align Center
          </label>
          <div className="flex">
            <input type="radio" name="alignCenter" id="alignCenter" />
            <img
              src={FormatSectionImage}
              alt="An icon showing how the quote should be formatted"
            />
          </div>
        </div>

        <div>
          <label htmlFor="justifyLeft" className="mb-2 block">
            Justify Left
          </label>
          <div className="flex">
            <input type="radio" name="justifyLeft" id="justifyLeft" />
            <img
              src={FormatSectionImage}
              alt="An icon showing how the quote should be formatted"
            />
          </div>
        </div>
      </div>

      {/* Preview Section */}
      {/* {section.content.quoteText && section.content.authorName && (
        <div className="bg-gray-50 p-6 rounded-lg mt-8">
          <h3 className="text-lg font-medium mb-4">Preview</h3>
          <div className="flex gap-4 items-start">
            {section.content.avatar && (
              <img
                src={section.content.avatar}
                alt={section.content.authorName}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <blockquote className="text-xl italic text-gray-700 mb-4">
                "{section.content.quoteText}"
              </blockquote>
              <p className="font-medium text-secondary">
                - {section.content.authorName}
              </p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default QuoteSection;
