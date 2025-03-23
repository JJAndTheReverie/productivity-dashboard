import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { List, CheckSquare, Trash2, Plus, Timer, Trophy, Archive, FolderPlus, ChevronDown, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const users = ["Alice", "Bob", "Charlie", "Dana"];
const initialWorkspaces = {
  "Productivity Suite": {
    "Client Experience Campaign": { archived: false, tasks: [
      { id: 1, name: "Panel - Brand Behaviour - Active Listening", priority: "High", projectedHours: "Estimate", status: "Planned" },
      { id: 2, name: "Confirm Panelist Availability", priority: "Medium", projectedHours: "Estimate", status: "Pending" },
      { id: 3, name: "Finalize Panel Agenda & Key Topics", priority: "Medium", projectedHours: "Estimate", status: "Pending" },
      { id: 4, name: "Develop Promotional Materials", priority: "Low", projectedHours: "Estimate", status: "Pending" },
      { id: 5, name: "Coordinate Logistics (Venue/Tech)", priority: "Medium", projectedHours: "Estimate", status: "Pending" },
      { id: 6, name: "Prepare Follow-Up Plan", priority: "Low", projectedHours: "Estimate", status: "Pending" }
    ]},
    "Crowe Singapore Knowledge Base": { archived: false, tasks: [] }
  }
};

export default function ProductivityApp() {
  const [projects, setProjects] = useState(initialWorkspaces);
  const [selectedWorkspace, setSelectedWorkspace] = useState(Object.keys(initialWorkspaces)[0]);
  const [selectedProject, setSelectedProject] = useState(Object.keys(initialWorkspaces[selectedWorkspace])[0]);
  const [tasks, setTasks] = useState([]);
  const [weeklyHours, setWeeklyHours] = useState(45);
  const [monthlyHours, setMonthlyHours] = useState(180);
  const [newProjectName, setNewProjectName] = useState("");

  useEffect(() => {
    setTasks(projects[selectedWorkspace][selectedProject]?.tasks || []);
  }, [selectedWorkspace, selectedProject, projects]);

  const addProject = () => {
    if (!newProjectName.trim()) return;
    const updatedProjects = { ...projects };
    updatedProjects[selectedWorkspace][newProjectName] = { archived: false, tasks: [] };
    setProjects(updatedProjects);
    setNewProjectName("");
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen text-gray-900 font-sans">
      <h1 className="text-4xl font-bold text-center pb-4 flex justify-between items-center">🚀 Productivity Dashboard <Trophy className="text-yellow-500" /></h1>
      
      {/* Weekly & Monthly Hours */}
      <div className="p-4 bg-white shadow-md rounded flex justify-between items-center">
        <span className="text-lg font-bold">⏳ Weekly Hours: {weeklyHours}h</span>
        <span className="text-lg font-bold">⏳ Monthly Hours: {monthlyHours}h</span>
      </div>
      
      {/* Project Creation */}
      <div className="p-4 bg-white shadow-md rounded">
        <h2 className="text-xl font-bold mb-2 flex items-center"><FolderPlus className="mr-2" /> Add New Project</h2>
        <input className="w-full p-2 border rounded" placeholder="New Project Name" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} />
        <Button onClick={addProject} className="bg-green-500 hover:bg-green-600 text-white p-2 rounded mt-2 w-full">Add Project</Button>
      </div>
      
      {/* Task Table */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold flex items-center"><List className="mr-2" /> Task Overview</h2>
          <table className="w-full mt-4 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">🏆 Project</th>
                <th className="border border-gray-300 p-2">📅 Deadline</th>
                <th className="border border-gray-300 p-2">🔥 Priority</th>
                <th className="border border-gray-300 p-2">⏳ Projected Hours</th>
                <th className="border border-gray-300 p-2">✅ Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id} className="border border-gray-300">
                  <td className="border border-gray-300 p-2">{task.name}</td>
                  <td className="border border-gray-300 p-2">Set date</td>
                  <td className="border border-gray-300 p-2">{task.priority}</td>
                  <td className="border border-gray-300 p-2">{task.projectedHours}</td>
                  <td className="border border-gray-300 p-2">{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
