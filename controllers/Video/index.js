const Video = require('../../models/Video');
const Course = require('../../models/Course');

const createVideo = async (req, res) => {
    try {
        const { title, description, videoURL, courseID, subtitle } = req.body;

        // Validate required fields
        if (!title || !description || !videoURL || !courseID ) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Ensure course exists
        const course = await Course.findById(courseID);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }


        // Create and save new video
        const newVideo = new Video({
            title,
            description,
            videoURL,
            courseID,
            subtitle,
        });

        const savedVideo = await newVideo.save();

        // Link the video to the course
        course.videos.push(savedVideo._id);
        await course.save();

        // Respond with success message
        res.status(201).json({
            message: 'Video created and linked to course',
            newVideo: savedVideo
        });

    } catch (error) {
        // Log error and send the message
        console.error('Error creating video:', error);
        res.status(500).json({
            message: 'Error creating video',
            error: error.message // Sending error message only for clarity
        });
    }
};



const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos', error });
    }
};

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


const updateVideoById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

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

const deleteVideoById = async (req, res) => {
    try {
        const { id } = req.params;

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
// Get all videos by Course ID
const getVideosByCourseId = async (req, res) => {
    try {
        const { courseID } = req.params;

        // Check if the course exists
        const courseExists = await Course.findById(courseID);
        if (!courseExists) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Find all videos linked to the courseID
        const videos = await Video.find({ courseID }).select('title subtitle description videoURL courseID').populate('courseID', 'title');

        // If no videos found, return a 404 error
        if (!videos.length) {
            return res.status(404).json({ message: 'No videos found for this course' });
        }

        // Return the videos with title, description, videoURL, and courseID
        res.status(200).json(videos);
    } catch (error) {
        console.error('Error fetching videos for course:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};


module.exports = {
    createVideo,
    getAllVideos,
    getVideoById,
    getVideosByUserId,
    updateVideoById,
    deleteVideoById,
    getVideosByCourseId
};
