const Schema = require('mongoose').Schema;

exports.GigReportSchema = new Schema({
    // recall that _id is provided for us, though we can add other indices
    postAuthor: { type: String, required: true, index: true},
    postCreated: { type: Date, default: Date.now },
    postBody: { type: String },
    rating: { type: Number, min: 0, max: 100, required: true },
    concertVenue: { type: String },
    concertCity: { type: String },
    concertState: { type: String},
    concertDate: { type: Date },
    artist: { type: String, required: true, index: true},
    artistId: { type: String, required: true, index: true}
// set the collection (i.e., 'table') name below
}, { collection : 'gigReports' });