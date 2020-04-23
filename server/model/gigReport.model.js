const mongoose = require("mongoose")
// Recall how exports work in Node.js?
const GigReportSchema = require('./gigReport.schema').GigReportSchema

// Here we are mapping our PokemonSchema to the model Pokemon.
// If we are interested in referencing the Pokemon model elsewhere,
// we can simply do mongoose.model("Pokemon") elsewhere
const GigReportModel = mongoose.model("gigReports", GigReportSchema);

function addGigReport(GigReport) {
    return GigReportModel.create(GigReport);
}

function getGigReportByID(id) {
    return GigReportModel.findById(id).exec();
}

function getAllGigReports() {
    return GigReportModel.find().exec();
}

function getGigReportsByPostAuthor(postAuthorToFind) {
    return GigReportModel.find({postAuthor: postAuthorToFind}).sort({postCreated: 'descending'}).exec();
}

function getGigReportsByArtist(artistToFind) {
    return GigReportModel.find({artistId: artistToFind}).sort({concertDate: 'descending'}).exec();
}

async function getArtistAverageRating(artistToFind) {
    return await GigReportModel.aggregate([
        {
          $group: {
            _id: '$artistId',
            avgRating: { $avg: '$rating' }
          }
        }
      ]).exec();
}

async function updateGigReport(idToUpdate, newValues) {
    await GigReportModel.updateOne({ _id: idToUpdate }, newValues).exec();
    return GigReportModel.findById(idToUpdate).exec();
}

function deleteGigReport(idToFind) {
    return GigReportModel.deleteOne({ _id: idToFind }).exec();
}


module.exports = {
    addGigReport,
    getGigReportByID,
    getAllGigReports,
    getGigReportsByPostAuthor,
    getGigReportsByArtist,
    getArtistAverageRating,
    // getGigReportByAtLeastXWins,
    updateGigReport,
    deleteGigReport
};