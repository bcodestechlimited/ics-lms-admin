import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

export const CourseCombobox = ({ courses, selectedId, onChange, disabled }) => {
  const [query, setQuery] = useState("");

  console.log("courses", courses);

  const selectedCourse = courses.find((c) => c._id === selectedId) || null;

  const filteredCourses =
    query === ""
      ? courses
      : courses.filter((course) =>
          course.title.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <Combobox
      value={selectedCourse}
      onChange={(c) => onChange(c?._id)}
      disabled={disabled}
    >
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-md border bg-white text-left focus-within:ring-1 focus-within:ring-blue-500 sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            displayValue={(course) => course?.title || ""}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={disabled ? "Loading courses..." : "Search for a course..."}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronsUpDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </Combobox.Button>
        </div>

        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          {filteredCourses.length === 0 && query !== "" ? (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              Nothing found.
            </div>
          ) : (
            filteredCourses.map((course) => (
              <Combobox.Option
                key={course._id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-blue-500 text-white" : "text-gray-900"
                  }`
                }
                value={course}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {course.title}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? "text-white" : "text-blue-500"
                        }`}
                      >
                        <CheckIcon className="h-4 w-4" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};
