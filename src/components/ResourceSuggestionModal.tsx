import { useState } from 'react';

interface ResourceSuggestion {
  name: string;
  url: string;
  category: string;
  description: string;
  whyRecommend: string;
}

interface ResourceSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (suggestion: ResourceSuggestion) => void;
}

const ResourceSuggestionModal: React.FC<ResourceSuggestionModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<ResourceSuggestion>({
    name: '',
    url: '',
    category: '',
    description: '',
    whyRecommend: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Design Tools',
    'Development',
    'Productivity',
    'Marketing',
    'Analytics',
    'Project Management',
    'Communication',
    'Finance',
    'Legal',
    'Other'
  ];

  const handleInputChange = (field: keyof ResourceSuggestion, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
      onClose();
      setFormData({
        name: '',
        url: '',
        category: '',
        description: '',
        whyRecommend: ''
      });
    }, 1500);
  };

  const handleClose = () => {
    setFormData({
      name: '',
      url: '',
      category: '',
      description: '',
      whyRecommend: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Suggest a Resource</h2>
              <p className="text-blue-100 mt-1">
                Share your favorite tools with the community
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-blue-200 text-2xl transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-4">
            {/* Resource Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resource Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Canva, Notion, Slack..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL *
              </label>
              <input
                type="url"
                required
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brief Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="What does this resource do? How does it help businesses?"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            </div>

            {/* Why Recommend */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why do you recommend it? *
              </label>
              <textarea
                required
                value={formData.whyRecommend}
                onChange={(e) => handleInputChange('whyRecommend', e.target.value)}
                placeholder="What makes this resource special? How has it helped you?"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 bg-gray-500 text-white font-semibold rounded-xl hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <span>💡</span>
                  Suggest Resource
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceSuggestionModal;