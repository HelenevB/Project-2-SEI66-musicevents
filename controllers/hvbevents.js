const {Artist} = require("../models/Artist")
const {Event}= require("../models/Event")


exports.event_create_get = (req, res) => {
      Artist.find()
      .then((artist)=>{
        res.render("event/add", {artist})
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.event_create_post=(req, res) => {
    let event = new Event(req.body);
    event.eventPhoto= req.file.filename;
    event.month = new Date(req.body.date).toLocaleDateString('en-us', { month:"short",year:"numeric"}).toString();
    event.save()
    .then(() => {
        req.body.artist.forEach(artist => {
            Artist.findById(artist, (error, artist) => {
                artist.event.push(event);
                artist.save();
            })
        })

  res.redirect("/");
 })
.catch((err) => {
console.log(err);
res.send("Please try again later!!!");

})
}

// event.update({month: new Date(req.body.date).toLocaleDateString('en-us', { month:"short",year:"numeric"}).toString()});




exports.event_detail_get = (req, res) => {
 
    Event.findById(req.query.id).populate('artist').populate('user')

    .then((event)=>{
        res.render("event/detail", {event:event})
    })

  .catch((err) => {
      console.log(err);
  })
}