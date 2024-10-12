const Course = require('../../models/Course');
const File = require('../../models/file');

const createFile = async (req, res) => {
    try {
        const { fileUrl, fileName, courseID } = req.body;

        // Check if courseID exists in the Course collection
        const courseExists = await Course.findById(courseID);
        if (!courseExists) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const newFile = new File({
            fileUrl,
            fileName,
            courseID, // ObjectId of valid Course
        });

        await newFile.save();
        res.status(201).json(newFile);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};



// Get a single file by ID
const getFileById = async (req, res) => {
    try {
        const file = await File.findById(req.params.id).populate('courseID');
        if (!file) return res.status(404).json({ message: 'File not found' });
        res.status(200).json(file);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};


// Update file by ID
const updateFileById = async (req, res) => {
    try {
        const { fileUrl, fileName, courseID } = req.body;

        // Validate courseID
        const courseExists = await Course.findById(courseID);
        if (!courseExists) return res.status(404).json({ message: 'Course not found' });

        const file = await File.findByIdAndUpdate(req.params.id, { fileUrl, fileName, courseID }, { new: true });

        if (!file) return res.status(404).json({ message: 'File not found' });

        res.status(200).json(file);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete file by ID
const deleteFileById = async (req, res) => {
    try {
        const file = await File.findByIdAndDelete(req.params.id);

        if (!file) return res.status(404).json({ message: 'File not found' });

        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Mark a file as favorite
const markAsFavorite = async (req, res) => {
    try {
        const { isFavorite } = req.body;  // isFavorite will be passed in request body

        // Update the file's favorite status
        const file = await File.findByIdAndUpdate(req.params.id, { isFavorite }, { new: true });

        if (!file) return res.status(404).json({ message: 'File not found' });

        res.status(200).json(file);  // Send updated file as response
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Fetch all files
const getAllFiles = async (req, res) => {
    try {
        const files = await File.find().populate('courseID', 'title'); // Populate the course title
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch files', error });
    }
};

const getFilesByCourseId = async (req, res) => {
    try {
      const { courseID } = req.params;
      const files = await File.find({ courseID }).populate('courseID');
      res.status(200).json(files);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching files for course' });
    }
  };

module.exports = {
    createFile,
    getAllFiles,
    getFileById,
    markAsFavorite,
    updateFileById,
    deleteFileById,
    getFilesByCourseId
};
