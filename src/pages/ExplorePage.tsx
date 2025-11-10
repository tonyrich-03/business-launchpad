import React, { useState, useEffect, useRef } from 'react';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  description: string;
  uploadedAt: Date;
}

// IndexedDB setup
const DB_NAME = 'MediaExplorerDB';
const DB_VERSION = 1;
const STORE_NAME = 'mediaItems';

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => {
      console.error('IndexedDB open error:', request.error);
      reject(request.error);
    };
    
    request.onsuccess = () => {
      console.log('IndexedDB opened successfully');
      resolve(request.result);
    };
    
    request.onupgradeneeded = (event) => {
      console.log('IndexedDB upgrade needed');
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        console.log('Creating object store');
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('uploadedAt', 'uploadedAt', { unique: false });
      }
    };

    request.onblocked = () => {
      console.error('IndexedDB blocked');
    };
  });
};

const saveMediaItems = async (items: MediaItem[]): Promise<void> => {
  try {
    console.log('Saving items to IndexedDB:', items.length);
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    // Clear existing items
    await new Promise<void>((resolve, reject) => {
      const clearRequest = store.clear();
      clearRequest.onsuccess = () => {
        console.log('Cleared existing items');
        resolve();
      };
      clearRequest.onerror = () => reject(clearRequest.error);
    });
    
    // Add all items
    for (const item of items) {
      await new Promise<void>((resolve, reject) => {
        const addRequest = store.add(item);
        addRequest.onsuccess = () => resolve();
        addRequest.onerror = () => reject(addRequest.error);
      });
    }
    
    console.log('All items saved successfully');
  } catch (error) {
    console.error('Error saving to IndexedDB:', error);
    throw error;
  }
};

const loadMediaItems = async (): Promise<MediaItem[]> => {
  try {
    console.log('Loading items from IndexedDB...');
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      
      request.onerror = () => {
        console.error('Error loading from IndexedDB:', request.error);
        reject(request.error);
      };
      
      request.onsuccess = () => {
        const items = request.result.map((item: any) => ({
          ...item,
          uploadedAt: new Date(item.uploadedAt)
        }));
        console.log('Loaded items from IndexedDB:', items.length);
        resolve(items);
      };
    });
  } catch (error) {
    console.error('Error loading from IndexedDB:', error);
    return [];
  }
};

// Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const ExplorePage: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load media items from IndexedDB on component mount
  useEffect(() => {
    const loadItems = async () => {
      try {
        console.log('=== STARTING LOAD FROM INDEXEDDB ===');
        setIsLoading(true);
        const items = await loadMediaItems();
        console.log('=== LOAD COMPLETE ===', items);
        setMediaItems(items);
      } catch (error) {
        console.error('Failed to load items:', error);
        // Fallback to localStorage if IndexedDB fails
        try {
          const fallbackData = localStorage.getItem('exploreMediaItems_fallback');
          if (fallbackData) {
            const parsedItems = JSON.parse(fallbackData).map((item: any) => ({
              ...item,
              uploadedAt: new Date(item.uploadedAt)
            }));
            setMediaItems(parsedItems);
            console.log('Loaded from localStorage fallback:', parsedItems.length);
          }
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadItems();
  }, []);

  // Save media items to IndexedDB whenever they change
  useEffect(() => {
    if (!isLoading) { // Don't save during initial load
      const saveItems = async () => {
        try {
          console.log('=== SAVING TO INDEXEDDB ===', mediaItems.length, 'items');
          await saveMediaItems(mediaItems);
          
          // Also save to localStorage as backup
          try {
            localStorage.setItem('exploreMediaItems_fallback', JSON.stringify(mediaItems));
          } catch (localStorageError) {
            console.warn('Could not save to localStorage backup:', localStorageError);
          }
          
        } catch (error) {
          console.error('Failed to save items to IndexedDB:', error);
          // Fallback to localStorage
          try {
            localStorage.setItem('exploreMediaItems_fallback', JSON.stringify(mediaItems));
            console.log('Saved to localStorage fallback instead');
          } catch (fallbackError) {
            console.error('Fallback save also failed:', fallbackError);
          }
        }
      };

      saveItems();
    }
  }, [mediaItems, isLoading]);

  // Process files (used by both file input and drag/drop)
  const processFiles = async (files: FileList) => {
    if (!files || files.length === 0) return;

    setUploading(true);

    const newItems: MediaItem[] = [];

    for (const file of Array.from(files)) {
      try {
        console.log('Processing file:', file.name, 'size:', file.size);
        
        if (file.size > 5 * 1024 * 1024) {
          alert(`File ${file.name} is too large (max 5MB). Skipping.`);
          continue;
        }

        const base64Url = await fileToBase64(file);
        console.log('File converted to base64');
        
        newItems.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          type: file.type.startsWith('image/') ? 'image' : 'video',
          url: base64Url,
          title: file.name,
          description: `Uploaded ${new Date().toLocaleDateString()}`,
          uploadedAt: new Date()
        });
      } catch (error) {
        console.error('Error converting file to base64:', error);
        alert(`Error processing file ${file.name}. Please try a smaller file.`);
      }
    }

    if (newItems.length > 0) {
      setMediaItems(prev => [...prev, ...newItems]);
      console.log('Added new items. Total now:', mediaItems.length + newItems.length);
    }
    
    setUploading(false);
  };

  // Handle file input change
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      await processFiles(files);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Drag and drop handlers
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      await processFiles(files);
    }
  };

  // Click handler for the upload area
  const handleUploadAreaClick = () => {
    if (fileInputRef.current && !uploading) {
      fileInputRef.current.click();
    }
  };

  // Individual delete function
  const handleDeleteItem = (id: string) => {
    console.log('Deleting item:', id);
    setMediaItems(prev => prev.filter(item => item.id !== id));
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
  };

  // Clear all function
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all media items?')) {
      console.log('Clearing all items');
      setMediaItems([]);
      setSelectedItems([]);
      setIsSelectionMode(false);
    }
  };

  // Selection mode toggle
  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    if (isSelectionMode) {
      setSelectedItems([]);
    }
  };

  // Toggle individual item selection
  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  // Select all items
  const selectAllItems = () => {
    setSelectedItems(mediaItems.map(item => item.id));
  };

  // Deselect all items
  const deselectAllItems = () => {
    setSelectedItems([]);
  };

  // Bulk delete selected items
  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedItems.length} selected item(s)?`)) {
      console.log('Bulk deleting items:', selectedItems);
      setMediaItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
      setIsSelectionMode(false);
    }
  };

  // Debug function to check storage
  const debugStorage = async () => {
    console.log('=== DEBUG STORAGE ===');
    console.log('Media items in state:', mediaItems);
    console.log('Loading state:', isLoading);
    
    try {
      const dbItems = await loadMediaItems();
      console.log('Items in IndexedDB:', dbItems);
      
      const fallback = localStorage.getItem('exploreMediaItems_fallback');
      console.log('Fallback in localStorage:', fallback ? JSON.parse(fallback) : 'None');
    } catch (error) {
      console.error('Debug error:', error);
    }
  };

  const allItemsSelected = mediaItems.length > 0 && selectedItems.length === mediaItems.length;

  // Show loading state
  if (isLoading) {
    return (
      <div className="p-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⏳</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Loading your media...</h3>
            <p className="text-slate-600">Please wait while we load your saved items</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Explore & Share</h1>
            <p className="text-slate-600">Upload and discover images, videos, and resources</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-green-600">
                ✓ Items are now saved permanently (using browser storage)
              </span>
              <button 
                onClick={debugStorage}
                className="text-xs bg-gray-200 px-2 py-1 rounded"
              >
                Debug Storage
              </button>
            </div>
          </div>
          
          <div className="flex gap-2">
            {mediaItems.length > 0 && (
              <>
                {isSelectionMode ? (
                  <>
                    {selectedItems.length > 0 && (
                      <button
                        onClick={handleBulkDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Delete Selected ({selectedItems.length})
                      </button>
                    )}
                    <button
                      onClick={allItemsSelected ? deselectAllItems : selectAllItems}
                      className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      {allItemsSelected ? 'Deselect All' : 'Select All'}
                    </button>
                    <button
                      onClick={toggleSelectionMode}
                      className="bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={toggleSelectionMode}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Select Items
                    </button>
                    <button
                      onClick={handleClearAll}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Clear All
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Upload Section with Drag & Drop */}
        <div 
          className={`bg-white rounded-xl border-2 border-dashed p-8 text-center mb-8 transition-colors ${
            isDragOver 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-slate-300 hover:border-slate-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadAreaClick}
          style={{ cursor: uploading ? 'wait' : 'pointer' }}
        >
          <input
            ref={fileInputRef}
            type="file"
            id="media-upload"
            multiple
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
            disabled={uploading}
          />
          <div className="cursor-pointer">
            <div className="text-6xl mb-4">
              {uploading ? '⏳' : (isDragOver ? '📂' : '📁')}
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              {uploading ? 'Uploading...' : 'Upload Media'}
            </h3>
            <p className="text-slate-600 mb-4">
              Drag and drop images or videos, or click to browse
            </p>
            <p className="text-sm text-orange-600 mb-2">
              Note: Files are saved in your browser (max 5MB per file)
            </p>
            <button
              type="button"
              disabled={uploading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-wait"
              onClick={(e) => {
              e.stopPropagation();
              // Add this to trigger file input
              if (fileInputRef.current && !uploading) {
                fileInputRef.current.click();
               }
              }}
            >
              {uploading ? 'Uploading...' : 'Choose Files'}
            </button>
            
            {isDragOver && (
              <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
                <p className="text-blue-700 font-medium">Drop your files here to upload</p>
              </div>
            )}
          </div>
        </div>

        {isSelectionMode && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-center">
              💡 Selection mode active. Click on items to select them, then click "Delete Selected" to remove.
            </p>
          </div>
        )}

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mediaItems.map((item) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col ${
                selectedItems.includes(item.id) 
                  ? 'border-2 border-blue-500 ring-2 ring-blue-200' 
                  : 'border-slate-200'
              } ${isSelectionMode ? 'cursor-pointer' : ''}`}
              onClick={() => isSelectionMode && toggleItemSelection(item.id)}
            >
              <div className="relative flex-grow min-h-0">
                {item.type === 'image' ? (
                  <div className="relative w-full h-full">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-contain max-h-64 bg-slate-100"
                    />
                    {isSelectionMode && (
                      <div className={`absolute top-2 left-2 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedItems.includes(item.id)
                          ? 'bg-blue-600 border-blue-600'
                          : 'bg-white border-slate-300'
                      }`}>
                        {selectedItems.includes(item.id) && (
                          <span className="text-white text-sm">✓</span>
                        )}
                      </div>
                    )}
                    {!isSelectionMode && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteItem(item.id);
                        }}
                        className="absolute top-2 right-2 bg-gray-300 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg"
                        title="Delete this item"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <video
                      src={item.url}
                      className="w-full h-full object-contain max-h-64 bg-slate-100"
                      controls
                    />
                    {isSelectionMode && (
                      <div className={`absolute top-2 left-2 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedItems.includes(item.id)
                          ? 'bg-blue-600 border-blue-600'
                          : 'bg-white border-slate-300'
                      }`}>
                        {selectedItems.includes(item.id) && (
                          <span className="text-white text-sm">✓</span>
                        )}
                      </div>
                    )}
                    {!isSelectionMode && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteItem(item.id);
                        }}
                        className="absolute top-2 right-2 bg-gray-300 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg"
                        title="Delete this item"
                      >
                        ×
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-1 truncate">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>{item.type.toUpperCase()}</span>
                  <span>{item.uploadedAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {mediaItems.length === 0 && !uploading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🖼️</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No media yet</h3>
            <p className="text-slate-600">Upload your first image or video to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;