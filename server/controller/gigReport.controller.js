const express = require('express');
const router = express.Router();
const GigReportsAccessor = require('../model/gigReport.model');

// Get All Gig Reports
router.get('/', (req, res) => {
    return GigReportsAccessor.getAllGigReports()
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error finding GigReports:${error}`))
});

// Get GigReport by ID
router.get('/:id', (req, res) => {
    return GigReportsAccessor.getGigReportByID(req.params.id)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error finding GigReport:${error}`))
});

// Get GigReports By postAuthor
router.get('/postAuthor/:postAuthor', (req, res) => {
    return GigReportsAccessor.getGigReportsByPostAuthor(req.params.postAuthor)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error finding GigReport:${error}`))
});

// Get GigReports By artist
router.get('/artist/:artistId', (req, res) => {
    return GigReportsAccessor.getGigReportsByArtist(req.params.artistId)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error finding GigReport:${error}`))
});

// Get Artist Average Rating
router.get('/artist/:artistId/avgRating', (req, res) => {
    return GigReportsAccessor.getArtistAverageRating(req.params.artistId)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error finding GigReport:${error}`))
});

// Add Gig Report
router.post('/', (req, res) => {
    return GigReportsAccessor.addGigReport(req.body)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error adding GigReport:${error}`))
});

// Update GigReport
router.put('/:id', (req, res) => {
    return GigReportsAccessor.updateGigReport(req.params.id, req.body)
        .then((response) => res.status(200).send(response),
        (error) =>  res.status(404).send(`Error updating GigReport:${error}`));
});

// Delete GigReport
router.delete('/:id', function (req, res) {
    return GigReportsAccessor.deleteGigReport(req.params.id)
        .then((response) => res.status(200).send(response),
        (error) =>  res.status(404).send(`Error deleting GigReport:${error}`));
});

module.exports = router;