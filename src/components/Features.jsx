import React from "react";

const items = [
  {
    title: "Create and Assign Tasks",
    description:
      "Easily create new tasks and to-dos with clear descriptions, due dates, and priorities. Assign tasks to specific team members and keep everyone on the same page.",
  },
  {
    title: "Manage Projects and Subtasks",
    description:
      "Break down large projects into smaller, manageable tasks. Organize your tasks within projects to keep everything structured and on track. Collaborate effectively within your company departments.",
  },
  {
    title: "Set Reminders and Deadlines",
    description:
      "Never miss an important deadline again! Set reminders for your tasks and receive notifications to stay on top of your schedule. Improve team accountability and project delivery rates.",
  },
  {
    title: "Prioritize Workload Effectively",
    description:
      "Mark your tasks as high, medium, or low priority to ensure you're focusing on the most critical tasks first. Manage your workload effectively and avoid feeling overwhelmed. Boost team productivity and meet company goals.",
  },
  {
    title: "Enhanced Communication and Collaboration",
    description:
      "Assign tasks to team members, collaborate on projects, and track progress together. Improve communication and teamwork within your organization. Foster a culture of collaboration to achieve company objectives.",
  },
  {
    title: "Track Progress and Generate Reports",
    description:
      "Visualize your progress and get insights into your team's task completion rates. Generate reports to identify areas for improvement and optimize workflow. Improve overall company efficiency and performance.",
  },
  {
    title: "Mobile App for On-the-Go Access",
    description:
      "Manage your tasks on the go with a dedicated mobile app. Access your to-do list and update progress from anywhere, anytime. Enhance team flexibility and responsiveness to client needs.",
  },
];

const Features = () => {
  return (
    <div className="bg-cyan-100 pb-10 md:pb-20">
      <div className="bg-cyan-200 w-[90%] mx-auto rounded-md p-5 md:p-10 flex flex-col gap-2 ">
        <div>
          <h1 className="font-bold text-center text-gray-700 text-xl underline uppercase">
            Features for Increased Company Efficiency
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h1 className="font-medium md:font-bold text-cyan-700">
                {item.title}
              </h1>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
