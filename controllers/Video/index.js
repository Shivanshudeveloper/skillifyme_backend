const Video = require('../../models/Video'); // Adjust the path as needed

// Create a new video
const createVideo = async (req, res) => {
    try {
        console.log('Request Body:', req.body);

        const { title, description, videoURL, courseID, courseTitle, userID } = req.body;

        if (!title || !description || !videoURL || !courseID || !courseTitle || !userID) {
            return res.status(400).json({ message: 'All fields are required: title, description, videoURL, courseID, courseTitle, and userID' });
        }

        const newVideo = new Video({
            title,
            description,
            videoURL,
            courseID,
            courseTitle,
            userID
        });

        await newVideo.save();
        res.status(201).json({ message: 'Video created successfully', newVideo });
    } catch (error) {
        res.status(500).json({ message: 'Error creating video', error });
    }
};

// Get all videos
const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos', error });
    }
};

// Get video by ID
const getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching video', error });
    }
};

// Get videos by userID
const getVideosByUserId = async (req, res) => {
    try {
        const videos = await Video.find({ userID: req.params.userID });

        if (!videos.length) {
            return res.status(404).json({ message: 'No videos found for this user' });
        }

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos for user', error });
    }
};


// Update a video by ID
const updateVideoById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Find the video by ID and update it with the new data
        const updatedVideo = await Video.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.status(200).json({
            message: 'Video updated successfully',
            updatedVideo
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating video', error });
    }
};

// Delete a video by ID
const deleteVideoById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the video by ID and delete it
        const deletedVideo = await Video.findByIdAndDelete(id);

        if (!deletedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.status(200).json({
            message: 'Video deleted successfully',
            deletedVideo
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting video', error });
    }
};

module.exports = {
    createVideo,
    getAllVideos,
    getVideoById,
    getVideosByUserId,
    updateVideoById,
    deleteVideoById
};
