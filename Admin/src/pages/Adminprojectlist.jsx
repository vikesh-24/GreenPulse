import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Calendar, 
  Target, 
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Search,
  Download,
  FolderKanban
} from "lucide-react";
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff'
  },
  header: {
    marginBottom: 20,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#065f46'
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#065f46',
    marginBottom: 20
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#065f46'
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#065f46',
    padding: 5
  },
  tableHeader: {
    backgroundColor: '#065f46',
    color: '#ffffff',
    fontWeight: 'bold'
  },
  tableCell: {
    fontSize: 10
  }
});

// PDF Document Component
const ProjectsPDF = ({ projects }) => {
  // Ensure projects is always an array
  const safeProjects = Array.isArray(projects) ? projects : [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Project Management Report</Text>
          <Text style={{ fontSize: 12, color: '#4b5563' }}>
            Generated on {new Date().toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableCol}><Text>Project Name</Text></View>
            <View style={styles.tableCol}><Text>Status</Text></View>
            <View style={styles.tableCol}><Text>Type</Text></View>
            <View style={styles.tableCol}><Text>Goals</Text></View>
          </View>
          {safeProjects.map((project) => (
            <View key={project._id} style={styles.tableRow}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{project.name}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{project.status}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{project.type}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{project.goals?.length || 0}</Text></View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/projects/projects");
      console.log("Fetched data:", response.data);
      
      if (response.data.data && Array.isArray(response.data.data)) {
        setProjects(response.data.data);
      } else {
        console.error("Unexpected data format:", response.data);
        setProjects([]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editproject/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/delete/${id}`);
        setProjects(projects.filter((project) => project._id !== id));
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project. Please try again.");
      }
    }
  };

  const handleDownloadPdf = async () => {
    try {
      setPdfGenerating(true);
      const blob = await pdf(<ProjectsPDF projects={filteredProjects} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'projects-report.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error generating PDF:", err);
      setError("Failed to generate PDF. Please try again.");
    } finally {
      setPdfGenerating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'not started':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'in progress':
        return <Clock className="w-4 h-4" />;
      case 'not started':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Filter projects based on search term
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    project.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Project List
            </h2>
            <p className="text-gray-600 mt-2">Manage and track your projects</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              onClick={() => navigate('/addproject')}
            >
              <Plus className="w-5 h-5" />
              <span>Add Project</span>
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={pdfGenerating || filteredProjects.length === 0}
              className="px-6 py-3 bg-white text-green-600 border border-green-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
            >
              <Download className="w-5 h-5" />
              <span>{pdfGenerating ? 'Generating PDF...' : 'Export PDF'}</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 mb-6">
            {error}
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border border-gray-100"
              >
                {/* Project Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    <span>{project.status}</span>
                  </div>
                </div>

                {/* Project Description */}
                <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                {/* Project Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-sm">
                      {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Target className="w-4 h-4 mr-2 text-green-500" />
                    <span className="text-sm">Type: {project.type}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <TrendingUp className="w-4 h-4 mr-2 text-purple-500" />
                    <span className="text-sm">Goals: {project.goals?.length || 0}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => handleEdit(project._id)}
                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    title="Edit Project"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FolderKanban className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Projects Found</h3>
              <p className="text-gray-600 mb-4">Get started by creating your first project</p>
              <button
                onClick={() => navigate('/addproject')}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Create Project
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;